import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Report() {

  return (
    <div className=" max-w-7xl space-y-7 w-full">
    <PageHeader />
    <div className="border-b border-meepGray-700 pt-10" />
      <h2 className="text-hSm label">Your reports</h2>

      <div className="flex flex-row gap-lg">
        <Link href={'/reports/1'}>
        <Card>
          <CardHeader>
            <CardContent>
              <Image src="/reports_page_card_image.png" alt="Description of the image" width={300} height={300} />
            </CardContent>
            <CardTitle className="mb-3 px-6 pt-6">Main Members 2024</CardTitle>
            <CardDescription className="text-[12px] text-meepGray-400 px-6 pb-6">Last Edited: 27 Feb 2024</CardDescription>
          </CardHeader>
        </Card>
        </Link>
        <Card className="flex flex-col justify-center">
          <CardContent className="px-6">
            <Button className="rounded-none	" variant="reverse">Create new report</Button>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}


function PageHeader() {
  return (
    <header className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2  gap-8">
    <div>
      <h1 className="text-hLg mb-7 font-IBMPlexSansSemiBold">Reports</h1>
      <p className="text-meepGray-400 w-[400px]">
      Maximise your organisations impact by securely connecting your CRM platforms with Mapped and select from a range of data sources to enhance your membership lists.
      </p>
    </div>
    <div className="">
    <Image src="/reports_page_screenshot.png" alt="Description of the image" width={500} height={300} />

    </div>
  </header>
  );
}
