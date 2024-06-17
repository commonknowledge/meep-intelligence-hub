import { selectedConstituencyAtom } from "@/components/report/ReportMap"
import { atom, useAtom } from "jotai"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreVertical } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConstituencyElectionDeepDive } from "@/components/reportsConstituencyItem";
import { TopConstituencies } from "@/components/TopConstituencies";
import { useEffect, useRef, useState } from "react";
import { useReportContext } from "./context";
import MembersList from "@/components/MembersList"
import ConsSettings from "@/components/ConsSettings"


export const constituencyPanelTabAtom = atom("list")


export function ConstituenciesPanel() {
  const [
    selectedConstituencyId,
    setSelectedConstituency,
  ] = useAtom(selectedConstituencyAtom)
  const [tab, setTab] = useAtom(constituencyPanelTabAtom)
  const { displayOptions: { analyticalAreaType } } = useReportContext()

  const lastCons = useRef(selectedConstituencyId)
  // useEffect(() => {
  //   if (selectedConstituencyId && selectedConstituencyId !== lastCons.current) {
  //     return setTab("selected")
  //   } else if (!selectedConstituencyId) {
  //     return setTab("list")
  //   }
  // }, [selectedConstituencyId, setTab])

  return (
    <div className="bg-meepGray-800 text-meepGray-200 border-l border-meepGray-700 max-h-full flex flex-col pointer-events-auto w-[600px]">
      <div className='p-3 flex flex-row justify-between items-center'>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className='w-3' />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" align="start">
              <ConsSettings />
            </DropdownMenuContent>
          </DropdownMenu>
          <h2 className="">Constituency Data</h2>
        </div>


        {/* <X className='w-4 cursor-pointer' onClick={() => { setOpen(false) }} /> */}

      </div>
      <Tabs value={tab} onValueChange={setTab} className='border-meepGray-700 flex flex-col max-h-full overflow-hidden items-start justify-start'>
        <TabsList className='w-full p-0 pt-2 px-2 justify-start rounded-none'>
          <TabsTrigger value="list" className="text-white data-[state=active]:text-white data-[state=active]:rounded-none data-[state=active]:rounded-t data-[state=active]:bg-meepGray-800 text-dataName uppercase">All</TabsTrigger>
          {!!selectedConstituencyId && (
            <TabsTrigger value="selected" className="text-white data-[state=active]:text-white data-[state=active]:rounded-none data-[state=active]:rounded-t data-[state=active]:bg-meepGray-800 text-dataName uppercase">
              Selected
            </TabsTrigger>
          )}
          <TabsTrigger value="members" className="text-white data-[state=active]:text-white data-[state=active]:rounded-none data-[state=active]:rounded-t data-[state=active]:bg-meepGray-800 text-dataName uppercase">
            Members
          </TabsTrigger>
        </TabsList>
        {/* Don't stretch, grow at most to height of window, scroll internally */}
        <div className='overflow-y-auto max-h-full px-4 w-full'>
          <TabsContent value="list" className="pb-4">
            <div className="flex gap-4">

              <TopConstituencies />
              <div>
                {!!selectedConstituencyId && (
                  <ConstituencyElectionDeepDive gss={selectedConstituencyId} analyticalAreaType={analyticalAreaType} />
                )}
              </div>
            </div>
          </TabsContent>
          {!!selectedConstituencyId && (
            <TabsContent value="selected" className="pb-4">
              <ConstituencyElectionDeepDive gss={selectedConstituencyId} analyticalAreaType={analyticalAreaType} />
            </TabsContent>
          )}
          <TabsContent value="members" className="pb-4">
            <MembersList />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}