import asyncio
import hashlib
import uuid
from datetime import datetime, timezone
from typing import List, Optional, TypedDict, Union
from urllib.parse import urljoin

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.gis.db.models import PointField, PolygonField
from django.contrib.gis.geos import Point
from django.db import models
from django.db.models import Avg, IntegerField, Max, Min
from django.db.models.functions import Cast, Coalesce
from django.dispatch import receiver
from django.http import HttpResponse
from django.urls import reverse
from django.utils.functional import cached_property
from django.utils.text import slugify

import pandas as pd
from asgiref.sync import sync_to_async
from django_choices_field import TextChoicesField
from django_jsonform.models.fields import JSONField
from polymorphic.models import PolymorphicModel
from procrastinate.contrib.django.models import ProcrastinateJob
from psycopg.errors import UniqueViolation
from pyairtable import Api as AirtableAPI
from pyairtable import Base as AirtableBase
from pyairtable import Table as AirtableTable
from pyairtable.models.schema import TableSchema as AirtableTableSchema
from strawberry.dataloader import DataLoader

import utils as lih_utils
from hub.filters import Filter
from hub.tasks import (
    import_all,
    refresh_all,
    refresh_many,
    refresh_one,
    refresh_webhooks,
)
from hub.views.mapped import ExternalDataSourceAutoUpdateWebhook
from utils.postcodesIO import PostcodesIOResult, get_bulk_postcode_geo
from utils.py import ensure_list, get

User = get_user_model()


class Organisation(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    logo = models.ImageField(null=True, upload_to="organisation")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Membership(models.Model):
    class Meta:
        unique_together = ["user", "organisation"]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="memberships")
    organisation = models.ForeignKey(
        Organisation, on_delete=models.CASCADE, related_name="members"
    )
    role = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.user}: {self.role} in {self.organisation}"


class UserProperties(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organisation_name = models.TextField(null=True, blank=True)
    full_name = models.TextField(null=True, blank=True)
    email_confirmed = models.BooleanField(default=False)
    account_confirmed = models.BooleanField(default=False)
    last_seen = models.DateTimeField(null=True, blank=True)
    agreed_terms = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


class TypeMixin:
    TYPE_CHOICES = [
        ("text", "Text"),
        ("integer", "Integer"),
        ("float", "Floating Point Number"),
        ("percent", "Percentage"),
        ("date", "Date"),
        ("boolean", "True/False"),
        ("profile_id", "Profile Id"),
        ("json", "JSON data"),
        ("url", "URL"),
    ]

    @property
    def is_number(self):
        if self.data_type in ("integer", "float", "percent"):
            return True

        return False

    @property
    def is_percentage(self):
        if self.data_type == "percent":
            return True

        return False

    @property
    def is_float(self):
        if self.data_type == "float" or self.data_type == "percent":
            return True

        return False

    @property
    def is_date(self):
        if self.data_type == "date":
            return True

        return False

    @property
    def is_json(self):
        if self.data_type == "json":
            return True

        return False

    @property
    def is_url(self):
        if self.data_type == "url":
            return True

        return False

    @property
    def value_col(self):
        if self.is_date:
            return "date"
        elif self.is_float:
            return "float"
        elif self.is_number:
            return "int"
        elif self.is_url or self.is_json:
            return "json"
        elif self.is_json:
            return "json"
        else:
            return "data"


class ShaderMixin:
    shades = [
        "#ffffd9",
        "#edf8b1",
        "#c7e9b4",
        "#7fcdbb",
        "#41b6c4",
        "#1d91c0",
        "#225ea8",
        "#253494",
        "#081d58",
    ]

    COLOUR_NAMES = {
        "red-500": "#CC3517",
        "orange-500": "#ED6832",
        "yellow-500": "#FEC835",
        "teal-600": "#068670",
        "blue-500": "#21A8E0",
        "purple-500": "#6F42C1",
        "gray-500": "#ADB5BD",
        "gray-300": "#DEE2E6",
    }

    @property
    def shader_table(self):
        return self.table

    @property
    def shader_filter(self):
        return {"data_type__data_set": self}

    def shade(self, val, cmin, cmax):
        if val == "":
            return None
        try:
            x = float(val - cmin) / (cmax - cmin)
        except ZeroDivisionError:
            x = 0.5  # cmax == cmin

        shade = int(x * 9) - 1
        if shade < 0:
            shade = 0
        return self.shades[shade]

    def colours_for_areas(self, areas):
        if len(areas) == 0:
            return {"properties": {"no_areas": True}}

        values, mininimum, maximum = self.shader_value(areas)
        legend = {}
        if hasattr(self, "options"):
            for option in self.options:
                if option.get("shader", None) is not None:
                    legend[option["title"]] = self.COLOUR_NAMES.get(
                        option["shader"], option["shader"]
                    )

        if len(legend) > 0:
            props = {"properties": {"legend": legend}}
        else:
            d_max = maximum
            d_min = mininimum
            if self.is_float:
                d_max = round(maximum, 1)
                d_min = round(mininimum, 1)
                if self.is_percentage:
                    d_max = f"{d_max}%"
                    d_min = f"{d_min}%"

            props = {
                "properties": {
                    "maximum": d_max,
                    "minimum": d_min,
                    "shades": self.shades,
                }
            }
        colours = {}
        for value in values:
            data = value.value()
            if hasattr(self, "options"):
                for option in self.options:
                    if option["title"] == data:
                        colours[value.gss] = {
                            "colour": self.COLOUR_NAMES.get(
                                option["shader"], option["shader"]
                            ),
                            "opacity": value.opacity(mininimum, maximum) or 0.7,
                            "value": data,
                            "label": self.label,
                        }

            if self.is_number and colours.get(value.gss, None) is None:
                shade = self.shade(data, mininimum, maximum)
                if shade is not None:
                    colours[value.gss] = {
                        "colour": shade,
                        "opacity": 0.7,
                        "label": self.label,
                        "value": data,
                    }

        # if there is no data for an area then need to set the shader to opacity 0 otherwise
        # they will end up as the default
        missing = {}
        for area in areas:
            if colours.get(area.gss, None) is None:
                missing[area.gss] = {"colour": "#ed6832", "opacity": 0}

        return {**colours, **missing, **props}

    def shader_value(self, area):
        if self.shader_table == "areadata":
            min_max = AreaData.objects.filter(
                area__in=area, **self.shader_filter
            ).aggregate(
                max=models.Max(self.value_col),
                min=models.Min(self.value_col),
            )

            data = (
                AreaData.objects.filter(area__in=area, **self.shader_filter)
                .select_related("area", "data_type")
                .annotate(
                    gss=models.F("area__gss"),
                )
            )
            return data, min_max["min"], min_max["max"]
        else:
            min_max = PersonData.objects.filter(
                person__area__in=area, **self.shader_filter
            ).aggregate(
                max=models.Max(self.value_col),
                min=models.Min(self.value_col),
            )

            data = (
                PersonData.objects.filter(person__area__in=area, **self.shader_filter)
                .select_related("person__area", "data_type")
                .annotate(gss=models.F("person__area__gss"))
            )
            return data, min_max["min"], min_max["max"]

        return None, None, None


class DataSet(TypeMixin, ShaderMixin, models.Model):
    SOURCE_CHOICES = [
        ("csv", "CSV File"),
        ("xlxs", "Excel File"),
        ("api", "External API"),
    ]
    SUBCATEGORY_CHOICES = [
        ("net_zero_support", "Support for net zero"),
        ("renewable_energy", "Renewable energy"),
        ("voting", "Voting"),
        ("government_action", "Government action"),
        ("supporters_and_activists", "Supporters and activists"),
        ("groups", "Groups"),
        ("places_and_spaces", "Places and spaces"),
        ("events", "Events"),
        ("cost_of_living", "Cost of living"),
    ]

    CATEGORY_CHOICES = [
        ("opinion", "Public Opinion"),
        ("place", "Place"),
        ("movement", "Movement"),
    ]

    TABLE_CHOICES = [
        ("areadata", "AreaData"),
        ("person__persondata", "PersonData"),
    ]

    UNIT_TYPE_CHOICES = [
        ("raw", "Raw unit (e.g. people or buildings)"),
        ("percentage", "Percentage"),
        ("point", "Point data (e.g. lat/long)"),
    ]

    UNIT_DISTRIBUTION_CHOICES = [
        ("people_in_area", "Evenly distributed over people in an area"),
        ("physical_area", "Evenly distributed over a physical area"),
        ("point", "Point data (recalculated)"),
    ]

    COMPARATORS_SCHEMA = {
        "type": "array",
        "items": {
            "type": "dict",
            "keys": {"field_lookup": {"type": "string"}, "title": {"type": "string"}},
        },
        "minItems": 2,
    }

    EXCLUDE_COUNTRIES_SCHEMA = {
        "type": "array",
        "items": {
            "type": "string",
        },
    }

    def comparators_default():
        return [
            dict(field_lookup="exact", title="is"),
            dict(field_lookup="not_exact", title="is not"),
        ]

    def exclude_countries_default():
        return []

    def numerical_comparators():
        return [
            dict(field_lookup="gte", title="is equal or greater than"),
            dict(field_lookup="lt", title="is less than"),
        ]

    def year_comparators():
        return [
            dict(field_lookup="year__lt", title="before year"),
            dict(field_lookup="year__gte", title="since year"),
        ]

    def string_comparators():
        return [
            dict(field_lookup="icontains", title="contains"),
            dict(field_lookup="not_icontains", title="does not contain"),
        ]

    def in_comparators():
        return [
            dict(field_lookup="in", title="is one of"),
            dict(field_lookup="not_in", title="is not one of"),
        ]

    OPTIONS_SCHEMA = {
        "type": "array",
        "items": {
            "type": "dict",
            "keys": {"title": {"type": "string"}, "shader": {"type": "string"}},
        },
    }

    def options_default():
        return []

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    label = models.CharField(max_length=200, blank=True, null=True)
    data_type = models.CharField(max_length=20, choices=TypeMixin.TYPE_CHOICES)
    last_update = models.DateTimeField(auto_now=True)
    source_label = models.TextField(max_length=300, blank=True, null=True)
    source = models.CharField(max_length=200)
    source_type = models.TextField(
        max_length=50, blank=True, null=True, choices=SOURCE_CHOICES
    )
    data_url = models.URLField(blank=True, null=True)
    release_date = models.TextField(blank=True, null=True)
    is_upload = models.BooleanField(default=False)
    is_range = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    order = models.IntegerField(blank=True, null=True)
    category = models.TextField(blank=True, null=True, choices=CATEGORY_CHOICES)
    subcategory = models.TextField(blank=True, null=True, choices=SUBCATEGORY_CHOICES)
    table = models.CharField(max_length=20, null=True, choices=TABLE_CHOICES)
    comparators = JSONField(schema=COMPARATORS_SCHEMA, default=comparators_default)
    options = JSONField(schema=OPTIONS_SCHEMA, blank=True, default=options_default)
    default_value = models.CharField(max_length=50, blank=True, null=True)
    is_filterable = models.BooleanField(default=True)
    is_shadable = models.BooleanField(default=True)
    is_public = models.BooleanField(default=False)
    fill_blanks = models.BooleanField(default=True)
    exclude_countries = JSONField(
        schema=EXCLUDE_COUNTRIES_SCHEMA, blank=True, default=exclude_countries_default
    )
    unit_type = models.TextField(null=True, choices=UNIT_TYPE_CHOICES)
    unit_distribution = models.TextField(null=True, choices=UNIT_DISTRIBUTION_CHOICES)
    areas_available = models.ManyToManyField("AreaType")
    external_data_source = models.ForeignKey(
        "ExternalDataSource", on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        if self.label:
            return self.label

        return self.name

    @property
    def source_name(self):
        if self.source_label is not None:
            return self.source_label
        elif not self.source == "" and self.source is not None:
            return lih_utils.domain_human(self.source)
        elif not self.data_url == "" and self.data_url is not None:
            return lih_utils.domain_human(self.data_url)

        return "unknown"

    @property
    def source_url(self):
        if not self.source == "":
            return self.source

        return self.data_url

    class Meta:
        permissions = [
            ("order_and_feature", "Can change sort order and mark as featured")
        ]

    def filter(self, query, **kwargs):
        return Filter(self, query).run(**kwargs)


class AreaType(models.Model):
    VALID_AREA_TYPES = ["WMC", "WMC23"]

    AREA_TYPES = [("westminster_constituency", "Westminster Constituency")]
    name = models.CharField(max_length=50, unique=True)
    code = models.CharField(max_length=10, unique=True)
    area_type = models.CharField(max_length=50, choices=AREA_TYPES)
    description = models.CharField(max_length=300)

    def __str__(self):
        return self.code


class DataType(TypeMixin, ShaderMixin, models.Model):
    data_set = models.ForeignKey(DataSet, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    data_type = models.CharField(max_length=20, choices=TypeMixin.TYPE_CHOICES)
    last_update = models.DateTimeField(auto_now=True)
    average = models.FloatField(blank=True, null=True)
    maximum = models.FloatField(blank=True, null=True)
    minimum = models.FloatField(blank=True, null=True)
    label = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)
    area_type = models.ForeignKey(AreaType, on_delete=models.CASCADE, null=True)
    auto_converted = models.BooleanField(
        default=False,
        help_text="True if this has been auto converted from an area with overlapping geometry",
    )
    auto_converted_text = models.TextField(blank=True, null=True)

    def __str__(self):
        name = self.name
        if self.label:
            name = self.label

        if self.area_type:
            return f"{name} ({self.area_type})"

        return name

    def update_average(self):
        average = (
            AreaData.objects.filter(area__area_type=self.area_type, data_type=self)
            .annotate(
                cast_data=Cast(Coalesce("int", "float"), output_field=self.cast_field())
            )
            .all()
            .aggregate(Avg("cast_data"))
        )

        self.average = average["cast_data__avg"]
        self.save()

    def update_max_min(self):
        base = (
            AreaData.objects.filter(area__area_type=self.area_type, data_type=self)
            .annotate(
                cast_data=Cast(Coalesce("int", "float"), output_field=self.cast_field())
            )
            .all()
        )

        max = base.aggregate(Max("cast_data"))
        min = base.aggregate(Min("cast_data"))

        self.maximum = max["cast_data__max"]
        self.minimum = min["cast_data__min"]
        self.save()

    @property
    def cast_field(self):
        return IntegerField

    @property
    def shader_table(self):
        return self.data_set.table

    @property
    def shader_filter(self):
        return {"data_type": self}

    @property
    def auto_conversion_disclaimer(self):
        text = None
        if self.auto_converted:
            if self.auto_converted_text:
                text = self.auto_converted_text
            elif self.area_type.code == "WMC":
                text = "This dataset has been automatically converted from 2025 parliamentary constituencies."
            elif self.area_type.code == "WMC23":
                text = "This dataset has been automatically converted from 2010 parliamentary constituencies."
            else:
                text = "This dataset has been automatically converted from a different boundary type."

        return text


class UserDataSets(models.Model):
    data_set = models.ForeignKey(DataSet, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class CommonData(models.Model):
    data_type = models.ForeignKey(DataType, on_delete=models.CASCADE)
    data = models.CharField(max_length=400)
    date = models.DateTimeField(blank=True, null=True)
    float = models.FloatField(blank=True, null=True)
    int = models.IntegerField(blank=True, null=True)
    json = models.JSONField(blank=True, null=True)

    def value(self):
        try:
            if self.is_date:
                return self.date
            elif self.is_float:
                if self.float is None:
                    return 0
                return self.float
            elif self.is_number:
                if self.int is None:
                    return 0
                return self.int
            elif self.is_json or self.is_url:
                return self.json
        except ValueError:
            return self.data

        return self.data

    def opacity(self, min, max):
        if self.is_number:
            inc = (max - min) / 100
            if max == min:
                opacity = 100
            elif self.value() == min:
                opacity = min / inc
            else:
                opacity = (self.value() - min) / inc
            return opacity / 100
        return 100

    @property
    def average(self):
        return self.data_type.average

    @property
    def label(self):
        return self.data_type.label

    @property
    def is_number(self):
        return self.data_type.is_number

    @property
    def is_percentage(self):
        return self.data_type.is_percentage

    @property
    def is_float(self):
        return self.data_type.is_float

    @property
    def is_date(self):
        return self.data_type.is_date

    @property
    def is_json(self):
        return self.data_type.is_json

    @property
    def is_url(self):
        return self.data_type.is_url

    class Meta:
        abstract = True


class GenericData(CommonData):
    point = PointField(blank=True, null=True)
    polygon = PolygonField(blank=True, null=True)


class Area(models.Model):
    mapit_id = models.CharField(max_length=30)
    gss = models.CharField(max_length=30)
    name = models.CharField(max_length=200)
    area_type = models.ForeignKey(AreaType, on_delete=models.CASCADE)
    geometry = models.TextField(blank=True, null=True)
    overlaps = models.ManyToManyField("self", through="AreaOverlap")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f"/area/{self.area_type.code}/{self.name}"

    def get_value(self, dataset):
        area = self

        if dataset.table == "areadata":
            scope = area.areadata_set
        else:
            person = area.person_set.first()
            scope = person.persondata_set if person else None

        if scope is None:
            return None

        data = scope.get(data_type__data_set=dataset)
        return data.value() if data else None

    @classmethod
    def get_by_gss(cls, gss, area_type="WMC"):
        try:
            area = cls.objects.get(gss=gss, area_type__code=area_type)
        except cls.DoesNotExist:
            area = None

        return area

    @classmethod
    def get_by_name(cls, name, area_type="WMC"):
        try:
            area = cls.objects.get(name__iexact=name, area_type__code=area_type)
        except cls.DoesNotExist:
            area = None

        return area

    class Meta:
        unique_together = ["gss", "area_type"]


class AreaOverlap(models.Model):
    area_old = models.ForeignKey(
        Area, on_delete=models.CASCADE, related_name="old_overlaps"
    )
    area_new = models.ForeignKey(
        Area, on_delete=models.CASCADE, related_name="new_overlaps"
    )
    population_overlap = models.SmallIntegerField(default=0)
    area_overlap = models.SmallIntegerField(default=0)


class AreaData(CommonData):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)


class Person(models.Model):
    person_type = models.CharField(max_length=10)
    external_id = models.CharField(db_index=True, max_length=20)
    id_type = models.CharField(max_length=30)
    name = models.CharField(max_length=200)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    photo = models.ImageField(null=True, upload_to="person")
    start_date = models.DateField(null=True)
    end_date = models.DateField(null=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        area = self.area
        return f"/area/{area.area_type.code}/{area.name}"

    class Meta:
        unique_together = ("external_id", "id_type")
        indexes = [models.Index(fields=["external_id", "id_type"])]


class PersonData(CommonData):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)


class Token(models.Model):
    DOMAINS = [("user", "User")]
    token = models.CharField(max_length=300)
    domain = models.CharField(max_length=50, choices=DOMAINS)
    domain_id = models.IntegerField()


@receiver(models.signals.pre_save, sender=AreaData)
@receiver(models.signals.pre_save, sender=PersonData)
def cast_data(sender, instance, *args, **kwargs):
    if instance.is_date and instance.date is None and instance.data:
        date = datetime.fromisoformat(instance.data)
        # parliament API does not add timezones to things that are dates so we
        # need to add them
        if date.tzinfo is None:
            date = date.replace(tzinfo=timezone.utc)
        instance.date = date
        instance.data = ""

    elif instance.is_float and instance.float is None and instance.data:
        instance.float = float(instance.data)
        instance.data = ""

    elif instance.is_number and instance.int is None and instance.data:
        instance.int = int(instance.data)
        instance.data = ""


class ExternalDataSource(PolymorphicModel):
    """
    A third-party data source that can be read and optionally written back to.
    E.g. Google Sheet or an Action Network table.
    This class is to be subclassed by specific data source types.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organisation = models.ForeignKey(
        Organisation,
        on_delete=models.CASCADE,
        related_name="external_data_sources",
        null=True,
        blank=True,
    )

    class DataSourceType(models.TextChoices):
        MEMBER = "member", "Members or supporters"
        REGION = "region", "Areas or regions"
        OTHER = "other", "Other"

    data_type = TextChoicesField(
        choices_enum=DataSourceType, default=DataSourceType.OTHER
    )
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    automated_webhooks = False
    introspect_fields = False
    # Geocoding data

    class PostcodesIOGeographyTypes(models.TextChoices):
        POSTCODE = "postcode", "Postcode"
        WARD = "ward", "Ward"
        COUNCIL = "admin_district", "Council"
        CONSTITUENCY = "parliamentary_constituency", "Constituency"
        CONSTITUENCY_2025 = "parliamentary_constituency_2025", "Constituency (2024)"

    geography_column_type = TextChoicesField(
        choices_enum=PostcodesIOGeographyTypes,
        default=PostcodesIOGeographyTypes.POSTCODE,
    )
    geography_column = models.CharField(max_length=250, blank=True, null=True)

    class FieldDefinition(TypedDict):
        value: str
        label: Optional[str]
        description: Optional[str]

    fields = JSONField(blank=True, null=True, default=list)
    # Auto-updates

    class UpdateMapping(TypedDict):
        source: str
        # Can be a dot path, for use with benedict
        source_path: str
        destination_column: str

    update_mapping = JSONField(blank=True, null=True, default=list)
    auto_update_enabled = models.BooleanField(default=False, blank=True)
    # Auto-import
    auto_import_enabled = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.name if self.name is not None else super().__str__()

    def event_log_queryset(self):
        return ProcrastinateJob.objects.filter(
            args__external_data_source_id=str(self.id)
        ).order_by("-scheduled_at")

    def get_update_mapping(self) -> list[UpdateMapping]:
        return ensure_list(self.update_mapping)

    def delete(self, *args, **kwargs):
        self.disable_auto_update()
        return super().delete(*args, **kwargs)

    # CRM methods
    # to be implemented by subclasses

    def healthcheck(self):
        """
        Check the connection to the API.
        """
        raise NotImplementedError(
            "Healthcheck not implemented for this data source type."
        )

    def field_definitions(self) -> list[FieldDefinition]:
        """
        Get the fields for the data source.
        """
        return ensure_list(self.fields)

    def remote_name(self) -> Optional[str]:
        """
        Get the name of the data source in the remote system.
        """
        return None

    def remote_url(self) -> Optional[str]:
        """
        Get the URL of the data source in the remote system.
        """
        return None

    def setup_webhooks(self):
        """
        Set up a webhook.
        """
        raise NotImplementedError(
            "Webhook setup not implemented for this data source type."
        )

    def refresh_webhooks(self):
        """
        Refresh the webhook.
        """
        return self.setup_webhooks()

    def get_member_ids_from_webhook(self, payload: dict) -> list[str]:
        """
        Get the member ID from the webhook payload.
        """
        raise NotImplementedError(
            "Get member ID not implemented for this data source type."
        )

    async def import_all(self):
        """
        Copy data to this database for use in dashboarding features.
        """

        # A Local Intelligence Hub record of this data
        data_set, created = await DataSet.objects.aupdate_or_create(
            external_data_source=self,
            defaults={
                "name": f"Cached dataset for {self.id}",
                "data_type": "json",
                "table": "commondata",
                "default_value": {},
                "is_filterable": True,
                "is_shadable": False,
                "is_public": False,
            },
        )

        data_type, created = await DataType.objects.aupdate_or_create(
            data_set=data_set, name=self.id, defaults={"data_type": "json"}
        )

        data = await self.fetch_all()

        if (
            self.geography_column
            and self.geography_column_type == self.PostcodesIOGeographyTypes.POSTCODE
        ):
            loaders = await self.get_loaders()

            async def create_import_record(record):
                postcode_data: PostcodesIOResult = await loaders["postcodesIO"].load(
                    self.get_record_field(record, self.geography_column)
                )
                data, created = await GenericData.objects.aupdate_or_create(
                    data_type=data_type,
                    data=self.get_record_id(record),
                    defaults={
                        "json": self.get_record_dict(record),
                        "point": Point(
                            postcode_data["longitude"],
                            postcode_data["latitude"],
                        )
                        if (
                            postcode_data is not None
                            and "latitude" in postcode_data
                            and "longitude" in postcode_data
                        )
                        else None,
                    },
                )

            # TODO: batch this up
            await asyncio.gather(*[create_import_record(record) for record in data])
        else:
            # To allow us to lean on LIH's geo-analytics features,
            # TODO: Re-implement this data as `AreaData`, linking each datum to an Area/AreaType as per `self.geography_column` and `self.geography_column_type`.
            # This will require importing other AreaTypes like admin_district, Ward
            for record in data:
                data, created = await GenericData.objects.aupdate_or_create(
                    data_type=data_type,
                    data=self.get_record_id(record),
                    defaults={"json": self.get_record_dict(record)},
                )

    async def fetch_one(self, member_id: str):
        """
        Get one member from the data source.
        """
        raise NotImplementedError("Get one not implemented for this data source type.")

    async def fetch_many(self, id_list: list[str]):
        """
        Get many members from the data source.
        """
        raise NotImplementedError("Get many not implemented for this data source type.")

    async def fetch_all(self):
        """
        Get all members from the data source.
        """
        raise NotImplementedError("Get all not implemented for this data source type.")

    MappedMember = TypedDict(
        "MatchedMember", {"member": dict, "update_fields": dict[str, any]}
    )

    async def update_one(self, mapped_record: MappedMember):
        """
        Append data for one member to the table.
        """
        raise NotImplementedError(
            "Update one not implemented for this data source type."
        )

    async def update_many(self, mapped_records: list[MappedMember]):
        """
        Append mapped data to the table.
        """
        raise NotImplementedError(
            "Update many not implemented for this data source type."
        )

    async def update_all(self, mapped_records: list[MappedMember]):
        """
        Append all data to the table.
        """
        raise NotImplementedError(
            "Update all not implemented for this data source type."
        )

    def get_record_id(self, record):
        """
        Get the ID for a record.
        """
        raise NotImplementedError("Get ID not implemented for this data source type.")

    def get_record_field(self, record: dict, field: str):
        """
        Get a field from a record.
        """
        raise NotImplementedError(
            "Get field not implemented for this data source type."
        )

    def get_record_dict(self, record: any) -> dict:
        """
        Get a record as a dictionary.
        """
        return record

    # Mapping mechanics

    async def fetch_many_loader(self, keys):
        results = await self.fetch_many(keys)
        # sort results by keys, including None
        return [
            next(
                (result for result in results if self.get_record_id(result) == key),
                None,
            )
            for key in keys
        ]

    def filter(self, filter: dict) -> dict:
        """
        Look up a record by a value in a column.
        """
        raise NotImplementedError("Lookup not implemented for this data source type.")

    class Loaders(TypedDict):
        postcodesIO: DataLoader
        fetch_record: DataLoader
        source_loaders: dict[str, DataLoader]

    class EnrichmentLookup(TypedDict):
        member_id: str
        postcode_data: PostcodesIOResult
        source_id: "ExternalDataSource"
        source_path: str
        source_data: Optional[any]

    def get_import_data(self):
        return GenericData.objects.filter(
            data_type__data_set__external_data_source_id=self.id
        )

    def get_import_dataframe(self):
        enrichment_data = self.get_import_data()
        json_list = [d.json for d in enrichment_data]
        enrichment_df = pd.DataFrame.from_records(json_list)
        return enrichment_df

    def imported_data_count(self) -> int:
        count = self.get_import_data().all().count()
        if isinstance(count, int):
            return count
        return 0

    def data_loader_factory(self):
        async def fetch_enrichment_data(keys: List[self.EnrichmentLookup]) -> list[str]:
            return_data = []
            enrichment_df = await sync_to_async(self.get_import_dataframe)()
            for key in keys:
                try:
                    relevant_member_geography = get(
                        key["postcode_data"], self.geography_column_type, ""
                    )
                    if (
                        relevant_member_geography == ""
                        or relevant_member_geography is None
                    ):
                        return_data.append(None)
                    else:
                        enrichment_value = enrichment_df.loc[
                            enrichment_df[self.geography_column]
                            == relevant_member_geography,
                            key["source_path"],
                        ].values[0]
                        return_data.append(enrichment_value)
                except Exception:
                    return_data.append(None)

            return return_data

        def cache_key_fn(key: self.EnrichmentLookup) -> str:
            return f"{key['member_id']}_{key['source_id']}"

        return DataLoader(load_fn=fetch_enrichment_data, cache_key_fn=cache_key_fn)

    async def get_loaders(self) -> Loaders:
        loaders = self.Loaders(
            postcodesIO=DataLoader(load_fn=get_bulk_postcode_geo),
            fetch_record=DataLoader(load_fn=self.fetch_many_loader, cache=False),
            source_loaders={
                str(source.id): source.data_loader_factory()
                async for source in ExternalDataSource.objects.filter(
                    organisation=self.organisation_id,
                    geography_column__isnull=False,
                    geography_column_type__isnull=False,
                ).all()
            },
        )

        return loaders

    async def map_one(self, member: Union[str, dict], loaders: Loaders) -> MappedMember:
        """
        Match one member to a record in the data source, via ID or record.
        """
        if type(member) is str:
            member = await loaders["fetch_record"].load(member)
        update_fields = {}
        try:
            postcode_data = None
            if self.geography_column_type == self.PostcodesIOGeographyTypes.POSTCODE:
                # Get postcode from member
                postcode = self.get_record_field(member, self.geography_column)
                # Get relevant config data for that postcode
                postcode_data: PostcodesIOResult = await loaders["postcodesIO"].load(
                    postcode
                )
            # Map the fields
            for mapping_dict in self.get_update_mapping():
                source = mapping_dict["source"]
                source_path = mapping_dict["source_path"]
                destination_column = mapping_dict["destination_column"]
                if source == "postcodes.io":
                    if postcode_data is not None:
                        update_fields[destination_column] = get(
                            postcode_data, source_path
                        )
                else:
                    try:
                        source_loader = loaders["source_loaders"].get(source, None)
                        if source_loader is not None:
                            update_fields[
                                destination_column
                            ] = await source_loader.load(
                                self.EnrichmentLookup(
                                    member_id=self.get_record_id(member),
                                    postcode_data=postcode_data,
                                    source_id=source,
                                    source_path=source_path,
                                )
                            )
                    except Exception:
                        # TODO: sentry logging
                        continue
            # Return the member and config data
            return self.MappedMember(member=member, update_fields=update_fields)
        except TypeError:
            # Error fetching postcode data
            return self.MappedMember(member=member, update_fields={})

    async def map_many(
        self, members: list[Union[str, any]], loaders: Loaders
    ) -> list[MappedMember]:
        """
        Match many members to records in the data source.
        """
        return await asyncio.gather(
            *[self.map_one(member, loaders) for member in members]
        )

    async def map_all(self, loaders: Loaders) -> list[MappedMember]:
        """
        Match all members to records in the data source.
        """
        members = await self.fetch_all()
        return await asyncio.gather(
            *[self.map_one(member, loaders) for member in members]
        )

    async def refresh_one(self, member_id: Union[str, any]):
        if len(self.get_update_mapping()) == 0:
            return
        loaders = await self.get_loaders()
        mapped_record = await self.map_one(member_id, loaders)
        return await self.update_one(mapped_record=mapped_record)

    async def refresh_many(self, member_ids: list[Union[str, any]]):
        if len(self.get_update_mapping()) == 0:
            return
        loaders = await self.get_loaders()
        mapped_records = await self.map_many(member_ids, loaders)
        return await self.update_many(mapped_records=mapped_records)

    async def refresh_all(self):
        if len(self.get_update_mapping()) == 0:
            return
        loaders = await self.get_loaders()
        mapped_records = await self.map_all(loaders)
        return await self.update_all(mapped_records=mapped_records)

    # UI

    def enable_auto_update(self) -> Union[None, int]:
        if self.automated_webhooks:
            self.refresh_webhooks()
            # And schedule a cron to keep doing it
            refresh_webhooks.defer(
                external_data_source_id=str(self.id),
            )
        self.auto_update_enabled = True
        self.save()

    def disable_auto_update(self):
        self.auto_update_enabled = False
        self.save()
        if self.automated_webhooks:
            self.teardown_webhooks()

    # Webhooks

    def handle_update_webhook_view(self, body):
        member_ids = self.get_member_ids_from_webhook(body)
        if len(member_ids) == 1:
            self.schedule_refresh_one(member_id=member_ids[0])
        else:
            self.schedule_refresh_many(member_ids=member_ids)
        return HttpResponse(status=200)

    # Scheduling

    @classmethod
    async def deferred_refresh_one(cls, external_data_source_id: str, member_id: str):
        external_data_source: ExternalDataSource = await cls.objects.aget(
            id=external_data_source_id
        )
        if external_data_source.auto_update_enabled:
            await external_data_source.refresh_one(member_id=member_id)

    @classmethod
    async def deferred_refresh_many(
        cls, external_data_source_id: str, member_ids: list[str]
    ):
        external_data_source: ExternalDataSource = await cls.objects.aget(
            id=external_data_source_id
        )
        if external_data_source.auto_update_enabled:
            await external_data_source.refresh_many(member_ids=member_ids)

    @classmethod
    async def deferred_refresh_all(cls, external_data_source_id: str):
        external_data_source: ExternalDataSource = await cls.objects.aget(
            id=external_data_source_id
        )
        if external_data_source.auto_update_enabled:
            await external_data_source.refresh_all()

    @classmethod
    async def deferred_refresh_webhooks(cls, external_data_source_id: str):
        external_data_source: ExternalDataSource = await cls.objects.aget(
            pk=external_data_source_id
        )
        if (
            external_data_source.auto_update_enabled
            or external_data_source.auto_import_enabled
        ):
            if external_data_source.automated_webhooks:
                external_data_source.refresh_webhooks()

    @classmethod
    async def deferred_import_all(cls, external_data_source_id: str):
        external_data_source: ExternalDataSource = await cls.objects.aget(
            pk=external_data_source_id
        )
        await external_data_source.import_all()

    def schedule_refresh_one(self, member_id: str) -> int:
        try:
            return refresh_one.configure(
                # Dedupe `update_many` jobs for the same config
                # https://procrastinate.readthedocs.io/en/stable/howto/queueing_locks.html
                queueing_lock=f"update_one_{str(self.id)}_{str(member_id)}",
                schedule_in={"seconds": settings.SCHEDULED_UPDATE_SECONDS_DELAY},
            ).defer(external_data_source_id=str(self.id), member_id=member_id)
        except UniqueViolation:
            pass

    def schedule_refresh_many(self, member_ids: list[str]) -> int:
        member_ids_hash = hashlib.md5("".join(sorted(member_ids)).encode()).hexdigest()
        try:
            return refresh_many.configure(
                # Dedupe `update_many` jobs for the same config
                # https://procrastinate.readthedocs.io/en/stable/howto/queueing_locks.html
                queueing_lock=f"update_many_{str(self.id)}_{member_ids_hash}",
                schedule_in={"seconds": settings.SCHEDULED_UPDATE_SECONDS_DELAY},
            ).defer(external_data_source_id=str(self.id), member_ids=member_ids)
        except UniqueViolation:
            pass

    def schedule_refresh_all(self) -> int:
        try:
            return refresh_all.configure(
                # Dedupe `update_all` jobs for the same config
                # https://procrastinate.readthedocs.io/en/stable/howto/queueing_locks.html
                queueing_lock=f"update_all_{str(self.id)}",
                schedule_in={"seconds": settings.SCHEDULED_UPDATE_SECONDS_DELAY},
            ).defer(external_data_source_id=str(self.id))
        except UniqueViolation:
            pass

    def schedule_import_all(self) -> int:
        try:
            return import_all.configure(
                # Dedupe `import_all` jobs for the same config
                # https://procrastinate.readthedocs.io/en/stable/howto/queueing_locks.html
                queueing_lock=f"import_all_{str(self.id)}",
                schedule_in={"seconds": settings.SCHEDULED_UPDATE_SECONDS_DELAY},
            ).defer(external_data_source_id=str(self.id))
        except UniqueViolation:
            pass


class AirtableSource(ExternalDataSource):
    """
    An Airtable table.
    """

    api_key = models.CharField(
        max_length=250,
        help_text="Personal access token. Requires the following 4 scopes: data.records:read, data.records:write, schema.bases:read, webhook:manage",
    )
    base_id = models.CharField(max_length=250)
    table_id = models.CharField(max_length=250)
    automated_webhooks = True
    introspect_fields = True

    class Meta:
        verbose_name = "Airtable table"
        unique_together = ["base_id", "table_id", "api_key"]

    @cached_property
    def api(self) -> AirtableAPI:
        return AirtableAPI(self.api_key)

    @cached_property
    def base(self) -> AirtableBase:
        return self.api.base(self.base_id)

    @cached_property
    def table(self) -> AirtableTable:
        return self.base.table(self.table_id)

    @cached_property
    def schema(self) -> AirtableTableSchema:
        return self.table.schema()

    def remote_url(self) -> str:
        return f"https://airtable.com/{self.base_id}/{self.table_id}?blocks=hide"

    def healthcheck(self):
        record = self.table.first()
        if record:
            return True
        return False

    def field_definitions(self):
        return [
            self.FieldDefinition(
                label=field.name,
                # For `value`, we use the field name because
                # because in the UI we want users to type the field name, not the field ID
                # and so self.fetch_all doesn't use table(return_fields_by_field_id=True)
                # TODO: implement a field ID lookup in the UI, then revisit this
                value=field.name,
                description=field.description,
            )
            for field in self.table.schema().fields
        ]

    def remote_name(self):
        return self.schema.name

    async def fetch_one(self, member_id):
        record = self.table.get(member_id)
        return record

    async def fetch_many(self, id_list: list[str]):
        formula = "OR("
        formula += ",".join([f"RECORD_ID()='{member_id}'" for member_id in id_list])
        formula += ")"
        records = self.table.all(formula=formula)
        return records

    async def fetch_all(self):
        records = self.table.all()
        return records

    def filter(self, d: dict):
        formula = "AND("
        formula += ",".join([f"{key}='{value}'" for key, value in d.items()])
        formula += ")"
        records = self.table.all(formula=formula)
        return records

    def get_record_id(self, record):
        return record["id"]

    def get_record_field(self, record, field):
        return record["fields"].get(str(field))

    def get_record_dict(self, record):
        return record["fields"]

    async def update_one(self, mapped_record):
        return self.table.update(
            mapped_record["member"]["id"], mapped_record["update_fields"]
        )

    async def update_many(self, mapped_records):
        return self.table.batch_update(
            [
                {
                    "id": mapped_record["member"]["id"],
                    "fields": mapped_record["update_fields"],
                }
                for mapped_record in mapped_records
            ]
        )

    async def update_all(self, mapped_records):
        return self.table.batch_update(
            [
                {
                    "id": mapped_record["member"]["id"],
                    "fields": mapped_record["update_fields"],
                }
                for mapped_record in mapped_records
            ]
        )

    def auto_update_webhook_specification(self):
        if self.geography_column is None:
            raise ValueError("A geography column is required for auto-updates to work.")
        # DOCS: https://airtable.com/developers/web/api/model/webhooks-specification
        return {
            "options": {
                "filters": {
                    "recordChangeScope": self.table_id,
                    "watchDataInFieldIds": [
                        # Listen for any geography changes
                        self.table.schema()
                        .field(self.geography_column)
                        .id
                    ],
                    "dataTypes": ["tableData"],
                    "changeTypes": [
                        "add",
                        "update",
                    ],
                }
            }
        }

    def auto_update_webhook_url(self):
        return urljoin(
            settings.BASE_URL,
            reverse("external_data_source_auto_update_webhook", args=[self.id]),
        )

    def get_webhooks(self):
        list = self.base.webhooks()
        auto_update_webhook_url = self.auto_update_webhook_url()
        return [
            webhook
            for webhook in list
            if webhook.notification_url == auto_update_webhook_url
        ]

    def webhook_healthcheck(self):
        expected_webhooks = 0
        if self.auto_update_webhook_url:
            expected_webhooks += 1
        if self.auto_import_enabled:
            expected_webhooks += 1
        webhooks = self.get_webhooks()
        if len(webhooks) < expected_webhooks:
            print("Webhook healthcheck: Not enough webhooks")
            return False
        if len(webhooks) > expected_webhooks:
            print("Webhook healthcheck: Too many webhooks")
            return False
        for webhook in webhooks:
            if not webhook.is_hook_enabled:
                print("Webhook healthcheck: a webhook expired")
                return False
        return True

    def teardown_webhooks(self):
        list = self.base.webhooks()
        url = self.auto_update_webhook_url()
        for webhook in list:
            if ExternalDataSourceAutoUpdateWebhook.base_path in url:
                # Update the webhook in case the spec changed,
                # which will also refresh the 7 day expiration date
                webhook.delete()

    def setup_webhooks(self):
        self.teardown_webhooks()
        # Auto-update
        self.base.add_webhook(
            self.auto_update_webhook_url(), self.auto_update_webhook_specification()
        )

    def get_member_ids_from_webhook(self, webhook_payload: dict) -> list[str]:
        member_ids: list[str] = []
        webhook_id = webhook_payload["webhook"]["id"]
        webhook = self.base.webhook(webhook_id)
        webhook_object, is_new = AirtableWebhook.objects.update_or_create(
            airtable_id=webhook_id
        )
        payloads = webhook.payloads(cursor=webhook_object.cursor)
        for payload in payloads:
            webhook_object.cursor = webhook_object.cursor + 1
            for table_id, deets in payload.changed_tables_by_id.items():
                if table_id == self.table_id:
                    member_ids += deets.changed_records_by_id.keys()
                    member_ids += deets.created_records_by_id.keys()
        webhook_object.save()
        member_ids = list(sorted(set(member_ids)))
        print("Webhook member result", webhook_object.cursor, member_ids)
        return member_ids


class AirtableWebhook(models.Model):
    """
    We need a way to persist the cursor for the Airtable webhook, so we are saving it per-webhook in the DB.
    """

    # Airtable ID
    airtable_id = models.CharField(max_length=250, primary_key=True)
    cursor = models.IntegerField(default=1, blank=True)


class Report(PolymorphicModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organisation = models.ForeignKey(
        Organisation, on_delete=models.CASCADE, related_name="reports"
    )
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class MapReport(Report):
    layers = models.JSONField(blank=True, null=True, default=list)

    class MapLayer(TypedDict):
        name: str
        source: str

    def get_layers(self) -> list[MapLayer]:
        return self.layers
