import { ReactNode } from "react";
import MarketingPageHeader from "@/components/marketing/MarkertingPageHeader";
import { Card, CardTitle, CardHeader, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { externalDataSourceOptions } from "@/lib/data";
import { MappedLogo } from "@/components/logos";
import TemplateTextBlock from "@/components/marketing/TemplateTextBlock";
import GetStarted from "@/components/marketing/GetStarted";

interface FeaturesOptionProps {

    labelHeading?: string;
    heading: ReactNode;
    description: string;
    btnText: string;
    btnLink: string;
    screenshot: string;

    benefitsHeading: string;

    b1Heading: string;
    b1Description: string;
    b1Screenshot?: string;

    b2Heading: string;
    b2Description: string;
    b2Screenshot?: string;

    b3Heading: string;
    b3Description: string;
    b3Screenshot?: string;

}

const FeaturesOption: React.FC<FeaturesOptionProps> = ({ screenshot, labelHeading, heading, description, btnLink, btnText, benefitsHeading, b1Heading, b1Description, b1Screenshot, b2Heading, b2Description, b2Screenshot, b3Heading, b3Description, b3Screenshot }) => {

    return (
        <>
            <MarketingPageHeader
                labelHeading={labelHeading}
                heading={heading}
                description={description}
                btnText={btnText}
                btnLink={btnLink}
            />
            <div className="py-10">
                <div className="relative">
                    <Image src={screenshot}
                        alt="test"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="w-full h-auto"
                    />

                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 py-20 ">
                    <div className="relative">
                        <div className="sticky top-0">
                            <TemplateTextBlock
                                labelHeading="Benefits"
                                heading={benefitsHeading}
                                description=""
                                btnText="Get Started"
                                btnLink=""
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 place-content-center items-center">
                        <Card className="max-w-lg">
                            <CardHeader>
                                {b1Screenshot &&
                                    <Image src={b1Screenshot}
                                        alt="test"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-full h-auto"
                                    />
                                }
                                <CardTitle className="mb-3 px-6 pt-6">{b1Heading}</CardTitle>
                                <CardDescription className="text-sm text-meepGray-400 px-6 pb-6">{b1Description}</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="max-w-lg">
                            <CardHeader>
                                {b2Screenshot &&

                                    <Image src={b2Screenshot}
                                        alt="test"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-full h-auto"
                                    />
                                }
                                <CardTitle className="mb-3 px-6 pt-6">{b2Heading}</CardTitle>
                                <CardDescription className="text-sm text-meepGray-400 px-6 pb-6">{b2Description}</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="max-w-lg">
                            <CardHeader>
                                {b3Screenshot &&

                                    <Image src={b3Screenshot}
                                        alt="test"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-full h-auto"
                                    />
                                }
                                <CardTitle className="mb-3 px-6 pt-6">{b3Heading}</CardTitle>
                                <CardDescription className="text-sm text-meepGray-400 px-6 pb-6">{b3Description}</CardDescription>
                            </CardHeader>
                        </Card>

                    </div>
                </div>
            </div >
            <GetStarted />
        </>
    );
}

export default FeaturesOption;
