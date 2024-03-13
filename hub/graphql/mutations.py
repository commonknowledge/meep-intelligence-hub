import strawberry
import strawberry_django
from strawberry import auto
from hub import models
from . import types
from typing import List, Optional
from strawberry.field_extensions import InputMutationExtension
from strawberry_django.permissions import IsAuthenticated
from strawberry_django.auth.utils import get_current_user
from strawberry.types.info import Info
from asgiref.sync import async_to_sync

@strawberry.input
class IDObject:
    id: str

@strawberry.input
class UpdateMappingItemInput:
    source: str
    source_path: str
    destination_column: str

@strawberry_django.input(models.ExternalDataSource, partial=True)
class ExternalDataSourceInput:
    id: auto
    name: auto
    data_type: auto
    description: auto
    organisation: auto
    geography_column: auto
    geography_column_type: auto
    auto_update_enabled: auto
    update_mapping: Optional[List[UpdateMappingItemInput]]
    auto_import_enabled: auto

@strawberry_django.input(models.AirtableSource, partial=True)
class AirtableSourceInput(ExternalDataSourceInput):
    api_key: auto
    base_id: auto
    table_id: auto
  
@strawberry.mutation(extensions=[IsAuthenticated(), InputMutationExtension()])
async def create_organisation(info: Info, name: str, slug: Optional[str] = None, description: Optional[str] = None) -> types.Membership:
    org = await models.Organisation.objects.acreate(name=name, slug=slug, description=description)
    user = get_current_user(info)
    membership = await models.Membership.objects.acreate(user=user, organisation=org, role="owner")
    return membership

@strawberry_django.input(models.Organisation, partial=True)
class OrganisationInputPartial:
    id: auto
    name: str
    slug: Optional[str]
    description: Optional[str]

@strawberry.mutation(extensions=[IsAuthenticated()])
def enable_auto_update (external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    data_source.enable_auto_update()
    return data_source

@strawberry.mutation(extensions=[IsAuthenticated()])
def disable_auto_update (external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    data_source.disable_auto_update()
    return data_source

@strawberry.mutation(extensions=[IsAuthenticated()])
def trigger_update(external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    # TODO: Return this to the queue
    print("Triggering update")
    async_to_sync(data_source.refresh_all)()
    # job_id = data_source.schedule_refresh_all()
    return data_source

@strawberry.mutation(extensions=[IsAuthenticated()])
def refresh_webhooks (external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    data_source.refresh_webhooks()
    return data_source

@strawberry.mutation(extensions=[IsAuthenticated()])
def create_airtable_source(info: Info, data: AirtableSourceInput) -> models.AirtableSource:
    # Override the default strawberry_django.create resolver to add a default organisation
    args = {
        **strawberry_django.mutations.resolvers.parse_input(info, vars(data).copy()),
        "organisation": get_or_create_organisation_for_source(info, data)
    }
    return strawberry_django.mutations.resolvers.create(
        info,
        models.AirtableSource,
        args
    )

def get_or_create_organisation_for_source(info: Info, data: any):
    if data.organisation:
        return data.organisation
    user = get_current_user(info)
    if isinstance(data.organisation, strawberry.unset.UnsetType) or data.organisation is None:
        if user.memberships.first() is not None:
            print("Assigning the user's default organisation")
            organisation = user.memberships.first().organisation
        else:
            print("Making an organisation for this user")
            organisation = models.Organisation.objects.create(
                name=f"{user.username}'s organisation",
                slug=f'{user.username}-org'
            )
            models.Membership.objects.create(
                user=user,
                organisation=organisation,
                role="owner"
            )
    return organisation

@strawberry.mutation(extensions=[IsAuthenticated()])
def import_all(external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    data_source.import_all()
    return data_source