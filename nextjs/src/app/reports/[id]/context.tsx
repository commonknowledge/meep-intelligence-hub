"use client";

import {
  Exact,
  GetMapReportQuery,
  MapReportInput,
} from "@/__generated__/graphql";
import { QueryResult } from "@apollo/client";
import { createContext, useContext, useState } from "react";

export type DisplayOptionsType = {
  showLastElectionData: boolean;
  showMPs: boolean;
  showStreetDetails: boolean;
};

export const ReportContext = createContext<{
  id: string;
  updateReport: (data: MapReportInput) => void;
  deleteReport: () => void;
  report?: QueryResult<GetMapReportQuery, Exact<{ id: string }>>;
  refreshReportDataQueries: () => void;
  displayOptions: DisplayOptionsType;
  setDisplayOptions: (options: Partial<DisplayOptionsType>) => void;
}>({
  id: "?",
  updateReport: () => ({}) as any,
  deleteReport: () => {},
  refreshReportDataQueries: () => {},
  displayOptions: {
    showLastElectionData: false,
    showMPs: false,
    showStreetDetails: false,
  },
  setDisplayOptions: () => {},
});

export const useReportContext = () => {
  const context = useContext(ReportContext);
  const { displayOptions, setDisplayOptions } = context;

  const updateDisplayOptions = (options: Partial<DisplayOptionsType>) => {
    setDisplayOptions({ ...displayOptions, ...options });
  };

  return { ...context, updateDisplayOptions };
};
