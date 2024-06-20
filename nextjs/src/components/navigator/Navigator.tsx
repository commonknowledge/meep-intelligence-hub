import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/navigator/Navigator-Tabs"
import { LocateFixed, User } from 'lucide-react'
import MembersList from '../MembersList'
import { NavigatorListSidebar } from '../NavigatorListSidebar'
import { selectedConstituencyAtom, useReportContext } from "@/app/reports/[id]/context";
import { useRef } from "react";
import { atom, useAtom } from "jotai"
import { SelectedConstituency } from "@/components/SelectedConstituency";





export default function Navigator() {
    const [selectedConstituencyId,setSelectedConstituency] = useAtom(selectedConstituencyAtom)
    const { displayOptions: { analyticalAreaType } } = useReportContext()

    const lastCons = useRef(selectedConstituencyId)
    return (
        <div className='pointer-events-auto w-full flex'>
            <NavigatorListSidebar />
            <Tabs defaultValue="members" className='w-full bg-meepGray-700'>
                <TabsList>
                    <TabsTrigger value="members"><User className='text-brandBlue' />Members</TabsTrigger>
                    <TabsTrigger value="constituency"><LocateFixed />Geography</TabsTrigger>
                </TabsList>
                <TabsContent value="members">
                    {!!selectedConstituencyId && (
                        <MembersList />
                    )}
                </TabsContent>

                <TabsContent value="constituency">
                    {!!selectedConstituencyId && (
                        <SelectedConstituency gss={selectedConstituencyId} analyticalAreaType={analyticalAreaType} />
                    )}
                </TabsContent>
            </Tabs>


        </div>
    )
}
