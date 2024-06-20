import { atom, useAtom } from "jotai"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { SelectedConstituency } from "@/components/SelectedConstituency";
import { NavigatorListSidebar } from "@/components/NavigatorListSidebar";
import { useEffect, useRef, useState } from "react";
import { selectedConstituencyAtom, useReportContext } from "@/app/reports/[id]/context";
import MembersList from "@/components/MembersList"



export const constituencyPanelTabAtom = atom("list")


export function ConstituenciesPanel() {
  const [
    selectedConstituencyId,
    setSelectedConstituency,
  ] = useAtom(selectedConstituencyAtom)
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
    <div className="flex flex-col pointer-events-auto w-[600px] h-full">
      <div className="flex h-full">
        {!!selectedConstituencyId && (
          <SelectedConstituency gss={selectedConstituencyId} analyticalAreaType={analyticalAreaType} />
        )}
      </div>
    </div>
  )
}