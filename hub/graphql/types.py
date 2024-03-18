from datetime import datetime
from typing import List, Optional, Union

import procrastinate.contrib.django.models
import strawberry
import strawberry_django
from strawberry import auto
from strawberry_django.auth.utils import get_current_user

from hub import models


@strawberry_django.type(models.Area)
class Area:
    id: auto
    mapit_id: auto
    gss: auto
    name: auto
    area_type: "AreaType"
    geometry: auto
    overlaps: List["Area"]


@strawberry_django.type(models.AreaType)
class AreaType:
    id: auto
    name: auto
    area_type: auto
    description: auto

    @strawberry_django.field
    def areas(self) -> List[Area]:
        return self.area_set.all()


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


@strawberry_django.type(models.ExternalDataSource)
class ExternalDataSource:
    id: auto
    name: auto
    description: auto
    created_at: auto
    last_update: auto
    organisation: Organisation
    update_configs: List["ExternalDataSourceUpdateConfig"]

    @classmethod
    def get_queryset(cls, queryset, info, **kwargs):
        user = get_current_user(info)
        return queryset.filter(organisation__members__user=user.id)

    @strawberry_django.field
    def healthcheck(self, info) -> bool:
        return self.healthcheck()

    @strawberry_django.field
    def connection_details(self, info) -> Union["AirtableSource"]:
        instance = self.get_real_instance()
        return instance


@strawberry_django.type(models.AirtableSource)
class AirtableSource(ExternalDataSource):
    api_key: auto
    base_id: auto
    table_id: auto


@strawberry.type
class UpdateConfigDict:
    @strawberry.field
    def source(self) -> str:
        return self["source"]

    @strawberry.field
    def source_path(self) -> str:
        return self["source_path"]

    @strawberry.field
    def destination_column(self) -> str:
        return self["destination_column"]


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
    config_id: Optional[str]

    def filter_config_id(self, queryset, info, value):
        return queryset.filter(args__config_id=value)


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
        my_configs = models.ExternalDataSourceUpdateConfig.objects.filter(
            external_data_source__organisation__members__user=user.id
        )
        return queryset.filter(
            args__config_id__in=[str(my_config.id) for my_config in my_configs]
        )


@strawberry_django.type(procrastinate.contrib.django.models.ProcrastinateEvent)
class QueueEvent:
    id: auto
    job: QueueJob
    type: auto
    at: auto


@strawberry_django.type(models.ExternalDataSourceUpdateConfig)
class ExternalDataSourceUpdateConfig:
    id: auto
    external_data_source: ExternalDataSource
    mapping: List[UpdateConfigDict]
    postcode_column: auto
    enabled: auto
    jobs: List[QueueJob] = strawberry_django.field(
        resolver=lambda self: procrastinate.contrib.django.models.ProcrastinateJob.objects.filter(
            args__config_id=str(self.id)
        ),
        filters=QueueFilter,
        pagination=True,
    )

    @strawberry_django.field
    def webhook_url(self, info) -> str:
        return self.external_data_source.webhook_url(config=self)

    @strawberry_django.field
    def webhook_healthcheck(self, info) -> bool:
        return self.external_data_source.webhook_healthcheck(config=self)

    @classmethod
    def get_queryset(cls, queryset, info, **kwargs):
        user = get_current_user(info)
        return queryset.filter(
            # Only list data sources that the user has access to
            external_data_source__organisation__members__user=user.id
        )
