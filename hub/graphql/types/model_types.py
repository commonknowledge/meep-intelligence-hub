from datetime import datetime
from typing import List, Optional, Union

import procrastinate.contrib.django.models
import strawberry
import strawberry_django
from strawberry import auto
from strawberry.types.info import Info
from strawberry_django.auth.utils import get_current_user

from hub import models
from hub.graphql.types.geojson import PointFeature, PointGeometry
from hub.graphql.utils import dict_key_field


@strawberry_django.filters.filter(
    procrastinate.contrib.django.models.ProcrastinateJob, lookups=True
)
class QueueFilter:
    id: auto
    status: auto
    queue_name: auto
    task_name: auto
    scheduled_at: auto
    attempts: auto
    external_data_source_id: Optional[str]

    def filter_external_data_source_id(self, queryset, info, value):
        return queryset.filter(args__external_data_source_id=value)


@strawberry_django.type(
    procrastinate.contrib.django.models.ProcrastinateJob,
    filters=QueueFilter,
    pagination=True,
)
class QueueJob:
    id: auto
    queue_name: auto
    task_name: auto
    lock: auto
    args: auto
    status: auto
    scheduled_at: auto
    attempts: auto
    queueing_lock: auto
    events: List["QueueEvent"]

    @strawberry_django.field
    def last_event_at(self, info) -> datetime:
        return (
            procrastinate.contrib.django.models.ProcrastinateEvent.objects.filter(
                job_id=self.id
            )
            .order_by("-at")
            .first()
            .at
        )

    @classmethod
    def get_queryset(cls, queryset, info, **kwargs):
        # Only list data sources that the user has access to
        user = get_current_user(info)
        my_external_data_sources = models.ExternalDataSource.objects.filter(
            organisation__members__user=user.id
        )
        return queryset.filter(
            args__external_data_source_id__in=[
                str(external_data_source.id)
                for external_data_source in my_external_data_sources
            ]
        )


@strawberry_django.type(procrastinate.contrib.django.models.ProcrastinateEvent)
class QueueEvent:
    id: auto
    job: QueueJob
    type: auto
    at: auto


@strawberry_django.type(models.User)
class User:
    email: auto
    user_properties: "UserProperties"


@strawberry_django.type(models.UserProperties)
class UserProperties:
    user: User
    full_name: auto


@strawberry_django.type(models.Organisation)
class Organisation:
    id: auto
    name: auto
    slug: auto
    members: List["Membership"]
    external_data_sources: List["ExternalDataSource"]

    @classmethod
    def get_queryset(cls, queryset, info, **kwargs):
        user = get_current_user(info)
        return queryset.filter(members__user=user)


# Membership
@strawberry_django.type(models.Membership)
class Membership:
    id: auto
    user: User
    organisation: Organisation
    role: auto

    @classmethod
    def get_queryset(cls, queryset, info, **kwargs):
        user = get_current_user(info)
        return queryset.filter(user=user.id)


# ExternalDataSource


@strawberry.type
class FieldDefinition:
    value: str = dict_key_field()
    label: Optional[str] = dict_key_field()
    description: Optional[str] = dict_key_field()


@strawberry_django.filter(models.ExternalDataSource)
class ExternalDataSourceFilter:
    data_type: auto
    geography_column_type: auto


@strawberry_django.type(models.ExternalDataSource, filters=ExternalDataSourceFilter)
class ExternalDataSource:
    id: auto
    name: auto
    data_type: auto
    description: auto
    created_at: auto
    last_update: auto
    organisation: Organisation
    geography_column: auto
    geography_column_type: auto
    update_mapping: Optional[List["AutoUpdateConfig"]]
    auto_update_enabled: auto
    auto_import_enabled: auto
    field_definitions: Optional[List[FieldDefinition]] = strawberry_django.field(
        resolver=lambda self: self.field_definitions()
    )

    @strawberry_django.field
    def remote_name(self, info) -> Optional[str]:
        try:
            return self.remote_name()
        except AttributeError or NotImplementedError:
            return None

    @strawberry_django.field
    def remote_url(self, info) -> Optional[str]:
        try:
            return self.remote_url()
        except AttributeError or NotImplementedError:
            return None

    jobs: List[QueueJob] = strawberry_django.field(
        resolver=lambda self: procrastinate.contrib.django.models.ProcrastinateJob.objects.filter(
            args__external_data_source_id=str(self.id)
        ),
        filters=QueueFilter,
        pagination=True,
    )

    @classmethod
    def get_queryset(cls, queryset, info, **kwargs):
        user = get_current_user(info)
        return queryset.filter(organisation__members__user=user.id)

    @strawberry_django.field
    def healthcheck(self: models.ExternalDataSource, info) -> bool:
        return self.healthcheck()

    @strawberry_django.field
    def connection_details(
        self: models.ExternalDataSource, info
    ) -> Union["AirtableSource"]:
        instance = self.get_real_instance()
        return instance

    @strawberry_django.field
    def auto_update_webhook_url(self: models.ExternalDataSource, info) -> str:
        return self.auto_update_webhook_url()

    @strawberry_django.field
    def webhook_healthcheck(self: models.ExternalDataSource, info) -> bool:
        return self.webhook_healthcheck()

    @strawberry_django.field
    def imported_data_count(self: models.ExternalDataSource, info: Info) -> int:
        return self.imported_data_count()

    @strawberry_django.field
    def geojson_point_features(
        self: models.ExternalDataSource, info: Info
    ) -> List[PointFeature]:
        data = self.get_import_data()
        return [
            PointFeature(
                id=str(generic_datum.data),
                geometry=PointGeometry(
                    coordinates=[generic_datum.point.x, generic_datum.point.y]
                ),
                properties=generic_datum.json,
            )
            for generic_datum in data
            if generic_datum.point is not None
        ]

    @strawberry_django.field
    def is_importing(self: models.ExternalDataSource, info: Info) -> bool:
        return (
            self.event_log_queryset()
            .filter(status="doing", task_name="hub.tasks.import_all")
            .exists()
        )


@strawberry.type
class AutoUpdateConfig:
    source: str = dict_key_field()
    source_path: str = dict_key_field()
    destination_column: str = dict_key_field()


@strawberry_django.type(models.AirtableSource)
class AirtableSource(ExternalDataSource):
    api_key: auto
    base_id: auto
    table_id: auto


@strawberry_django.type(models.Report)
class Report:
    id: auto
    organisation: auto
    name: auto
    slug: auto
    description: auto
    created_at: auto
    last_update: auto

    @classmethod
    def get_queryset(cls, queryset, info, **kwargs):
        user = get_current_user(info)
        return queryset.filter(organisation__members__user=user.id)


@strawberry.type
class MapLayer:
    name: str = dict_key_field()

    @strawberry_django.field
    def source(self, info: Info) -> ExternalDataSource:
        source_id = self.get(info.python_name, None)
        return models.ExternalDataSource.objects.get(id=source_id)


@strawberry_django.type(models.MapReport)
class MapReport(Report):
    layers: Optional[List[MapLayer]]
