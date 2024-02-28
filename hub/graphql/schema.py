from datetime import datetime, timedelta
from django.conf import settings
from gqlauth.core.middlewares import JwtSchema
from gqlauth.core.types_ import GQLAuthError, GQLAuthErrors
from gqlauth.core.utils import get_user
from gqlauth.user.queries import UserQueries
from gqlauth.user import arg_mutations as mutations
import strawberry
from strawberry.extensions import SchemaExtension
from strawberry.types import Info
import strawberry_django
from strawberry_django.optimizer import DjangoOptimizerExtension

from hub.graphql.types import Area, AreaType
from hub import models

@strawberry.type
class Query(UserQueries):
    # Create automatic resolvers for 'areas' and 'area_types'
    areas: list[Area] = strawberry_django.field()
    area_types: list[AreaType] = strawberry_django.field()

    @strawberry_django.field
    def public(self) -> list[Area]:
        return models.Area.objects.all()
    
    @strawberry_django.field
    def private(self, info: Info) -> list[Area]:
        user = get_user(info)

        if not user.is_authenticated:
            raise GQLAuthError(code=GQLAuthErrors.UNAUTHENTICATED)

        return models.Area.objects.all()


@strawberry.type
class Mutation:
    token_auth = mutations.ObtainJSONWebToken.field


class TimeoutExtension(SchemaExtension):
    def on_operation(self):
        """
        Called before and after a GraphQL operation (query / mutation) starts.
        Create an expiry time for the query.
        """
        self.expires_at = datetime.now() + timedelta(seconds=settings.GRAPHQL_TIMEOUT_SECONDS)
        yield None

    def resolve(self, *args, **kwargs):
        """
        Called before every field resolver.
        Check if the current time is after the expiry time, and abort the query if so.
        """
        if datetime.now() > self.expires_at:
            raise Exception("Request timed out")
        return super().resolve(*args, **kwargs)


schema = JwtSchema(
    query=Query,
    mutation=Mutation,
    extensions=[
        DjangoOptimizerExtension,  # not required, but highly recommended
        TimeoutExtension,
    ],
)
