import { buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import ReportsConsItem from "@/components/reportsConstituencyItem";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className='py-40'>
        <h1 className="text-hXlg font-light font-IBMPlexSans w-[915px] mb-6">
          Empowering <span className="font-PPRightGrotesk text-hXlgPP">organisers</span> and <span className="text-hXlgPP font-PPRightGrotesk">activists</span> with mapping tools and data enrichment ✊</h1>
        <p className="text-base w-[582px] mb-9">Take your organising to the next level with our free to use tools that enhance your existing membership lists with geographic and political data. </p>
        <Link href="/" className={buttonVariants({ variant: "brand" })}>Get started</Link>
        <Image className="absolute -top-20 right-0" src={"/hero-bg.svg"} alt="constiteuncy map" width={800} height={700} />
      </div>

      <div className="py-10 border-t border-meepGray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-row-3 gap-5">
            <h2 className="text-hLg text-meepGray-300 mb-5">Discover what Mapped can do</h2>

            <Card>
              <CardHeader>
                <CardTitle className="mb-3 px-6 pt-6">Load in your member data</CardTitle>
                <CardDescription className="text-sm text-meepGray-400 px-6 pb-6">Upload your spreadsheet/CSV file into the data configuration section and see your members appear on the map</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="mb-3 px-6 pt-6">Load in your member data</CardTitle>
                <CardDescription className="text-sm text-meepGray-400 px-6 pb-6">Upload your spreadsheet/CSV file into the data configuration section and see your members appear on the map</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="mb-3 px-6 pt-6">Load in your member data</CardTitle>
                <CardDescription className="text-sm text-meepGray-400 px-6 pb-6">Upload your spreadsheet/CSV file into the data configuration section and see your members appear on the map</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <Image
            src="/mapping-screenshot.png"
            alt="test"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-sm" />
        </div>
      </div>

      <div className="py-10 border-t border-meepGray-700">
        <p className="text-hMd text-meepGray-300 mb-5">Trending Constituencies</p>

        <div className="grid grid-cols-3 gap-5">
          <ReportsConsItem
            consName="Coventry South"
            firstIn2019="Labour"
            secondIn2019="Conservative"
            mpName="Zarah Sultana"
            mpImgUrl="https://www.localintelligencehub.com/media/person/mp_4786_7qDOwxw.jpeg"
          />
          <ReportsConsItem
            consName="Bury North"
            firstIn2019="Conservative"
            secondIn2019="Labour"
            mpName="James Daly"
            mpImgUrl="https://www.localintelligencehub.com/media/person/mp_4854_BxRRx9j.jpeg"
          />
          <ReportsConsItem
            consName="Camberwell and Peckham"
            firstIn2019="Labour"
            secondIn2019="Conservative"
            mpName="Harriet Harman"
            mpImgUrl="https://www.localintelligencehub.com/media/person/mp_150_rgMOVq7.jpeg"
          />
        </div>
      </div>
    </>
  );
}
