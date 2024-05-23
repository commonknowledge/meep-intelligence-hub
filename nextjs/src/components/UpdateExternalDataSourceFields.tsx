import { FieldPath, FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  ExternalDataSourceInput,
  FieldDefinition,
  PostcodesIoGeographyTypes,
} from "@/__generated__/graphql";
import { PrepopulatedSelectField } from "./ExternalDataSourceFields";
import {
  FormControl,
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
import { DataSourceFieldLabel } from "./DataSourceIcon";
import { Input } from "@/components/ui/input";

type FormInputs = ExternalDataSourceInput;

export function UpdateExternalDataSourceFields({
  initialData,
  crmType,
  fieldDefinitions,
  onSubmit,
}: {
  onSubmit: (
    data: ExternalDataSourceInput,
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => void;
  crmType: string;
  initialData?: ExternalDataSourceInput;
  fieldDefinitions?: FieldDefinition[] | null;
}) {
  const form = useForm<FormInputs>({
    defaultValues: initialData,
  });

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
        fieldDefinitions={fieldDefinitions}
        control={form.control}
        crmType={crmType}
        required={required}
      />
    );
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 max-w-lg"
      >
        <FormField
          control={form.control}
          name="geographyColumn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Geography Field</FormLabel>
              <FormControl>
                {fieldDefinitions?.length ? (
                  // @ts-ignore
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="pl-1">
                      <SelectValue
                        placeholder={`Choose ${form.watch("geographyColumnType") || "geography"} field`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Geography field</SelectLabel>
                        {fieldDefinitions?.map((field) => (
                          <SelectItem key={field.value} value={field.value}>
                            <DataSourceFieldLabel
                              fieldDefinition={field}
                              crmType={crmType}
                            />
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  // @ts-ignore
                  <Input {...field} required={required} />
                )}
              </FormControl>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a geography type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Geography type</SelectLabel>
                      <SelectItem value={PostcodesIoGeographyTypes.Postcode}>
                        Postcode
                      </SelectItem>
                      <SelectItem value={PostcodesIoGeographyTypes.Ward}>
                        Ward
                      </SelectItem>
                      <SelectItem value={PostcodesIoGeographyTypes.Council}>
                        Council
                      </SelectItem>
                      <SelectItem
                        value={PostcodesIoGeographyTypes.Constituency}
                      >
                        Constituency
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FPrepopulatedSelectField name="emailField" />
        <FPrepopulatedSelectField name="phoneField" />
        <FPrepopulatedSelectField name="addressField" />
        <FPrepopulatedSelectField name="fullNameField" />
        <FPrepopulatedSelectField name="firstNameField" />
        <FPrepopulatedSelectField name="lastNameField" />
        <Button type="submit" className="mt-4">
          Save settings
        </Button>
      </form>
    </FormProvider>
  );
}
