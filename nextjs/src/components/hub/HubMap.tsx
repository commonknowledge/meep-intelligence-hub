"use client"

import Map, { Layer, Source, ViewState, LngLatLike } from "react-map-gl";
import { atom, useAtom } from "jotai";
import { authenticationHeaders } from "@/lib/auth";
import { ImmutableLike } from "react-map-gl/dist/esm/types";
import { PlaceholderLayer, useLoadedMap, useMapIcons } from "@/lib/map";
import { HubPointMarkers } from "./HubMapPoints";
import { LoadingIcon } from "../ui/loadingIcon";
import { GetHubMapDataQuery, GetLocalDataQuery } from "@/__generated__/graphql";
import { useEffect } from "react";
import { SIDEBAR_WIDTH } from "./data";
import { BACKEND_URL } from "@/env";
import { useHubRenderContext } from "./HubRenderContext";

const viewStateAtom = atom<Partial<ViewState>>({
  longitude: -2.296605,
  latitude: 53.593349,
  zoom: 6
})

export function HubMap ({
  mapStyle,
  layers,
  currentConstituency,
  localDataLoading
}: {
  mapStyle?: string | mapboxgl.Style | ImmutableLike<mapboxgl.Style> | undefined,
  layers?: NonNullable<GetHubMapDataQuery['hubByHostname']>['layers'],
  currentConstituency: GetLocalDataQuery['postcodeSearch']['constituency'],
  localDataLoading: boolean
}) {
  const hub = useHubRenderContext()
  const [viewState, setViewState] = useAtom(viewStateAtom)

  const requiredImages = [
    {
      url: () => new URL('/markers/tcc-event-marker.png', window.location.href).toString(),
      name: 'tcc-event-marker'
    }
  ]

  const mapbox = useLoadedMap()

  const tileset = TILESETS.constituencies2024

  useEffect(() => {
    try {
      if (currentConstituency?.fitBounds.length) {
        mapbox.loadedMap?.fitBounds(currentConstituency.fitBounds, {
          // TODO: change for small screen
          padding: FIT_BOUNDS_PADDING
        })
      } else if (!localDataLoading) {
        // Fly to UK bounds
        mapbox.loadedMap?.fitBounds(UK_BOUNDS, {
          padding: FIT_BOUNDS_PADDING
        })
      }
    } catch(e) {}
  }, [currentConstituency, mapbox.loadedMap, localDataLoading])

  return (
    <>
      {!layers?.length || localDataLoading && (
        <div className="absolute w-full h-full inset-0 z-10 pointer-events-none">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <LoadingIcon />
          </div>
        </div>
      )}
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        mapStyle={mapStyle || "mapbox://styles/commonknowledge/clwqeu7rb012301nyh52n3kss/draft"}
        transformRequest={(url, resourceType) => {
          if (
            url.includes(BACKEND_URL) &&
            !url.includes("tiles.json")
          ) {
            return {
              url,
              headers: authenticationHeaders(),
              method: "GET",
            };
          }
          return { url };
        }}
      >
        {/* Layout order */}
        <PlaceholderLayer id="AREA_BOUNDARIES" />
        <PlaceholderLayer id="PLACEHOLDER_MARKERS" />
        {/* Boundaries */}
        <Source
          id={tileset.mapboxSourceId}
          type="vector"
          url={`mapbox://${tileset.mapboxSourceId}`}
          promoteId={tileset.promoteId}
        />
        <Layer
          beforeId="AREA_BOUNDARIES"
          id={`${tileset.mapboxSourceId}-line`}
          source={tileset.mapboxSourceId}
          source-layer={tileset.sourceLayerId}
          type="line"
          paint={{
            "line-color": hub.primaryColours["500"],
            "line-width": 1,
            "line-opacity": 0.25,
          }}
        />
        {currentConstituency && (
          <>
            <Layer
              beforeId="AREA_BOUNDARIES"
              filter={[
                "==",
                ["get", tileset.promoteId],
                ["literal", currentConstituency?.gss],
              ]}
              id={`${tileset.mapboxSourceId}-fill`}
              source={tileset.mapboxSourceId}
              source-layer={tileset.sourceLayerId}
              type="fill"
              paint={{
                "fill-color": hub.primaryColours["500"],
                "fill-opacity": 0.1,
              }}
            />
            <Layer
              beforeId="AREA_BOUNDARIES"
              filter={[
                "==",
                ["get", tileset.promoteId],
                ["literal", currentConstituency?.gss],
              ]}
              id={`${tileset.mapboxSourceId}-selected-line`}
              source={tileset.mapboxSourceId}
              source-layer={tileset.sourceLayerId}
              type="line"
              paint={{
                "line-color": hub.primaryColours["500"],
                "line-width": 3,
                "line-opacity": 0.75,
              }}
            />
          </>
        )}
        {/* Markers */}
        {layers?.map((layer, index) => layer.__typename === 'MapLayer' &&
          <HubPointMarkers
            beforeId="PLACEHOLDER_MARKERS"
            key={layer.source.id}
            index={index}
            layer={layer}
          />
        )}
      </Map>
    </>
  );
}

const UK_BOUNDS: [LngLatLike, LngLatLike] = [
  [-8.5, 49.5],
  [2, 61]
]

const FIT_BOUNDS_PADDING = {
  left: SIDEBAR_WIDTH + 75,
  top: 50,
  right: 50,
  bottom: 50
}

// TODO: unify this and ReportMap's TILESETS
const TILESETS: Record<"constituencies" | "constituencies2024", {
  name: string,
  singular: string,
  mapboxSourceId: string,
  sourceLayerId?: string,
  promoteId: string,
  labelId: string
}> = {
  constituencies: {
    name: "GE2019 constituencies",
    singular: "constituency",
    mapboxSourceId: "commonknowledge.4xqg91lc",
    sourceLayerId: "Westminster_Parliamentary_Con-6i1rlq",
    promoteId: "pcon16cd",
    labelId: "pcon16nm"
  },
  // TODO: when merged
  constituencies2024: {
    name: "GE2024 constituencies",
    singular: "constituency",
    mapboxSourceId: "commonknowledge.39dnumdm",
    sourceLayerId: "constituencies_2024_simplifie-7w220i",
    promoteId: "PCON24CD",
    labelId: "PCON24NM"
  }
}