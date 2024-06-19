import logging

from django.db.models.query import QuerySet
from django.http import HttpResponseForbidden, HttpResponseServerError
from django.urls import reverse
from django.views.generic import DetailView

from gqlauth.core.middlewares import UserOrError, get_user_or_error
from vectortiles import VectorLayer
from vectortiles.views import MVTView, TileJSONView
from wagtail.models import Site

from hub.cache_keys import site_tile_filter_dict
from hub.models import ExternalDataSource, GenericData, HubHomepage
from utils.cached_fn import cached_fn
from utils.url import get_hostname_from_url

logger = logging.getLogger(__name__)


class GenericDataVectorLayer(VectorLayer):
    model = GenericData
    geom_field = "point"

    min_zoom = 1

    id = "generic_data"
    vector_tile_layer_name = id

    tile_fields = ("id",)
    layer_fields = tile_fields
    vector_tile_fields = layer_fields

    external_data_source_id: str
    filter: dict = {}

    def __init__(self, *args, **kwargs):
        self.external_data_source_id = kwargs.pop("external_data_source_id", None)
        if self.external_data_source_id is None:
            raise ValueError("external_data_source is required")
        self.filter = kwargs.pop("filter", {})
        super().__init__(*args, **kwargs)

    def get_queryset(self) -> QuerySet:
        source: ExternalDataSource = ExternalDataSource.objects.get(
            id=self.external_data_source_id
        )
        source = source.get_real_instance()
        return source.get_import_data().filter(**self.filter)


class ExternalDataSourceTileView(MVTView, DetailView):
    model = ExternalDataSource
    layer_classes = [GenericDataVectorLayer]

    def get(self, request, *args, **kwargs):
        try:
            user_or_error: UserOrError = get_user_or_error(request)
            user = user_or_error.user if user_or_error.user else None
            permissions = ExternalDataSource.user_permissions(user, self.get_id())
            logger.info(
                f"Got user permissions for {self.get_id()}, user {user}: {permissions}"
            )
            if not permissions.get("can_display_points", False):
                return HttpResponseForbidden(
                    "You don't have permission to view location data for this data source."
                )
            return super().get(request, *args, **kwargs)
        except Exception as e:
            logger.warning(f"Could not view location data: {e}")
            logger.exception(e)
            return HttpResponseServerError(e)

    def get_id(self):
        return self.kwargs.get(self.pk_url_kwarg)

    def get_layer_class_kwargs(self, *args, **kwargs):
        external_data_source_id = self.get_id()
        return {
            "external_data_source_id": external_data_source_id,
            "filter": self.get_site_filter(
                get_hostname_from_url(self.request.headers.get("Referer")),
                external_data_source_id,
            ),
        }

    @cached_fn(
        key=lambda a, hostname, id: site_tile_filter_dict(hostname, id),
        timeout_seconds=100000,
        cache_type="default",
    )
    def get_site_filter(self, hostname: str, external_data_source_id: str):
        """
        Obey hub-level layer filtering logic.
        """
        site = Site.objects.filter(hostname=hostname).first()
        if site is not None:
            hub = site.root_page.specific
            if isinstance(hub, HubHomepage):
                layers = hub.get_layers()
                logger.debug("filter in layers", layers)
                if isinstance(layers, list):
                    for layer in layers:
                        if layer.get("source") == external_data_source_id:
                            return layer.get("filter", {})
        return {}


class ExternalDataSourcePointTileJSONView(TileJSONView, DetailView):
    model = ExternalDataSource
    layer_classes = [GenericDataVectorLayer]

    def get_name(self):
        return self.get_object().name

    def get_attribution(self):
        return self.get_object().organisation.name

    def get_description(self):
        return f"{self.get_name()} is a {self.get_object().crm_type} source."

    def setup(self, *args, **kwargs):
        super().setup(*args, **kwargs)

    def get_id(self):
        return self.kwargs.get(self.pk_url_kwarg)

    def get_object(self):
        return ExternalDataSource.objects.get(pk=self.get_id())

    def get_min_zoom(self, *args, **kwargs):
        return 1

    def get_max_zoom(self, *args, **kwargs):
        return 30

    def get_tile_url(self):
        id = self.get_id()
        """ Base MVTView Url used to generates urls in TileJSON in a.tiles.xxxx/{z}/{x}/{y} format """
        return str(
            reverse("external_data_source_point_tile", args=(id, 0, 0, 0))
        ).replace("/0/0/0", "/{z}/{x}/{y}")

    def get_layer_class_kwargs(self, *args, **kwargs):
        return {"external_data_source_id": self.get_id()}

    # def get_layers(self):
    #     return [GenericDataVectorLayer(external_data_source=self.get_object())]
