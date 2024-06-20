import sys

from django.apps import AppConfig
from django.db.utils import ProgrammingError


class HubConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "hub"

    def ready(self):
        # Makes sure all signal handlers are connected
        # pyright: ignore[reportUnusedImport]
        from hub import handlers # noqa: F401

        try:
            from hub.models import refresh_tokens_cache

            if "migrate" not in sys.argv:
                refresh_tokens_cache()

        except ProgrammingError:
            # This is expected when running migrations
            pass
