import * as React from "react";
import {
  Calendar,
  MoreHorizontal,
  Tags,
  Trash,
  User,
  Database,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EnrichmentDataSource } from "@/lib/data";

export function SourcePathSelector({
  sources,
  value,
  setValue,
}: {
  sources: Array<EnrichmentDataSource>;
  value: {
    source: string;
    sourcePath: string;
  };
  setValue: (source: string, sourcePath: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex w-full flex-col items-start justify-between rounded-md border p-1 sm:flex-row sm:items-center">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            {value && value.source && value.sourcePath
              ? `${value.source}: ${value.sourcePath}`
              : "Select data"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Data sources</DropdownMenuLabel>
          <DropdownMenuGroup>
            {sources.map((source) => (
              <DropdownMenuSub key={source.slug}>
                <DropdownMenuSubTrigger>
                  <Database className="mr-2 h-4 w-4" />
                  {source.name || source.slug}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Filter available data..."
                      autoFocus={true}
                    />
                    <CommandList>
                      <CommandEmpty>No data found.</CommandEmpty>
                      <CommandGroup>
                        {source.sourcePaths.map((sourcePath) => (
                          <CommandItem
                            key={
                              typeof sourcePath === "string"
                                ? sourcePath
                                : sourcePath.value
                            }
                            value={
                              typeof sourcePath === "string"
                                ? sourcePath
                                : sourcePath.value
                            }
                            onSelect={() => {
                              setValue(
                                source.slug,
                                typeof sourcePath === "string"
                                  ? sourcePath
                                  : sourcePath.value,
                              );
                              setOpen(false);
                            }}
                          >
                            {typeof sourcePath === "string"
                              ? sourcePath
                              : sourcePath.label || sourcePath.value}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
