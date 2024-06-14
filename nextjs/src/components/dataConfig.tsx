"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ClipboardCopy, File, Plus, Shuffle, X } from "lucide-react"
import { gql, useApolloClient, useFragment, useQuery } from "@apollo/client"
import { AddMapLayerButton } from "./report/AddMapLayerButton"
import { AnalyticalAreaType, DataSourceType, MapReportLayersSummaryFragment } from "@/__generated__/graphql"
import { useContext, useState } from "react"
import { ReportContext, useReportContext } from "@/app/reports/[id]/context"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { importData } from "@/app/(app)/data-sources/inspect/[externalDataSourceId]/InspectExternalDataSource"
import { LoadingIcon } from "./ui/loadingIcon"
import { useRouter } from "next/navigation"
import { MAP_REPORT_LAYERS_SUMMARY, isDataConfigOpenAtom, layerColour, layerIdColour } from "@/lib/map"
import { DataSourceIcon } from "./DataSourceIcon"
import pluralize from "pluralize"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { uuid } from 'uuidv4';
import { useAtom } from "jotai"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { CRMSelection } from "./CRMButtonItem"
import { Select, SelectItem, SelectValue, SelectContent, SelectGroup, SelectTrigger } from "@/components/ui/select";


export default function DataConfigPanel() {
  const router = useRouter()
  const { id, report, updateReport } = useContext(ReportContext)
  const client = useApolloClient()

  const { displayOptions, setDisplayOptions } = useReportContext();

  const toggleElectionData = () => {
    setDisplayOptions({ showLastElectionData: !displayOptions.showLastElectionData });
  };

  const toggleMps = () => {
    setDisplayOptions({ showMPs: !displayOptions.showMPs });
  };

  const layers = useFragment<MapReportLayersSummaryFragment>({
    fragment: MAP_REPORT_LAYERS_SUMMARY,
    fragmentName: "MapReportLayersSummary",
    from: {
      __typename: "MapReport",
      id,
    },
  });
  const [open, setOpen] = useAtom(isDataConfigOpenAtom)
  const shareURL = () => new URL(`/data-sources/share/${report?.data?.mapReport.organisation.slug}`, window.location.toString()).toString()


  return (
    <div className="h-full w-[250px] flex flex-col bg-meepGray-800 border-r text-meepGray-200 border-meepGray-700 max-w-xs overflow-y-auto min-h-0">
      <CardHeader className='p-3 flex flex-row justify-between items-center'>
        <h2 className="">Map layers</h2>
        <X className='w-4 cursor-pointer' onClick={() => { setOpen(false) }} />
      </CardHeader>
      <CardContent className="flex flex-col justify-between grow">
        <div className="p-3 flex flex-col gap-2 border-t border-meepGray-700">
          <span className="text-dataName text-meepGray-300 font-semibold uppercase mb-2">Your member lists</span>
          


          {layers.data.layers?.filter(d => d?.source?.dataType === DataSourceType.Member)
            .map((layer, index) => layer?.source && (
              <div key={layer?.source?.id || index} className="flex gap-2 items-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="border-l-4 hover:bg-meepGray-700 outline outline-1 outline-meepGray-600 bg-meepGray-800 p-3 text-sm flex flex-row items-center gap-2 text-left justify-start overflow-hidden text-nowrap text-ellipsis h-14 w-full" style={{
                      borderColor: layerIdColour(layer?.source?.id)
                    }}
                    >
                      <CRMSelection
                        // @ts-ignore: Property 'id' is optional in type 'DeepPartialObject - a silly Fragment typing
                        source={layer.source}
                        isShared={!!layer.sharingPermission}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='space-y-4'>
                    {!!layer?.source?.id && (
                      !layer.sharingPermission ? (
                        <>
                          <div>{layer.source.importedDataCount || 0} records imported</div>
                          <Link href={`/data-sources/inspect/${layer?.source?.id}`} className='underline py-2 text-sm'>
                            Inspect data source <ArrowRight />
                          </Link>
                          <Button disabled={layer.source.isImportScheduled} onClick={() => importData(client, layer.source!.id)}>
                            {!layer.source.isImportScheduled ? "Import data" : <span className='flex flex-row gap-2 items-center'>
                              <LoadingIcon size={"18"} />
                              <span>Importing...</span>
                            </span>}
                          </Button>
                        </>
                      ) : (
                        <div className='text-sm'>
                          <div>This data source is managed by {layer.source.organisation?.name}.</div>
                          <div className='flex flex-col gap-2 mt-4'>
                            <div className='flex flex-row gap-1 uppercase font-semibold text-sm text-meepGray-400'>
                              <span>Their share settings</span>
                            </div>
                            <div className='flex flex-row gap-1 items-start'>
                              <Checkbox
                                checked={!!layer.sharingPermission?.visibilityRecordCoordinates}
                                disabled
                              />
                              <label className='-mt-1'>
                                <span>
                                  Precise record locations
                                </span>
                                <p className='text-meepGray-400 text-xs'>
                                  If enabled, pins will be placed on a map for each record. If disabled, only aggregate ward / constituency / region data will be shared.
                                </p>
                              </label>
                            </div>
                            <div className='flex flex-row gap-1 items-start'>
                              <Checkbox
                                checked={!!layer.sharingPermission?.visibilityRecordDetails}
                                disabled
                              />
                              <label className='-mt-1'>
                                <span>
                                  Record details
                                </span>
                                <p className='text-meepGray-400 text-xs'>
                                  Specific data like {'"'}name{'"'}</p>
                              </label>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <Button className="ml-1" onClick={() => {
                      removeLayer(layer?.source?.id!)
                    }} variant='destructive'>Remove layer</Button>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          <div className="flex gap-2 items-center">
            <AddMapLayerButton addLayer={addLayer} filter={source => source.dataType === DataSourceType.Member} />
          </div>
        </div>
        <div className="p-3 pb-4 flex flex-col gap-2 border-t border-meepGray-700 ">
          <span className="text-dataName text-meepGray-300 font-semibold uppercase mb-3">Campaign map layers</span>
          {layers.data.layers
            ?.filter(d => d?.source?.dataType !== DataSourceType.Member)
            .map((layer, index) => layer?.source && (
              <div key={layer?.source?.id || index} className="flex gap-2 items-center">
                <Popover>
                  <PopoverTrigger>
                    <Button className="border-l-4 hover:bg-meepGray-700 outline outline-1 outline-meepGray-600 bg-meepGray-800e p-3 text-sm flex flex-row items-center gap-2 text-left justify-start overflow-hidden text-nowrap text-ellipsis h-14 w-full" style={{
                      borderColor: layerIdColour(layer?.source?.id)
                    }}
                    >
                      <CRMSelection
                        // @ts-ignore: Property 'id' is optional in type 'DeepPartialObject - a silly Fragment typing
                        source={layer.source}
                        isShared={!!layer.sharingPermission}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='space-y-4'>
                    {!!layer?.source?.id && (
                      !layer.sharingPermission ? (
                        <>
                          <div>{layer.source.importedDataCount || 0} records imported</div>
                          <Link href={`/data-sources/inspect/${layer?.source?.id}`} className='underline py-2 text-sm'>
                            Inspect data source <ArrowRight />
                          </Link>
                          <Button disabled={layer.source.isImportScheduled} onClick={() => importData(client, layer.source!.id)}>
                            {!layer.source.isImportScheduled ? "Import data" : <span className='flex flex-row gap-2 items-center'>
                              <LoadingIcon size={"18"} />
                              <span>Importing...</span>
                            </span>}
                          </Button>
                        </>
                      ) : (
                        <div className='text-sm'>
                          <div>This data source is managed by {layer.source.organisation?.name}.</div>
                          <div className='flex flex-col gap-2 mt-4'>
                            <div className='flex flex-row gap-1 uppercase font-semibold text-sm text-meepGray-400'>
                              <span>Their share settings</span>
                            </div>
                            <div className='flex flex-row gap-1 items-start'>
                              <Checkbox
                                checked={!!layer.sharingPermission?.visibilityRecordCoordinates}
                                disabled
                              />
                              <label className='-mt-1'>
                                <span>
                                  Precise record locations
                                </span>
                                <p className='text-meepGray-400 text-xs'>
                                  If enabled, pins will be placed on a map for each record. If disabled, only aggregate ward / constituency / region data will be shared.
                                </p>
                              </label>
                            </div>
                            <div className='flex flex-row gap-1 items-start'>
                              <Checkbox
                                checked={!!layer.sharingPermission?.visibilityRecordDetails}
                                disabled
                              />
                              <label className='-mt-1'>
                                <span>
                                  Record details
                                </span>
                                <p className='text-meepGray-400 text-xs'>
                                  Specific data like {'"'}name{'"'}</p>
                              </label>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <Button onClick={() => {
                      removeLayer(layer?.source?.id!)
                    }} variant='destructive'>Remove layer</Button>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          <div className="flex gap-2 items-center">
            <AddMapLayerButton addLayer={addLayer} filter={source => source.dataType !== DataSourceType.Member} />
          </div>
        </div>
        <div>

          <div className="p-3 pb-4 flex flex-col gap-2 border-t border-meepGray-700 ">
            <span className=" text-dataName uppercase mb-2 text-meepGray-300">Map settings</span>
            {/* Choose analytical area type */}
            <div className="text-labelLg text-meepGray-200 flex items-center gap-2">
              <Checkbox
                checked={displayOptions.showStreetDetails}
                onCheckedChange={(showStreetDetails) => { setDisplayOptions({ showStreetDetails }) }}

              />Street details
            </div>
          </div>
          <div className="p-3 pb-4 flex flex-col gap-2 border-t border-meepGray-700 ">
            <span className=" text-dataName uppercase mb-2 text-meepGray-300">Westminster politics</span>
            <Select
              value={displayOptions.analyticalAreaType}
              onValueChange={(analyticalAreaType: AnalyticalAreaType) => { setDisplayOptions({ analyticalAreaType }) }}
            >
              <SelectTrigger>
                <SelectValue>
                  {displayOptions.analyticalAreaType === AnalyticalAreaType.ParliamentaryConstituency_2025 ? "2024 constituencies" : "Old constituencies"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-100">
                <SelectGroup>
                  <SelectItem value={AnalyticalAreaType.ParliamentaryConstituency_2025}>2024 constituencies</SelectItem>
                  <SelectItem value={AnalyticalAreaType.ParliamentaryConstituency}>Old constituencies</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="text-labelLg text-meepGray-200 flex items-center gap-2">
              <Checkbox
                checked={displayOptions.showMPs}
                onCheckedChange={toggleMps}
              />Current MP
            </div>
            <div className="text-labelLg text-meepGray-200 flex items-center gap-2">
              <Checkbox
                checked={displayOptions.showLastElectionData}
                onCheckedChange={toggleElectionData}
              />
              Last GE election results
            </div>
          </div>
        </div>
      </CardContent>
      <div className='bg-meepGray-700 p-3'>
        <CardHeader>
          <h2 className='text-meepGray-400 flex flex-row gap-1 items-center text-sm'>
            <Shuffle className='w-4' /> Collaborative area
          </h2>
        </CardHeader>
        <CardContent>
          <p className='text-meepGray-300 text-xs py-4'>
            Invite to organisations to share membership lists and collaborate on a campaign together.
          </p>
          <div className="flex gap-2 items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size={'sm'} variant='outline' className='text-sm'>
                  <Plus /> Invite
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Request data from other campaigns</DialogTitle>
                  <DialogDescription>
                    Share this URL to request data from other campaigns. They{"'"}ll be able to pick and choose which data sources to share with you, with some data privacy options.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input value={shareURL()} />
                  <Button onClick={() => {
                    navigator.clipboard.writeText(shareURL())
                    toast.success("Copied to clipboard")
                  }}><ClipboardCopy /></Button>
                </div>
                <DialogFooter>
                  <DialogClose onClick={() => {
                    navigator.clipboard.writeText(shareURL())
                    toast.success("Copied to clipboard")
                  }}>
                    Copy and close
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </div>
    </div>
  )

  function addLayer(source: { name: string, id: string }) {
    const oldLayers = layers.data.layers?.map(l => ({
      id: l!.id!,
      name: l!.name!,
      source: l!.source?.id,
    }))
    const newLayer = {
      name: source.name!,
      source: source.id,
      id: uuid(),
    }
    if (!oldLayers) return
    if (oldLayers.find(l => l.source === source.id)) return
    const combinedLayers = oldLayers?.concat([newLayer])
    updateReport({ layers: combinedLayers })
  }

  function removeLayer(sourceId: string) {
    const oldLayers = layers.data.layers?.map(l => ({
      id: l!.id!,
      name: l!.name!,
      source: l!.source?.id,
    }))
    const newLayers = oldLayers?.filter(l => l.source !== sourceId)
    updateReport({ layers: newLayers })
  }
};