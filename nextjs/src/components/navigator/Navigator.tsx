import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/navigator/Navigator-Tabs"
import { LocateFixed, User } from 'lucide-react'
import { ConstituenciesPanel } from '@/app/reports/[id]/ConstituenciesPanel'
import MembersList from '../MembersList'


export default function Navigator() {
    return (
        <div className='pointer-events-auto w-full'>
            <Tabs defaultValue="members" className='h-[93%]'>
                <TabsList className='bg-meepGray-800'>
                    <h2 className='text-meepGray-100 text-md font-semibold'>Navigator</h2>
                    <TabsTrigger value="members"><User className='text-brandBlue'/>Members</TabsTrigger>
                    <TabsTrigger value="constituency"><LocateFixed />Constituencies</TabsTrigger>
                </TabsList>
                <TabsContent value="members"><div className='p-4'><MembersList /></div></TabsContent>
                <TabsContent value="constituency" className="h-full"><ConstituenciesPanel /></TabsContent>
            </Tabs>


        </div>
    )
}
