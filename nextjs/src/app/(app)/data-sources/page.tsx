import { useRequireAuth } from "@/hooks/auth";
import ExternalDataSourceList from "./ExternalDataSourceList";
import { Metadata } from "next";

export default async function Page() {
  await useRequireAuth();

  return <ExternalDataSourceList />;
}

export const metadata: Metadata = {
  title: "Your Data Sources",
};
