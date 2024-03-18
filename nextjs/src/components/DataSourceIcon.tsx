import { FieldDefinition } from "@/__generated__/graphql";
import { AirtableIcon } from "./logos";
import { twMerge } from "tailwind-merge";

export function DataSourceFieldLabel({ label, fieldDefinition, connectionType, className, source }: {
  label?: string,
  fieldDefinition?: FieldDefinition,
  connectionType: string,
  className?: string,
  source?: string
}) {
  return <span className={twMerge(
    'rounded-sm bg-meepGray-700 inline-flex gap-1 justify-start items-center overflow-hidden text-ellipsis text-nowrap',
     className
    )}>
    <span className='px-2 py-1 inline-flex gap-2 items-center'>
      <DataSourceIcon connectionType={connectionType} className={"inline-block w-5"} />
      <span className='font-IBMPlexMono !text-white'>
        {label || fieldDefinition?.label || fieldDefinition?.value || "Unknown field"}
      </span>
    </span>
    {!!source && (
      <span className='px-2 py-1 text-xs text-meepGray-400 bg-meepGray-600'>
        {source}
      </span>
    )}
  </span>
}

export function DataSourceIcon({ connectionType, className }: { connectionType: string, className?: string}) {
  switch (connectionType) {
    case "AirtableSource": return <AirtableIcon className={className} />;
  }
}