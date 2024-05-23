import MarketingPageHeader from "@/components/marketing/MarkertingPageHeader";
import FeatureTextSection from "@/components/marketing/TemplateTextBlock";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import AboutOveriew from "./Overview";
import AboutRoadmap from "./Roadmap";
import AboutHistory from "./History";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-rounded";

export default function AboutPage() {
  let btnLink = "/signup";

  return (
    <>
      <Tabs
        defaultValue="overview"
        className="w-full flex flex-col items-center"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          {/* <TabsTrigger value="history">History</TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview">
          <AboutOveriew />
        </TabsContent>
        <TabsContent value="roadmap">
          <AboutRoadmap />
        </TabsContent>
        <TabsContent value="history">
          <AboutHistory />
        </TabsContent>
      </Tabs>
    </>
  );
}

export const metadata: Metadata = {
  title: "About",
};
