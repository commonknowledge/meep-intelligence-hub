from django.http import HttpRequest

import posthog
import strawberry
from asgiref.sync import sync_to_async
from gqlauth.core.middlewares import get_user_or_error
from gqlauth.core.utils import app_settings
from graphql import ExecutionResult as GraphQLExecutionResult
from graphql import OperationType
from graphql.error import GraphQLError
from strawberry.extensions import SchemaExtension
from strawberry_django.auth.utils import get_current_user


class APIAnalyticsExtension(SchemaExtension):
    def on_operation(self, *args, **kwargs):
        yield
        try:
            request = self.execution_context.context.request
            user = request.user

            if user:
                payload = {
                    "context": "private_api",
                    "operation_name": self.execution_context.operation_name,
                    "operation_type": self.execution_context.operation_type,
                    "path": request.path,
                    "method": request.method,
                    "headers": dict(request.headers),
                    "query_params": dict(request.GET),
                    "ip": request.META.get("REMOTE_ADDR"),
                    "user_agent": request.META.get("HTTP_USER_AGENT"),
                    "referrer": request.META.get("HTTP_REFERER"),
                    "language": request.META.get("HTTP_ACCEPT_LANGUAGE"),
                }

                if not posthog.disabled:
                    posthog.identify(user.id, {"email": user.email})
                    posthog.capture(user.id, "API request", properties=payload)
        except Exception as e:
            pass
