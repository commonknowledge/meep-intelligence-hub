import strawberry
import strawberry_django
from strawberry_django.auth.utils import get_current_user
from strawberry import auto
from typing import List, Optional, Union
from hub import models
from datetime import datetime
import procrastinate.contrib.django.models
from .utils import key_resolver

@strawberry_django.filters.filter(procrastinate.contrib.django.models.ProcrastinateJob, lookups=True)
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
    pagination=True)
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
    events: List['QueueEvent']

    @strawberry_django.field
    def last_event_at(self, info) -> datetime:
        return procrastinate.contrib.django.models.ProcrastinateEvent.objects.filter(job_id=self.id).order_by("-at").first().at

    @classmethod
    def get_queryset(cls, queryset, info, **kwargs):
        # Only list data sources that the user has access to
        user = get_current_user(info)
        my_external_data_sources = models.ExternalDataSource.objects.filter(
            organisation__members__user=user.id
        )
        return queryset.filter(
            args__external_data_source_id__in=[str(external_data_source.id) for external_data_source in my_external_data_sources]
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
    user_properties: 'UserProperties'

@strawberry_django.type(models.UserProperties)
class UserProperties:
    user: User
    full_name: auto

@strawberry_django.type(models.Organisation)
class Organisation:
    id: auto
    name: auto
    slug: auto
    members: List['Membership']
    external_data_sources: List['ExternalDataSource']

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
    value: str = key_resolver('value')
    label: Optional[str] = key_resolver('label')
    description: Optional[str] = key_resolver('description')
    
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
    update_mapping: Optional[List['AutoUpdateConfig']]
    auto_update_enabled: auto
    auto_import_enabled: auto
    field_definitions: Optional[List[FieldDefinition]] = strawberry_django.field(
        resolver=lambda self: self.field_definitions()
    )

    jobs: List[QueueJob] = strawberry_django.field(
        resolver=lambda self: procrastinate.contrib.django.models.ProcrastinateJob.objects.filter(
            args__external_data_source_id=str(self.id)
        ),
        filters=QueueFilter,
        pagination=True
    )

    @classmethod
    def get_queryset(cls, queryset, info, **kwargs):
        user = get_current_user(info)
        return queryset.filter(
            organisation__members__user=user.id
        )

    @strawberry_django.field
    def healthcheck(self, info) -> bool:
        return self.healthcheck()

    @strawberry_django.field
    def connection_details(self, info) -> Union['AirtableSource']:
        instance = self.get_real_instance()
        return instance

    @strawberry_django.field
    def auto_update_webhook_url(self, info) -> str:
        return self.auto_update_webhook_url()
    
    @strawberry_django.field
    def webhook_healthcheck(self, info) -> bool:
        return self.webhook_healthcheck()
  
@strawberry.type
class AutoUpdateConfig:
    @strawberry.field
    def source(self) -> str:
        return self['source']
    
    @strawberry.field
    def source_path(self) -> str:
        return self['source_path']
    
    @strawberry.field
    def destination_column(self) -> str:
        return self['destination_column']

@strawberry_django.type(models.AirtableSource)
class AirtableSource(ExternalDataSource):
    api_key: auto
    base_id: auto
    table_id: auto