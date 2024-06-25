from typing import Optional
import strawberry
import strawberry_django
from strawberry.types.info import Info

from utils.py import transform_dict_values_recursive


def attr_resolver(root, info: Info):
    return getattr(root, info.python_name, None)


def primed_attr_resolver(attrname):
    def _resolver(root):
        return getattr(root, attrname, None)

    return _resolver


def attr_field(arg: Optional[str] = None, **kwargs):
    if arg:
        return strawberry_django.field(resolver=primed_attr_resolver(arg), **kwargs)
    return strawberry_django.field(resolver=attr_resolver, **kwargs)


def fn_resolver(root, info: Info):
    return getattr(root, info.python_name, lambda: None)()


def primed_fn_resolver(fnname):
    def _resolver(root):
        fn = getattr(root, fnname, lambda: None)()
        return fn()

    return _resolver


def fn_field(arg: Optional[str] = None, **kwargs):
    if arg:
        return strawberry_django.field(resolver=primed_fn_resolver(arg), **kwargs)
    return strawberry_django.field(resolver=fn_resolver, **kwargs)


def dict_resolver(default=None):
    def _resolver(root, info: Info):
        return root.get(info.python_name, default)

    return _resolver


def dict_key_field(default=None, **kwargs):
    return strawberry_django.field(resolver=dict_resolver(default), **kwargs)


def graphql_type_to_dict(value, delete_null_keys=False):
    if not isinstance(value, dict):
        value = strawberry.asdict(value)
    return transform_dict_values_recursive(
        value,
        lambda x: x if (x is not strawberry.UNSET) else None,
        delete_null_keys=delete_null_keys,
    )
