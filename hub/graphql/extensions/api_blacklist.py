from django.http import HttpRequest

import strawberry
from gqlauth.core.utils import app_settings
from strawberry.exceptions import StrawberryGraphQLError
from strawberry.extensions import SchemaExtension

from hub.models import APIToken, get_api_token


class APIBlacklistGuard(SchemaExtension):
    async def on_operation(self, *args, **kwargs):
        request = self.execution_context.context.request
        if token_str := app_settings.JWT_TOKEN_FINDER(request):
            try:
                signature = token_str.split(".")[2]
            except IndexError:
                raise StrawberryGraphQLError("Invalid auth token")
            try:
                db_token = get_api_token(signature)
                if db_token is not None:
                    if db_token.revoked:
                        raise StrawberryGraphQLError("Token has been revoked")
            except APIToken.DoesNotExist:
                # Not a public API query
                pass


def get_request_info(request: HttpRequest):
    return {
        # Request info
        "path": request.path,
        "method": request.method,
        "headers": dict(request.headers),
        "query_params": dict(request.GET),
        # Client info
        "ip": request.META.get("REMOTE_ADDR"),
        "user_agent": request.META.get("HTTP_USER_AGENT"),
        "referrer": request.META.get("HTTP_REFERER"),
        "language": request.META.get("HTTP_ACCEPT_LANGUAGE"),
    }
