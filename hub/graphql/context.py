from strawberry.dataloader import DataLoader
from strawberry_django_dataloaders.views import (
    DataloaderAsyncGraphQLView,
    DataloaderContext,
)

from utils.postcodesIO import get_bulk_postcode_geo_from_coords


class HubDataLoaderContext(DataloaderContext):
    area_coordinate_loader: DataLoader


class CustomSchemaView(DataloaderAsyncGraphQLView):
    async def get_context(self, request, response) -> HubDataLoaderContext:
        context = await super().get_context(request, response)
        context = HubDataLoaderContext(**context.__dict__)
        setattr(
            context,
            "area_coordinate_loader",
            DataLoader(load_fn=get_bulk_postcode_geo_from_coords),
        )
        return context
