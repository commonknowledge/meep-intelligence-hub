// page.js
"use client";

<<<<<<< HEAD
import { useState } from "react";


import Map, { Marker, Popup } from "react-map-gl";
=======
import { useEffect, useState, createContext } from "react";
>>>>>>> 575f98ecfe19ee6a0a508230979a738ff62e70fd
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "@/components/Pin";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Layers, MoreVertical } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ReportsConsItem from "@/components/reportsConstituencyItem";
import DataConfigPanel from "@/components/dataConfig";
import { FetchResult, gql, useApolloClient, useQuery } from "@apollo/client";
import { toast } from "sonner";
import { DeleteMapReportMutation, DeleteMapReportMutationVariables, GetMapReportQuery, GetMapReportQueryVariables, MapReportInput, UpdateMapReportMutation, UpdateMapReportMutationVariables } from "@/__generated__/graphql";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import spaceCase from 'to-space-case'
import { toastPromise } from "@/lib/toast";
import { ReportMap } from "@/components/report/ReportMap";
import { MapReportPageFragmentStr } from "./lib";
import { ReportContext } from "./context";

<<<<<<< HEAD
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import { Checkbox } from "@/components/ui/checkbox"
import { BarChart3, Layers, LibraryBig, File, Plus, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ReportsConsItem from "@/components/reportsConstituencyItem";
import DataConfig from "@/components/dataConfig";



export default function Home() {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


    const [isDataConfigOpen, setDataConfigOpen] = useState(false);
    const toggleDataConfig = () => setDataConfigOpen(!isDataConfigOpen);

    const [isConsDataOpen, setConsDataOpen] = useState(false);
    const toggleConsData = () => setConsDataOpen(!isConsDataOpen);

    let testLong = "-2.296605"
    let testLat = "53.593349"



    return (
        <main className="-m-20 static">
            <div className="h-dvh">
                <Map
                    mapboxAccessToken={mapboxToken}
                    initialViewState={{
                        longitude: -2.296605,
                        latitude: 53.593349,
                        zoom: 6
                    }}
                    mapStyle="mapbox://styles/commonknowledge/clqeaydxl00cd01qyhnk70s7s"

                >
                    <Marker
                        key="1"
                        longitude={Number(testLong)}
                        latitude={Number(testLat)}
                        anchor="bottom"

                    >
                        <Pin />
                    </Marker>
                    <Popup
                        anchor="top"
                        longitude={Number(testLong)}
                        latitude={Number(testLat)}
                    >
                        <div className="text-meepGray-600">
                            TEST
                        </div>
                    </Popup>

                </Map>

            </div>
            <div className="absolute top-5  left-5 right-0">
                <div className="flex flex-col items-start gap-4">
                    <Card className="p-4 bg-white border-1 border-meepGray-700 text-meepGray-800">
                        <CardHeader className="flex flex-row items-center mb-4">
                            <CardTitle className="text-hMd grow font-IBMPlexSansMedium">Main List</CardTitle>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Wrench className="w-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="right" align="start">
                                    <DropdownMenuLabel>Report Settings</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Share</DropdownMenuItem>
                                    <DropdownMenuItem>Invite</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </CardHeader>
                        <CardContent>
                            <ToggleGroup type="multiple" variant="outline">
                                <ToggleGroupItem value="a" type="outline" className="p-3 flex gap-2" onClick={toggleDataConfig}>
                                    <Layers className="w-4" /> Data Configuration
                                </ToggleGroupItem>
                                <ToggleGroupItem value="b" type="outline" className="p-3 flex gap-2" onClick={toggleConsData}>
                                    <BarChart3 className="w-4" /> Constituency Data
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </CardContent>

                    </Card>
                    {isDataConfigOpen && (
                        <DataConfig />

                    )}
                    {isConsDataOpen && (
                        <Card className="absolute right-5 p-4 bg-meepGray-800 border-1 text-meepGray-200 border border-meepGray-700">
                            <CardHeader>
                                <Tabs defaultValue="all-constituencies" className="w-[300px]">
                                    <TabsList>
                                        <TabsTrigger value="all-constituencies" type="">All Constituencies</TabsTrigger>
                                        <TabsTrigger value="selected-cons-1">Bury North</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="all-constituencies" className="flex flex-col gap-4">
                                        <ReportsConsItem
                                            consName="Coventry South"
                                            firstIn2019="Labour"
                                            secondIn2019="Conservative"
                                            mpName="Zarah Sultana"
                                            mpImgUrl="https://www.localintelligencehub.com/media/person/mp_4786_7qDOwxw.jpeg"
                                        />
                                        <ReportsConsItem
                                            consName="Bury North"
                                            firstIn2019="Conservative"
                                            secondIn2019="Labour"
                                            mpName="James Daly"
                                            mpImgUrl="https://www.localintelligencehub.com/media/person/mp_4854_BxRRx9j.jpeg"



                                        />
                                        <ReportsConsItem
                                            consName="Camberwell and Peckham"
                                            firstIn2019="Labour"
                                            secondIn2019="Conservative"
                                            mpName="Harriet Harman"
                                            mpImgUrl="https://www.localintelligencehub.com/media/person/mp_150_rgMOVq7.jpeg"



                                        />
                                    </TabsContent>
                                    <TabsContent value="selected-cons-1">Change your password here.</TabsContent>
                                </Tabs>


                            </CardHeader>

                        </Card>
                    )}

                </div>
            </div>
        </main>
    );
=======
type Params = {
  id: string
>>>>>>> 575f98ecfe19ee6a0a508230979a738ff62e70fd
}

export default function Page({ params: { id } }: { params: Params }) {
  const client = useApolloClient();
  const report = useQuery<GetMapReportQuery, GetMapReportQueryVariables>(GET_MAP_REPORT, {
    variables: { id },
  });
  const router = useRouter();

  const [isDataConfigOpen, setDataConfigOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const toggleDataConfig = () => setDataConfigOpen(!isDataConfigOpen);

  const [isConsDataOpen, setConsDataOpen] = useState(false);
  const toggleConsData = () => setConsDataOpen(!isConsDataOpen);

  if (!report.loading && report.called && !report.data?.mapReport) {
    return (
      <main className="absolute w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Card className="p-4 bg-white border-1 border-meepGray-700 text-meepGray-800">
            <CardHeader>
              <CardTitle className="text-hMd grow font-IBMPlexSansMedium">
                Report not found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                The report you are looking for does not exist.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <ReportContext.Provider value={{ 
      id,
      update: updateMutation
    }}>
      <main className="absolute w-full h-full">
        <div className='w-full h-full'>
          <ReportMap />
        </div>
        <div className="absolute top-5  left-5 right-0 w-0">
          <div className="flex flex-col items-start gap-4">
            <Card className="w-[200px] p-4 bg-white border-1 border-meepGray-700 text-meepGray-800">
              <CardHeader className="flex flex-row items-center mb-4">
                <CardTitle contentEditable id="nickname" className="text-hMd grow font-IBMPlexSansMedium" onBlur={d => {
                  updateMutation({
                    name: document.getElementById("nickname")?.textContent?.trim()
                  })
                }}>
                  {report.data?.mapReport.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className='w-3' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuLabel>Report Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Invite</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDeleteOpen(true)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <ToggleGroup type="multiple" variant="outline">
                  {/* @ts-ignore */}
                  <ToggleGroupItem value="a" type="outline" className="p-3 flex gap-2" onClick={toggleDataConfig}>
                    <Layers className="w-4" /> Data Configuration
                  </ToggleGroupItem>
                  {/* @ts-ignore */}
                  <ToggleGroupItem value="b" type="outline" className="p-3 flex gap-2" onClick={toggleConsData}>
                    <BarChart3 className="w-4" /> Constituency Data
                  </ToggleGroupItem>
                </ToggleGroup>
              </CardContent>
            </Card>
            {isDataConfigOpen && (
              <DataConfigPanel />
            )}
            {isConsDataOpen && (
              <Card className="absolute right-5 p-4 bg-meepGray-800 border-1 text-meepGray-200 border border-meepGray-700">
                <CardHeader>
                  <Tabs defaultValue="all-constituencies" className="w-[300px]">
                    <TabsList>
                      <TabsTrigger value="all-constituencies">All Constituencies</TabsTrigger>
                      <TabsTrigger value="selected-cons-1">Bury North</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all-constituencies" className="flex flex-col gap-4">
                      <ReportsConsItem
                        consName="Coventry South"
                        firstIn2019="Labour"
                        secondIn2019="Conservative"
                        mpName="Zarah Sultana"
                        mpImgUrl="https://www.localintelligencehub.com/media/person/mp_4786_7qDOwxw.jpeg"
                      />
                      <ReportsConsItem
                        consName="Bury North"
                        firstIn2019="Conservative"
                        secondIn2019="Labour"
                        mpName="James Daly"
                        mpImgUrl="https://www.localintelligencehub.com/media/person/mp_4854_BxRRx9j.jpeg"
                      />
                      <ReportsConsItem
                        consName="Camberwell and Peckham"
                        firstIn2019="Labour"
                        secondIn2019="Conservative"
                        mpName="Harriet Harman"
                        mpImgUrl="https://www.localintelligencehub.com/media/person/mp_150_rgMOVq7.jpeg"
                      />
                    </TabsContent>
                    <TabsContent value="selected-cons-1">Change your password here.</TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>
      </main>
      <AlertDialog open={deleteOpen} onOpenChange={() => setDeleteOpen(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This action cannot be undone. This will permanently delete
              this report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className={buttonVariants({ variant: "outline" })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                del();
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              Confirm delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ReportContext.Provider>
  );

  function updateMutation (input: MapReportInput) {
    const update = client.mutate<UpdateMapReportMutation, UpdateMapReportMutationVariables>({
      mutation: UPDATE_MAP_REPORT,
      variables: {
        input: {
          id,
          ...input
        }
      }
    })
    toastPromise(update, {
      loading: "Saving...",
      success: (d) => {
        if (!d.errors && d.data) {
          console.log(input, Object.keys(input))
          return {
            title: "Report saved",
            description: `Updated ${Object.keys(input).map(spaceCase).join(", ")}`
          }
        } else {
          throw new Error("Couldn't save report")
        }
      },
      error: `Couldn't save report`,
    });
  }

  function del () {
    const deleteMutation = client.mutate<DeleteMapReportMutation, DeleteMapReportMutationVariables>({
      mutation: DELETE_MAP_REPORT,
      variables: {
        id: { id }
      }
    })
    toast.promise(deleteMutation, {
      loading: "Deleting...",
      success: (d: FetchResult) => {
        if (!d.errors && d.data) {
          router.push("/reports");
          return "Deleted report";
        }
      },
      error: `Couldn't delete report`,
    });
  }
}

const GET_MAP_REPORT = gql`
  query GetMapReport($id: ID!) {
    mapReport(pk: $id) {
      id
      name
      ... MapReportPage
    }
  }
  ${MapReportPageFragmentStr}
`

const UPDATE_MAP_REPORT = gql`
  mutation UpdateMapReport($input: MapReportInput!) {
    updateMapReport(data: $input) {
      ... MapReportPage
    }
  }
  ${MapReportPageFragmentStr}
`

const DELETE_MAP_REPORT = gql`
  mutation DeleteMapReport($id: IDObject!) {
    deleteMapReport(data: $id) {
      id
    }
  }
`