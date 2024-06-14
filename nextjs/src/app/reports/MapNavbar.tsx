'use client'

import React from 'react'
import Link from 'next/link'
import { MappedIcon } from '@/components/navbar'
import { Provider as JotaiProvider, atom, useAtom, useAtomValue } from "jotai";
import { MAP_REPORT_FRAGMENT, isConstituencyPanelOpenAtom, isDataConfigOpenAtom } from "@/lib/map";
import { MAP_REPORT_LAYER_ANALYTICS, ReportMap, selectedConstituencyAtom } from "@/components/report/ReportMap";

import { BarChart3, Layers, MoreVertical, RefreshCcw, Trash } from "lucide-react"
import { twMerge } from "tailwind-merge";








export default function MapNavbar() {
  // const[isDataConfigOpen, setDataConfigOpen] = useAtom(isDataConfigOpenAtom);
  // const toggleDataConfig = () => setDataConfigOpen(b => !b);
  // const [isConstituencyPanelOpen, setConstituencyPanelOpen] = useAtom(isConstituencyPanelOpenAtom);
  // const [selectedConstituency, setSelectedConstituency] = useAtom(selectedConstituencyAtom);
  // const toggleConsData = () => {
  //   setConstituencyPanelOpen(b => {
  //     if (b) {
  //       setSelectedConstituency(null)
  //     }
  //     return !b
  //   })
  // }

  // const toggles = [
  //   {
  //     icon: Layers,
  //     label: "Map layers",
  //     enabled: isDataConfigOpen,
  //     toggle: toggleDataConfig
  //   },
  //   {
  //     icon: BarChart3,
  //     label: "Constituency data",
  //     enabled: isConstituencyPanelOpen,
  //     toggle: toggleConsData
  //   }
  // ]

  return (
    <nav className='sticky top-0 shrink-0 flex flex-row justify-between  items-center gap-md font-IBMPlexSans border-b border-meepGray-700 px-sm'>
      <div className='flex gap-4 items-center'>
      <Link href='/' className="py-sm w-12 border-r border-meepGray-700"><MappedIcon /></Link>
      <div className='flex gap-2 text-meepGray-300'>Report Name <p>•</p>124 Members</div>
      </div>
      <div className='flex gap-4 items-center'>
        {/* {toggles.map(({ icon: Icon, label, enabled, toggle }) => (
          <div
            key={label}
            className=' px-0 flex flex-row gap-2 overflow-hidden text-nowrap text-ellipsis cursor-pointer'
            onClick={toggle}>
            <div className={twMerge(
              ' rounded flex gap-2',
              enabled ? "bg-meepGray-800" : "bg-meepGray-100"
            )}>
              <Icon className={twMerge(
                "w-4  ",
                enabled && "text-white"
              )} />
            {label}
            </div>
          </div>
        ))} */}

      </div>
        <div>Share</div>

    </nav>
  )
}
