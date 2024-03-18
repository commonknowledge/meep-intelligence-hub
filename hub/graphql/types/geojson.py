from enum import Enum
from typing import List, Optional, Union

import strawberry
from strawberry.scalars import JSON


@strawberry.enum
class GeoJSONTypes(Enum):
    Feature = "Feature"
    FeatureCollection = "FeatureCollection"
    Point = "Point"
    Polygon = "Polygon"
    MultiPolygon = "MultiPolygon"


@strawberry.type
class FeatureCollection:
    type: GeoJSONTypes.FeatureCollection = GeoJSONTypes.FeatureCollection
    features: List["Feature"]


@strawberry.interface
class Feature:
    id: Optional[str]
    type: GeoJSONTypes.Feature = GeoJSONTypes.Feature
    properties: JSON
    geometry: Union["PointGeometry", "PolygonGeometry", "MultiPolygonGeometry"]


@strawberry.type
class PointFeature(Feature):
    geometry: "PointGeometry"


@strawberry.interface
class Geometry:
    type: GeoJSONTypes


@strawberry.type
class PointGeometry(Geometry):
    type: GeoJSONTypes.Point = GeoJSONTypes.Point
    # lng, lat
    coordinates: List[float]


@strawberry.type
class PolygonGeometry(Geometry):
    type: GeoJSONTypes.Polygon = GeoJSONTypes.Polygon
    coordinates: List[List[List[float]]]


@strawberry.type
class MultiPolygonGeometry(Geometry):
    type: GeoJSONTypes.MultiPolygon = GeoJSONTypes.MultiPolygon
    coordinates: List[List[List[List[float]]]]
