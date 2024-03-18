"use client";

import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { NewExternalDataSourceUpdateConfigContext } from "../../NewExternalDataSourceWrapper";
import { gql, useQuery } from "@apollo/client";
import {
  PageForExternalDataSourceUpdateConfigReviewQuery,
  PageForExternalDataSourceUpdateConfigReviewQueryVariables,
} from "@/__generated__/graphql";
import { ExternalDataSourceUpdateConfigCard } from "@/components/ExternalDataSourceCard";
import { LoadingIcon } from "@/components/ui/loadingIcon";

const GET_UPDATE_CONFIG = gql`
  query PageForExternalDataSourceUpdateConfigReview($ID: ID!) {
    externalDataSourceUpdateConfig(pk: $ID) {
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
    }
  }
`;

export default function Page({
  params: { externalDataSourceUpdateConfigId },
}: {
  params: { externalDataSourceUpdateConfigId: string };
}) {
  const router = useRouter();
  const context = useContext(NewExternalDataSourceUpdateConfigContext);
  const data = useQuery<
    PageForExternalDataSourceUpdateConfigReviewQuery,
    PageForExternalDataSourceUpdateConfigReviewQueryVariables
  >(GET_UPDATE_CONFIG, {
    variables: {
      ID: externalDataSourceUpdateConfigId,
    },
  });

  if (data.error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{data.error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <header>
        <h1 className="text-hLg">Activate data sync</h1>
        <p className="mt-6 text-meepGray-400 max-w-sm">
          Your almost there! Active the data sync to start syncing data. Note,
          this may take a while if you are using a large amount of data layers.
        </p>
      </header>
      {data.loading || !data.data ? (
        <LoadingIcon />
      ) : (
        <ExternalDataSourceUpdateConfigCard
          updateConfig={data.data.externalDataSourceUpdateConfig}
        />
      )}
      <Button
        variant={"reverse"}
        onClick={() => {
          router.push(`/external-data-source-updates`);
        }}
      >
        Back to data syncs
      </Button>
    </div>
  );
}
