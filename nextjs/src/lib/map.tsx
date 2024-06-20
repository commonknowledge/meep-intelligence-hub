"use client"

import { gql } from "@apollo/client"
import ColorHash from 'color-hash'
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Layer, LayerProps, useMap } from "react-map-gl";
import { MapRef } from "react-map-gl/dist/esm/mapbox/create-ref";
var colorHash = new ColorHash();

export const MAP_REPORT_LAYERS_SUMMARY = gql`
  fragment MapReportLayersSummary on MapReport {
    layers {
      id
      name
      sharingPermission {
        visibilityRecordDetails
        visibilityRecordCoordinates
        organisation {
          name
        }
      }
      source {
        id
        name
        isImportScheduled
        importedDataCount
        crmType
        dataType
        organisation {
          name
        }
      }
    }
  }
`

export const MAP_REPORT_FRAGMENT = gql`
  fragment MapReportPage on MapReport {
    id
    name
    ... MapReportLayersSummary
  }
  ${MAP_REPORT_LAYERS_SUMMARY}
`

const arr = [
  "hsl(222, 69%, 65%)",
  "hsl(305, 50%, 48%)",
]
export const layerColour = (index: any, id?: any) => {
  if (typeof index === 'number' && Number.isInteger(index) && index < arr.length) {
    return arr[index]
  }
  return colorHash.hex(id || index)
}

export function layerIdColour (id: string) {
  return colorHash.hex(id)
}

export const mapHasLoaded = atom(false)
export const isDataConfigOpenAtom = atom(false)
export const isConstituencyPanelOpenAtom = atom(false)
export const isNavigatorPanelOpenAtom = atom(false)

export type MapLoader = {
  loadedMap: MapRef<mapboxgl.Map> | null | undefined;
  loaded: boolean;
  current?: MapRef<mapboxgl.Map> | undefined;
}

export function useLoadedMap (): MapLoader {
  const [loaded, setLoaded] = useAtom(mapHasLoaded)
  const map = useMap()

  // Listen for when the map is ready to use, then set loaded: true
  // This prevents errors caused by adding layers to the map before it is ready
  useEffect(() => {
    if (!map.default) {
      return
    }

    const updateLoaded = () => {
      if (map.default?.isStyleLoaded()) {
        setLoaded(true)
      }
    }

    const onLoad = () => {
      updateLoaded()
    }

    const onStyleLoad = () => {
      updateLoaded()
    }

    // Handle style changes after the initial map load.
    // Using an interval is necessary, as isStyleLoaded()
    // returns false when the `load` and `style.load` events
    // fire after changing a style (it works correctly for the
    // initial map load). This causes an error if the map is
    // used at that point.
    const onStyleDataLoading = () => {
      setLoaded(false)
      const intervalId = setInterval((): void => {
        if (map.default?.isStyleLoaded()) {
          setLoaded(true)
          clearInterval(intervalId)
        }
      }, 100)
    }

    map.default.on('load', onLoad)
    map.default.on('style.load', onStyleLoad)
    map.default.on('styledataloading', onStyleDataLoading)

    return () => {
      map.default?.off('load', onLoad)
      map.default?.off('style.load', onStyleLoad)
      map.default?.off('styledataloading', onStyleDataLoading)
    }
  }, [map, setLoaded])

  // Handle subsequent map loads

  return {
    ...map,
    loadedMap: loaded ? map.default : null,
    loaded
  }
}

export type MapboxImageSource = {
  url: () => string
  name: string
}

export function useMapIcons (requiredImages: MapboxImageSource[], mapbox: MapLoader) {
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  useEffect(function loadIcons() {
    if (!mapbox.loadedMap) return
    requiredImages.forEach((requiredImage) => {
      console.log("Loading", requiredImage.url())
      // Load an image from an external URL.
      mapbox.loadedMap!.loadImage(
        requiredImage.url(),
        (error, image) => {
          try {
            if (error) throw error;
            if (!image) throw new Error('Marker icon did not load')
            mapbox.loadedMap!.addImage(requiredImage.name, image);
            setLoadedImages(loadedImages => [...loadedImages, requiredImage.name])
          } catch (e) {
            console.error("Failed to load image", e)
          }
        }
      )
    })
  }, [mapbox.loadedMap, setLoadedImages])
  return loadedImages
}

/**
 * Placeholder layer to refer to in `beforeId`.
 * See https://github.com/visgl/react-map-gl/issues/939#issuecomment-625290200
 */
export function PlaceholderLayer (props: Partial<LayerProps>) {
  return (
    <Layer
      {...props}
      type='background'
      layout={{ visibility: 'none' }}
      paint={{}}
    />
  )
}