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
  AirtableSourceInput,
  CreateSourceMutation,
  CreateSourceMutationVariables,
  DataSourceType,
  FieldDefinition,
  MailChimpSourceInput,
  PostcodesIoGeographyTypes,
  airtableSourceQuery,
  airtableSourceQueryVariables,
  
} from "@/__generated__/graphql";
import { DataSourceFieldLabel } from "@/components/DataSourceIcon";
import { toastPromise } from "@/lib/toast";

const TEST_MAILCHIMP_SOURCE = gql`
  query TestMailchimpSource($apiKey: String!, $listId: String!) {
    mailchimpSource: testMailchimpSource(apiKey: $apiKey, listId: $listId) {
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

const TEST_AIRTABLE_SOURCE = gql`
  query TestAirtableSource($apiKey: String!, $baseId: String!, $tableId: String!) {
    airtableSource: testAirtableSource(apiKey: $apiKey, baseId: $baseId, tableId: $tableId) {
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

// const CREATE_MAILCHIMP_DATA_SOURCE = gql`
// mutation CreateMailchimpSource($MailChimpSource: MailChimpSourceInput!) {
//   createMailchimpSource: createMailchimpSource(data: $MailChimpSource) {
//     id
//     name
//     healthcheck
//     dataType
//   }
// }
// `;

interface ExternalDataSourceInput {
  mailchimp: MailChimpSourceInput
  airtable: AirtableSourceInput
}


const CREATE_DATA_SOURCE = gql`
mutation CreateSource ($input: ExternalDataSourceInput!) {
    createExternalDataSource (input: $input) {
        connectionDetails {
            __typename
        } 
    }
}
`;

type FormInputs = {
  sourceDetails: {
    apiKey?: string;
    listId?: string;
    baseId?: string;
    tableId?: string;
    name?: string;
    dataType?: DataSourceType;
  };
  geographyColumnType?: PostcodesIoGeographyTypes;
  geographyColumn?: string;
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
      sourceDetails: {
        dataType: context.dataType,
        apiKey: '', 
        listId: '', 
        baseId: '',
        tableId:'',
      },
    },
  });

  const [createSource, createSourceResult] = useMutation(CREATE_DATA_SOURCE);


  const source = form.watch();

  const TEST_SOURCE_QUERIES = {
    mailchimp: TEST_MAILCHIMP_SOURCE,
    airtable: TEST_AIRTABLE_SOURCE,
  };

  const [testSource, testSourceResult] = useLazyQuery(
    TEST_SOURCE_QUERIES[externalDataSourceType as keyof typeof TEST_SOURCE_QUERIES]
    );





  const currentSource = testSourceResult.data?.[`${externalDataSourceType}Source`];

  const [guessedPostcode, setGuessedPostcode] = useState<string | null>(null);

  useEffect(() => {
    // Guessing the geography column based on current source dynamically
    let guessedPostcodeColumn = currentSource?.fieldDefinitions?.find(
      (field: { label: string; value: string; }) => (
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
      form.setValue('geographyColumn', guessedPostcodeColumn.value);
      setGuessedPostcode(guessedPostcodeColumn.value)
      form.setValue('geographyColumnType', PostcodesIoGeographyTypes.Postcode);
    }
  }, [currentSource?.fieldDefinitions, form, setGuessedPostcode]);

  useEffect(() => {
    // Proposing the name based on the remote name from the current source dynamically
    if (currentSource?.remoteName) {
      form.setValue('sourceDetails.name', currentSource.remoteName);
    }
  }, [currentSource?.remoteName, form]);

  async function submitTestConnection(data: FormInputs) {
    let variables: { apiKey?: string; listId?: string; baseId?: string; tableId?: string } = {};
  
    // Adjust this part based on how your form data is structured for different source types
    if (externalDataSourceType === "mailchimp") {
      // Assuming `data.sourceDetails` contains Mailchimp-specific fields
      const { apiKey, listId } = data.sourceDetails;
      if (apiKey && listId) {
        variables = { apiKey, listId };
      }
    } else if (externalDataSourceType === "airtable") {
      // Assuming `data.sourceDetails` contains Airtable-specific fields
      const { apiKey, baseId, tableId } = data.sourceDetails;
      if (apiKey && baseId && tableId) {
        variables = { apiKey, baseId, tableId };
      }
    }
  
    // Early return if variables are not set correctly
    if (!variables.apiKey || !(variables.listId || (variables.baseId && variables.tableId))) {
      toast.error("No valid data provided for testing connection.");
      return;
    }
  
    // Use the variables to perform the test query
    toastPromise(testSource({ variables }), {
      loading: "Testing connection...",
      success: "Connection successful",
      error: "Connection failed",
    });
  }

  async function submitCreateSource(data: FormInputs) {
    let input = {
      ...data.sourceDetails,
      geographyColumn: data.geographyColumn,
      geographyColumnType: data.geographyColumnType,
    };
 

    if (!input.apiKey || !(input.listId || (input.baseId && input.tableId))) {
      toast.error("No valid data provided for creating source.");
      return;
    }

    toastPromise(createSource({ variables: { input } }), {
      loading: "Saving connection...",
      success: "Connection successful",
      error: "Connection failed",
    }).then((result) => {
      
   console.log(result)
    });
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

  if (testSourceResult.data?.[`${externalDataSourceType}Source`]?.healthcheck) {
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
              name="sourceDetails.name"
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
              name="sourceDetails.dataType"
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
                      {
                        (testSourceResult.data?.[`${externalDataSourceType}Source`]?.fieldDefinitions?.length) ? (
                          <Select {...field} onValueChange={field.onChange} required>
                            <SelectTrigger className='pl-1'>
                              <SelectValue
                                placeholder={`Choose ${source.geographyColumnType || 'geography'} column`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Available columns</SelectLabel>
                                {testSourceResult.data?.[`${externalDataSourceType}Source`]?.fieldDefinitions?.map(

                                  (field: FieldDefinition | undefined) => (
                                    <SelectItem key={field.value} value={field.value}>
                                      <DataSourceFieldLabel
                                        connectionType={
                                          testSourceResult.data?.[`${externalDataSourceType}Source`]?.__typename!
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
              name="sourceDetails.apiKey"
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
              name="sourceDetails.baseId"
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
              name="sourceDetails.tableId"
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

  if (externalDataSourceType === "mailchimp") {
    return (
      <div className="space-y-7">
        <header>
          <h1 className="text-hLg">Connecting to your Mailchimp audience</h1>
          <p className="mt-6 text-meepGray-400 max-w-lg">
            In order to send data across to your Mailchimp audience, we{"'"}ll need a few
            details that gives us permission to make updates to your audience, as
            well as tell us which audience to update in the first place.
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
              name="mailchimp.apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MailChimp API key</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input placeholder="patAB1" {...field} required />
                  </FormControl>
                  <FormDescription>
                    {" "}
                    <a
                      className="underline"
                      target="_blank"
                      href="https://mailchimp.com/help/about-api-keys/"
                    >
                      Learn how to find your API key.
                    </a>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mailchimp.listId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Audience ID</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input placeholder="app1234" {...field} required />
                  </FormControl>
                  <FormDescription>
                    The unique identifier for your audience.{" "}
                    <a
                      className="underline"
                      target="_blank"
                      href="https://mailchimp.com/help/find-audience-id/"
                    >
                      Learn how to find your audience ID.
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
