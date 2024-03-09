import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Image from "next/image";

interface ConsProps {
    id?: string;
    consName: string;
    firstIn2019: string;
    secondIn2019: string;
    mpName?: string;
    mpImgUrl?: string | undefined;
}



const ReportsConsItem: React.FC<ConsProps> = ({ id, consName, firstIn2019, secondIn2019, mpName, mpImgUrl }) => {

    let first2019lowercase = firstIn2019.toLowerCase()
    let second2019lowercase = secondIn2019.toLowerCase()


    if (mpImgUrl === undefined) {
        throw new Error("img is undefined!");
    }
    

    return (
        <>
            <Card className="p-4 bg-meepGray-700 text-white">
                <CardHeader>
                    <CardTitle className="font-PPRightGrotesk text-hLgPP mb-4 ">{consName}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-1">
                            <p className="text-dataName font-IBMPlexSansCondensed uppercase text-meepGray-300">First in 2019</p>
                            <div className="flex items-center gap-1">
                                <div className={`w-3 h-3 rounded-full bg-${first2019lowercase}`}></div>
                                <p className="text-dataResult font-IBMPlexMono">{firstIn2019}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-dataName font-IBMPlexSansCondensed uppercase text-meepGray-300">Second in 2019</p>
                            <div className="flex items-center gap-1">
                                <div className={`w-3 h-3 rounded-full bg-${second2019lowercase}`}></div>
                                <p className="text-dataResult font-IBMPlexMono">{secondIn2019}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-dataName font-IBMPlexSansCondensed uppercase text-meepGray-300 mb-2">Member of Parliment</p>
                        <div className="flex items-center gap-1">
                            <Image
                            
                                className="rounded-full"
                                src={mpImgUrl}
                                width="50"
                                height="50"
                                alt=""

                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-dataResult font-IBMPlexMono">{mpName}</p>
                                <p className="text-xs Name font-IBMPlexMono uppercase text-meepGray-400">{firstIn2019} Party</p>

                            </div>                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </>
    )
    // return some JSX
};



export default ReportsConsItem;




