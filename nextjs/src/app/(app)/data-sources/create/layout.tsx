import { useRequireAuth } from "@/hooks/auth";

import NewExternalDataSourceWrapper from "./NewExternalDataSourceWrapper";
import { Metadata } from "next";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await useRequireAuth();

  return (
    <NewExternalDataSourceWrapper>{children}</NewExternalDataSourceWrapper>
  );
}

export const metadata: Metadata = {
  title: "Connect New Data Source",
};
