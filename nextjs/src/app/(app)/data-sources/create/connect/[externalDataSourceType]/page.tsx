"use client";

import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApolloError, FetchResult, gql, useLazyQuery, useMutation } from "@apollo/client";
import { CreateAutoUpdateFormContext } from "../../NewExternalDataSourceWrapper";
import { toast } from "sonner";
import { NonUndefined, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { LoadingIcon } from "@/components/ui/loadingIcon";
import {
  CreateSourceMutation,
  CreateSourceMutationVariables,
  DataSourceType,
  PostcodesIoGeographyTypes,
  TestSourceConnectionQuery,
  TestSourceConnectionQueryVariables,
} from "@/__generated__/graphql";
import { DataSourceFieldLabel } from "@/components/DataSourceIcon";
import { toastPromise } from "@/lib/toast";

const TEST_SOURCE = gql`
  query TestSourceConnection(
    $apiKey: String!
    $baseId: String!
    $tableId: String!
  ) {
    testSourceConnection: testAirtableSource(apiKey: $apiKey, baseId: $baseId, tableId: $tableId) {
      remoteName
      healthcheck
      fieldDefinitions {
        label
        value
        description
      }
      __typename
    }
  }
`;

const CREATE_SOURCE = gql`
  mutation CreateSource($AirtableSource: AirtableSourceInput!) {
    createSource: createAirtableSource(data: $AirtableSource) {
      id
      name
      healthcheck
      dataType
    }
  }
`;

type FormInputs = CreateSourceMutationVariables["AirtableSource"] & {
  // In time there will be more external data sources with their own fields
  airtable?: CreateSourceMutationVariables["AirtableSource"];
};

export default function Page({
  params: { externalDataSourceType },
}: {
  params: { externalDataSourceType: string };
}) {
  const router = useRouter();
  const context = useContext(CreateAutoUpdateFormContext);

  useEffect(() => {
    context.setStep(2)
  }, [context])

  const form = useForm<FormInputs>({
    defaultValues: {
      geographyColumnType: PostcodesIoGeographyTypes.Postcode,
      dataType: context.dataType,
      airtable: {}
    }
  });

  const source = form.watch();

  // TODO: Make this generic so it can be reused by different sources
  // Probably want a `test_connection` resolver that can optionally take `airtable` or `action_network` arguments
  const [testSource, testSourceResult] = useLazyQuery<
    TestSourceConnectionQuery,
    TestSourceConnectionQueryVariables
  >(TEST_SOURCE, {
    variables: {
      apiKey: source.airtable?.apiKey!,
      baseId: source.airtable?.baseId!,
      tableId: source.airtable?.tableId!,
    },
  });

  const [guessedPostcode, setGuessedPostcode] = useState<string | null>(null);
  useEffect(function guessPostcodeColumn () {
    let guessedPostcodeColumn = testSourceResult.data?.testSourceConnection.fieldDefinitions?.find(
      (field) => (
        field.label?.toLowerCase().replaceAll(' ', '').includes("postcode") ||
        field.label?.toLowerCase().replaceAll(' ', '').includes("postalcode") ||
        field.label?.toLowerCase().replaceAll(' ', '').includes("zipcode") ||
        field.label?.toLowerCase().replaceAll(' ', '').includes("zip") ||
        field.value?.toLowerCase().replaceAll(' ', '').includes("postcode") ||
        field.value?.toLowerCase().replaceAll(' ', '').includes("postalcode") ||
        field.value?.toLowerCase().replaceAll(' ', '').includes("zipcode") ||
        field.value?.toLowerCase().replaceAll(' ', '').includes("zip")
      )
    );
    if (guessedPostcodeColumn) {
      setGuessedPostcode(guessedPostcodeColumn.value)
    }
  }, [testSourceResult.data?.testSourceConnection.fieldDefinitions, form, setGuessedPostcode])

  useEffect(function proposePostcode() {
    if (guessedPostcode) {
      form.setValue('geographyColumn', guessedPostcode)
      form.setValue('geographyColumnType', PostcodesIoGeographyTypes.Postcode)
    }
  }, [guessedPostcode, form])

  // Propose name based on remoteName
  useEffect(function proposeName () {
    if (testSourceResult.data?.testSourceConnection.remoteName) {
      form.setValue('name', testSourceResult.data?.testSourceConnection.remoteName)
    }
  }, [testSourceResult.data?.testSourceConnection.remoteName, form])

  // TODO: Make this generic so it can be reused by different sources
  // Probably want a `create_connection` resolver that can optionally take `airtable` or `action_network` arguments
  const [createSource, createSourceResult] = useMutation<
    CreateSourceMutation,
    CreateSourceMutationVariables
  >(CREATE_SOURCE);

  // TODO: Make this generic so it can be reused by different sources
  // Probably want a `test_connection` resolver that can optionally take `airtable` or `action_network` arguments
  async function submitTestConnection({
    airtable
  }: FormInputs) {
    toastPromise(
      testSource({ variables: airtable as any }),
      {
        loading: "Testing connection...",
        success: (d: FetchResult<TestSourceConnectionQuery>) => {
          if (!d.errors && d.data?.testSourceConnection) {
            return "Connection is healthy";
          }
          throw new Error(d.errors?.map(e => e.message).join(', ') || "Unknown error")
        },
        error: "Connection failed",
      },
    )
  }

  async function submitCreateSource(data: FormInputs) {
    if (data.airtable) {
      const { airtable, ...genericData } = data;
      const variables = {
          AirtableSource: {
            ...genericData,
            ...source.airtable,
          }
      }
      toastPromise(createSource({ variables }),
        {
          loading: "Saving connection...",
          success: (d: FetchResult<CreateSourceMutation>) => {
            if (!d.errors && d.data?.createSource) {
              if (d.data?.createSource.dataType === DataSourceType.Member) {
                router.push(
                  `/data-sources/create/configure/${d.data.createSource.id}`,
                );
              } else {
                router.push(
                  `/data-sources/create/inspect/${d.data.createSource.id}`,
                );
              }
              return "Connection successful";
            }
            throw new Error(d.errors?.map(e => e.message).join(', ') || "Unknown error")
          },
          error(e) {
            return {
              title: "Connection failed",
              description: e.message,
            }
          }
        },
      )
    }
  }

  if (createSourceResult.loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-hLg">Saving connection...</h1>
        <p className="text-meepGray-400 max-w-lg">
          Please wait whilst we save your connection details
        </p>
        <LoadingIcon />
      </div>
    );
  }

  if (testSourceResult.data?.testSourceConnection.healthcheck) {
    return (
      <div className="space-y-6">
        <h1 className="text-hLg">Connection successful</h1>
        <p className="text-meepGray-400 max-w-lg">
          Tell us a bit more about the data you{"'"}re connecting to.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitCreateSource)}
            className="space-y-7 max-w-lg"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input placeholder="My members list" {...field} required />
                  </FormControl>
                  <FormDescription>
                    This will be visible to your team.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data type</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Select onValueChange={field.onChange} defaultValue={field.value} required>
                      <SelectTrigger>
                        <SelectValue placeholder="What kind of data is this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type of data source</SelectLabel>
                          <SelectItem value={DataSourceType.Member}>A list of members</SelectItem>
                          <SelectItem value={DataSourceType.Other}>Other data</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-2 gap-4 w-full'>
              {/* Postcode field */}
              <FormField
                control={form.control}
                name="geographyColumn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Geography column</FormLabel>
                      <FormControl>
                        {testSourceResult.data?.testSourceConnection.fieldDefinitions?.length ? (
                          // @ts-ignore
                          <Select {...field} onValueChange={field.onChange} required>
                            <SelectTrigger className='pl-1'>
                              <SelectValue
                                placeholder={`Choose ${source.geographyColumnType || 'geography'} column`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Available columns</SelectLabel>
                                {testSourceResult.data?.testSourceConnection.fieldDefinitions?.map(
                                  (field) => (
                                    <SelectItem key={field.value} value={field.value}>
                                      <DataSourceFieldLabel
                                        connectionType={
                                          testSourceResult.data?.testSourceConnection.__typename!
                                        }
                                        fieldDefinition={field}
                                      />  
                                    </SelectItem>
                                  )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        ) : (
                          // @ts-ignore
                          <Input {...field} required />
                        )}
                      </FormControl>
                      {!!guessedPostcode && guessedPostcode === form.watch('geographyColumn') && (
                        <FormDescription className='text-yellow-500 italic'>
                          Best guess based on available table columns: {guessedPostcode}
                        </FormDescription>
                      )}
                      <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="geographyColumnType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Geography Type</FormLabel>
                    <FormControl>
                      {/* @ts-ignore */}
                      <Select onValueChange={field.onChange} defaultValue={field.value} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a geography type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Geography column type</SelectLabel>
                            <SelectItem value={PostcodesIoGeographyTypes.Postcode}>Postcode</SelectItem>
                            <SelectItem value={PostcodesIoGeographyTypes.Ward}>Ward</SelectItem>
                            <SelectItem value={PostcodesIoGeographyTypes.Council}>Council</SelectItem>
                            <SelectItem value={PostcodesIoGeographyTypes.Constituency}>GE2010-2019 Constituency</SelectItem>
                            <SelectItem value={PostcodesIoGeographyTypes.Constituency_2025}>GE2024 Constituency</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            </div>
            <Button type='submit' variant="reverse" disabled={createSourceResult.loading}>
              Save connection
            </Button>
          </form>
        </Form>
      </div>
    )
  }

  if (testSourceResult.loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-hLg">Testing connection...</h1>
        <p className="text-meepGray-400 max-w-lg">
          Please wait whilst we try to connect to your CRM using the information
          you provided
        </p>
        <LoadingIcon />
      </div>
    );
  }

  if (externalDataSourceType === "airtable") {
    return (
      <div className="space-y-7">
        <header>
          <h1 className="text-hLg">Connecting to your Airtable base</h1>
          <p className="mt-6 text-meepGray-400 max-w-lg">
            In order to send data across to your Airtable, we{"'"}ll need a few
            details that gives us permission to make updates to your base, as
            well as tell us which table to update in the first place.
          </p>
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitTestConnection)}
            className="space-y-7 max-w-lg"
          >
            <div className='text-hSm'>Connection details</div>
            <FormField
              control={form.control}
              name="airtable.apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Airtable access token</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input placeholder="patAB1" {...field} required />
                  </FormControl>
                  <FormDescription>
                    Make sure your token has read and write permissions for
                    table data, table schema and webhooks.{" "}
                    <a
                      className="underline"
                      target="_blank"
                      href="https://support.airtable.com/docs/creating-personal-access-tokens#:~:text=Click%20the%20Developer%20hub%20option,right%20portion%20of%20the%20screen."
                    >
                      Learn how to find your personal access token.
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="airtable.baseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base ID</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input placeholder="app1234" {...field} required />
                  </FormControl>
                  <FormDescription>
                    The unique identifier for your base.{" "}
                    <a
                      className="underline"
                      target="_blank"
                      href="https://support.airtable.com/docs/en/finding-airtable-ids#:~:text=Finding%20base%20URL%20IDs,-Base%20URLs"
                    >
                      Learn how to find your base ID.
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="airtable.tableId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table ID</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input placeholder="tbl1234" {...field} required />
                  </FormControl>
                  <FormDescription>
                    The unique identifier for your table.{" "}
                    <a
                      className="underline"
                      target="_blank"
                      href="https://support.airtable.com/docs/en/finding-airtable-ids#:~:text=Finding%20base%20URL%20IDs,-Base%20URLs"
                    >
                      Learn how to find your table ID.
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-x-4">
              <Button
                variant="outline"
                type="reset"
                onClick={() => {
                  router.back();
                }}
              >
                Back
              </Button>
              <Button type="submit" variant={"reverse"} disabled={testSourceResult.loading}>
                Test connection
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  return null;
}
