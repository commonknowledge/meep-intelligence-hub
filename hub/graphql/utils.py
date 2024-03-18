import strawberry
from strawberry.types.info import Info


def dict_key(root, info: Info) -> str:
    return root.get(info.python_name, None)


def dict_key_field():
    return strawberry.field(resolver=dict_key)
