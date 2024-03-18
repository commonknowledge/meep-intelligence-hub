"use client";

import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { NewExternalDataSourceUpdateConfigContext } from "../../NewExternalDataSourceWrapper";
import { FetchResult, gql, useMutation, useQuery } from "@apollo/client";
import {
  CheckIfSourceHasConfigQuery,
  CheckIfSourceHasConfigQueryVariables,
  CreateUpdateConfigMutation,
  CreateUpdateConfigMutationVariables,
  ExternalDataSourceUpdateConfigInput,
} from "@/__generated__/graphql";
import { toast } from "sonner";
import { UpdateConfigForm } from "@/components/UpdateConfig";

const CHECK_UPDATE_CONFIG = gql`
  query CheckIfSourceHasConfig($ID: ID!) {
    externalDataSource(pk: $ID) {
      id
      updateConfigs {
        id
      }
    }
  }
`;

const CREATE_UPDATE_CONFIG = gql`
  mutation CreateUpdateConfig($config: ExternalDataSourceUpdateConfigInput!) {
    createExternalDataSourceUpdateConfig(data: $config) {
      id
      postcodeColumn
      mapping {
        destinationColumn
        source
        sourcePath
      }
    }
  }
`;

export default function Page({
  params: { externalDataSourceId },
}: {
  params: { externalDataSourceId: string };
}) {
  const router = useRouter();
  const context = useContext(NewExternalDataSourceUpdateConfigContext);

  const [createConfig, configResult] = useMutation<
    CreateUpdateConfigMutation,
    CreateUpdateConfigMutationVariables
  >(CREATE_UPDATE_CONFIG);

  function submit(d: ExternalDataSourceUpdateConfigInput) {
    const create = createConfig({
      variables: {
        config: {
          ...d,
          externalDataSource: { set: externalDataSourceId },
          enabled: false,
        },
      },
    });
    toast.promise(create, {
      loading: "Saving config...",
      success: (d: FetchResult<CreateUpdateConfigMutation>) => {
        if (!d.errors && d.data) {
          context.setStep(4);
          router.push(
            `/external-data-source-updates/new/review/${d.data.createExternalDataSourceUpdateConfig.id}`,
          );
        }
        return "Saved config";
      },
      error: `Couldn't save config`,
    });
  }

  const checkQuery = useQuery<
    CheckIfSourceHasConfigQuery,
    CheckIfSourceHasConfigQueryVariables
  >(CHECK_UPDATE_CONFIG, {
    variables: {
      ID: externalDataSourceId,
    },
  });

  useEffect(() => {
    if (checkQuery.data?.externalDataSource?.updateConfigs?.length) {
      context.setStep(4);
      router.push(
        `/external-data-source-updates/new/review/${checkQuery.data.externalDataSource.updateConfigs[0].id}`,
      );
    }
  }, [checkQuery.data, context, router]);

  return (
    <div className="space-y-7">
      <header>
        <h1 className="text-hLg">
          Now configure how you{"'"}d like data to be updated
        </h1>
        <p className="mt-6 text-meepGray-400 max-w-sm">
          Choose from the following data sources to enhance your CRM with data
          that empower you organisation. For geographic data, we need to know
          which column has the postcode so we can make sure you are getting
          accurate data.
        </p>
      </header>
      <UpdateConfigForm onSubmit={submit} saveButtonLabel="Continue">
        <Button
          variant="outline"
          type="reset"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
      </UpdateConfigForm>
    </div>
  );
}
