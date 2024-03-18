import { MapReportInput } from "@/__generated__/graphql";
import { createContext } from "react";

export const ReportContext = createContext<{
  id: string,
  update: (data: MapReportInput) => void
}>({
  id: '?',
  update: () => ({} as any)
})