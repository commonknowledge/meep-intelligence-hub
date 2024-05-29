import json
import logging
from typing import Callable, Coroutine, Type

from django.db.models import ManyToOneRel
from django.db.models import Model as DjangoModel
from django.db.models.fields.related import RelatedField

import strawberry
import strawberry_django
from asgiref.sync import sync_to_async
from strawberry.types import Info
from strawberry_django.fields.field import StrawberryDjangoField
from strawberry_django_dataloaders import dataloaders, factories

from hub.graphql.utils import graphql_type_to_dict

logger = logging.getLogger(__name__)


class BasicFieldDataLoader(dataloaders.BaseDjangoModelDataLoader):
    field: str
    filters: dict = {}

    @classmethod
    def queryset(cls, keys: list[str]):
        if len(keys) == 0:
            return []
        return cls.model.objects.filter(
            **{f"{cls.field}__in": set(keys)}, **cls.filters
        )

    @classmethod
    @sync_to_async
    def load_fn(cls, keys: list[str]):
        results = cls.queryset(keys)
        results_dict = {}
        for result in results:
            key = getattr(result, cls.field)
            if key in results_dict:
                logger.warning(f"multiple dataloader results for key {key}")
            else:
                results_dict[key] = result

        return [results_dict.get(key, None) for key in keys]


class BasicFieldReturningListDataLoader(BasicFieldDataLoader):
    """
    As above, but returns a list of results for each key instead of a single item.
    """

    @classmethod
    @sync_to_async
    def load_fn(cls, keys: list[str]):
        results = cls.queryset(keys)
        return [
            [result for result in results if getattr(result, cls.field) == key]
            for key in keys
        ]


class FieldDataLoaderFactory(factories.BaseDjangoModelDataLoaderFactory):
    field: str

    loader_class = BasicFieldDataLoader

    @classmethod
    def get_loader_key(
        cls, model: Type["DjangoModel"], field: str, filters: dict = {}, **kwargs
    ):
        return model, field, json.dumps(filters)

    @classmethod
    def get_loader_class_kwargs(
        cls, model: Type["DjangoModel"], field: str, filters: dict = {}, **kwargs
    ):
        return {"model": model, "field": field, "filters": filters}

    @classmethod
    def as_resolver(
        cls, field: str, filters: dict = {}
    ) -> Callable[["DjangoModel", Info], Coroutine]:
        async def resolver(
            root: "DjangoModel", info: "Info"
        ):  # beware, first argument needs to be called 'root'
            field_data: "StrawberryDjangoField" = info._field
            return await cls.get_loader_class(field_data.django_model, field, filters)(
                context=info.context
            ).load(getattr(root, field))

        return resolver


class FieldReturningListDataLoaderFactory(FieldDataLoaderFactory):
    loader_class = BasicFieldReturningListDataLoader


class PKWithFiltersDataLoader(dataloaders.BasicPKDataLoader):
    filters: dict
    prefetch: list[str]

    @classmethod
    @sync_to_async
    def load_fn(cls, keys: list[str]) -> list[DjangoModel | None]:
        filter_dict = strawberry.asdict(cls.filters)
        # strip out any None or '' values from the filter_dict
        filter_dict = {k: v for k, v in filter_dict.items() if v}

        results_dict = (
            cls.model.objects.filter(pk__in=keys)
            .prefetch_related(*cls.prefetch)
            .filter(**filter_dict)
            .in_bulk()
        )
        if len(results_dict) == len(keys):
            return results_dict.values()
        # ensure instances are ordered in the same way as input 'keys'
        # id_to_instance: dict[str, "DjangoModel"] = {inst.pk: inst for inst in instances}
        return [results_dict.get(key, None) for key in keys]


# class BasicReverseFKDataLoader(BaseDjangoModelDataLoader):
#     """
#     Base loader for reversed FK relationship (e.g. get BlogPosts of a User).

#     EXAMPLE - load blog posts of account:
#         1. DATALOADER DEFINITION
#         class BlogPostsBasicReverseFKDataLoader(BasicReverseFKDataLoader):
#             model = BlogPost
#             reverse_path = 'user_id'

#         2. USAGE
#         @strawberry.django.type(models.User)
#         class UserType:
#             ...

#             @strawberry.field
#             async def blog_posts(self: "models.User", info: "Info") -> list["BlogPostType"]:
#                 return await BlogPostsBasicReverseFKDataLoader(context=info.context).load(self.pk)
#     """

#     reverse_path: str  # path to the 'parent' model from the reverse relationship

#     @classmethod
#     @sync_to_async
#     def load_fn(cls, keys: list[str]) -> list[list[DjangoModel]]:
#         instances: list["DjangoModel"] = list(cls.model.objects.filter(**{f"{cls.reverse_path}__in": keys}))
#         # ensure that instances are ordered the same way as input 'ids'
#         id_to_instances: dict[str, list["DjangoModel"]] = defaultdict(list)
#         for instance in instances:
#             id_to_instances[getattr(instance, cls.reverse_path)].append(instance)
#         return [id_to_instances.get(key, []) for key in keys]


class ReverseFKWithFiltersDataLoader(dataloaders.BasicReverseFKDataLoader):
    filters: dict
    prefetch: list[str]

    @classmethod
    @sync_to_async
    def load_fn(cls, keys: list[str]) -> list[list[DjangoModel]]:
        filter_dict = graphql_type_to_dict(cls.filters)
        results = cls.model.objects.prefetch_related(*cls.prefetch).filter(
            **{f"{cls.reverse_path}__in": keys}
        )
        if len(filter_dict.keys()) > 0:
            results = results.filter(**filter_dict)
        return [
            [result for result in results if getattr(result, cls.reverse_path) == key]
            for key in keys
        ]


class PKWithFiltersDataLoaderFactory(factories.BaseDjangoModelDataLoaderFactory):
    filters: dict = {}
    prefetch: list[str] = []

    loader_class = PKWithFiltersDataLoader

    @classmethod
    def get_loader_key(
        cls,
        model: Type["DjangoModel"],
        filters: dict = {},
        prefetch: list[str] = [],
        **kwargs,
    ):
        serialised_filter = json.dumps(
            filters if isinstance(filters, dict) else strawberry.asdict(filters),
            skipkeys=True,
            default=lambda o: "<not serializable>",
        )
        serialised_prefetch = json.dumps(prefetch, skipkeys=True)
        key = model, serialised_filter, serialised_prefetch
        # TypeError: Object of type UnsetType is not JSON serializable
        # either remove or replace UnsetType with None
        return key

    @classmethod
    def get_loader_class_kwargs(
        cls,
        model: Type["DjangoModel"],
        filters: dict = {},
        prefetch: list[str] = [],
        **kwargs,
    ):
        return {"model": model, "filters": filters, "prefetch": prefetch, **kwargs}

    @classmethod
    def as_resolver(
        cls, filters: dict = {}, prefetch: list[str] = []
    ) -> Callable[["DjangoModel", Info], Coroutine]:
        async def resolver(
            root: "DjangoModel", info: "Info"
        ):  # beware, first argument needs to be called 'root'
            field_data: "StrawberryDjangoField" = info._field
            relation: "RelatedField" = root._meta.get_field(
                field_name=field_data.django_name
            )
            print("AS RESOLVER", relation, root, field_data)
            pk = getattr(root, relation.attname)
            return await cls.get_loader_class(
                field_data.django_model, filters, prefetch
            )(context=info.context).load(pk)

        return resolver


class ReverseFKWithFiltersDataLoaderFactory(factories.BaseDjangoModelDataLoaderFactory):
    filters: dict = {}
    prefetch: list[str] = []

    loader_class = ReverseFKWithFiltersDataLoader

    @classmethod
    def get_loader_key(
        cls,
        model: Type["DjangoModel"],
        filters: dict = {},
        prefetch: list[str] = [],
        **kwargs,
    ):
        serialised_filter = json.dumps(
            filters if isinstance(filters, dict) else strawberry.asdict(filters),
            skipkeys=True,
            default=lambda o: "<not serializable>",
        )
        serialised_prefetch = json.dumps(prefetch, skipkeys=True)
        key = model, serialised_filter, serialised_prefetch
        return key

    @classmethod
    def get_loader_class_kwargs(
        cls,
        model: Type["DjangoModel"],
        filters: dict = {},
        prefetch: list[str] = [],
        **kwargs,
    ):
        return {
            "model": model,
            "reverse_path": kwargs["reverse_path"],
            "filters": filters,
            "prefetch": prefetch,
        }

    @classmethod
    def as_resolver(
        cls, filters: dict = {}, prefetch: list[str] = [], model=None
    ) -> Callable[["DjangoModel", Info], Coroutine]:
        async def resolver(
            root: "DjangoModel", info: "Info"
        ):  # beware, first argument needs to be called 'root'
            field_data: "StrawberryDjangoField" = info._field
            relation: "RelatedField" = root._meta.get_field(
                field_name=field_data.django_name
            )
            print("AS RESOLVER", relation, root, field_data)
            loader = cls.get_loader_class(
                model or field_data.django_model,
                filters,
                prefetch,
                reverse_path=relation.field.attname,
            )
            return await loader(context=info.context).load(root.pk)

        return resolver


def filterable_dataloader_resolver(
    filter_type, prefetch: list[str] = [], single: bool = False, field_name: str = None
):
    @strawberry_django.field
    async def resolver(root, info: Info, filters: filter_type = {}):
        field_data: "StrawberryDjangoField" = info._field
        attr = field_name or field_data.django_name
        # TODO: don't re-load prefetched data
        # but also apply filters to the prefetched data
        # if hasattr(root, attr):
        #     return getattr(root, attr, None)
        relation: "ManyToOneRel" = root._meta.get_field(field_name=attr)
        related_model = relation.related_model
        reverse_path = relation.field.attname
        loader = ReverseFKWithFiltersDataLoaderFactory.get_loader_class(
            related_model, filters=filters, prefetch=prefetch, reverse_path=reverse_path
        )
        data = await loader(context=info.context).load(root.id)
        return data[0] if single else data

    return resolver
