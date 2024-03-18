"use client";

import { gql, useQuery } from "@apollo/client";
import { ActionNetworkLogo, AirtableLogo } from "@/components/logos";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ExternalDataSourceUpdateConfigCard } from "@/components/ExternalDataSourceCard";
import {
  ListUpdateConfigsQuery,
  ListUpdateConfigsQueryVariables,
} from "@/__generated__/graphql";

const LIST_UPDATE_CONFIGS = gql`
  query ListUpdateConfigs {
    externalDataSourceUpdateConfigs {
      id
      externalDataSource {
        id
        name
        connectionDetails {
          crmType: __typename
        }
      }
      enabled
      jobs {
        lastEventAt
        status
      }
      mapping {
        source
        sourcePath
        destinationColumn
      }
    }
  }
`;

export default function ExternalDataSourceUpdates() {
  const { loading, error, data } = useQuery<
    ListUpdateConfigsQuery,
    ListUpdateConfigsQueryVariables
  >(LIST_UPDATE_CONFIGS);

  return (
    <div className=" max-w-7xl space-y-7 w-full">
      <PageHeader />
      <div className="border-b border-meepGray-700 pt-10" />
      <h2 className="text-hSm label">Active Syncs</h2>
      {loading ? (
        <section className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <article className="rounded-xl border border-meepGray-700 px-6 py-5 space-y-3">
            <Skeleton className="h-4 w-full max-w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </article>
          <CreateNewSyncButton />
        </section>
      ) : error ? (
        <h2>Error: {error.message}</h2>
      ) : data ? (
        <section className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.externalDataSourceUpdateConfigs.map((updateConfig) => (
            <ExternalDataSourceUpdateConfigCard
              key={updateConfig.id}
              updateConfig={updateConfig}
            />
          ))}
          <CreateNewSyncButton />
        </section>
      ) : null}
    </div>
  );
}

function PageHeader() {
  return (
    <header className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2  gap-8">
      <div>
        <h1 className="text-hLg mb-7">CRM Data Updates</h1>
        <p className="text-meepGray-400 w-[400px]">
          Maximise your organisations impact by securely connecting your CRM
          platforms with Mapped and select from a range of data sources to
          enhance your membership lists.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-7">
        <div className="rounded-3xl bg-meepGray-700 px-10 py-6 overflow-hidden flex flex-row items-center justify-center">
          <ActionNetworkLogo className="w-full" />
        </div>
        <div className="rounded-3xl bg-meepGray-700 px-10 py-6 overflow-hidden flex flex-row items-center justify-center">
          <AirtableLogo className="w-full" />
        </div>
      </div>
    </header>
  );
}

function CreateNewSyncButton() {
  return (
    <Link href="/external-data-source-updates/new">
      <article className="relative cursor-pointer rounded-xl border border-meepGray-700 px-6 py-5">
        <div className="space-y-5">
          <Skeleton className="h-4 w-full max-w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="absolute inset-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <Button variant="reverse" className="shadow-md">
            + Create new sync
          </Button>
        </div>
      </article>
    </Link>
  );
}
