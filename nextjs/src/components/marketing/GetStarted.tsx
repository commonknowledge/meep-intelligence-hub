import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import TemplateTextBlock from "@/components/marketing/TemplateTextBlock";

interface GetStartedProps {
  btnLink?: string;
}

const GetStarted: React.FC<GetStartedProps> = ({ btnLink }) => {
  return (
    <Card className="w-full bg-meepGray-700 grid md:grid-cols-2 grid-cols-1 drop-shadow">
      <div className="flex items-center">
        <TemplateTextBlock
          labelHeading="Get started"
          heading="Start mapping your members"
          description="Visualise your membership geographically to understand the strength of your campaign at a glance and ground your organisational tactics in real information."
          btnText="Get Started"
          btnLink={btnLink || "/signup"}
        />
      </div>
      <CardContent className="p-14 flex items-center">
        <Image
          src="/get-started-screenshot.png"
          alt="test"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto rounded-lg drop-shadow "
        />
      </CardContent>
    </Card>
  );
};

export default GetStarted;
