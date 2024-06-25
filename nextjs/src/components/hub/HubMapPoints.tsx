"use client"

import { useLoadedMap } from "@/lib/map"
import { useAtom } from "jotai"
import { selectedHubSourceMarkerAtom } from "@/components/hub/data"
import { useEffect } from "react"
import { Layer, Source } from "react-map-gl"
import { BACKEND_URL } from "@/env"
import { useHubRenderContext } from "./HubRenderContext"
import { MapLayer } from "@/__generated__/graphql"

export function HubPointMarkers ({ layer, index, beforeId }: {
  layer: NonNullable<MapLayer>,
  index: number,
  beforeId?: string
}) {
  const mapbox = useLoadedMap()
  const context = useHubRenderContext()
  const [selectedSourceMarker, setSelectedSourceMarker] = useAtom(selectedHubSourceMarkerAtom)

  useEffect(function selectMarker() {
    mapbox.loadedMap?.on('mouseover', `${layer.source.id}-marker`, (event) => {
      const canvas = mapbox.loadedMap?.getCanvas()
      if (!canvas) return
      canvas.style.cursor = 'pointer'
    })
    mapbox.loadedMap?.on('mouseleave', `${layer.source.id}-marker`, (event) => {
      const canvas = mapbox.loadedMap?.getCanvas()
      if (!canvas) return
      canvas.style.cursor = ''
    })
    mapbox.loadedMap?.on('click', `${layer.source.id}-marker`, event => {
      const feature = event.features?.[0]
      if (feature?.properties?.id) {
        setSelectedSourceMarker(feature)
        context.goToEventId(feature.properties.id)
      }
    })
  }, [mapbox.loadedMap, layer.source.id])
  
  return (
    <>
      <Source
        id={layer.source.id}
        type="vector"
        url={new URL(`/tiles/external-data-source/${context.hostname}/${layer.source.id}/tiles.json`, BACKEND_URL).toString()}
      >
        {/* {index <= 1 ? ( */}
          <Layer
            beforeId={beforeId}
            id={`${layer.source.id}-marker`}
            source={layer.source.id}
            source-layer={"generic_data"}
            type="symbol"
            layout={{
              "icon-allow-overlap": true,
              "icon-ignore-placement": true,
              "icon-anchor": "bottom",
              ...(layer.mapboxProps?.layout || {})
            }}
            paint={layer.mapboxProps?.paint || {}}
            // {...(
            //   selectedSourceMarker?.properties?.id
            //   ? { filter: ["!=", selectedSourceMarker?.properties?.id, ["get", "id"]] }
            //   : {}
            // )}
          />
        {/* ) : (
          // In case extra layers are added.
          <Layer
            beforeId={beforeId}
            id={`${externalDataSourceId}-marker`}
            source={externalDataSourceId}
            source-layer={"generic_data"}
            type="circle"
            paint={{
              "circle-radius": 5,
              "circle-color": layerColour(index, externalDataSourceId),
            }}
            {...(
              selectedSourceMarker?.properties?.id
              ? { filter: ["!=", selectedSourceMarker?.properties?.id, ["get", "id"]] }
              : {}
            )}
          />
        )}
        {!!selectedSourceMarker?.properties?.id && (
          <Layer
            beforeId={beforeId}
            id={`${externalDataSourceId}-marker-selected`}
            source={externalDataSourceId}
            source-layer={"generic_data"}
            type="symbol"
            layout={{
              "icon-image": "meep-marker-selected",
              "icon-size": 0.75,
              "icon-anchor": "bottom",
              "icon-allow-overlap": true,
              "icon-ignore-placement": true
            }}
            filter={["==", selectedSourceMarker.properties.id, ["get", "id"]]}
          />
        )} */}
      </Source>
    </>
  )
}