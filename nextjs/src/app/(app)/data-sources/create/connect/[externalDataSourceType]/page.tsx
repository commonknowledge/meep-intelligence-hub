"use client";

import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FetchResult, gql, useLazyQuery, useMutation } from "@apollo/client";
import { CreateAutoUpdateFormContext } from "../../NewExternalDataSourceWrapper";
import { FieldPath, FormProvider, useForm } from "react-hook-form";
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
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LoadingIcon } from "@/components/ui/loadingIcon";
import {
  CreateExternalDataSourceInput,
  DataSourceType,
  ExternalDataSourceInput,
  TestDataSourceInput,
  PostcodesIoGeographyTypes,
  TestDataSourceQuery,
  TestDataSourceQueryVariables,
  CreateSourceMutation,
} from "@/__generated__/graphql";
import { toastPromise } from "@/lib/toast";
import { PrepopulatedSelectField } from "@/components/ExternalDataSourceFields";

const TEST_DATA_SOURCE = gql`
  query TestDataSource($input: TestDataSourceInput!) {
    testDataSource(input: $input) {
      __typename
      crmType
      fieldDefinitions {
        label
        value
        description
      }
      geographyColumn
      geographyColumnType
      healthcheck
      remoteName
    }
  }
`;

const CREATE_DATA_SOURCE = gql`
  mutation CreateSource($input: CreateExternalDataSourceInput!) {
    createExternalDataSource(input: $input) {
      code
      errors {
        message
      }
      result {
        id
        name
        crmType
        dataType
      }
    }
  }
`;

type FormInputs = CreateExternalDataSourceInput &
  ExternalDataSourceInput &
  TestDataSourceInput;

export default function Page({
  params: { externalDataSourceType },
}: {
  params: { externalDataSourceType: keyof CreateExternalDataSourceInput };
}) {
  const router = useRouter();
  const context = useContext(CreateAutoUpdateFormContext);

  useEffect(() => {
    context.setStep(2);
  }, [context]);

  const form = useForm<FormInputs>({
    defaultValues: {
      geographyColumnType: PostcodesIoGeographyTypes.Postcode,
      geographyColumn:
        externalDataSourceType === "mailchimp" ? "ADDRESS.zip" : "",
      dataType: context.dataType,
      name: "",
      airtable: {
        apiKey: "",
        baseId: "",
        tableId: "",
      },
      mailchimp: {
        apiKey: "",
        listId: "",
      },
    },
  });

  const [createSource, createSourceResult] =
    useMutation<CreateSourceMutation>(CREATE_DATA_SOURCE);
  const [testSource, testSourceResult] = useLazyQuery<
    TestDataSourceQuery,
    TestDataSourceQueryVariables
  >(TEST_DATA_SOURCE);

  const currentSource = testSourceResult.data;

  const [guessed, setGuessed] = useState<
    Partial<Record<FieldPath<FormInputs>, string | undefined | null>>
  >({});

  /**
   * For a field that maps a data source property (e.g. address_field) to
   * a field on the remote data source (e.g. "Address Line 1"), try to guess the
   * remote field based on a list of likely options, while preventing bad matches
   * (e.g. "Email address" for "Address").
   *
   * In this example, field = "addressField", guessKeys = ["address", "line1", ...],
   * badKeys = ["email"].
   */
  function useGuessedField(
    field: string,
    guessKeys: string[],
    badKeys: string[] = [],
  ) {
    useEffect(() => {
      const guess =
        testSourceResult.data?.testDataSource.fieldDefinitions?.find(
          (field: { label?: string | null; value: string }) => {
            const isMatch = (
              fieldName: string | null | undefined,
              guessKey: string,
            ) => {
              if (!fieldName) {
                return false;
              }
              const match = fieldName
                .toLowerCase()
                .replaceAll(" ", "")
                .includes(guessKey.replaceAll(" ", ""));
              if (!match) {
                return false;
              }
              for (const badKey of badKeys) {
                const badMatch = fieldName
                  .toLowerCase()
                  .replaceAll(" ", "")
                  .includes(badKey.replaceAll(" ", ""));
                if (badMatch) {
                  return false;
                }
              }
              return true;
            };
            for (const guessKey of guessKeys) {
              if (
                isMatch(field.label, guessKey) ||
                isMatch(field.value, guessKey)
              ) {
                return true;
              }
            }
          },
        );
      if (guess?.value) {
        setGuessed((guesses) => ({ ...guesses, [field]: guess?.value }));
        // @ts-ignore
        form.setValue(field, guess?.value);
      }
    }, [
      testSourceResult.data?.testDataSource.fieldDefinitions,
      form,
      setGuessed,
    ]);
  }

  useGuessedField("geographyColumn", [
    "postcode",
    "postal code",
    "zip code",
    "zip",
  ]);
  useGuessedField("emailField", ["email"]);
  useGuessedField("phoneField", ["mobile", "phone"]);
  useGuessedField("addressField", ["street", "line1", "address"], ["email"]);
  useGuessedField("fullNameField", ["full name", "name"]);
  useGuessedField("firstNameField", ["first name", "given name"]);
  useGuessedField("lastNameField", [
    "last name",
    "family name",
    "surname",
    "second name",
  ]);

  async function submitTestConnection(formData: FormInputs) {
    console.log("form data", formData);
    if (!formData[externalDataSourceType]) {
      throw Error("Need some CRM connection details to proceed!");
    }
    // Get the nested data source key e.g. Airtable or Mailchimp
    const dataSourceKey = externalDataSourceType;

    const dataSourceValue = formData[dataSourceKey] || {};

    const input = {
      type: dataSourceKey,
      apiKey: dataSourceValue?.apiKey || "",
      baseId: "baseId" in dataSourceValue ? dataSourceValue.baseId : "",
      tableId: "tableId" in dataSourceValue ? dataSourceValue.tableId : "",
      listId: "listId" in dataSourceValue ? dataSourceValue.listId : "",
    };

    {
      toastPromise(
        testSource({
          variables: { input },
        }),
        {
          loading: "Testing connection...",
          success: (d: FetchResult<TestDataSourceQuery>) => {
            if (!d.errors && d.data?.testDataSource) {
              return "Connection is healthy";
            }
            throw new Error(
              d.errors?.map((e) => e.message).join(", ") || "Unknown error",
            );
          },
          error: "Connection failed",
        },
      );
    }
  }

  async function submitCreateSource(formData: FormInputs) {
    if (!formData[externalDataSourceType]) {
      throw Error("Need some CRM connection details to proceed!");
    }
    // To avoid mutation of the form data
    const genericCRMData = Object.assign({}, formData);
    const CRMSpecificData = formData[externalDataSourceType];

    // Remove specific CRM data from the generic data
    // TODO: make this less fragile. Currently it assumes any nested
    // object is specific to a CRM.
    for (const key of Object.keys(formData)) {
      if (typeof formData[key as keyof FormInputs] === "object") {
        delete genericCRMData[key as keyof FormInputs];
      }
    }

    let input: CreateExternalDataSourceInput = {
      [externalDataSourceType]: {
        ...genericCRMData,
        ...CRMSpecificData,
      },
    };
    toastPromise(createSource({ variables: { input } }), {
      loading: "Saving connection...",
      success: (d) => {
        const errors =
          d.errors || d.data?.createExternalDataSource.errors || [];
        if (!errors.length && d.data?.createExternalDataSource.result) {
          if (
            d.data?.createExternalDataSource.result.dataType ===
            DataSourceType.Member
          ) {
            router.push(
              `/data-sources/create/configure/${d.data.createExternalDataSource.result.id}`,
            );
          } else {
            router.push(
              `/data-sources/inspect/${d.data.createExternalDataSource.result.id}`,
            );
          }
          return "Connection successful";
        }
        throw new Error(
          errors.map((e) => e.message).join(", ") || "Unknown error",
        );
      },
      error(e) {
        return {
          title: "Connection failed",
          description: e.message,
        };
      },
    });
  }

  if (
    createSourceResult.loading ||
    createSourceResult.data?.createExternalDataSource.result
  ) {
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

  function FPrepopulatedSelectField({
    name,
    label,
    placeholder,
    required = false,
  }: {
    name: FieldPath<FormInputs>;
    label?: string;
    placeholder?: string;
    required?: boolean;
  }) {
    return (
      <PrepopulatedSelectField
        name={name}
        label={label}
        placeholder={placeholder}
        fieldDefinitions={
          testSourceResult.data?.testDataSource.fieldDefinitions
        }
        control={form.control}
        crmType={testSourceResult.data?.testDataSource.crmType!}
        guess={guessed[name]}
        required={required}
      />
    );
  }

  if (currentSource?.testDataSource?.healthcheck) {
    return (
      <div className="space-y-6">
        <h1 className="text-hLg">Connection successful</h1>
        <p className="text-meepGray-400 max-w-lg">
          Tell us a bit more about the data you{"'"}re connecting to.
        </p>
        <FormProvider {...form}>
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
                      <Input
                        placeholder="My members list"
                        {...field}
                        required
                      />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="What kind of data is this?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type of data source</SelectLabel>
                            <SelectItem value={DataSourceType.Member}>
                              A list of members
                            </SelectItem>
                            <SelectItem value={DataSourceType.Other}>
                              Other data
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4 w-full">
                <FPrepopulatedSelectField
                  name="geographyColumn"
                  label="geography"
                  required
                />
                <FormField
                  control={form.control}
                  name="geographyColumnType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Geography Type</FormLabel>
                      <FormControl>
                        {/* @ts-ignore */}
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a geography type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Geography type</SelectLabel>
                              <SelectItem
                                value={PostcodesIoGeographyTypes.Postcode}
                              >
                                Postcode
                              </SelectItem>
                              <SelectItem
                                value={PostcodesIoGeographyTypes.Ward}
                              >
                                Ward
                              </SelectItem>
                              <SelectItem
                                value={PostcodesIoGeographyTypes.Council}
                              >
                                Council
                              </SelectItem>
                              <SelectItem
                                value={PostcodesIoGeographyTypes.Constituency}
                              >
                                GE2010-2019 Constituency
                              </SelectItem>
                              <SelectItem
                                value={
                                  PostcodesIoGeographyTypes.Constituency_2025
                                }
                              >
                                GE2024 Constituency
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("dataType") === DataSourceType.Member && (
                  <>
                    <FPrepopulatedSelectField name="emailField" />
                    <FPrepopulatedSelectField name="phoneField" />
                    <FPrepopulatedSelectField name="addressField" />
                    <FPrepopulatedSelectField name="fullNameField" />
                    <FPrepopulatedSelectField name="firstNameField" />
                    <FPrepopulatedSelectField name="lastNameField" />
                  </>
                )}
              </div>
              <Button
                type="submit"
                variant="reverse"
                disabled={createSourceResult.loading}
              >
                Save connection
              </Button>
            </form>
          </Form>
        </FormProvider>
      </div>
    );
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
            <div className="text-hSm">Connection details</div>
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
              <Button type="submit" variant={"reverse"}>
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
            In order to send data across to your Mailchimp audience, we{"'"}ll
            need a few details that gives us permission to make updates to your
            audience, as well as tell us which audience to update in the first
            place.
          </p>
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitTestConnection)}
            className="space-y-7 max-w-lg"
          >
            <div className="text-hSm">Connection details</div>
            <FormField
              control={form.control}
              name="mailchimp.apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MailChimp API key</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input placeholder="X...-usXX" {...field} required />
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
                    <Input placeholder="XXXXXXXXXX" {...field} required />
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
              <Button
                type="submit"
                variant={"reverse"}
                disabled={testSourceResult.loading}
              >
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
