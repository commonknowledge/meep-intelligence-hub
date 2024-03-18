import { useRequireAuth } from "@/hooks/auth";
import ExternalDataSourceUpdates from "./ExternalDataSourceUpdates";

export default async function Page() {
  await useRequireAuth();

  return <ExternalDataSourceUpdates />;
}
