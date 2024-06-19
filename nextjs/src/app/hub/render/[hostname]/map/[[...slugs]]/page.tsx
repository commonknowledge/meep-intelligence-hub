// page.js
"use client";

import React, { useEffect } from 'react'

import "mapbox-gl/dist/mapbox-gl.css";
import { useQuery } from "@apollo/client";
import { Provider as JotaiProvider, useAtomValue } from "jotai";
import { MapProvider } from "react-map-gl";
import { HubMap } from "@/components/hub/HubMap";
import { ConstituencyView } from "@/components/hub/ConstituencyView";
import { GetEventDataQuery, GetEventDataQueryVariables, GetHubMapDataQuery, GetHubMapDataQueryVariables, GetLocalDataQuery, GetLocalDataQueryVariables } from "@/__generated__/graphql";
import { SIDEBAR_WIDTH, selectedHubSourceMarkerAtom } from "@/components/hub/data";
import { usePathname, useParams } from 'next/navigation' 
import { SearchPanel } from './SearchPanel';
import Root from '@/data/puck/config/root';
import { useBreakpoint } from '@/hooks/css';
import { GET_EVENT_DATA, GET_HUB_MAP_DATA, GET_LOCAL_DATA } from './queries';


type Params = {
  hostname: string
  slugs?: string[]
}

export default function Page(props: { params: Params }) {
  const hub = useQuery<GetHubMapDataQuery, GetHubMapDataQueryVariables>(GET_HUB_MAP_DATA, {
    variables: { hostname: props.params.hostname },
  });

  const shouldDisplayMap = useBreakpoint("md")

  return (
    <Root fullScreen={shouldDisplayMap} navLinks={hub.data?.hubByHostname?.navLinks || []}>
      <MapProvider>
        <JotaiProvider>
          <PageContent {...props} shouldDisplayMap={shouldDisplayMap} hub={hub.data} />
        </JotaiProvider>
      </MapProvider>
    </Root>
  );
}

function PageContent ({ params: { hostname, slugs }, shouldDisplayMap, hub }: { params: Params, shouldDisplayMap: boolean, hub?: GetHubMapDataQuery }) {
  // To listen for any soft changes to the pathname
  // and extract a postcode
  // e.g. /map/postcode/E15QJ
  const pathname = usePathname()
  const pathnameSegments = pathname.split("/")
  const postcodeFromPathname = (
      pathnameSegments &&
      pathnameSegments.length === 4 &&
      pathnameSegments[2] === 'postcode'
    ) ? pathnameSegments[3].replace(/([\s ]*)/mig, "").trim() : ''
    
  const selectedMarkerState = useAtomValue(selectedHubSourceMarkerAtom)
  useEffect(() => {
    if (selectedMarkerState?.properties?.id) {
      window.history.pushState(null, "", `/map/event/${selectedMarkerState.properties.id}`)
    }
  }, [selectedMarkerState])

  const eventIdFromPathname = (
    pathnameSegments &&
    pathnameSegments.length === 4 &&
    pathnameSegments[2] === 'event'
  ) ? pathnameSegments[3] : ''

  const shouldZoomOut = pathnameSegments.length == 1 && pathnameSegments[0] == '/map'

  const localData = useQuery<GetLocalDataQuery, GetLocalDataQueryVariables>(GET_LOCAL_DATA, {
    variables: { postcode: postcodeFromPathname, hostname },
    skip: !postcodeFromPathname
  });

  const eventData = useQuery<GetEventDataQuery, GetEventDataQueryVariables>(GET_EVENT_DATA, {
    variables: { eventId: eventIdFromPathname, hostname },
    skip: !eventIdFromPathname
  });

  return (
    <>
      {shouldDisplayMap ? (
        <main className="h-full relative overflow-x-hidden overflow-y-hidden flex-grow">
          <div className="absolute w-full h-full flex flex-row pointer-events-none">
            <div className="w-full h-full pointer-events-auto">
              <HubMap
                externalDataSources={
                  hub?.hubByHostname?.layers?.map((i: any) => i.id) ||
                  []
                }
                currentConstituency={
                  !shouldZoomOut ? (
                    localData.data?.postcodeSearch.constituency ||
                    eventData.data?.importedDataGeojsonPoint?.properties?.constituency
                  ) : undefined
                }
                localDataLoading={localData.loading || eventData.loading}
              />
            </div>
            {!localData.loading && (
              <aside
                className="absolute top-5 left-0 sm:left-5 right-0 max-w-full pointer-events-none h-full md:h-[calc(100%-40px)] max-h-full overflow-y-hidden shadow-hub-muted"
                style={{ width: SIDEBAR_WIDTH }}
              >
                <div className="max-w-[100vw] rounded-[20px] bg-white max-h-full overflow-y-auto  pointer-events-auto">
                  {eventIdFromPathname && eventData.data ? (
                    <ConstituencyView data={eventData.data?.importedDataGeojsonPoint?.properties?.constituency} />
                  ) : !localData.data ? (
                    <SearchPanel
                      onSearch={(postcode) => {
                        window.history.pushState(
                          null,
                          "",
                          `/map/postcode/${postcode}`
                        );
                      }}
                      isLoading={localData.loading}
                    />
                  ) : (
                    <ConstituencyView data={localData.data?.postcodeSearch.constituency} />
                  )}
                </div>
              </aside>
            )}
          </div>
        </main>
      ) : (
        <div className='bg-white rounded-[20px] mt-4 mb-16'>
          {!localData.data ? (
            <SearchPanel
              onSearch={(postcode) => {
                window.history.pushState(
                  null,
                  "",
                  `/map/postcode/${postcode}`
                );
              }}
              isLoading={localData.loading}
            />
          ) : (
            <ConstituencyView data={localData.data.postcodeSearch.constituency} />
          )}
        </div>
      )}
    </>
  )
}