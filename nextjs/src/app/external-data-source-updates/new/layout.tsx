import { useRequireAuth } from "@/hooks/auth";

import NewExternalDataSourceWrapper from "./NewExternalDataSourceWrapper";

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
