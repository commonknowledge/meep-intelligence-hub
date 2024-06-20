
"use client"

import { GetConstituencyDataQuery, GetConstituencyDataQueryVariables, AnalyticalAreaType } from "@/__generated__/graphql";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import ConsSettings from "@/components/ConsSettings"
import { MoreVertical } from "lucide-react"
import { gql, useQuery } from "@apollo/client";
import { getYear } from "date-fns";
import { format } from 'd3-format'
import pluralize from "pluralize";

import Image from "next/image";
import { ReportContext, useReportContext } from "@/app/reports/[id]/context";
import { useContext } from "react";
import { layerColour } from "@/lib/map";
import { AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LoadingIcon } from "./ui/loadingIcon";
import { twMerge } from "tailwind-merge";
import { BACKEND_URL } from "@/env";

type Party = {
  name: string;
  shade: string;
}

type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

export const SelectedConstituency = ({ gss, analyticalAreaType = AnalyticalAreaType.ParliamentaryConstituency_2025 }: { gss: string, analyticalAreaType: AnalyticalAreaType }) => {
  const { id, displayOptions } = useContext(ReportContext)
  const { data, loading, error } = useQuery<GetConstituencyDataQuery, GetConstituencyDataQueryVariables>(CONSTITUENCY_DATA, {
    variables: { gss, reportID: id, analyticalAreaType },
  })

  if (!loading && error) return <div>Error loading constituency {gss}</div>
  if (!data?.constituency || !data.mapReport) return <div className='flex flex-row items-center justify-center p-4 gap-2'>
    <LoadingIcon size={"20px"} className='inline-block' />
    <span>Loading constituency...</span>
  </div>

  const layersInThisConstituency = data.mapReport.layers
    .map((l, index) => ({ ...l, index }))
    .filter(l => !!l.source.importedDataCountForConstituency?.count)

  return (
    <div key={data.constituency.id} className='divide-y space-y-4 p-4 overflow-y-scroll'>
      <div className="flex gap-2 justify-between">

      <DropdownMenu>
      <h2 className='text-xl font-IBMPlexSansSemiBold'>{data.constituency.name}</h2>
        <DropdownMenuTrigger>
          <MoreVertical className='w-3' />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left" align="start">
          <ConsSettings />
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
      {data.constituency.mp && displayOptions.showMPs && (
        <section className='mb-8'>
          <div className='uppercase font-IBMPlexMono text-xs text-meepGray-400 mb-1'>
            MP
          </div>
          <Person
            img={data.constituency.mp.photo?.url}
            name={data.constituency.mp.name}
            subtitle={data.constituency.mp.party?.name}
          />
        </section>
      )}
      {!!data.constituency.lastElection && displayOptions.showLastElectionData && (
        <section className='font-IBMPlexMono mb-10'>
          <section>
            {/* First and second parties */}
            <article className='relative z-10 space-y-1'>
              <div className='uppercase text-xs text-meepGray-400'>
                1st in {getYear(data.constituency.lastElection.stats.date)}
              </div>
              <div>{data.constituency.lastElection.stats.firstPartyResult.party}</div>
              <div className='rounded w-full h-4' style={{ backgroundColor: data.constituency.lastElection.stats.firstPartyResult.shade }} />
            </article>
            <article className='relative z-10 pt-6'>
              <div
                aria-roledescription="Margin between first and second party votes"
                className='bg-meepGray-700 border-l border-r border-meepGray-400 absolute right-0 top-0 h-full z-0'
                style={{
                  width: format(".0%")(
                    1 - (
                      data.constituency.lastElection.stats.secondPartyResult.votes /
                      data.constituency.lastElection.stats.firstPartyResult.votes
                    )
                  )
                }}
              />
              <div className='relative z-10 space-y-1'>
                <div className='uppercase text-xs text-meepGray-400'>
                  2nd in {getYear(data.constituency.lastElection.stats.date)}
                </div>
                <div>{data.constituency.lastElection.stats.secondPartyResult.party}</div>
                <div className='rounded h-4' style={{
                  backgroundColor: data.constituency.lastElection.stats.secondPartyResult.shade,
                  width: format(".0%")(
                    data.constituency.lastElection.stats.secondPartyResult.votes /
                    data.constituency.lastElection.stats.firstPartyResult.votes
                  )
                }} />
              </div>
            </article>
          </section>
          <section className='grid grid-cols-2 gap-6 mt-8'>
            {/* Voting stats */}
            <article>
              <div className='uppercase text-xs text-meepGray-400'>Majority</div>
              <div>{format(",")(data.constituency.lastElection.stats.majority)}</div>
            </article>
            <article>
              <div className='uppercase text-xs text-meepGray-400'>Swing to lose</div>
              <div>{format(".2%")(data.constituency.lastElection.stats.majority / data.constituency.lastElection.stats.electorate)}</div>
            </article>
            <article>
              <div className='uppercase text-xs text-meepGray-400'>Electorate</div>
              <div>{format(",")(data.constituency.lastElection.stats.electorate)}</div>
            </article>
            <article>
              <div className='uppercase text-xs text-meepGray-400'>Turnout</div>
              <div>{format(".2%")(data.constituency.lastElection.stats.validVotes / data.constituency.lastElection.stats.electorate)}</div>
            </article>
          </section>
        </section>
      )}
      {!!data.mapReport.importedDataCountForConstituency && (
        <MemberElectoralInsights
          totalCount={data.mapReport.importedDataCountForConstituency.count}
          layersInThisConstituency={layersInThisConstituency}
          electionStats={data.constituency.lastElection?.stats}
        />
      )}
    </div>
  )
}

export function MemberElectoralInsights({
  totalCount,
  electionStats,
  layersInThisConstituency,
  bg = "bg-meepGray-800"
}: {
  bg?: string,
  totalCount: number;
  electionStats?: {
    date: string;
    majority: number;
    firstPartyResult: {
      votes: number
    }
  }
  layersInThisConstituency?: Array<{
    name: string;
    index: any;
    source: {
      id: any;
      importedDataCountForConstituency?: {
        count: number | null;
      } | null
    }
  }>
}) {
  const maxCount = Math.max(
    // Member count
    totalCount,
    // First party votes
    electionStats?.firstPartyResult.votes || 0,
  )
  const { displayOptions } = useReportContext();

  return (
    <>
      <div className='text-xs text-meepGray-300'>
        {format(",")(totalCount)} {pluralize("member", totalCount)} in this report
      </div>
      {/* <section className='border border-meepGray-500 rounded relative p-2 mt-2'>
      

        <div className={twMerge('absolute -top-2 left-2 px-1 text-meepGray-400 uppercase text-xs inline-flex flex-row items-center gap-1', bg)}>
          <OverlapIcon /> Member insights
        </div>
        <div className='space-y-3 pt-2 pb-1'>
          <article className='relative z-10 space-y-1'>
            <div className='text-xs'>
              {format(",")(totalCount)} {pluralize("member", totalCount)} in this report
            </div>
            {layersInThisConstituency?.length ? (
              <div className='flex flex-row'>
                {layersInThisConstituency.map((layer) => (
                  <TooltipProvider key={layer.source.id}>
                    <Tooltip delayDuration={250}>
                      <TooltipTrigger asChild>
                        <div className='rounded h-4' style={{
                          width: format(".0%")(
                            Math.min(
                              Math.max(
                                (totalCount || 0) / maxCount,
                                0.04
                              ),
                              1
                            )
                          ),
                          backgroundColor: layerColour(layer.index, layer.source.id)
                        }} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {format(",")(
                            totalCount || 0
                          )} {pluralize("member",
                            totalCount || 0
                          )} in {layer.name}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            ) : totalCount ? (
              <div className='rounded h-4 bg-brandBlue' style={{
                width: format(".0%")(
                  Math.min(
                    Math.max(
                      totalCount / maxCount,
                      0.04
                    ),
                    1
                  )
                )
              }} />
            ) : (
              <div>
                No member data in this constituency
              </div>
            )}
          </article>
          {electionStats && (
            <>
              {displayOptions.showLastElectionData && (
                <article className='relative z-10 space-y-1'>
                  <div className='text-xs'>
                    {format(",")(electionStats?.majority)} winning margin in {getYear(new Date(electionStats?.date))}
                  </div>
                  <div className='rounded w-full h-4 bg-meepGray-200' style={{
                    width: format(".0%")(
                      Math.min(
                        Math.max(
                          electionStats?.majority / maxCount,
                          0.04
                        ),
                        1
                      )
                    )
                  }} />
                </article>
              )}
              {displayOptions.showLastElectionData && totalCount > 0.75 * electionStats.majority && (
                <div className='uppercase font-IBMPlexMono bg-meepGray-700 rounded flex flex-row items-center justify-center text-xs py-2 px-2 gap-1'>
                  <AlertTriangle className='w-4 h-4' /> High impact constituency
                </div>
              )}
            </>
          )}
        </div>
      </section> */}
    </>
  )
}

export function OverlapIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.29765 8.99395C6.65035 9.41072 5.87973 9.65253 5.05263 9.65253C2.7592 9.65253 0.9 7.79333 0.9 5.4999C0.9 3.20646 2.7592 1.34727 5.05263 1.34727C5.87973 1.34727 6.65034 1.58907 7.29765 2.00584C6.42866 2.9133 5.89478 4.14425 5.89478 5.4999C5.89478 6.85554 6.42867 8.08649 7.29765 8.99395ZM8.00002 9.60426C7.17044 10.201 6.15258 10.5525 5.05263 10.5525C2.26214 10.5525 0 8.29039 0 5.4999C0 2.70941 2.26214 0.447266 5.05263 0.447266C6.15258 0.447266 7.17044 0.798751 8.00002 1.39553C8.8296 0.798751 9.84745 0.447266 10.9474 0.447266C13.7379 0.447266 16 2.70941 16 5.4999C16 8.29039 13.7379 10.5525 10.9474 10.5525C9.84745 10.5525 8.8296 10.201 8.00002 9.60426ZM8.70239 2.00584C9.3497 1.58907 10.1203 1.34727 10.9474 1.34727C13.2408 1.34727 15.1 3.20646 15.1 5.4999C15.1 7.79333 13.2408 9.65253 10.9474 9.65253C10.1203 9.65253 9.3497 9.41072 8.70239 8.99395C9.57138 8.08649 10.1053 6.85554 10.1053 5.4999C10.1053 4.14425 9.57138 2.91331 8.70239 2.00584ZM8.00002 2.57462C8.74501 3.32521 9.20526 4.3588 9.20526 5.4999C9.20526 6.64099 8.74501 7.67459 8.00002 8.42517C7.25503 7.67459 6.79478 6.64099 6.79478 5.4999C6.79478 4.3588 7.25503 3.32521 8.00002 2.57462Z" fill="#969EB0" />
      <path opacity="0.5" d="M8.00005 2.57422C8.74504 3.32481 9.20529 4.3584 9.20529 5.4995C9.20529 6.64059 8.74504 7.67418 8.00005 8.42477C7.25506 7.67418 6.7948 6.64059 6.7948 5.4995C6.7948 4.3584 7.25506 3.32481 8.00005 2.57422Z" fill="#969EB0" />
    </svg>
  )
}

export function Person({ img, name, subtitle }: { img?: string, name: string, subtitle?: string }) {
  return (
    <div className='flex flex-row items-center gap-2'>
      {!!img && (
        <img
          src={new URL(img, BACKEND_URL).toString()}
          alt={name} width={41} height={41} className='rounded-full'
        />
      )}
      <div className='font-IBMPlexMono -space-y-1'>
        <div>{name}</div>
        {!!subtitle && <div className='text-meepGray-400'>{subtitle}</div>}
      </div>
    </div>
  );
}

export const ConstituencyElectionCard = ({
  name, firstParty2019, secondParty2019, mpName, mpImgUrl
}: {
  name: string;
  firstParty2019?: Partial<DeepNullable<Party>> | null;
  secondParty2019?: Partial<DeepNullable<Party>> | null;
  mpName?: string;
  mpImgUrl?: string;
}) => {
  return (
    <Card className="p-4 bg-meepGray-700 text-white">
      <CardHeader>
        <CardTitle className="font-PPRightGrotesk text-hLgPP mb-4 ">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex gap-6">
          {!!firstParty2019 && (
            <div className="flex flex-col gap-1">
              <p className="text-dataName font-IBMPlexSansCondensed uppercase text-meepGray-300">First in 2019</p>
              <div className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full`} style={{
                  backgroundColor: firstParty2019.shade || "gray"
                }}></div>
                <p className="text-dataResult font-IBMPlexMono">
                  {firstParty2019.name}
                </p>
              </div>
            </div>
          )}
          {!!firstParty2019 && !!secondParty2019 && (
            <div className="flex flex-col gap-1">
              <p className="text-dataName font-IBMPlexSansCondensed uppercase text-meepGray-300">Second in 2019</p>
              <div className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full`} style={{
                  backgroundColor: secondParty2019.shade || "gray"
                }}></div>
                <p className="text-dataResult font-IBMPlexMono">
                  {secondParty2019.name}
                </p>
              </div>
            </div>
          )}
        </div>
        {mpName && (
          <div className="flex flex-col gap-1">
            <p className="text-dataName font-IBMPlexSansCondensed uppercase text-meepGray-300 mb-2">
              Member of Parliment
            </p>
            <div className="flex items-center gap-1">
              {mpImgUrl && (
                <Image
                  className="rounded-full"
                  src={mpImgUrl}
                  width="50"
                  height="50"
                  alt=""
                />
              )}
              <div className="flex flex-col gap-1">
                <p className="text-dataResult font-IBMPlexMono">{mpName}</p>
                <p className="text-xs Name font-IBMPlexMono uppercase text-meepGray-400">
                  {firstParty2019?.name}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
};


const CONSTITUENCY_DATA = gql`
  query GetConstituencyData($analyticalAreaType: AnalyticalAreaType!, $gss: String!, $reportID: ID!) {
    constituency: area(gss: $gss) {
      id
      name
      mp: person(filters:{personType:"MP"}) {
        id
        name
        photo {
          url
        }
        party: personDatum(filters:{
          dataType_Name: "party"
        }) {
          name: data
          shade
        }
      }
      lastElection {
        stats {
          date
          electorate
          validVotes
          majority
          firstPartyResult {
            party
            shade
            votes
          }
          secondPartyResult {
            party
            shade
            votes
          }
        }
      }
    }
    mapReport(pk: $reportID) {
      id
      importedDataCountForConstituency: importedDataCountForArea(analyticalAreaType: $analyticalAreaType, gss: $gss) {
        gss
        count
      }
      layers {
        id
        name
        source {
          id
          importedDataCountForConstituency: importedDataCountForArea(analyticalAreaType: $analyticalAreaType, gss: $gss) {
            gss
            count
          }
        }
      }
    }
  }
`
