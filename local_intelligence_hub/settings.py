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
from gqlauth.settings_type import GqlAuthSettings
import os
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    EMAIL_BACKEND=(str, "django.core.mail.backends.console.EmailBackend"),
    BASE_URL=(str, False),
    FRONTEND_BASE_URL=(str, False),
    FRONTEND_SITE_TITLE=(str, False),
    SCHEDULED_UPDATE_SECONDS_DELAY=(int, 3),
    DEBUG=(bool, False),
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
    DJANGO_LOG_LEVEL=(str, "INFO"),
)
environ.Env.read_env(BASE_DIR / ".env")

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

BASE_URL = env("BASE_URL")
FRONTEND_BASE_URL = env("FRONTEND_BASE_URL")
FRONTEND_SITE_TITLE = env("FRONTEND_SITE_TITLE")
SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEBUG")
ALLOWED_HOSTS = env("ALLOWED_HOSTS")
CORS_ALLOWED_ORIGINS = env("CORS_ALLOWED_ORIGINS")
CACHE_FILE = env("CACHE_FILE")
MAPIT_URL = env("MAPIT_URL")
MAPIT_API_KEY = env("MAPIT_API_KEY")
GOOGLE_ANALYTICS = env("GOOGLE_ANALYTICS")
GOOGLE_SITE_VERIFICATION = env("GOOGLE_SITE_VERIFICATION")
TEST_AIRTABLE_MEMBERLIST_BASE_ID = env("TEST_AIRTABLE_MEMBERLIST_BASE_ID")
TEST_AIRTABLE_MEMBERLIST_TABLE_NAME = env("TEST_AIRTABLE_MEMBERLIST_TABLE_NAME")
TEST_AIRTABLE_MEMBERLIST_API_KEY = env("TEST_AIRTABLE_MEMBERLIST_API_KEY")
TEST_AIRTABLE_CUSTOMDATALAYER_BASE_ID = env("TEST_AIRTABLE_CUSTOMDATALAYER_BASE_ID")
TEST_AIRTABLE_CUSTOMDATALAYER_TABLE_NAME = env(
    "TEST_AIRTABLE_CUSTOMDATALAYER_TABLE_NAME"
)
TEST_AIRTABLE_CUSTOMDATALAYER_API_KEY = env("TEST_AIRTABLE_CUSTOMDATALAYER_API_KEY")

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
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "hub.middleware.async_whitenoise_middleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "hub.middleware.django_jwt_middleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "hub.middleware.record_last_seen_middleware",
]

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
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": env("DJANGO_LOG_LEVEL"),
        },
    },
}
# CK Section

# TODO: Decrease this when we go public
one_week = timedelta(days=7)
GQL_AUTH = GqlAuthSettings(
    EMAIL_TEMPLATE_VARIABLES={
        "frontend_base_url": FRONTEND_BASE_URL,
        "frontend_site_title": FRONTEND_SITE_TITLE,
    },
    JWT_EXPIRATION_DELTA=one_week,
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

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    integrations=[DjangoIntegration()],
    # Optionally, you can adjust the logging level
    traces_sample_rate=1.0,  # Adjust sample rate as needed
)
