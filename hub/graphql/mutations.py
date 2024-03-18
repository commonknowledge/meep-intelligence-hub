from typing import List, Optional

from django.utils.text import slugify

import strawberry
import strawberry_django
from strawberry import auto
from strawberry.field_extensions import InputMutationExtension
from strawberry.types.info import Info
from strawberry_django.auth.utils import get_current_user
from strawberry_django.permissions import IsAuthenticated

from hub import models


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


@strawberry.input
class MapLayerInput:
    name: str
    source: str


@strawberry_django.input(models.MapReport, partial=True)
class MapReportInput:
    id: auto
    organisation: auto
    name: auto
    slug: Optional[str]
    description: auto
    created_at: auto
    last_update: auto
    layers: Optional[List[MapLayerInput]]


@strawberry.mutation(extensions=[IsAuthenticated(), InputMutationExtension()])
async def create_organisation(
    info: Info, name: str, slug: Optional[str] = None, description: Optional[str] = None
) -> models.Membership:
    org = await models.Organisation.objects.acreate(
        name=name, slug=slug, description=description
    )
    user = get_current_user(info)
    membership = await models.Membership.objects.acreate(
        user=user, organisation=org, role="owner"
    )
    return membership


@strawberry_django.input(models.Organisation, partial=True)
class OrganisationInputPartial:
    id: auto
    name: str
    slug: Optional[str]
    description: Optional[str]


@strawberry.mutation(extensions=[IsAuthenticated()])
def enable_auto_update(external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    data_source.enable_auto_update()
    return data_source


@strawberry.mutation(extensions=[IsAuthenticated()])
def disable_auto_update(external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    data_source.disable_auto_update()
    return data_source


@strawberry.mutation(extensions=[IsAuthenticated()])
def trigger_update(external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    data_source.schedule_refresh_all()
    return data_source


@strawberry.mutation(extensions=[IsAuthenticated()])
def refresh_webhooks(external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    data_source.refresh_webhooks()
    return data_source


def create_with_computed_args(model, info, data, computed_args):
    args = {
        **strawberry_django.mutations.resolvers.parse_input(info, vars(data).copy()),
        **computed_args(info, data, model),
    }
    return strawberry_django.mutations.resolvers.create(info, model, args)


@strawberry_django.mutation(extensions=[IsAuthenticated()])
def create_airtable_source(
    info: Info, data: AirtableSourceInput
) -> models.ExternalDataSource:
    return create_with_computed_args(
        models.AirtableSource,
        info,
        data,
        computed_args=lambda info, data, model: {
            "organisation": get_or_create_organisation_for_source(info, data)
        },
    )


@strawberry_django.mutation(extensions=[IsAuthenticated()], handle_django_errors=True)
def create_map_report(info: Info, data: MapReportInput) -> models.MapReport:
    return create_with_computed_args(
        models.MapReport,
        info,
        data,
        computed_args=lambda info, data, model: {
            "organisation": get_or_create_organisation_for_source(info, data),
            "slug": data.slug or slugify(data.name),
        },
    )


def get_or_create_organisation_for_source(info: Info, data: any):
    if data.organisation:
        return data.organisation
    user = get_current_user(info)
    if (
        isinstance(data.organisation, strawberry.unset.UnsetType)
        or data.organisation is None
    ):
        if user.memberships.first() is not None:
            print("Assigning the user's default organisation")
            organisation = user.memberships.first().organisation
        else:
            print("Making an organisation for this user")
            organisation = models.Organisation.objects.create(
                name=f"{user.username}'s organisation", slug=f"{user.username}-org"
            )
            models.Membership.objects.create(
                user=user, organisation=organisation, role="owner"
            )
    return organisation


@strawberry_django.mutation(extensions=[IsAuthenticated()])
def import_all(external_data_source_id: str) -> models.ExternalDataSource:
    data_source = models.ExternalDataSource.objects.get(id=external_data_source_id)
    data_source.schedule_import_all()
    return data_source
