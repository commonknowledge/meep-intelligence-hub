from typing import Optional, List
from django.conf import settings
from benedict import benedict
import httpx
from utils.py import batch_and_aggregate, ensure_list
from dataclasses import dataclass
from django.core.cache import caches
import logging
import hashlib
logger = logging.getLogger(__name__)

db_cache = caches["db"]

# docs: https://docs.mapbox.com/api/search/geocoding/

# for use by dataloaders which need to give a single arg
@dataclass
class GeocodingQuery:
    query: str = None
    country: str | list[str] = "GB"

def mapbox_v6_forward_geocode_payload(query: GeocodingQuery):
    return {
        "q": query.query,
        "limit": 1,
        "country": ",".join(ensure_list(query.country)),
    }
    
def mapbox_geocode_cache_key(query: GeocodingQuery):
    hash = hashlib.md5(query.query.encode('utf-8')).hexdigest()
    return f"mapbox:geocode:{hash}:{query.country}"

def address_to_geojson(query: str | GeocodingQuery):
    cached = db_cache.get(mapbox_geocode_cache_key(query), None)
    if cached: 
        return cached

    response = httpx.get(
        "https://api.mapbox.com/search/geocode/v6/forward",
        params={
            **mapbox_v6_forward_geocode_payload(query),
            "access_token": settings.MAPBOX_ACCESS_TOKEN,
        },
    )
    if response.status_code != httpx.codes.OK:
        return None
    data: GeocodingResult = response.json()
    db_cache.set(mapbox_geocode_cache_key(query), data, None)
    return data

@batch_and_aggregate(1000)
def batch_address_to_geojson(queries: list[GeocodingQuery]):
    data: list[GeocodingResult | None] = []
    uncached_queries = []

    for index, query in enumerate(queries):
        # TODO: check db cache
        cached = db_cache.get(mapbox_geocode_cache_key(query), None)
        if cached: 
            data.append(cached)
        else:
            data.append(None)
            uncached_queries.append(query)

    response = httpx.post(
        "https://api.mapbox.com/search/geocode/v6/batch",
        json=[mapbox_v6_forward_geocode_payload(query) for query in uncached_queries],
        params={"access_token": settings.MAPBOX_ACCESS_TOKEN},
    )
    if response.status_code != httpx.codes.OK:
        logger.error(f"Failed to batch geocode addresses: {response.text}", extra=dict(response=response, query=uncached_queries))
        return None
    new_data: BatchGeocodingResponse = benedict(response.json())
    new_results = new_data.batch

    # Now we need to merge the new data with the old data
    for index, val in enumerate(data):
        # If the data wasn't cached, we need to merge in the new data.
        # We can do this simply because mapbox's API returns the same data in the same order as it was requested.
        if val is None:
            new_val = new_results.pop(0)
            db_cache.set(mapbox_geocode_cache_key(query), new_val, None)
            data[index] = new_val
    return data

##### GENERATED CODE #####
# Types generated by https://app.quicktype.io/

@dataclass
class Geometry:
    type: Optional[str] = None
    coordinates: Optional[List[float]] = None


@dataclass
class Address:
    mapboxid: Optional[str] = None
    addressnumber: Optional[int] = None
    streetname: Optional[str] = None
    name: Optional[str] = None


@dataclass
class Country:
    mapboxid: Optional[str] = None
    name: Optional[str] = None
    wikidataid: Optional[str] = None
    countrycode: Optional[str] = None
    countrycodealpha3: Optional[str] = None


@dataclass
class District:
    mapboxid: Optional[str] = None
    name: Optional[str] = None
    wikidataid: Optional[str] = None


@dataclass
class Postcode:
    mapboxid: Optional[str] = None
    name: Optional[str] = None


@dataclass
class Neighborhood:
    mapboxid: Optional[str] = None
    name: Optional[str] = None
    alternate: Optional[Postcode] = None


@dataclass
class Region:
    mapboxid: Optional[str] = None
    name: Optional[str] = None
    wikidataid: Optional[str] = None
    regioncode: Optional[str] = None
    regioncodefull: Optional[str] = None


@dataclass
class Context:
    address: Optional[Address] = None
    street: Optional[Postcode] = None
    neighborhood: Optional[Neighborhood] = None
    postcode: Optional[Postcode] = None
    place: Optional[District] = None
    region: Optional[Region] = None
    country: Optional[Country] = None
    locality: Optional[District] = None
    district: Optional[District] = None


@dataclass
class Coordinates:
    longitude: Optional[float] = None
    latitude: Optional[float] = None
    accuracy: Optional[str] = None


@dataclass
class MatchCode:
    addressnumber: Optional[str] = None
    street: Optional[str] = None
    postcode: Optional[str] = None
    place: Optional[str] = None
    region: Optional[str] = None
    locality: Optional[str] = None
    country: Optional[str] = None
    confidence: Optional[str] = None


@dataclass
class Properties:
    mapboxid: Optional[str] = None
    featuretype: Optional[str] = None
    name: Optional[str] = None
    coordinates: Optional[Coordinates] = None
    placeformatted: Optional[str] = None
    matchcode: Optional[MatchCode] = None
    context: Optional[Context] = None


@dataclass
class Feature:
    type: Optional[str] = None
    id: Optional[str] = None
    geometry: Optional[Geometry] = None
    properties: Optional[Properties] = None


@dataclass
class GeocodingResult:
    type: Optional[str] = None
    features: Optional[List[Feature]] = None
    attribution: Optional[str] = None


@dataclass
class BatchGeocodingResponse:
    batch: Optional[List[GeocodingResult]] = None
