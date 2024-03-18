from typing import List

import strawberry
import strawberry_django
from gqlauth.core.middlewares import JwtSchema
from gqlauth.user import arg_mutations as auth_mutations
from gqlauth.user.queries import UserQueries
from strawberry_django import mutations as django_mutations
from strawberry_django.optimizer import DjangoOptimizerExtension
from strawberry_django.permissions import IsAuthenticated

from hub import models
from hub.graphql import mutations as mutation_types
from hub.graphql.types import model_types


@strawberry.type
class Query(UserQueries):
    memberships: List[model_types.Membership] = strawberry_django.field(
        extensions=[IsAuthenticated()]
    )
    organisations: List[model_types.Organisation] = strawberry_django.field(
        extensions=[IsAuthenticated()]
    )

    external_data_source: model_types.ExternalDataSource = strawberry_django.field(
        extensions=[IsAuthenticated()]
    )
    external_data_sources: List[
        model_types.ExternalDataSource
    ] = strawberry_django.field(extensions=[IsAuthenticated()])
    airtable_source: model_types.AirtableSource = strawberry_django.field(
        extensions=[IsAuthenticated()]
    )
    airtable_sources: List[model_types.AirtableSource] = strawberry_django.field(
        extensions=[IsAuthenticated()]
    )
    job: model_types.QueueJob = strawberry_django.field(extensions=[IsAuthenticated()])
    jobs: List[model_types.QueueJob] = strawberry_django.field(
        extensions=[IsAuthenticated()]
    )
    reports: List[model_types.Report] = strawberry_django.field(
        extensions=[IsAuthenticated()]
    )
    map_report: model_types.MapReport = strawberry_django.field(
        extensions=[IsAuthenticated()]
    )
    map_reports: List[model_types.MapReport] = strawberry_django.field(
        extensions=[IsAuthenticated()]
    )

    @strawberry.field
    def test_airtable_source(
        self,
        info: strawberry.types.info.Info,
        api_key: str,
        base_id: str,
        table_id: str,
    ) -> model_types.AirtableSource:
        return models.AirtableSource(
            api_key=api_key, base_id=base_id, table_id=table_id
        )


@strawberry.type
class Mutation:
    token_auth = auth_mutations.ObtainJSONWebToken.field
    register = auth_mutations.Register.field
    verify_account = auth_mutations.VerifyAccount.field
    resend_activation_email = auth_mutations.ResendActivationEmail.field

    create_airtable_source: model_types.AirtableSource = (
        mutation_types.create_airtable_source
    )
    update_airtable_source: model_types.AirtableSource = django_mutations.update(
        mutation_types.AirtableSourceInput, extensions=[IsAuthenticated()]
    )
    update_external_data_source: model_types.ExternalDataSource = (
        django_mutations.update(
            mutation_types.ExternalDataSourceInput, extensions=[IsAuthenticated()]
        )
    )
    delete_airtable_source: model_types.AirtableSource = django_mutations.delete(
        mutation_types.IDObject, extensions=[IsAuthenticated()]
    )
    delete_external_data_source: model_types.ExternalDataSource = (
        django_mutations.delete(mutation_types.IDObject, extensions=[IsAuthenticated()])
    )

    enable_auto_update: model_types.ExternalDataSource = (
        mutation_types.enable_auto_update
    )
    disable_auto_update: model_types.ExternalDataSource = (
        mutation_types.disable_auto_update
    )
    trigger_update: model_types.ExternalDataSource = mutation_types.trigger_update
    refresh_webhooks: model_types.ExternalDataSource = mutation_types.refresh_webhooks

    create_organisation: model_types.Membership = mutation_types.create_organisation
    update_organisation: model_types.Organisation = django_mutations.update(
        mutation_types.OrganisationInputPartial, extensions=[IsAuthenticated()]
    )

    import_all: model_types.ExternalDataSource = mutation_types.import_all

    create_map_report: model_types.MapReport = mutation_types.create_map_report
    update_map_report: model_types.MapReport = django_mutations.update(
        mutation_types.MapReportInput, extensions=[IsAuthenticated()]
    )
    delete_map_report: model_types.MapReport = django_mutations.delete(
        mutation_types.IDObject, extensions=[IsAuthenticated()]
    )


schema = JwtSchema(
    query=Query,
    mutation=Mutation,
    extensions=[
        DjangoOptimizerExtension,  # not required, but highly recommended
    ],
)
