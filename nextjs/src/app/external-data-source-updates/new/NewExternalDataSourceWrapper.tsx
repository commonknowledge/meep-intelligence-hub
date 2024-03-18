"use client";

import { useState } from "react";
import { createContext } from "react";
import { twMerge } from "tailwind-merge";

export const NewExternalDataSourceUpdateConfigContext = createContext<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}>({
  step: 0,
  setStep: () => {},
});

export default function NewExternalDataSourceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState<number>(0);

  return (
    <NewExternalDataSourceUpdateConfigContext.Provider
      value={{
        step,
        setStep,
      }}
    >
      <div className="p-6 max-w-6xl mx-auto flex flex-row gap-20">
        <div>
          <aside className="w-[180px] flex flex-col justify-start items-start gap-4 relative">
            <div className="h-full absolute top-0 left-5 border-l border-x-meepGray-400 z-10" />
            <Step number={1} state={step > 1 ? "completed" : "active"}>
              Choose platform
            </Step>
            <Step
              number={2}
              state={
                step > 2 ? "completed" : step === 2 ? "active" : "disabled"
              }
            >
              Provide information
            </Step>
            <Step
              number={3}
              state={
                step > 3 ? "completed" : step === 3 ? "active" : "disabled"
              }
            >
              Select data layers
            </Step>
            <Step number={4} state={step === 4 ? "active" : "disabled"}>
              Activate sync
            </Step>
          </aside>
        </div>
        <main className="space-y-7">{children}</main>
      </div>
    </NewExternalDataSourceUpdateConfigContext.Provider>
  );
}

export function Step({
  number,
  state,
  children,
}: {
  number: number;
  state: "active" | "completed" | "disabled";
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 z-20 relative">
        <span
          className={twMerge(
            state === "active"
              ? "bg-white text-meepGray-700"
              : state === "completed"
                ? "bg-meepGray-500 text-white"
                : "bg-meepGray-700 text-meepGray-600",
            "rounded w-10 h-10 inline-flex items-center justify-center shrink-0 grow-0",
          )}
        >
          <div className="inline">{number}</div>
        </span>
        <span
          className={state === "disabled" ? "text-meepGray-600" : "text-white"}
        >
          {children}
        </span>
      </div>
    </div>
  );
}
