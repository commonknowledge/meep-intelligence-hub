import { ConstituencyStatsOverviewQuery, ConstituencyStatsOverviewQueryVariables } from "@/__generated__/graphql"
import { ReportContext, useReportContext } from "@/app/reports/[id]/context"
import { gql, useQuery } from "@apollo/client"
import { useContext, useState } from "react"
import { MemberElectoralInsights, Person } from "./SelectedConstituency"
import { getYear } from "date-fns"
import { useAtom } from "jotai"
import { MAX_CONSTITUENCY_ZOOM } from "./report/ReportMap"
import { LoadingIcon } from "./ui/loadingIcon"
import { useLoadedMap } from "@/lib/map"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { twMerge } from "tailwind-merge"
import { ArrowLeftToLine } from "lucide-react"
import ConstituenciesDropdown, { SelectableConstituency } from "./ConstituenciesDropdown"
import { selectedConstituencyAtom } from "@/app/reports/[id]/context";

export function NavigatorListSidebar() {
  const sortOptions = {
    totalCount: "Total Membership",
    electoralPower: "Electoral Power",
    populationDensity: "Population Density",
  }
  const [sortBy, setSortBy] = useState<keyof typeof sortOptions>("totalCount")
  const { displayOptions: { analyticalAreaType } } = useReportContext()

  const { id } = useContext(ReportContext)
  const constituencyAnalytics = useQuery<ConstituencyStatsOverviewQuery, ConstituencyStatsOverviewQueryVariables>(CONSTITUENCY_STATS_OVERVIEW, {
    variables: {
      reportID: id,
      analyticalAreaType
    }
  })
  const [selectedConstituency, setSelectedConstituency] = useAtom(selectedConstituencyAtom)
  const map = useLoadedMap()

  type RequiredConstituencyType = ConstituencyStatsOverviewQuery["mapReport"]["importedDataCountByConstituency"][number] & SelectableConstituency

  function isSelectable(constituency: ConstituencyStatsOverviewQuery["mapReport"]["importedDataCountByConstituency"][number]): constituency is RequiredConstituencyType {
    return !!constituency.gssArea && !!constituency.gss
  }

  const constituencies = constituencyAnalytics.data?.mapReport.importedDataCountByConstituency
    .filter(isSelectable)
    .sort((a, b) => {
      if (sortBy === "totalCount") {
        return b.count - a.count
      } else if (sortBy === "populationDensity") {
        return (b.count / (b?.gssArea?.lastElection?.stats?.electorate || 0)) - (a.count / (a?.gssArea?.lastElection?.stats?.electorate || 0))
      } else if (sortBy === "electoralPower") {
        return (b.count / (b?.gssArea?.lastElection?.stats?.majority || 0)) - (a.count / (a?.gssArea?.lastElection?.stats?.majority || 0))
      }
      return 0
    })

  if (constituencyAnalytics.loading && !constituencyAnalytics.data) return <div className='flex flex-row items-center justify-center p-4 gap-2'>
    <LoadingIcon size={"20px"} className='inline-block' />
    <span>Loading constituencies...</span>
  </div>

  return (
    // List of them here
    <div className='flex flex-col  border-r border-meepGray-700 w-[180px]'>
      <div className='flex flex-col items-stretch gap-2 text-sm p-3 border-b border-meepGray-700'>
        <div className="flex gap-2 mb-1">
          <ArrowLeftToLine />
          <h2 className="">Navigator</h2>
        </div>

        {!!constituencies && (
          <ConstituenciesDropdown
            constituencies={constituencies}
            setSelectedConstituency={setSelectedConstituency}
            map={map}
          />
        )}
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as keyof typeof sortOptions)}
        >
          <div>
            <SelectTrigger
              className={twMerge(
                " w-full max-w-[200px] text-xs [&_svg]:h-4 [&_svg]:w-4 h-full"
              )}
            >
              <span className="text-muted-foreground">Sort by:</span>
            </SelectTrigger>
            <SelectContent>
              <ScrollArea >
                {Object.entries(sortOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value} className="text-xs">
                    {label}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </div>
        </Select>
      </div>
      <div className="overflow-y-scroll">


        {constituencies?.map((constituency) => (
          <div
            key={constituency.gss}
            onClick={() => {
              setSelectedConstituency(constituency.gss!)
              map.loadedMap?.fitBounds(constituency.gssArea?.fitBounds, {
                maxZoom: MAX_CONSTITUENCY_ZOOM - 0.1
              })
            }}
            className='cursor-pointer group hover:bg-meepGray-600 border-b border-meepGray-700'
          >
            <ConstituencySummaryCard
              constituency={constituency.gssArea!}
              count={constituency.count}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConstituencySummaryCard({ count, constituency }: {
  constituency: NonNullable<
    ConstituencyStatsOverviewQuery["mapReport"]["importedDataCountByConstituency"][0]['gssArea']
  >
  count: number
}) {
  const { displayOptions } = useReportContext()

  return (
    <div className='p-3'>
      <h2 className='mb-1 text-sm'>{constituency.name}</h2>
      <MemberElectoralInsights
        totalCount={count}
        electionStats={constituency.lastElection?.stats}
        bg="text-meepGray-400"
      />
      {/* {!!constituency.mp?.name && displayOptions.showMPs && (
        <div className='mb-5 mt-4'>
          <Person
            name={constituency.mp?.name}
            subtitle={constituency.mp?.party?.name}
            img={constituency.mp?.photo?.url}
          />
        </div>
      )} */}
      {/* {!!constituency.lastElection?.stats && displayOptions.showLastElectionData && (
        <div className='flex justify-between mb-6'>
          <div className="flex flex-col gap-1">
            <p className="text-dataName font-IBMPlexSansCondensed uppercase text-meepGray-300">
              1st in {getYear(constituency.lastElection.stats.date)}
            </p>
            <div className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full`} style={{
                backgroundColor: constituency.lastElection.stats.firstPartyResult.shade || "gray"
              }}></div>
              <p className="text-dataResult font-IBMPlexMono">
                {constituency.lastElection.stats.firstPartyResult.party.replace(" Party", "")}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-dataName font-IBMPlexSansCondensed uppercase text-meepGray-300">
              2nd in {getYear(constituency.lastElection.stats.date)}
            </p>
            <div className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full`} style={{
                backgroundColor: constituency.lastElection.stats.secondPartyResult.shade || "gray"
              }}></div>
              <p className="text-dataResult font-IBMPlexMono">
                {constituency.lastElection.stats.secondPartyResult.party.replace(" Party", "")}
              </p>
            </div>
          </div>
        </div>
      )} */}

    </div>
  )
}

const CONSTITUENCY_STATS_OVERVIEW = gql`
  query ConstituencyStatsOverview ($reportID: ID!, $analyticalAreaType: AnalyticalAreaType!) {
    mapReport(pk: $reportID) {
      id
      importedDataCountByConstituency: importedDataCountByArea(analyticalAreaType: $analyticalAreaType) {
        label
        gss
        count
        gssArea {
          id
          name
          fitBounds
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
            }
          }
          lastElection {
            stats {
              date
              majority
              electorate
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
      }
    }
  }
`