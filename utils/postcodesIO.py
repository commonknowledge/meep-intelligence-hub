from dataclasses import dataclass
from typing import List, Optional

from django.conf import settings

import httpx
import requests

from utils.geo import create_point
from utils.py import batch_and_aggregate, get, get_path


@dataclass
class Codes:
    admin_district: str
    admin_county: str
    admin_ward: str
    parish: str
    parliamentary_constituency: str
    parliamentary_constituency_2025: str
    ccg: str
    ccg_id: str
    ced: str
    nuts: str
    lsoa: str
    msoa: str
    lau2: str
    pfa: str


@dataclass
class PostcodesIOResult:
    postcode: str
    quality: int
    eastings: int
    northings: int
    country: str
    nhs_ha: str
    longitude: float
    latitude: float
    european_electoral_region: str
    primary_care_trust: str
    region: str
    lsoa: str
    msoa: str
    incode: str
    outcode: str
    parliamentary_constituency: str
    parliamentary_constituency_2025: str
    admin_district: str
    parish: str
    date_of_introduction: int
    admin_ward: str
    ccg: str
    nuts: str
    pfa: str
    codes: Codes
    admin_county: Optional[str] = None
    ced: Optional[str] = None


@dataclass
class PostcodesIOResponse:
    status: int
    result: PostcodesIOResult


@dataclass
class ResultElement:
    query: str
    result: PostcodesIOResult


@dataclass
class PostcodesIOBulkResult:
    status: int
    result: List[ResultElement]


def get_postcode_geo(postcode: str) -> PostcodesIOResult:
    response = requests.get(f"{settings.POSTCODES_IO_URL}/postcodes/{postcode}")
    data = response.json()
    status = get(data, "status")
    result = get(data, "result")

    if status != 200 or result is None:
        raise Exception(f"Failed to geocode postcode: {postcode}.")

    return result


@batch_and_aggregate(settings.POSTCODES_IO_BATCH_MAXIMUM)
async def get_bulk_postcode_geo(postcodes) -> PostcodesIOBulkResult:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{settings.POSTCODES_IO_URL}/postcodes",
            json={"postcodes": postcodes},
        )
    if response.status_code != httpx.codes.OK:
        raise Exception(f"Failed to bulk geocode postcodes: {postcodes}.")

    data = response.json()
    status = get(data, "status")
    result: List[ResultElement] = get(data, "result")

    if status != 200 or result is None:
        raise Exception(f"Failed to bulk geocode postcodes: {postcodes}.")

    return [
        next(
            (
                geo.get("result") if geo.get("result") else None
                for geo in result
                if geo["query"] == postcode
            ),
            None,
        )
        for postcode in postcodes
    ]


@batch_and_aggregate(25)
async def bulk_coordinate_geo(coordinates):
    for i, coords in enumerate(coordinates):
        coordinates[i]["limit"] = 1

    payload = {"geolocations": coordinates}

    response = requests.post(f"{settings.POSTCODES_IO_URL}/postcodes", data=payload)
    data = response.json()
    status = get(data, "status")
    result = get(data, "result")

    if status != 200 or result is None:
        raise Exception(f"Failed to bulk geocode coordinates: {payload}")

    return result


def coordinates_geo(latitude: float, longitude: float):
    response = requests.get(
        f"{settings.POSTCODES_IO_URL}/postcodes?lon={longitude}&lat={latitude}"
    )
    data = response.json()
    status = get(data, "status")
    result = get(data, "result")

    if status != 200 or result is None or len(result) < 1:
        raise Exception(
            f"Failed to get postcode for coordinates: lon={longitude}&lat={latitude}."
        )

    return result[0]


def point_from_geo(geo):
    return create_point(
        latitude=get_path(geo, "latitude"), longitude=get_path(geo, "longitude")
    )


# def get_approximate_postcode_locations(postcodes):
#     '''
#     Increase frequency of distance matrix cache hits by lowering precision of locations
#     '''

#     def approximate_location(coordinate):
#         # 0.01 degrees distance on both long and lat == about a 20 minute walk in the uk
#         return {
#             "latitude": round(get_path(coordinate, 'result', 'latitude'), 2),
#             "longitude": round(get_path(coordinate, 'result', 'longitude'), 2)
#         }

#     return map(approximate_location, get_bulk_postcode_geo(postcodes))
