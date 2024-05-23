"use client";

import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateAutoUpdateFormContext } from "./NewExternalDataSourceWrapper";
import { externalDataSourceOptions } from "@/lib/data";
import { gql, useQuery } from "@apollo/client";
import {
  AllExternalDataSourcesQuery,
  DataSourceType,
} from "@/__generated__/graphql";
import { formatRelative } from "date-fns";

const ALL_EXTERNAL_DATA_SOURCES = gql`
  query AllExternalDataSources {
    externalDataSources {
      id
      name
      createdAt
      dataType
      crmType
      connectionDetails {
        ... on AirtableSource {
          baseId
          tableId
        }
        ... on MailchimpSource {
          apiKey
          listId
        }
      }
      autoUpdateEnabled
    }
  }
`;

export default function Page() {
  const router = useRouter();
  const context = useContext(CreateAutoUpdateFormContext);
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    context.setStep(1);
  }, [context]);

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
      {Object.values(externalDataSourceOptions)
        .filter((externalDataSource) => externalDataSource.supported)
        .map((externalDataSource) => (
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
                source === externalDataSource.key &&
                  "border-brandBlue border-2",
              )}
            >
              <externalDataSource.logo className="w-full" />
            </div>
          </div>
        ))}
      <Button
        disabled={!source}
        variant={"reverse"}
        onClick={() => {
          router.push(`/data-sources/create/connect/${source}`);
        }}
      >
        Continue
      </Button>
    </div>
  );
}
