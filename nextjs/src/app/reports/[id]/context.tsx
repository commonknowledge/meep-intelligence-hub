"use client"

import { AnalyticalAreaType, Exact, GetMapReportQuery, MapReportInput } from "@/__generated__/graphql";
import { QueryResult } from "@apollo/client";
import { atom } from "jotai";
import { createContext, useContext, useState } from "react";

export const defaultDisplayOptions = {
  showLastElectionData: true,
  showMPs: true,
  showStreetDetails: false,
  analyticalAreaType: AnalyticalAreaType.ParliamentaryConstituency_2025
}

export type DisplayOptionsType = typeof defaultDisplayOptions & {}

export const ReportContext = createContext<{
  id: string,
  updateReport: (data: MapReportInput) => void,
  deleteReport: () => void,
  report?: QueryResult<GetMapReportQuery, Exact<{ id: string; }>>,
  refreshReportDataQueries: () => void,
  displayOptions: DisplayOptionsType,
  setDisplayOptions: (options: Partial<DisplayOptionsType>) => void,
  selectedMember: any,
}>({
  id: '?',
  updateReport: () => ({} as any),
  deleteReport: () => {},
  refreshReportDataQueries: () => {},
  displayOptions: defaultDisplayOptions,
  setDisplayOptions: () => {},
  selectedMember: null,
});

export const useReportContext = () => {
  const context = useContext(ReportContext);
  const { displayOptions, setDisplayOptions } = context;

  const updateDisplayOptions = (options: Partial<DisplayOptionsType>) => {
    setDisplayOptions({ ...displayOptions, ...options });
  };

  return { ...context, updateDisplayOptions };
};

export const selectedConstituencyAtom = atom<string | null>(null)