import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import TemplateTextBlock from "@/components/marketing/TemplateTextBlock";

interface AboutCTAProps {}

const AboutCTA: React.FC<AboutCTAProps> = () => {
  return (
    <Card className="w-full grid md:grid-cols-2 grid-cols-1 drop-shadow overflow-clip">
      <div className="flex items-center">
        <TemplateTextBlock
          labelHeading="About the project"
          heading="More than just maps"
          description="Our goal is not only to make organisers’ lives easier — we want to help facilitate the long-term collective action we need to build a more just society."
          btnText="Learn More about us"
          btnLink="/about"
        />
      </div>
      <CardContent className="">
        <Image
          src="/about-marquee-1.jpg"
          alt="test"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto "
        />
      </CardContent>
    </Card>
  );
};

export default AboutCTA;
