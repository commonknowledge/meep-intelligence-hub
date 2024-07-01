"use client"

import { useLoadedMap } from "@/lib/map"
import { useAtom } from "jotai"
import { selectedHubSourceMarkerAtom } from "@/components/hub/data"
import { useEffect } from "react"
import { Layer, Source } from "react-map-gl"
import { BACKEND_URL } from "@/env"
import { useHubRenderContext } from "./HubRenderContext"
import { GetHubMapDataQuery, MapLayer, MapLayerGroup } from "@/__generated__/graphql"

export function HubPointMarkers ({ group, layer, index, beforeId }: {
  group: NonNullable<GetHubMapDataQuery['hubByHostname']>['layerGroups'][number],
  layer: NonNullable<GetHubMapDataQuery['hubByHostname']>['layerGroups'][number]['layers'][number],
  index: number,
  beforeId?: string
}) {
  const mapboxSourceId = `group:${group.id}-layer:${layer.id}`
  const mapbox = useLoadedMap()
  const context = useHubRenderContext()
  const [selectedSourceMarker, setSelectedSourceMarker] = useAtom(selectedHubSourceMarkerAtom)

  useEffect(function selectMarker() {
    mapbox.loadedMap?.on('mouseover', mapboxSourceId, (event) => {
      const canvas = mapbox.loadedMap?.getCanvas()
      if (!canvas) return
      canvas.style.cursor = 'pointer'
    })
    mapbox.loadedMap?.on('mouseleave', mapboxSourceId, (event) => {
      const canvas = mapbox.loadedMap?.getCanvas()
      if (!canvas) return
      canvas.style.cursor = ''
    })
    mapbox.loadedMap?.on('click', mapboxSourceId, event => {
      const feature = event.features?.[0]
      if (feature?.properties?.id) {
        setSelectedSourceMarker(feature)
        context.goToEventId(feature.properties.id)
      }
    })
  }, [mapbox.loadedMap, layer.sourceId])

  const layerType = layer.mapboxLayerType || group.mapboxLayerType || "symbol"
  
  return (
    <>
      <Source
        id={mapboxSourceId}
        type="vector"
        url={new URL(`/tiles/external-data-source/${context.hostname}/${group.id}/${layer.sourceId}/tiles.json`, BACKEND_URL).toString()}
      >
        {/* {index <= 1 ? ( */}
          <Layer
            beforeId={beforeId}
            id={mapboxSourceId}
            source={mapboxSourceId}
            source-layer={"generic_data"}
            type={layerType as any}
            layout={{
              ...(layerType ? {
                "icon-allow-overlap": true,
                "icon-ignore-placement": true,
                "icon-anchor": "bottom",
              } : {}),
              ...(group.mapboxLayout || {}),
              ...(layer.mapboxLayout || {})
            }}
            paint={{
              ...(group.mapboxPaint || {}),
              ...(layer.mapboxPaint || {})
            }}
          />
      </Source>
    </>
  )
}