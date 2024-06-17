"""
Django settings for local_intelligence_hub project.

Generated by 'django-admin startproject' using Django 4.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from datetime import timedelta
from pathlib import Path

import environ
import posthog
from gqlauth.settings_type import GqlAuthSettings

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    MINIO_STORAGE_ENDPOINT=(str, False),
    MINIO_STORAGE_ACCESS_KEY=(str, ""),
    MINIO_STORAGE_SECRET_KEY=(str, ""),
    MINIO_STORAGE_MEDIA_BUCKET_NAME=(str, "media"),
    MINIO_STORAGE_STATIC_BUCKET_NAME=(str, "static"),
    MINIO_STORAGE_AUTO_CREATE_MEDIA_BUCKET=(bool, True),
    MINIO_STORAGE_AUTO_CREATE_STATIC_BUCKET=(bool, True),
    EMAIL_BACKEND=(str, "django.core.mail.backends.console.EmailBackend"),
    BASE_URL=(str, False),
    FRONTEND_BASE_URL=(str, False),
    FRONTEND_SITE_TITLE=(str, False),
    SCHEDULED_UPDATE_SECONDS_DELAY=(int, 3),
    DEBUG=(bool, False),
    HIDE_DEBUG_TOOLBAR=(bool, True),
    LOG_QUERIES=(bool, False),
    ALLOWED_HOSTS=(list, []),
    CORS_ALLOWED_ORIGINS=(list, ["http://localhost:3000"]),
    GOOGLE_ANALYTICS=(str, ""),
    GOOGLE_SITE_VERIFICATION=(str, ""),
    TEST_AIRTABLE_MEMBERLIST_BASE_ID=(str, ""),
    TEST_AIRTABLE_MEMBERLIST_TABLE_NAME=(str, ""),
    TEST_AIRTABLE_MEMBERLIST_API_KEY=(str, ""),
    TEST_AIRTABLE_CUSTOMDATALAYER_BASE_ID=(str, ""),
    TEST_AIRTABLE_CUSTOMDATALAYER_TABLE_NAME=(str, ""),
    TEST_AIRTABLE_CUSTOMDATALAYER_API_KEY=(str, ""),
    TEST_MAILCHIMP_MEMBERLIST_API_KEY=(str, ""),
    TEST_MAILCHIMP_MEMBERLIST_AUDIENCE_ID=(str, ""),
    TEST_ACTIONNETWORK_MEMBERLIST_API_KEY=(str, ""),
    TEST_TICKET_TAILOR_API_KEY=(str, ""),
    DJANGO_LOG_LEVEL=(str, "INFO"),
    DJANGO_HUB_LOG_LEVEL=(str, None),
    POSTHOG_API_KEY=(str, False),
    POSTHOG_HOST=(str, False),
    ENVIRONMENT=(str, "development"),
    SENTRY_DSN=(str, False),
    SENTRY_TRACE_SAMPLE_RATE=(float, 1.0),
    CRYPTOGRAPHY_KEY=(str, ""),
    CRYPTOGRAPHY_SALT=(str, ""),
    ENCRYPTION_SECRET_KEY=(str, ""),
    ELECTORAL_COMMISSION_API_KEY=(str, ""),
    MAILCHIMP_MYSOC_KEY=(str, ""),
    MAILCHIMP_MYSOC_SERVER_PREFIX=(str, ""),
    MAILCHIMP_MYSOC_LIST_ID=(str, ""),
    MAILCHIMP_MYSOC_DATA_UPDATE_TAG=(str, ""),
    MAILCHIMP_MYSOC_CLIMATE_INTEREST=(str, ""),
    MAILCHIMP_TCC_KEY=(str, ""),
    MAILCHIMP_TCC_SERVER_PREFIX=(str, ""),
    MAILCHIMP_TCC_LIST_ID=(str, ""),
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=(str, ""),
)

environ.Env.read_env(BASE_DIR / ".env")

# Should be alphanumeric
CRYPTOGRAPHY_KEY = env("CRYPTOGRAPHY_KEY")
CRYPTOGRAPHY_SALT = env("CRYPTOGRAPHY_SALT")
ENCRYPTION_SECRET_KEY = env("ENCRYPTION_SECRET_KEY")

if CRYPTOGRAPHY_KEY is None:
    raise ValueError("CRYPTOGRAPHY_KEY must be set")
if CRYPTOGRAPHY_SALT is None:
    raise ValueError("CRYPTOGRAPHY_SALT must be set")
if ENCRYPTION_SECRET_KEY is None:
    raise ValueError("ENCRYPTION_SECRET_KEY must be set")

MAPBOX_ACCESS_TOKEN = env("MAPBOX_ACCESS_TOKEN")
GOOGLE_MAPS_API_KEY = env("GOOGLE_MAPS_API_KEY")
ELECTORAL_COMMISSION_API_KEY = env("ELECTORAL_COMMISSION_API_KEY")
BASE_URL = env("BASE_URL")
FRONTEND_BASE_URL = env("FRONTEND_BASE_URL")
FRONTEND_SITE_TITLE = env("FRONTEND_SITE_TITLE")
SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEBUG")
EMAIL_BACKEND = env("EMAIL_BACKEND")
HIDE_DEBUG_TOOLBAR = env("HIDE_DEBUG_TOOLBAR")
LOG_QUERIES = env("LOG_QUERIES")
ALLOWED_HOSTS = env("ALLOWED_HOSTS")
CORS_ALLOWED_ORIGINS = env("CORS_ALLOWED_ORIGINS")
CACHE_FILE = env("CACHE_FILE")
MAPIT_URL = env("MAPIT_URL")
MAPIT_API_KEY = env("MAPIT_API_KEY")
GOOGLE_ANALYTICS = env("GOOGLE_ANALYTICS")
GOOGLE_SITE_VERIFICATION = env("GOOGLE_SITE_VERIFICATION")
TEST_AIRTABLE_MEMBERLIST_BASE_ID = env("TEST_AIRTABLE_MEMBERLIST_BASE_ID")
TEST_AIRTABLE_MEMBERLIST_TABLE_NAME = env("TEST_AIRTABLE_MEMBERLIST_TABLE_NAME")
TEST_MAILCHIMP_MEMBERLIST_API_KEY = env("TEST_MAILCHIMP_MEMBERLIST_API_KEY")
TEST_MAILCHIMP_MEMBERLIST_AUDIENCE_ID = env("TEST_MAILCHIMP_MEMBERLIST_AUDIENCE_ID")
TEST_ACTIONNETWORK_MEMBERLIST_API_KEY = env("TEST_ACTIONNETWORK_MEMBERLIST_API_KEY")
TEST_TICKET_TAILOR_API_KEY = env("TEST_TICKET_TAILOR_API_KEY")
TEST_AIRTABLE_MEMBERLIST_API_KEY = env("TEST_AIRTABLE_MEMBERLIST_API_KEY")
TEST_AIRTABLE_CUSTOMDATALAYER_BASE_ID = env("TEST_AIRTABLE_CUSTOMDATALAYER_BASE_ID")
TEST_AIRTABLE_CUSTOMDATALAYER_TABLE_NAME = env(
    "TEST_AIRTABLE_CUSTOMDATALAYER_TABLE_NAME"
)
TEST_AIRTABLE_CUSTOMDATALAYER_API_KEY = env("TEST_AIRTABLE_CUSTOMDATALAYER_API_KEY")
DJANGO_LOG_LEVEL = env("DJANGO_LOG_LEVEL")
DJANGO_HUB_LOG_LEVEL = env("DJANGO_HUB_LOG_LEVEL")
DJANGO_HUB_LOG_LEVEL = (
    DJANGO_HUB_LOG_LEVEL if DJANGO_HUB_LOG_LEVEL is not None else DJANGO_LOG_LEVEL
)

# mailing list signup config
MAILCHIMP_MYSOC_KEY = env("MAILCHIMP_MYSOC_KEY")
MAILCHIMP_MYSOC_SERVER_PREFIX = env("MAILCHIMP_MYSOC_SERVER_PREFIX")
MAILCHIMP_MYSOC_LIST_ID = env("MAILCHIMP_MYSOC_LIST_ID")
MAILCHIMP_MYSOC_DATA_UPDATE_TAG = env("MAILCHIMP_MYSOC_DATA_UPDATE_TAG")
MAILCHIMP_MYSOC_CLIMATE_INTEREST = env("MAILCHIMP_MYSOC_CLIMATE_INTEREST")
MAILCHIMP_TCC_KEY = env("MAILCHIMP_TCC_KEY")
MAILCHIMP_TCC_SERVER_PREFIX = env("MAILCHIMP_TCC_SERVER_PREFIX")
MAILCHIMP_TCC_LIST_ID = env("MAILCHIMP_TCC_LIST_ID")

# make sure CSRF checking still works behind load balancers
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

if env.str("BUGS_EMAIL", None):  # pragma: no cover
    SERVER_EMAIL = env("BUGS_EMAIL")
    ADMINS = (("mySociety bugs", env("BUGS_EMAIL")),)

NON_LOGIN_URLS = (
    "/status/",
    "/accounts/login/",
    "/accounts/logout/",
    "/accounts/password_reset/",
    "/signup/",
    "/confirmation_sent/",
    "/bad_token/",
    "/activate/",
    "/privacy/",
    "/terms/",
    "/about/",
    "/contact/",
    "/",
)

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "polymorphic",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.humanize",
    "django.contrib.sitemaps",
    "compressor",
    "django_bootstrap5",
    "django_jsonform",
    "gqlauth",
    "hub",
    "corsheaders",
    "procrastinate.contrib.django",
    "strawberry_django",
    "django_cryptography",
    "wagtail.contrib.forms",
    "wagtail.contrib.redirects",
    "wagtail.embeds",
    "wagtail.sites",
    "wagtail.users",
    "wagtail.snippets",
    "wagtail.documents",
    "wagtail.images",
    "wagtail.search",
    "wagtail.admin",
    "wagtail",
    "modelcluster",
    "taggit",
    "wagtail_json_widget",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "hub.middleware.django_jwt_middleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "hub.middleware.record_last_seen_middleware",
    "wagtail.contrib.redirects.middleware.RedirectMiddleware",
]

if not DEBUG:
    # Apparently this speeds up django hot reload
    # https://stackoverflow.com/a/49396824/1053937
    MIDDLEWARE.insert(1, "hub.middleware.async_whitenoise_middleware")

ROOT_URLCONF = "local_intelligence_hub.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.template.context_processors.media",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "hub.context_processors.analytics",
            ],
        },
    },
]

WSGI_APPLICATION = "local_intelligence_hub.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {"ENGINE": "django.contrib.gis.db.backends.postgis", **env.db()}
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# TODO: Do we want inactive users to be able to log in? If not, change to backends.ModelBackend
# See https://docs.djangoproject.com/en/5.0/ref/contrib/auth/#fields for more details
AUTHENTICATION_BACKENDS = ["django.contrib.auth.backends.AllowAllUsersModelBackend"]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


MEDIA_ROOT = BASE_DIR / ".media"
MEDIA_URL = "/media/"

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"

STATIC_ROOT = BASE_DIR / ".static"

STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
    "compressor.finders.CompressorFinder",
)

STATICFILES_DIRS = [
    BASE_DIR / "build",
    BASE_DIR / "static",
    ("bootstrap", BASE_DIR / "vendor" / "bootstrap" / "scss"),
    ("bootstrap", BASE_DIR / "vendor" / "bootstrap" / "js"),
    ("chartjs", BASE_DIR / "vendor" / "chartjs" / "js"),
    ("jquery", BASE_DIR / "vendor" / "jquery" / "js"),
    ("leaflet", BASE_DIR / "vendor" / "leaflet" / "js"),
    ("papaparse", BASE_DIR / "vendor" / "papaparse" / "js"),
    ("popper", BASE_DIR / "vendor" / "popper" / "js"),
    ("vue", BASE_DIR / "vendor" / "vue" / "js"),
]


COMPRESS_PRECOMPILERS = (("text/x-scss", "django_libsass.SassCompiler"),)
COMPRESS_CSS_HASHING_METHOD = "content"


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# django-bootstrap5 settings
# https://django-bootstrap5.readthedocs.io/en/latest/settings.html
BOOTSTRAP5 = {
    "set_placeholder": False,
    "server_side_validation": True,
    "field_renderers": {
        "default": "hub.renderers.CustomFieldRenderer",
    },
}

# Sending messages
EMAIL_HOST = env.str("EMAIL_HOST", "localhost")
EMAIL_PORT = env.str("EMAIL_PORT", 1025)
EMAIL_HOST_USER = env.str("EMAIL_HOST_USER", False)
EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD", False)
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", False)
DEFAULT_FROM_EMAIL = env.str("DEFAULT_FROM_EMAIL", "webmaster@localhost")

POSTCODES_IO_URL = "https://postcodes.commonknowledge.coop"
POSTCODES_IO_BATCH_MAXIMUM = 100

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "common": {
            "format": "{levelname} {asctime} {name}.{funcName}:{lineno} # {message}",
            "style": "{",
            "validate": True,
        },
        "truncated": {
            "format": "{levelname} {asctime} {name}.{funcName}:{lineno} # {message:.240}",
            "style": "{",
            "validate": True,
        },
    },
    "handlers": {
        "console": {"class": "logging.StreamHandler", "formatter": "common"},
        "truncated": {
            "class": "logging.StreamHandler",
            "formatter": "truncated",
        },
    },
    "loggers": {
        "procrastinate": {
            "handlers": ["truncated"],
            "level": "DEBUG",
        },
        # Silence endless waiting for job log
        "procrastinate.worker": {
            "handlers": ["truncated"],
            "level": "INFO",
            "propagate": False,
        },
        "django": {
            "handlers": ["console"],
            "level": DJANGO_LOG_LEVEL,
        },
        "hub": {
            "handlers": ["console"],
            "level": DJANGO_HUB_LOG_LEVEL,
        },
        "hub.parsons": {
            "handlers": ["truncated"],
            "level": DJANGO_HUB_LOG_LEVEL,
            "propagate": False,
        },
    },
}
if DEBUG:
    if LOG_QUERIES:
        LOGGING["loggers"]["django.db.backends"] = {
            "handlers": ["console"],
            "level": "DEBUG",
        }

    if HIDE_DEBUG_TOOLBAR is False:
        import socket

        hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
        INTERNAL_IPS = [ip[:-1] + "1" for ip in ips] + ["127.0.0.1", "10.0.2.2"]

        # debug toolbar has to come after django_hosts middleware
        MIDDLEWARE.insert(
            1, "strawberry_django.middlewares.debug_toolbar.DebugToolbarMiddleware"
        )

        INSTALLED_APPS += ("debug_toolbar",)

# CK Section

IMPORT_UPDATE_ALL_BATCH_SIZE = 500
IMPORT_UPDATE_MANY_RETRY_COUNT = 3


def jwt_handler(token):
    from hub.graphql.types.public_queries import decode_jwt

    return decode_jwt(token)


# TODO: Decrease this when we go public
one_week = timedelta(days=7)
GQL_AUTH = GqlAuthSettings(
    EMAIL_TEMPLATE_VARIABLES={
        "frontend_base_url": FRONTEND_BASE_URL,
        "frontend_site_title": FRONTEND_SITE_TITLE,
    },
    JWT_EXPIRATION_DELTA=one_week,
    JWT_DECODE_HANDLER=jwt_handler,
    LOGIN_REQUIRE_CAPTCHA=False,
    REGISTER_REQUIRE_CAPTCHA=False,
    ALLOW_LOGIN_NOT_VERIFIED=True,
)
STRAWBERRY_DJANGO = {
    "TYPE_DESCRIPTION_FROM_MODEL_DOCSTRING": True,
    "FIELD_DESCRIPTION_FROM_HELP_TEXT": True,
    "MAP_AUTO_ID_AS_GLOBAL_ID": False,
}

SCHEDULED_UPDATE_SECONDS_DELAY = env("SCHEDULED_UPDATE_SECONDS_DELAY")
SENTRY_TRACE_SAMPLE_RATE = env("SENTRY_TRACE_SAMPLE_RATE")

environment = env("ENVIRONMENT")

posthog.disabled = True

# Configure Sentry and HSTS headers only if in production
if environment == "production":
    SECURE_HSTS_SECONDS = 600
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    if env("SENTRY_DSN") is not False:
        import sentry_sdk
        from sentry_sdk.integrations.django import DjangoIntegration
        from sentry_sdk.integrations.strawberry import StrawberryIntegration

        sentry_sdk.init(
            dsn=env("SENTRY_DSN"),
            environment=environment,
            integrations=[
                DjangoIntegration(),
                StrawberryIntegration(async_execution=True),
            ],
            # Optionally, you can adjust the logging level
            traces_sample_rate=1.0,  # Adjust sample rate as needed
        )

    if env("POSTHOG_API_KEY") is not False and env("POSTHOG_HOST") is not False:
        posthog.disabled = False
        posthog.project_api_key = env("POSTHOG_API_KEY")
        posthog.host = env("POSTHOG_HOST")


MINIO_STORAGE_ENDPOINT = env("MINIO_STORAGE_ENDPOINT")
if MINIO_STORAGE_ENDPOINT is not False:
    INSTALLED_APPS += ["minio_storage"]
    DEFAULT_FILE_STORAGE = "minio_storage.storage.MinioMediaStorage"
    # STATICFILES_STORAGE = "minio_storage.storage.MinioStaticStorage"
    MINIO_STORAGE_ACCESS_KEY = env("MINIO_STORAGE_ACCESS_KEY")
    MINIO_STORAGE_SECRET_KEY = env("MINIO_STORAGE_SECRET_KEY")
    MINIO_STORAGE_MEDIA_BUCKET_NAME = env("MINIO_STORAGE_MEDIA_BUCKET_NAME")
    # MINIO_STORAGE_STATIC_BUCKET_NAME = env("MINIO_STORAGE_STATIC_BUCKET_NAME")
    MINIO_STORAGE_AUTO_CREATE_MEDIA_BUCKET = env(
        "MINIO_STORAGE_AUTO_CREATE_MEDIA_BUCKET"
    )
    # MINIO_STORAGE_AUTO_CREATE_STATIC_BUCKET = env("MINIO_STORAGE_AUTO_CREATE_STATIC_BUCKET")

CACHES = {
    "default": {
        # TODO: Set up Redis for production
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "unique-snowflake",
    },
    # database cache for requests
    "db": {
        "BACKEND": "django.core.cache.backends.db.DatabaseCache",
        "LOCATION": "cache_table",
        # 1 week
        "TIMEOUT": 60 * 60 * 24 * 7,
    },
}

WAGTAIL_SITE_NAME = "Mapped hub page editor"
WAGTAILADMIN_BASE_URL = BASE_URL
WAGTAILDOCS_EXTENSIONS = []
WAGTAILIMAGES_IMAGE_MODEL = "hub.HubImage"

PARSONS_LIMITED_DEPENDENCIES = True
