import { useRequireAuth } from "@/hooks/auth";
import InspectExternalDataSourceUpdateConfig from "./InspectExternalDataSourceUpdateConfig";

export default async function Page({
  params: { externalDataSourceUpdateConfigId },
}: {
  params: { externalDataSourceUpdateConfigId: string };
}) {
  await useRequireAuth();

  return (
    <InspectExternalDataSourceUpdateConfig
      externalDataSourceUpdateConfigId={externalDataSourceUpdateConfigId}
    />
  );
}
