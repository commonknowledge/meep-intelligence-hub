from typing import List, Optional

import strawberry
import strawberry_django
from strawberry import auto
from strawberry.field_extensions import InputMutationExtension
from strawberry.types.info import Info
from strawberry_django.auth.utils import get_current_user
from strawberry_django.permissions import IsAuthenticated

from hub import models

from . import types


@strawberry.input
class IDObject:
    id: str


@strawberry_django.input(models.ExternalDataSource, partial=True)
class ExternalDataSourceInput:
    id: auto
    name: auto
    description: auto
    organisation: auto


@strawberry_django.input(models.AirtableSource)
class AirtableSourceInput(ExternalDataSourceInput):
    id: Optional[strawberry.scalars.ID]
    api_key: auto
    base_id: auto
    table_id: auto
    organisation: Optional[str]


@strawberry.input
class UpdateConfigDictInput:
    source: str
    source_path: str
    destination_column: str


@strawberry_django.input(models.ExternalDataSourceUpdateConfig, partial=True)
class ExternalDataSourceUpdateConfigInput:
    id: auto
    external_data_source: types.ExternalDataSource
    postcode_column: auto
    enabled: auto
    mapping: List[UpdateConfigDictInput]


@strawberry.mutation(extensions=[IsAuthenticated(), InputMutationExtension()])
async def create_organisation(
    info: Info, name: str, slug: Optional[str] = None, description: Optional[str] = None
) -> types.Membership:
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
def enable_update_config(config_id: str) -> models.ExternalDataSourceUpdateConfig:
    config = models.ExternalDataSourceUpdateConfig.objects.get(id=config_id)
    config.enable()
    return config


@strawberry.mutation(extensions=[IsAuthenticated()])
def disable_update_config(config_id: str) -> models.ExternalDataSourceUpdateConfig:
    config = models.ExternalDataSourceUpdateConfig.objects.get(id=config_id)
    config.disable()
    return config


@strawberry.mutation(extensions=[IsAuthenticated()])
def update_all(config_id: str) -> models.ExternalDataSourceUpdateConfig:
    config = models.ExternalDataSourceUpdateConfig.objects.get(id=config_id)
    config.schedule_update_all()
    return config


@strawberry.mutation(extensions=[IsAuthenticated()])
def refresh_webhook(config_id: str) -> models.ExternalDataSourceUpdateConfig:
    config = models.ExternalDataSourceUpdateConfig.objects.get(id=config_id)
    if config.external_data_source.automated_webhooks:
        config.refresh_webhook()
    return config


@strawberry.mutation(extensions=[IsAuthenticated()])
def create_airtable_source(
    info: Info, data: AirtableSourceInput
) -> models.AirtableSource:
    user = get_current_user(info)
    organisation = data.organisation
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

    return models.AirtableSource.objects.create(
        api_key=data.api_key,
        base_id=data.base_id,
        table_id=data.table_id,
        organisation=organisation,
        name=data.name,
        description=data.description,
    )
