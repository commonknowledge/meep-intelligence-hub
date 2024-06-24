"use client";

import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreateAutoUpdateFormContext } from "../../NewExternalDataSourceWrapper";
import { FetchResult, gql, useMutation, useQuery } from "@apollo/client";
import {
  ExternalDataSourceInput,
  GetSourceMappingQuery,
  GetSourceMappingQueryVariables,
  MutationUpdateExternalDataSourceArgs,
  UpdateExternalDataSourceMutation,
  UpdateExternalDataSourceMutationVariables,
} from "@/__generated__/graphql";
import { toast } from "sonner";
import { UpdateMappingForm } from "@/components/UpdateMappingForm";
import { LoadingIcon } from "@/components/ui/loadingIcon";
import { UPDATE_EXTERNAL_DATA_SOURCE } from '@/graphql/mutations';
import { triggerAnalyticsEvent } from "@/app/utils/posthogutils"; 


const GET_UPDATE_CONFIG = gql`
  query GetSourceMapping($ID: ID!) {
    externalDataSource(pk: $ID) {
      id
      autoImportEnabled
      autoUpdateEnabled
      allowUpdates
      hasWebhooks
      updateMapping {
        destinationColumn
        source
        sourcePath
      }
      fieldDefinitions {
        label
        value
        description
        editable
      }
      crmType
      pointField
      pointFieldType
      postcodeField
      firstNameField
      lastNameField
      emailField
      phoneField
      addressField
    }
  }
`;

export default function Page({
  params: { externalDataSourceId },
}: {
  params: { externalDataSourceId: string };
}) {
  const router = useRouter();
  const context = useContext(CreateAutoUpdateFormContext);

  useEffect(() => {
    context.setStep(3)
  }, [context])

  const [updateSource, configResult] = useMutation<UpdateExternalDataSourceMutation, UpdateExternalDataSourceMutationVariables>(UPDATE_EXTERNAL_DATA_SOURCE);

  const externalDataSource = useQuery<GetSourceMappingQuery, GetSourceMappingQueryVariables>(GET_UPDATE_CONFIG, {
    variables: {
      ID: externalDataSourceId,
    },
  });

  function submit(input: ExternalDataSourceInput, e?: React.BaseSyntheticEvent<object, any, any> | undefined) {
    e?.preventDefault();
    const create = updateSource({
      variables: { input: { id: externalDataSourceId, ...input } },
    });
    toast.promise(create, {
      loading: "Saving...",
      success: (d: FetchResult<UpdateExternalDataSourceMutation>) => {
        if (!d.errors && d.data) {
          router.push(
            `/data-sources/create/review/${d.data.updateExternalDataSource.id}`,
          );
        };
        triggerAnalyticsEvent("Data source created successfully", {
          datasource: d.data?.updateExternalDataSource.__typename,
          remoteName: d.data?.updateExternalDataSource.name,
        });
        return "Saved";
      },
      error: (e: any) => {
        triggerAnalyticsEvent("Data source creation failed", {
          message: e.message, 
        });
        return `Couldn't save`;
      },
    });
  }

  if (externalDataSource.loading) {
    return <LoadingIcon />
  }

  if (!externalDataSource.data?.externalDataSource.allowUpdates) {
    return (
      <Button
        variant="outline"
        type="reset"
        onClick={() => {
          router.push(`/data-sources/inspect/${externalDataSourceId}`);
        }}
      >
        Done
      </Button>
    )
  }

  return (
    <div className="space-y-7">
      <header>
        <h1 className="text-hLg">
          Now configure how you{"'"}d like data to be updated
        </h1>
        <p className="mt-6 text-meepGray-400 max-w-sm">
          Choose from the following data sources to enhance your CRM with data
          that empower you organisation. For geographic data, we need to know
          which field has the postcode so we can make sure you are getting
          accurate data.
        </p>
      </header>
      {externalDataSource.data ? (
        <UpdateMappingForm
          crmType={externalDataSource.data?.externalDataSource.crmType}
          initialData={{
            pointField: externalDataSource.data?.externalDataSource.pointField,
            pointFieldType: externalDataSource.data?.externalDataSource.pointFieldType,
            // Trim out the __typenames
            updateMapping: externalDataSource.data?.externalDataSource.updateMapping?.map((m) => ({
              source: m.source,
              sourcePath: m.sourcePath,
              destinationColumn: m.destinationColumn,
            })),
          }}
          fieldDefinitions={externalDataSource.data?.externalDataSource.fieldDefinitions}
          onSubmit={submit}
          saveButtonLabel="Continue"
        >
          <Button
            variant="outline"
            type="reset"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
          <Button
            variant="outline"
            type="reset"
            onClick={() => {
              router.push(`/data-sources/inspect/${externalDataSourceId}`);
            }}
          >
            Skip data updates
          </Button>
        </UpdateMappingForm>
      ) : null}
    </div>
  );
}
