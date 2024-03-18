"use client"

import { MapReportLayersSummaryFragmentStr } from "@/components/dataConfig";
import { gql } from "@apollo/client"

export const MapReportPageFragmentStr = gql`
  fragment MapReportPage on MapReport {
    id
    name
    ... MapReportLayersSummary
  }
  ${MapReportLayersSummaryFragmentStr}
`