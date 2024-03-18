"use client";

import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { NewExternalDataSourceUpdateConfigContext } from "./NewExternalDataSourceWrapper";
import {
  externalDataSourceOptions,
  getSourceOptionForTypename,
} from "@/lib/data";
import { gql, useQuery } from "@apollo/client";
import { AllExternalDataSourcesQuery } from "@/__generated__/graphql";
import { formatRelative } from "date-fns";

const ALL_EXTERNAL_DATA_SOURCES = gql`
  query AllExternalDataSources {
    externalDataSources {
      id
      name
      createdAt
      connectionDetails {
        crmType: __typename
        ... on AirtableSource {
          baseId
          tableId
        }
      }
      updateConfigs {
        id
        enabled
      }
    }
  }
`;

export default function Page() {
  const router = useRouter();
  const context = useContext(NewExternalDataSourceUpdateConfigContext);
  const crms = useQuery<AllExternalDataSourcesQuery>(ALL_EXTERNAL_DATA_SOURCES);
  const unusedCRMs = crms.data?.externalDataSources.filter(
    (d) =>
      // Only CRMs without a config
      !d.updateConfigs?.length,
  );
  const [source, setSource] = useState<string | null>(null);

  return (
    <div className="space-y-7">
      <header>
        <h1 className="text-hLg">Select platform to sync data to</h1>
        <p className="mt-6 text-meepGray-400 max-w-sm">
          We currently support the following platforms. If your platform isn’t
          on this list,{" "}
          <a href="mailto:hello@commonknowledge.coop">
            get in touch to see how we can help.
          </a>
        </p>
      </header>
      {Object.values(externalDataSourceOptions).map((externalDataSource) => (
        <div
          key={externalDataSource.key}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7"
        >
          <div
            onClick={() => {
              setSource(externalDataSource.key);
            }}
            className={twMerge(
              "cursor-pointer rounded-3xl bg-meepGray-700 px-10 py-6 overflow-hidden flex flex-row items-center justify-center transition-all hover:border-brandBlue border-2 box-border",
              source === externalDataSource.key && "border-brandBlue border-2",
            )}
          >
            <externalDataSource.logo className="w-full" />
          </div>
        </div>
      ))}
      {!!unusedCRMs?.length && (
        <section className="space-y-7">
          <div className="border-b border-meepGray-700 pt-6" />
          <h2 className="text-hSm">Or pick up where you left off</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
            {crms.data?.externalDataSources
              .filter(
                (d) =>
                  // Only CRMs without a config
                  !d.updateConfigs?.length,
              )
              .map((externalDataSource) => {
                const Logo = getSourceOptionForTypename(
                  externalDataSource.connectionDetails.crmType,
                )!.logo;
                return (
                  <article
                    key={externalDataSource.id}
                    className="cursor-pointer rounded-3xl border-meepGray-600 px-6 py-5 space-y-3 transition-all hover:border-brandBlue border-2 box-border"
                    onClick={() => {
                      context.setStep(3);
                      router.push(
                        `/external-data-source-updates/new/configure/${externalDataSource.id}`,
                      );
                    }}
                  >
                    <Logo className='w-20'/>
                    <div className="text-hSm font-bold">{externalDataSource.name}</div>
                    <div className="text-sm text-meepGray-400">
                      <p>
                        Created{" "}
                        {formatRelative(
                          externalDataSource.createdAt,
                          new Date(),
                        )}
                      </p>
                      {!!externalDataSource.connectionDetails.baseId && (
                        <div className='mt-2'>
                          <code>
                            {externalDataSource.connectionDetails.baseId}
                          </code>
                          <br />
                          <code>
                            {externalDataSource.connectionDetails.tableId}
                          </code>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
          </div>
        </section>
      )}
      <Button
        disabled={!source}
        variant={"reverse"}
        onClick={() => {
          context.setStep(2);
          router.push(`/external-data-source-updates/new/connect/${source}`);
        }}
      >
        Continue
      </Button>
    </div>
  );
}
