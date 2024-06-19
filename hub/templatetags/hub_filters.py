import logging
import re
from urllib.parse import urlencode, urljoin

from django import template
from django.conf import settings
from django.contrib.auth import get_user_model
from django.template.defaultfilters import stringfilter
from django.utils.safestring import mark_safe

import utils as lih_utils

register = template.Library()
User = get_user_model()


logger = logging.getLogger(__name__)


@register.simple_tag(name="backend_url")
def backend_url(relative_url: str) -> str:
    return urljoin(settings.BASE_URL, relative_url)


@register.simple_tag(name="frontend_url")
def frontend_url(relative_url: str) -> str:
    return urljoin(settings.FRONTEND_BASE_URL, relative_url)


@register.filter(name="split")
def split(value, key):
    return value.split(key)


@register.filter(name="splitlines")
def splitlines(value):
    return value.splitlines()


@register.filter(name="highlight")
def highlight(text, search):
    try:
        rgx = re.compile(re.escape(search), re.IGNORECASE)
        html = rgx.sub(lambda m: f"<mark>{m.group()}</mark>", text)
        return mark_safe(html)
    except TypeError:
        # search is probably None
        return text


@register.filter
@stringfilter
def domain_human(value):
    return lih_utils.domain_human(value)


@register.filter
@stringfilter
def url_human(value):
    return lih_utils.url_human(value)


@register.filter
@stringfilter
def simplify_dataset_name(value):
    trimmed = re.sub(r"^Number of ", "", value)
    return trimmed[0].upper() + trimmed[1:]


@register.filter
@stringfilter
def prevent_widow(s, max=12):
    # Replace final space in string with &nbsp;
    # if length of final two words (plus a space)
    # is less than `max` value.
    bits = s.rsplit(" ", 2)
    if len(f"{bits[-2]} {bits[-1]}") < max:
        return mark_safe(f"{bits[-3]} {bits[-2]}&nbsp;{bits[-1]}")
    else:
        return s


@register.simple_tag
def urlencode_params(**kwargs):
    """
    Return encoded URL parameters
    """
    return urlencode(kwargs)


@register.simple_tag
def pending_account_requests(**kwargs):
    """
    Return number of account requests
    """
    try:
        return User.objects.filter(
            is_active=False,
            userproperties__email_confirmed=True,
            userproperties__account_confirmed=False,
        ).count()
    except Exception as e:
        logger.warning(f"Error getting pending account requests: {e}")
    return 0


@register.filter
@stringfilter
def html_format_dataset_name(value):
    pollutants = {
        "PM10": "PM<sub>10</sub>",
        "PM2.5": "PM<sub>2.5</sub>",
        "NO2": "NO<sub>2</sub>",
        "NOx": "NO<sub>X</sub>",
        "SO2": "SO<sub>2</sub>",
    }
    return pollutants.get(value, value)
