import { Control, FieldPath } from "react-hook-form";
import toSpaceCase from "to-space-case";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { FieldDefinition } from "@/__generated__/graphql";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DataSourceFieldLabel } from "./DataSourceIcon";
import { Input } from "./ui/input";

export function PrepopulatedSelectField<FormInputs extends object = any>({
  name,
  label,
  placeholder,
  fieldDefinitions,
  control,
  crmType,
  guess,
  required = false,
}: {
  name: FieldPath<FormInputs>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  fieldDefinitions?: Array<FieldDefinition> | null;
  control: Control<FormInputs>;
  crmType: string;
  guess?: string | null;
}) {
  const humanisedFieldName =
    label || `${toSpaceCase(name.replace(/(field)$/gi, ""))} field`;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{humanisedFieldName}</FormLabel>
          <FormControl>
            {fieldDefinitions?.length ? (
              <Select
                {...{ ...field, ref: null }}
                onValueChange={field.onChange}
                required={required}
              >
                <SelectTrigger className="pl-1">
                  <SelectValue
                    className="capitalize"
                    placeholder={placeholder || `Choose ${humanisedFieldName}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available fields</SelectLabel>
                    {fieldDefinitions?.map((field) => (
                      <SelectItem key={field.value} value={field.value}>
                        <DataSourceFieldLabel
                          crmType={crmType}
                          fieldDefinition={field}
                        />
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <Input {...field} required={required} />
            )}
          </FormControl>
          {!!guess && guess === field.value && (
            <FormDescription className="text-yellow-500 italic">
              Guessed based on available fields
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
