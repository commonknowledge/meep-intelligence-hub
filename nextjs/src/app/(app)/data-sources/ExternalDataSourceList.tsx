"use client";

import { gql, useQuery } from "@apollo/client";
import { ActionNetworkLogo, AirtableLogo } from "@/components/logos";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { AutoUpdateCard } from "@/components/AutoUpdateCard";
import { DataSourceType, ListExternalDataSourcesQuery, ListExternalDataSourcesQueryVariables } from "@/__generated__/graphql";
import { useEffect } from "react";
import qs from 'query-string'

const LIST_UPDATE_CONFIGS = gql`
  query ListExternalDataSources {
    externalDataSources {
      id
      name
      dataType
      connectionDetails {
        crmType: __typename
      }
      autoUpdateEnabled
      jobs {
        lastEventAt
        status
      }
      updateMapping {
        source
        sourcePath
        destinationColumn
      }
    }
  }
`;

export default function ExternalDataSourceList() {
  const { loading, error, data, refetch } = useQuery<ListExternalDataSourcesQuery, ListExternalDataSourcesQueryVariables>(LIST_UPDATE_CONFIGS);

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="max-w-7xl space-y-7 w-full">
      <PageHeader />
      <div className="border-b border-meepGray-700 pt-10" />
      <header className='flex flex-row justify-end'>
        <h2 className="text-hSm mr-auto">Your team’s membership lists</h2>
      </header>
      {loading ? (
        <section className="w-full grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-xl border border-meepGray-700 px-6 py-5 space-y-3">
            <Skeleton className="h-4 w-full max-w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </article>
          <ConnectDataSource label="Connect a member list" params={{ dataType: DataSourceType.Member }} />
        </section>
      ) : error ? (
        <h2>Error: {error.message}</h2>
      ) : data ? (
        <section className="w-full grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.externalDataSources
          .filter(d => d.dataType === DataSourceType.Member)
          .map((externalDataSource) => (
            <AutoUpdateCard
              key={externalDataSource.id}
              externalDataSource={externalDataSource}
            />
          ))}
          <ConnectDataSource label="Connect a member list" params={{ dataType: DataSourceType.Member }} />
        </section>
      ) : null}
      <div className="border-b border-meepGray-700 pt-16" />
      <header className='flex flex-row justify-end'>
        <h2 className="text-hSm mr-auto">Custom data layers</h2>
      </header>
      {loading ? (
        <section className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-xl border border-meepGray-700 px-6 py-5 space-y-3">
            <Skeleton className="h-4 w-full max-w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </article>
          <ConnectDataSource label="Connect a custom data layer" params={{ dataType: DataSourceType.Other }} />
        </section>
      ) : error ? (
        <h2>Error: {error.message}</h2>
      ) : data ? (
        <section className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.externalDataSources
          .filter(d => d.dataType !== DataSourceType.Member)
          .map((externalDataSource) => (
            <AutoUpdateCard
              key={externalDataSource.id}
              externalDataSource={externalDataSource}
            />
          ))}
          <ConnectDataSource label="Connect a custom data layer" params={{ dataType: DataSourceType.Other }} />
        </section>
      ) : null}
    </div>
  );
}

function PageHeader() {
  return (
    <header className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2  gap-8">
      <div>
        <h1 className="text-hLg mb-7">Data Sources</h1>
        <p className="text-meepGray-400 w-[400px]">
          Connect your campaign data systems, auto-update them with useful information, and use the data to design empowering dashboards.
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

function ConnectDataSource({ label = "Connect a data layer", params }: { label?: string, params?: any }) {
  const link = qs.stringifyUrl({
    url: "/data-sources/create",
    query: params
  })
  return (
    <Link href={link}>
      <article className="relative cursor-pointer rounded-xl border border-meepGray-700 px-6 py-5">
        <div className="space-y-5">
          <Skeleton className="h-4 w-full max-w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="absolute inset-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <Button variant="reverse" className="shadow-md">
            + {label}
          </Button>
        </div>
      </article>
    </Link>
  );
}
