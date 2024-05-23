"use client";

import {
  DataSourceType,
  ExternalDataSource,
  GetMemberListQuery,
  MapReportLayersSummaryFragment,
  SharedDataSource,
} from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { gql, useFragment, useQuery } from "@apollo/client";
import { useContext, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Plus, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { ReportContext } from "@/app/reports/[id]/context";
import { useRouter } from "next/navigation";
import { MAP_REPORT_LAYERS_SUMMARY } from "@/app/reports/[id]/lib";
import { DataSourceIcon } from "../DataSourceIcon";
import pluralize from "pluralize";
import { CRMSelection } from "../CRMButtonItem";
import { LoadingIcon } from "../ui/loadingIcon";

type Source = {
  name: string;
  id: string;
};

export function AddMapLayerButton({
  addLayer,
}: {
  addLayer(layer: Source): void;
}) {
  const { id } = useContext(ReportContext);
  const form = useForm<{ source?: Source }>();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4" /> add data source
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((d) => {
              setOpen(false);
              if (!d.source) return;
              addLayer(d.source);
            })}
          >
            <DialogHeader>
              <DialogTitle>Add a map layer</DialogTitle>
              <DialogDescription>
                Select a data source from your org or one that{"'"}s been shared
                with you.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <MapLayerSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add layer</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function MapLayerSelector({
  value,
  onChange,
}: {
  value?: Source;
  onChange: (value: Source) => void;
}) {
  const [open, setOpen] = useState(false);
  const { id, report } = useContext(ReportContext);
  const dataSources = useQuery<GetMemberListQuery>(MEMBER_LISTS);
  const router = useRouter();
  const layers = useFragment<MapReportLayersSummaryFragment>({
    fragment: MAP_REPORT_LAYERS_SUMMARY,
    fragmentName: "MapReportLayersSummary",
    from: {
      __typename: "MapReport",
      id,
    },
  });

  const useableSources = useMemo(() => {
    const data: Array<
      | GetMemberListQuery["myOrganisations"][0]["sharingPermissionsFromOtherOrgs"][0]["externalDataSource"]
      | GetMemberListQuery["myOrganisations"][0]["externalDataSources"][0]
    > = [
      ...(dataSources.data?.myOrganisations[0]?.externalDataSources.filter(
        (d) => d.dataType === DataSourceType.Member,
      ) || []),
      ...(dataSources.data?.myOrganisations[0]?.sharingPermissionsFromOtherOrgs
        .map((p) => p.externalDataSource)
        .filter((d) => d.dataType === DataSourceType.Member) || []),
    ];
    return data;
  }, [dataSources.data]);

  const selectedSource = useableSources.find((s) => s.id === value?.id);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between group h-14"
        >
          {value && selectedSource ? (
            <div className="py-2 text-sm">
              <CRMSelection
                source={selectedSource}
                // @ts-ignore
                isShared={!!selectedSource.organisation}
              />
            </div>
          ) : (
            "Select data source"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search your data sources..." />
          <CommandEmpty
            onClick={() => {
              router.push("/data-sources/create?dataType=MEMBER");
            }}
          >
            No data sources found. Click to connect.
          </CommandEmpty>
          <CommandGroup>
            {useableSources.map((source) => {
              const alreadySelected = source.id === value;
              const alreadyUsed = layers.data?.layers?.some(
                (sL) => sL?.source?.id === source.id,
              );
              return (
                <CommandItem
                  value={source.name}
                  key={source.id}
                  disabled={alreadySelected || alreadyUsed}
                  onSelect={() => {
                    onChange(source);
                    setOpen(false);
                  }}
                  className="flex flex-row items-center gap-1"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      alreadySelected || alreadyUsed
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <CRMSelection
                    source={source}
                    // @ts-ignore
                    isShared={!!source.organisation}
                  />
                </CommandItem>
              );
            })}
            {dataSources.loading ? (
              <CommandItem disabled>
                <LoadingIcon className={"mr-2 h-4 w-4 inline-block"} />
                Loading...
              </CommandItem>
            ) : (
              <CommandItem
                onSelect={() => {
                  dataSources.refetch();
                }}
              >
                <RefreshCcw className={"mr-2 h-4 w-4"} />
                Reload data sources
              </CommandItem>
            )}
            <CommandItem
              onSelect={() => {
                router.push("/data-sources/create?dataType=MEMBER");
              }}
            >
              <Plus className={"mr-2 h-4 w-4"} />
              Connect a new data source
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const MEMBER_LISTS = gql`
  query GetMemberList {
    myOrganisations {
      externalDataSources(filters: { dataType: MEMBER }) {
        id
        name
        importedDataCount
        crmType
        dataType
      }
      sharingPermissionsFromOtherOrgs {
        externalDataSource {
          id
          name
          importedDataCount
          crmType
          dataType
          organisation {
            name
          }
        }
      }
    }
  }
`;
