"use client";

import { Button } from "@/components/ui/button";
import { enrichmentDataSources } from "@/lib/data";
import { Form, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { MutationUpdateExternalDataSourceUpdateConfigArgs } from "@/__generated__/graphql";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SourcePathSelector } from "@/components/SelectSourceData";
import { ArrowRight, XCircle } from "lucide-react";

export function UpdateConfigForm({
  onSubmit,
  initialData,
  children,
  saveButtonLabel = "Update",
}: {
  onSubmit: (
    data: MutationUpdateExternalDataSourceUpdateConfigArgs["data"],
  ) => void;
  initialData?: Partial<
    MutationUpdateExternalDataSourceUpdateConfigArgs["data"]
  >;
  saveButtonLabel?: string;
  children?: React.ReactNode;
}) {
  const form = useForm<
    MutationUpdateExternalDataSourceUpdateConfigArgs["data"]
  >({
    defaultValues: initialData,
  });
  const data = form.watch();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: "mapping",
    },
  );

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <div className="space-y-7">
          <div className="max-w-sm">
            {/* Postcode field */}
            <FormField
              control={form.control}
              name="postcodeColumn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode Column</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input placeholder="postcode" {...field} />
                  </FormControl>
                  <FormDescription>In your external table</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="max-w-3xl">
            <table>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td className="w-10">
                    <Button
                      className="flex-shrink"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <XCircle />
                    </Button>
                  </td>
                  <td className="w-1/2">
                    <SourcePathSelector
                      sources={enrichmentDataSources}
                      value={{
                        source: form.watch(`mapping.${index}.source`),
                        sourcePath: form.watch(`mapping.${index}.sourcePath`),
                      }}
                      setValue={(source, sourcePath) => {
                        form.setValue(`mapping.${index}.source`, source);
                        form.setValue(
                          `mapping.${index}.sourcePath`,
                          sourcePath,
                        );
                      }}
                    />
                  </td>
                  <td className="w-10">
                    <ArrowRight className="flex-shrink" />
                  </td>
                  <td className="w-1/2">
                    <Input
                      className="flex-shrink-0 flex-grow"
                      placeholder="Destination column"
                      key={field.id} // important to include key with field's id
                      {...form.register(`mapping.${index}.destinationColumn`)}
                    />
                  </td>
                </tr>
              ))}
            </table>
            <Button
              onClick={() => {
                append({
                  source: "",
                  sourcePath: "",
                  destinationColumn: "",
                });
              }}
            >
              Add field
            </Button>
            <div className="flex flex-row gap-x-4 mt-6">
              {children}
              <Button
                type="submit"
                variant={"reverse"}
                onClick={() => {
                  onSubmit(data);
                }}
              >
                {saveButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
