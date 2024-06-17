// page.js
"use client";

import { useContext, useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ArrowLeft, BarChart3, Layers, MoreVertical, RefreshCcw, Settings, Trash } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import DataConfigPanel from "@/components/dataConfig";
import { FetchResult, gql, useApolloClient, useQuery } from "@apollo/client";
import { toast } from "sonner";
import { AnalyticalAreaType, DeleteMapReportMutation, DeleteMapReportMutationVariables, GetMapReportQuery, GetMapReportQueryVariables, MapReportInput, MapReportLayerAnalyticsQuery, MapReportLayerAnalyticsQueryVariables, UpdateMapReportMutation, UpdateMapReportMutationVariables } from "@/__generated__/graphql";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import spaceCase from 'to-space-case'
import { toastPromise } from "@/lib/toast";
import { MAP_REPORT_LAYER_ANALYTICS, ReportMap, selectedConstituencyAtom } from "@/components/report/ReportMap";
import { MAP_REPORT_FRAGMENT, isConstituencyPanelOpenAtom, isDataConfigOpenAtom } from "@/lib/map";
import { DisplayOptionsType, ReportContext, defaultDisplayOptions } from "./context";
import { LoadingIcon } from "@/components/ui/loadingIcon";
import { contentEditableMutation } from "@/lib/html";
import { Provider as JotaiProvider, atom, useAtom, useAtomValue } from "jotai";
import { ConstituenciesPanel } from "./ConstituenciesPanel";
import { MapProvider } from "react-map-gl";
import { twMerge } from "tailwind-merge";
import { merge } from 'lodash'
import { currentOrganisationIdAtom } from "@/data/organisation";
import Link from "next/link";
import { MappedIcon } from "@/components/navbar";

type Params = {
  id: string
}

export default function Page({ params: { id } }: { params: Params }) {
  const client = useApolloClient();
  const router = useRouter();

  const report = useQuery<GetMapReportQuery, GetMapReportQueryVariables>(GET_MAP_REPORT, {
    variables: { id },
  });

  const orgId = useAtomValue(currentOrganisationIdAtom);

  useEffect(() => {
    if (orgId && report.data && report.data.mapReport.organisation.id !== orgId) {
      router.push("/reports");
    }
  }, [orgId, report, router])

  const displayOptions = merge({}, defaultDisplayOptions, report.data?.mapReport?.displayOptions || {})

  const updateDisplayOptions = (options: Partial<DisplayOptionsType>) => {
    updateMutation({ displayOptions: { ...displayOptions, ...options } })
  };

  return (
    <MapProvider>
      <JotaiProvider key={id}>
        <ReportContext.Provider value={{
          id,
          report,
          updateReport: updateMutation,
          deleteReport: del,
          refreshReportDataQueries,
          displayOptions,
          setDisplayOptions: updateDisplayOptions
        }}>
          <ReportPage />
        </ReportContext.Provider>
      </JotaiProvider>
    </MapProvider>
  )

  function refreshReportDataQueries() {
    toastPromise(
      client.refetchQueries({
        include: [
          "GetMapReport",
          "MapReportPage",
          "MapReportLayerAnalytics",
          "GetConstituencyData",
          "MapReportRegionStats",
          "MapReportConstituencyStats",
          "MapReportWardStats"
        ],
      }),
      {
        loading: "Refreshing report data...",
        success: "Report data updated",
        error: `Couldn't refresh report data`,
      }
    )
  }

  function updateMutation(input: MapReportInput) {
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
          if ('layers' in input) {
            // If layers changed, that means
            // all the member numbers will have changed too.
            refreshReportDataQueries()
          }
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

  function del() {
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

function ReportPage() {
  const { report, updateReport, deleteReport, refreshReportDataQueries } = useContext(ReportContext);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDataConfigOpen, setDataConfigOpen] = useAtom(isDataConfigOpenAtom);
  const toggleDataConfig = () => setDataConfigOpen(b => !b);
  const [isConstituencyPanelOpen, setConstituencyPanelOpen] = useAtom(isConstituencyPanelOpenAtom);
  const [selectedConstituency, setSelectedConstituency] = useAtom(selectedConstituencyAtom);
  const toggleConsData = () => {
    setConstituencyPanelOpen(b => {
      if (b) {
        setSelectedConstituency(null)
      }
      return !b
    })
  }

  useEffect(() => {
    // @ts-ignore
    if (!report?.data?.mapReport?.layers?.length) {
      return setConstituencyPanelOpen(false)
    }
  }, [selectedConstituency, report])

  if (!report?.loading && report?.called && !report?.data?.mapReport) {
    return (
      <div className="absolute w-full h-full">
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
      </div>
    )
  }

  const toggles = [
    // {
    //   icon: Layers,
    //   label: "Map layers",
    //   enabled: isDataConfigOpen,
    //   toggle: toggleDataConfig
    // },
    {
      icon: BarChart3,
      label: "Constituency data",
      enabled: isConstituencyPanelOpen,
      toggle: toggleConsData
    }
  ]

  return (
    <>
      <nav className='sticky top-0 shrink-0 flex flex-row justify-between  items-center gap-md font-IBMPlexSans border-b border-meepGray-700 px-sm'>
        <div className='flex gap-4 items-center'>
          <Link href='/' className="py-sm w-12 border-r border-meepGray-700"><MappedIcon /></Link>
          <div className='flex gap-2 text-meepGray-300'>
            {report?.loading && !report?.data?.mapReport ? (
              <p>
                Loading...
              </p>
            ) : (
              <>
                <div
                  id="nickname"
                  className=""
                  {...contentEditableMutation(updateReport, "name", "Untitled Report")}
                >
                  {report?.data?.mapReport.name}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className='w-3' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    {report?.data?.mapReport && (
                      <DropdownMenuItem onClick={refreshReportDataQueries}>
                        <RefreshCcw className='w-4 mr-2' />
                        Refresh
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => setDeleteOpen(true)} className='text-red-400'>
                      <Trash className='w-4 mr-2' />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
        <div className='flex gap-4 items-center'>


        </div>
        <Dialog>
          <DialogTrigger className="bg-meepGray-700 rounded border  flex gap-2 items-center  px-3 py-1 border-meepGray-600 text-sm text-white flex-row overflow-hidden text-nowrap text-ellipsis cursor-pointer">
            <Settings />Settings</DialogTrigger>
          <DialogContent className="w-[600px]">
            <DialogHeader>
              <DialogTitle>Map Settings</DialogTitle> 
              <DialogDescription>
                <DataConfigPanel />
                Struggling to find what you're looking for? Provide feedback <a href="" className="underline">here</a>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {/* <a href="/reports/" className='rounded px-3 py-1 border bg-meepGray-800 border-meepGray-700 items-center text-sm text-white flex flex-row gap-2 overflow-hidden text-nowrap text-ellipsis cursor-pointer '><ArrowLeft></ArrowLeft>Back to Maps</a> */}

      </nav>
      <div className="absolute w-full h-[calc(100%-74px)] flex flex-row pointer-events-none">
        <aside className="h-full pointer-events-auto">
          {/* Data config card */}
          {report?.data?.mapReport && isDataConfigOpen && (
            <DataConfigPanel />
          )}
        </aside>
        <div className='w-full h-full pointer-events-auto'>
          <div className="absolute z-20 top-4 left-4">
            {toggles.map(({ icon: Icon, label, enabled, toggle }) => (
              <div
                key={label}
                className='text-sm text-white flex flex-row gap-2 overflow-hidden text-nowrap text-ellipsis cursor-pointer '
                onClick={toggle}>
                <div className={twMerge(
                  ' rounded flex gap-2 items-center  px-3 py-1 border ',
                  enabled ? "bg-meepGray-500 border-meepGray-500" : "bg-meepGray-700 border-meepGray-500"
                )}>
                  <Icon className={twMerge(
                    "w-4 text-meeGray-300 ",
                    enabled && "text-white"
                  )} />
                  {label}
                </div>
              </div>
            ))}
          </div>

          <ReportMap />
        </div>
        {/* Layer card */}
        {report?.data?.mapReport && isConstituencyPanelOpen && (
          <aside className="h-full">
            <ConstituenciesPanel />
          </aside>
        )}
      </div>
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
                deleteReport();
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              Confirm delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const GET_MAP_REPORT = gql`
  query GetMapReport($id: ID!) {
    mapReport(pk: $id) {
      id
      name
      slug
      displayOptions
      organisation {
        id
        slug
        name
      }
      ... MapReportPage
    }
  }
  ${MAP_REPORT_FRAGMENT}
`

// Keep this fragment trim
// so that updates return fast
const UPDATE_MAP_REPORT = gql`
  mutation UpdateMapReport($input: MapReportInput!) {
    updateMapReport(data: $input) {
      id
      name
      displayOptions
      layers {
        id
        name
        source {
          id
          name
        }
      }
    }
  }
`

const DELETE_MAP_REPORT = gql`
  mutation DeleteMapReport($id: IDObject!) {
    deleteMapReport(data: $id) {
      id
    }
  }
`

