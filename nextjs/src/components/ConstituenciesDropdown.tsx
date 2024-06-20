"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { MAX_CONSTITUENCY_ZOOM } from "./report/ReportMap"


interface ConstituenciesDropdownProps {
    constituencies: SelectableConstituency[]
    setSelectedConstituency: (gss: string) => void
    map: any // Replace with the correct type if available
}
export interface SelectableConstituency {
    gss: string
    count: number
    gssArea: {
        id: string
        fitBounds: number[]
        name: string
    }
}



export default function ConstituenciesDropdown({
    constituencies,
    setSelectedConstituency,
    map,
}: ConstituenciesDropdownProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const selectedConstituency = constituencies.find((constituency) => constituency.gss === value)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between bg-meepGray-600"
                >
                    <p className="truncate text-tiny">
                        {selectedConstituency
                            ? selectedConstituency.gssArea.name
                            : "Search constituency..."}
                    </p>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search constituency..." />
                    <CommandEmpty>No constituency found.</CommandEmpty>
                    <CommandGroup>
                        {constituencies.map((constituency) => (
                            <CommandItem
                                key={constituency.gss}
                                value={constituency.gssArea.name}
                                onSelect={() => {
                                    setValue(constituency.gss)
                                    setSelectedConstituency(constituency.gss)
                                    // setTab("selected")
                                    map.loadedMap?.fitBounds(constituency.gssArea.fitBounds, {
                                        maxZoom: MAX_CONSTITUENCY_ZOOM - 0.1,
                                    })
                                    setOpen(false)
                                }}
                                className="cursor-pointer group hover:bg-meepGray-600 rounded-none"
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4 hidden",
                                        value === constituency.gss ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {constituency.gssArea.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
