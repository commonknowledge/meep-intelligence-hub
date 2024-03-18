import * as React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { EnrichmentDataSource, SourcePath } from "@/lib/data";
import { AutoUpdateConfig } from "@/__generated__/graphql";
import { CommandSeparator } from "cmdk";
import { DataSourceFieldLabel } from "./DataSourceIcon";
import { twMerge } from "tailwind-merge";

export function SourcePathSelector({
  sources,
  value,
  setValue,
  focusOnMount = false,
}: {
  sources: Array<EnrichmentDataSource>;
  value: Pick<AutoUpdateConfig, 'source' | 'sourcePath'>;
  setValue: (source: AutoUpdateConfig['source'], sourcePath: AutoUpdateConfig['sourcePath']) => void;
  focusOnMount?: boolean;
}) {
  const [open, setOpen] = React.useState(focusOnMount);

  function labelForSourcePath(source: string, sourcePath: SourcePath): string {
    const sourceDict = sources.find((s) => s.slug === source);
    if (!sourceDict) return label(sourcePath);
    const sourcePathDict = sourceDict.sourcePaths.find((s) => val(s) === sourcePath);
    if (!sourcePathDict) return label(sourcePath);
    return label(sourcePathDict)
  }

  const selectedValueSource = sources.find(s => s.slug === value.source)

  return (
    <div className={twMerge(
      "flex w-full flex-col items-start justify-between rounded-md border py-2 px-3 sm:flex-row sm:items-center cursor-pointer hover:bg-meepGray-700 text-ellipsis overflow-hidden text-nowrap h-[40px]",
      selectedValueSource?.connectionType && "pl-1"
    )}>
      <div onClick={() => setOpen(true)} className="w-full text-ellipsis overflow-hidden text-nowrap text-sm">
        {value && value.source && value.sourcePath
          ? selectedValueSource?.connectionType ? (
            <span className='inline-flex flex-row items-center gap-2'>
              <DataSourceFieldLabel
                label={value.sourcePath}
                connectionType={selectedValueSource.connectionType}
              />
              <span className="text-xs text-meepGray-400">
                {sourceName(value.source)}
              </span>
            </span>
          ) : (
            <span className="flex flex-row gap-2 items-center">
              <span>
                {labelForSourcePath(value.source, value.sourcePath)}
              </span>
              <span className="text-xs text-meepGray-400">
                {sourceName(value.source)}
              </span>
            </span>
          ) : (
            "Click to select data"
          )}
      </div>
      <CommandDialog open={open} onOpenChange={() => setOpen(false)}>
        <CommandInput placeholder="Search available data..." />
        <CommandList>
          <CommandEmpty>No data found.</CommandEmpty>
          {sources.map((source, i, arr) => (
            <>
              <CommandGroup heading={source.name || source.slug}>
                {source.sourcePaths.map((sourcePath) => (
                  <CommandItem
                    key={val(sourcePath)}
                    value={label(sourcePath)}
                    onSelect={() => {
                      setValue(
                        source.slug,
                        val(sourcePath),
                      );
                      setOpen(false);
                    }}
                  >
                    <div>
                      <div>
                        {source.connectionType ? (
                          <DataSourceFieldLabel
                            label={label(sourcePath)}
                            connectionType={source.connectionType}
                          />
                        ) : (
                          label(sourcePath)
                        )}
                      </div>
                      {!!description(sourcePath) && (
                        <div className="text-xs opacity-70">
                          {description(sourcePath)}
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {i < arr.length - 1 && <CommandSeparator className='border border-meepGray-600' />}
            </>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );

  function sourceName(source: string) {
    const sourceDict = sources.find((s) => s.slug === source);
    return sourceDict ? sourceDict.name : source;
  }
}

function label(d: SourcePath) {
  return typeof d === "string" ? d : d.label || d.value;
}

function val(d: SourcePath) {
  return typeof d === "string" ? d : d.value;
}

function description(d: SourcePath) {
  return typeof d === "string" ? "" : d.description;
}