import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Button } from "@/components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"

import { File, Plus } from "lucide-react"




interface Props {
    
}



const ReportsConsItem: React.FC<Props> = ({}) => {


    return (
        <Card className="p-4 bg-meepGray-800 border-1 text-meepGray-200 border border-meepGray-700">
        <CardHeader>
            <CardTitle className="text-hSm mb-4">Data Configuration</CardTitle>
        </CardHeader>
        <CardContent>

            <div className="flex flex-col gap-2 mb-2 py-2 border-t border-meepGray-700 ">
                <span className="label mb-2">Your membership data </span>
                <div className="flex gap-2 items-center">
                    <Button variant="brand" className="p-3 gap-2 text-sm">
                        <File className="w-4" /> Main-list-2024.csv
                    </Button>
                </div>
                <div className="flex gap-2 items-center">
                    <Button variant="outline" className="p-3 gap-2 text-sm">
                        <Plus className="w-4" />add new member list
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-2 mb-2 py-2 border-t border-meepGray-700 ">
                <span className="label">Data Layers</span>
                <Accordion type="single" collapsible>
                    <AccordionItem value="geo">
                        <AccordionTrigger>Geographic</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                            <div className="items-top flex space-x-2">
                                <Checkbox id="geo-1" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="geo-1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Constituency
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox id="geo-2" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="geo-2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Wards
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox id="geo-3" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="geo-3"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Something else
                                    </label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="dem">
                        <AccordionTrigger>Demographic</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                            <div className="items-top flex space-x-2">
                                <Checkbox id="geo-1" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="dem-1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Nationality
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox id="dem-2" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="dem-2"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        income
                                    </label>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2">
                                <Checkbox id="dem-3" />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="dem-3"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Something else
                                    </label>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                </Accordion>
            </div>
        </CardContent>
    </Card>
    )
    // return some JSX
};



export default ReportsConsItem;

