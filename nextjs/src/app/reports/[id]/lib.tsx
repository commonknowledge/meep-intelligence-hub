"use client";

import { gql } from "@apollo/client";
import ColorHash from "color-hash";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useMap } from "react-map-gl";
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
        recordUrlTemplate
        crmType
        dataType
        organisation {
          name
        }
      }
    }
  }
`;

export const MAP_REPORT_FRAGMENT = gql`
  fragment MapReportPage on MapReport {
    id
    name
    ...MapReportLayersSummary
  }
  ${MAP_REPORT_LAYERS_SUMMARY}
`;

const arr = ["hsl(222, 69%, 65%)", "hsl(305, 50%, 48%)"];
export const layerColour = (index: any, id?: any) => {
  if (
    typeof index === "number" &&
    Number.isInteger(index) &&
    index < arr.length
  ) {
    return arr[index];
  }
  return colorHash.hex(id || index);
};

export const mapHasLoaded = atom(false);
export const isDataConfigOpenAtom = atom(false);
export const isConstituencyPanelOpenAtom = atom(false);

export function useLoadedMap() {
  const [loaded, setLoaded] = useAtom(mapHasLoaded);
  const map = useMap();

  // Listen for when the map is ready to use, then set loaded: true
  // This prevents errors caused by adding layers to the map before it is ready
  useEffect(() => {
    if (!map.default) {
      return;
    }

    const updateLoaded = () => {
      if (map.default?.isStyleLoaded()) {
        setLoaded(true);
      }
    };

    const onLoad = () => {
      updateLoaded();
    };

    const onStyleLoad = () => {
      updateLoaded();
    };

    // Handle style changes after the initial map load.
    // Using an interval is necessary, as isStyleLoaded()
    // returns false when the `load` and `style.load` events
    // fire after changing a style (it works correctly for the
    // initial map load). This causes an error if the map is
    // used at that point.
    const onStyleDataLoading = () => {
      setLoaded(false);
      const intervalId = setInterval((): void => {
        if (map.default?.isStyleLoaded()) {
          setLoaded(true);
          clearInterval(intervalId);
        }
      }, 100);
    };

    map.default.on("load", onLoad);
    map.default.on("style.load", onStyleLoad);
    map.default.on("styledataloading", onStyleDataLoading);

    return () => {
      map.default?.off("load", onLoad);
      map.default?.off("style.load", onStyleLoad);
      map.default?.off("styledataloading", onStyleDataLoading);
    };
  }, [map, setLoaded]);

  // Handle subsequent map loads

  return {
    ...map,
    loadedMap: loaded ? map.default : null,
    loaded,
  };
}
