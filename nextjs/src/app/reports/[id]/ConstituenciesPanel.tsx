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
    <div className="text-meepGray-200 flex flex-col pointer-events-auto w-[600px] h-full">
      <div className="flex h-full">
        <div className="w-1/3 border-r border-meepGray-600 h-full bg-meepGray-800">
          <div className="flex gap-2 mb-2 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className='w-3' />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="left" align="start">
                <ConsSettings />
              </DropdownMenuContent>
            </DropdownMenu>
            <h2 className="text-sm text-meepGray-300">Constituencies</h2>
          </div>
          <TopConstituencies />
        </div>
        <ConstituencyElectionDeepDive gss={selectedConstituencyId} analyticalAreaType={analyticalAreaType} />
      </div>
    </div>
  )
}