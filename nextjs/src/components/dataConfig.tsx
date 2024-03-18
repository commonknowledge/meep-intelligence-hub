<<<<<<< HEAD
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

import { Button } from "@/components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"

import { File, Plus } from "lucide-react"




interface Props {
    
}



const ReportsConsItem: React.FC<Props> = ({}) => {


    return (
        <Card className="p-4 bg-meepGray-800 border-1 text-meepGray-200 border border-meepGray-700">
        <CardHeader>
            <CardTitle className="text-hSm mb-4">Data Configuration</CardTitle>
        </CardHeader>
        <CardContent>

            <div className="flex flex-col gap-2 mb-2 py-2 border-t border-meepGray-700 ">
                <span className="label mb-2">Your membership data </span>
                <div className="flex gap-2 items-center">
                    <Button variant="brand" className="p-3 gap-2 text-sm">
                        <File className="w-4" /> Main-list-2024.csv
                    </Button>
                </div>
                <div className="flex gap-2 items-center">
                    <Button variant="outline" className="p-3 gap-2 text-sm">
                        <Plus className="w-4" />add new member list
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-2 mb-2 py-2 border-t border-meepGray-700 ">
                <span className="label">Data Layers</span>
                <Accordion type="single" collapsible>
                    <AccordionItem value="geo">
                        <AccordionTrigger>Geographic</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                            <div className="items-top flex space-x-2">
                                <Checkbox id="geo-1" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="geo-1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Constituency
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox id="geo-2" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="geo-2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Wards
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox id="geo-3" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="geo-3"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Something else
                                    </label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="dem">
                        <AccordionTrigger>Demographic</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                            <div className="items-top flex space-x-2">
                                <Checkbox id="geo-1" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="dem-1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Nationality
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox id="dem-2" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="dem-2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        income
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox id="dem-3" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="dem-3"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Something else
                                    </label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </CardContent>
    </Card>
    )
    // return some JSX
};



export default ReportsConsItem;

=======
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
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, File, Plus } from "lucide-react"
import { gql, useApolloClient, useFragment, useQuery } from "@apollo/client"
import { AddMapLayerButton } from "./report/AddMapLayerButton"
import { MapReportLayersSummaryFragment } from "@/__generated__/graphql"
import { useContext } from "react"
import { ReportContext } from "@/app/reports/[id]/context"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { importData } from "@/app/(app)/data-sources/inspect/[externalDataSourceId]/InspectExternalDataSource"
import { LoadingIcon } from "./ui/loadingIcon"

export default function DataConfigPanel () {
  const { id, update } = useContext(ReportContext)
  const client = useApolloClient()
  const layers = useFragment<MapReportLayersSummaryFragment>({
    fragment: MapReportLayersSummaryFragmentStr,
    fragmentName: "MapReportLayersSummary",
    from: {
      __typename: "MapReport",
      id,
    },
  });

  return (
    <Card className="p-4 bg-meepGray-800 border-1 text-meepGray-200 border border-meepGray-700">
      <CardHeader>
        <CardTitle className="text-hSm mb-4">Layers</CardTitle>
      </CardHeader>
      <CardContent>

        <div className="flex flex-col gap-2 mb-2 py-2 border-t border-meepGray-700 ">
          <span className="label mb-2">Added layers</span>
          {layers.data.layers?.map((layer, index) => (
            <div key={layer?.source?.id || index} className="flex gap-2 items-center">
              <Popover>
                <PopoverTrigger>
                  <Button variant="brand" className="p-3 gap-2 text-sm">
                    <File className="w-4" />
                    <span>{layer?.name || layer?.source?.name}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='space-y-4'>
                  {!!layer?.source?.id && (
                    <>
                      <div className='text-lg'>{layer.source.importedDataCount || 0} records imported</div>
                      <Link href={`/data-sources/inspect/${layer.source.id}`}>
                        Inspect data source <ArrowRight />
                      </Link>
                      <Button disabled={layer.source.isImporting} onClick={() => importData(client, layer.source!.id)}>
                        {!layer.source.isImporting ? "Import data" : <span className='flex flex-row gap-2 items-center'>
                          <LoadingIcon size={"18"} />
                          <span>Importing...</span>
                        </span>}
                      </Button>
                    </>
                  )}
                  <Button onClick={() => {
                    removeLayer(layer?.source?.id!)
                  }} variant='destructive'>Remove layer</Button>
                </PopoverContent>
              </Popover>
            </div>
          ))}
          <div className="flex gap-2 items-center">
            <AddMapLayerButton addLayer={addLayer} />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-2 py-2 border-t border-meepGray-700 ">
          <span className="label">Data Layers</span>
          <Accordion type="single" collapsible>
            <AccordionItem value="geo">
              <AccordionTrigger>Geographic</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="items-top flex space-x-2">
                  <Checkbox id="geo-1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="geo-1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Constituency
                    </label>
                  </div>
                </div>
                <div className="items-top flex space-x-2">
                  <Checkbox id="geo-2" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="geo-2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Wards
                    </label>
                  </div>
                </div>
                <div className="items-top flex space-x-2">
                  <Checkbox id="geo-3" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="geo-3"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Something else
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dem">
              <AccordionTrigger>Demographic</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="items-top flex space-x-2">
                  <Checkbox id="geo-1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="dem-1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nationality
                    </label>
                  </div>
                </div>
                <div className="items-top flex space-x-2">
                  <Checkbox id="dem-2" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="dem-2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      income
                    </label>
                  </div>
                </div>
                <div className="items-top flex space-x-2">
                  <Checkbox id="dem-3" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="dem-3"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Something else
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </CardContent>
    </Card>
  )

  function addLayer (source: { name: string, id: string }) {
    const oldLayers = layers.data.layers?.map(l => ({
      name: l!.name!,
      source: l!.source?.id,
    }))
    const newLayer = {
      name: source.name!,
      source: source.id,
    }
    if (!oldLayers) return
    if (oldLayers.find(l => l.source === source.id)) return
    const combinedLayers = oldLayers?.concat([newLayer])
    update({ layers: combinedLayers })
  }

  function removeLayer (sourceId: string) {
    const oldLayers = layers.data.layers?.map(l => ({
      name: l!.name!,
      source: l!.source?.id,
    }))
    const newLayers = oldLayers?.filter(l => l.source !== sourceId)
    update({ layers: newLayers })
  }
};

export const MapReportLayersSummaryFragmentStr = gql`
  fragment MapReportLayersSummary on MapReport {
    layers {
      name
      source {
        id
        name
        isImporting
        importedDataCount
      }
    }
  }
`
>>>>>>> 575f98ecfe19ee6a0a508230979a738ff62e70fd
