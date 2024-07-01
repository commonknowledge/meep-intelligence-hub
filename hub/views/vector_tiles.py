import logging

from django.core.exceptions import PermissionDenied
from django.db.models.query import QuerySet
from django.urls import reverse
from django.views.generic import DetailView

from gqlauth.core.middlewares import UserOrError, get_user_or_error
from vectortiles import VectorLayer
from vectortiles.views import MVTView, TileJSONView
from wagtail.models import Site

from hub.models import ExternalDataSource, GenericData, HubHomepage, MapLayerGroup, MapLayer

logger = logging.getLogger(__name__)


class GenericDataVectorLayer(VectorLayer):
    model = GenericData
    geom_field = "point"

    min_zoom = 1

    id = "generic_data"
    vector_tile_layer_name = id
    external_data_source_id: str
    filter: dict = {}

    def __init__(self, *args, **kwargs):
        self.external_data_source_id = kwargs.pop("external_data_source_id", None)
        if self.external_data_source_id is None:
            raise ValueError("external_data_source is required")
        self.filter = kwargs.pop("filter", {})
        self.permissions = kwargs.pop("permissions", {})
        self.map_layer_group_id = kwargs.pop("map_layer_group_id", None)
        super().__init__(*args, **kwargs)

    def get_queryset(self) -> QuerySet:
        source: ExternalDataSource = ExternalDataSource.objects.get(
            id=self.external_data_source_id
        )
        source = source.get_real_instance()
        return source.get_import_data().filter(**self.filter)

    def get_tile_fields(self):
        default = (
            "id",
            "start_time__ispast",
            "start_time__isfuture",
        )
        if self.permissions.get("can_display_details", False):
            default += ("json",)
        return default


class ExternalDataSourceTileView(MVTView, DetailView):
    model = ExternalDataSource
    layer_classes = [GenericDataVectorLayer]

    def get_id(self):
        return self.kwargs.get(self.pk_url_kwarg)

    def get_hostname(self):
        return self.kwargs.get("hostname", None)

    def get_map_layer_group_id(self):
        return self.kwargs.get("map_layer_group_id", None)

    def get_layer_class_kwargs(self, *args, **kwargs):
        external_data_source_id = self.get_id()
        user_or_error: UserOrError = get_user_or_error(self.request)
        user = user_or_error.user if user_or_error.user else None
        permissions = ExternalDataSource.user_permissions(user, self.get_id())
        if not permissions.get("can_display_points", False):
            raise PermissionDenied(
                "You don't have permission to view location data for this data source."
            )
        hostname = self.get_hostname()
        map_layer_group_id = self.get_map_layer_group_id()
        return {
            "external_data_source_id": external_data_source_id,
            "map_layer_group_id": map_layer_group_id,
            "filter": (
                self.get_layer_filter(hostname, map_layer_group_id, external_data_source_id)
                if hostname
                else {}
            ),
            "permissions": dict(permissions),
        }

    def get_layer_filter(self, hostname: str, map_layer_group_id: str, external_data_source_id: str):
        """
        Obey hub-level layer filtering logic.
        """
        site = Site.objects.filter(hostname=hostname).first()
        if site is not None:
            hub = site.root_page.specific
            logger.debug(f"Hub: {hub}")
            if isinstance(hub, HubHomepage):
                layers = hub.get_layers()
                if isinstance(layers, list):
                    for layer in layers:
                        if isinstance(layer, MapLayer) and layer.source == external_data_source_id:
                            return layer.filter
                        elif layer.id == map_layer_group_id:
                            # Either it really is a MapLayerGroup in the DB
                            if isinstance(layer, MapLayerGroup):
                                for sublayer in layer.layers:
                                    if sublayer.source == external_data_source_id:
                                        return sublayer.filter
                            # Or it was cast as a MapLayerGroup in the GraphQL schema
                            # and in the DB it's actually a MapLayer
                            else:
                                return layer.filter
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

    def get_hostname(self):
        return self.kwargs.get("hostname", None)
    
    def get_map_layer_group_id(self):
        return self.kwargs.get("map_layer_group_id", None)

    def get_object(self):
        return ExternalDataSource.objects.get(pk=self.get_id())

    def get_min_zoom(self, *args, **kwargs):
        return 1

    def get_max_zoom(self, *args, **kwargs):
        return 30

    def get_tile_url(self):
        """Base MVTView Url used to generates urls in TileJSON in a.tiles.xxxx/{z}/{x}/{y} format"""
        id = self.get_id()
        hostname = self.get_hostname()
        map_layer_group_id = self.get_map_layer_group_id()
        if hostname:
            return str(
                reverse(
                    "external_data_source_point_tile",
                    args=(hostname, map_layer_group_id, id, 0, 0, 0),
                )
            ).replace("/0/0/0", "/{z}/{x}/{y}")
        else:
            return str(
                reverse(
                    "external_data_source_point_tile",
                    args=(id, 0, 0, 0),
                )
            ).replace("/0/0/0", "/{z}/{x}/{y}")

    def get_layer_class_kwargs(self, *args, **kwargs):
        return {"external_data_source_id": self.get_id()}

    # def get_layers(self):
    #     return [GenericDataVectorLayer(external_data_source=self.get_object())]
