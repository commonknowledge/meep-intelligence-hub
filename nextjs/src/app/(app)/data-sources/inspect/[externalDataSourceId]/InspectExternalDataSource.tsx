"use client";

import {
  FetchResult,
  MutationResult,
  gql,
  useQuery,
  useApolloClient,
  ApolloClient,
} from "@apollo/client";
import { AirtableLogo } from "@/components/logos";
import { formatRelative } from "date-fns";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AutoUpdateSwitch,
  AutoUpdateWebhookRefresh,
  TriggerUpdateButton,
} from "@/components/AutoUpdateCard";
import { LoadingIcon } from "@/components/ui/loadingIcon";
import {
  DataSourceType,
  DeleteUpdateConfigMutation,
  DeleteUpdateConfigMutationVariables,
  ExternalDataSourceInput,
  ExternalDataSourceInspectPageQuery,
  ExternalDataSourceInspectPageQueryVariables,
  ImportDataMutation,
  ImportDataMutationVariables,
  UpdateExternalDataSourceMutation,
  UpdateExternalDataSourceMutationVariables,
} from "@/__generated__/graphql";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ExternalLink, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UpdateMappingForm } from "@/components/UpdateMappingForm";
import { UDPATE_EXTERNAL_DATA_SOURCE } from "@/graphql/mutations";
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { DataSourceFieldLabel } from "@/components/DataSourceIcon";
import { toastPromise } from "@/lib/toast";

const GET_UPDATE_CONFIG = gql`
  query ExternalDataSourceInspectPage($ID: ID!) {
    externalDataSource(pk: $ID) {
      id
      name
      dataType
      remoteUrl
      connectionDetails {
        crmType: __typename
        ... on AirtableSource {
          baseId
          tableId
          apiKey
        }
      }
      autoUpdateEnabled
      webhookHealthcheck
      geographyColumn
      geographyColumnType
      isImporting
      importedDataCount
      fieldDefinitions {
        label
        value
        description
      }
      jobs {
        status
        id
        taskName
        args
        lastEventAt
      }
      updateMapping {
        source
        sourcePath
        destinationColumn
      }
    }
  }
`;

const DELETE_UPDATE_CONFIG = gql`
  mutation DeleteUpdateConfig($id: String!) {
    deleteExternalDataSource(data: { id: $id }) {
      id
    }
  }
`;

export default function InspectExternalDataSource({
  externalDataSourceId,
}: {
  externalDataSourceId: string;
}) {
  const router = useRouter();
  const client = useApolloClient();

  const { loading, error, data, refetch } = useQuery<
    ExternalDataSourceInspectPageQuery,
    ExternalDataSourceInspectPageQueryVariables
  >(GET_UPDATE_CONFIG, {
    variables: {
      ID: externalDataSourceId,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => refetch(), 5000)
    return () => clearInterval(interval)
  }, [refetch])

  if (!data?.externalDataSource && loading) {
    return <LoadingIcon />;
  }

  if (!data?.externalDataSource) {
    return <h2>No data sources found</h2>;
  }

  const source = data.externalDataSource
  const allowMapping = source.dataType == DataSourceType.Member

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-7">
      <header className="flex flex-row justify-between gap-8">
        <div className='w-full'>
          <div className="text-meepGray-400">
            {source.dataType === DataSourceType.Member ? "Member list" : "Custom data layer"}
          </div>
          <h1 className="text-hLg" contentEditable id="nickname" onBlur={d => {
            updateMutation({
              name: document.getElementById("nickname")?.textContent?.trim()
            })
          }}>
            {source.name}
          </h1>
          {!!source.remoteUrl && (
            <a href={source.remoteUrl} className="text-meepGray-300 underline text-sm">
              Visit URL: {source.remoteUrl} <ExternalLink />
            </a>
          )}
        </div>
        <div>
          {source.connectionDetails.crmType ===
            "AirtableSource" && (
            <div className="inline-flex rounded-xl bg-meepGray-700 px-10 py-6 overflow-hidden flex-row items-center justify-center">
              <AirtableLogo className="w-full" />
            </div>
          )}
        </div>
      </header>
      {allowMapping && (
        <>
        <div className="border-b border-meepGray-700 pt-10" />
        <div className='grid sm:grid-cols-2 gap-8'>
          <section className='space-y-4'>
            <div>Imported records</div>
            <div className='text-hXlg'>{source.importedDataCount || 0}</div>
            <p className='text-sm text-meepGray-400'>
              Import data from this source into Mapped for use in auto-updates and reports.
            </p>
            <Button disabled={source.isImporting} onClick={() => importData(client, externalDataSourceId)}>
              {!source.isImporting ? "Import data" : <span className='flex flex-row gap-2 items-center'>
                <LoadingIcon size={"18"} />
                <span>Importing...</span>
              </span>}
            </Button>
          </section>
          <section className='space-y-4'>
            <h2 className="text-hSm mb-5">Auto-updates</h2>
            <p className='text-sm text-meepGray-400'>
              Auto-updates are {source.autoUpdateEnabled ? "enabled" : "disabled"} for this data source. Mapped can automatically update this data source based on the mapping you{"'"}ve defined in the Data Mapping section.
            </p>
            {source.jobs[0]?.lastEventAt ? (
              <div className="text-meepGray-400">
                Last sync:{" "}
                {formatRelative(source.jobs[0].lastEventAt, new Date())} (
                {source.jobs[0].status})
              </div>
            ) : null}
            <AutoUpdateSwitch externalDataSource={source} />
            {source.autoUpdateEnabled && !source.webhookHealthcheck && (
              <>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Webhooks unhealthy</AlertTitle>
                  <AlertDescription>
                    The webhook is unhealthy. Please refresh the webhook to fix auto-updates.
                  </AlertDescription>
                </Alert>
                <AutoUpdateWebhookRefresh externalDataSourceId={externalDataSourceId} />
              </>
            )}
          </section>
        </div>
        </>
      )}
      <div className="border-b border-meepGray-700 pt-10" />
      <section className="space-y-4">
        <header className="flex flex-row justify-between items-center">
          <div>
            <h2 className="text-hSm mb-5">Data mapping</h2>
            <p className='text-sm text-meepGray-400'>
              Pull third party data into your data source{"'"}s original location, based on the record{"'"}s <DataSourceFieldLabel label={source.geographyColumnType} connectionType={source.connectionDetails.__typename!} />.
            </p>
          </div>
          {allowMapping && !!source.updateMapping?.length && (
            <TriggerUpdateButton id={source.id} />
          )}
        </header>
        <UpdateMappingForm
          saveButtonLabel="Update"
          allowMapping={allowMapping}
          connectionType={source.connectionDetails.crmType}
          fieldDefinitions={source.fieldDefinitions}
          initialData={{
            // Trim out the __typenames
            geographyColumn: source?.geographyColumn,
            geographyColumnType: source?.geographyColumnType,
            updateMapping: source?.updateMapping?.map((m) => ({
              source: m.source,
              sourcePath: m.sourcePath,
              destinationColumn: m.destinationColumn,
            })),
          }}
          onSubmit={updateMutation}
        />
      </section>
      <div className="border-b border-meepGray-700 pt-10" />
      <section className='space-y-4'>
        <h2 className="text-hSm mb-5">Connection</h2>
        {!!source.connectionDetails.baseId && (
          <div className='mt-2'>
            <code>
              {source.connectionDetails.apiKey}
            </code>
            <br />
            <code>
              {source.connectionDetails.baseId}
            </code>
            <br />
            <code>
              {source.connectionDetails.tableId}
            </code>
          </div>
        )}
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive">Permanently delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                This action cannot be undone. This will permanently delete
                this data source connect from Mapped.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className={buttonVariants({ variant: "outline" })}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  del();
                }}
                className={buttonVariants({ variant: "destructive" })}
              >
                Confirm delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
      <div className="border-b border-meepGray-700 pt-10" />
      <section>
        <h2 className="text-hSm mb-5 flex flex-row items-center gap-3">
          <span>Logs</span>
          <RefreshCcw
            className="inline-block cursor-pointer w-4 h-4"
            onClick={async () => {
              const tid = toast.loading("Refreshing");
              await refetch();
              toast.success("Refreshed", {
                duration: 2000,
                id: tid,
              });
            }}
          />
        </h2>
        <LogsTable
          data={source.jobs}
          sortingState={[{ desc: true, id: "lastEventAt" }]}
          columns={[
            {
              accessorKey: "lastEventAt",
              header: ({ column }) => {
                return (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      column.toggleSorting(column.getIsSorted() === "asc")
                    }
                  >
                    Last Update Time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                );
              },
              cell: (d) => {
                try {
                  if (d) {
                    // @ts-ignore
                    return formatRelative(new Date(d.getValue()), new Date());
                  }
                  return null;
                } catch (e) {
                  return null;
                }
              },
            },
            { header: "ID", accessorKey: "id" },
            { header: "Job", accessorKey: "taskName" },
            { header: "Status", accessorKey: "status" },
            {
              header: "Args",
              accessorKey: "args",
              cell: (d) => (
                <code>
                  <pre>{JSON.stringify(d.getValue() || {}, null, 2)}</pre>
                </code>
              ),
            },
          ]}
        />
      </section>
    </div>
  );

  function updateMutation (data: ExternalDataSourceInput) {
    const update = client.mutate<UpdateExternalDataSourceMutation, UpdateExternalDataSourceMutationVariables>({
      mutation: UDPATE_EXTERNAL_DATA_SOURCE,
      variables: {
        input: {
          id: externalDataSourceId,
          ...data
        }
      }
    })
    toast.promise(update, {
      loading: "Saving...",
      success: (d: FetchResult<UpdateExternalDataSourceMutation>) => {
        if (!d.errors && d.data) {
          return "Saved source";
        }
      },
      error: `Couldn't save source`,
    });
  }

  function del() {
    const mutation = client.mutate<
      DeleteUpdateConfigMutation,
      DeleteUpdateConfigMutationVariables
    >({
      mutation: DELETE_UPDATE_CONFIG,
      variables: { id: externalDataSourceId },
    });
    toast.promise(mutation, {
      loading: "Deleting...",
      success: (e: FetchResult<DeleteUpdateConfigMutation>) => {
        if (!e.errors) {
          router.push("/data-sources");
          return `Deleted ${source.name}`;
        }
      },
      error: `Couldn't delete ${source.name}`,
    });
  }
}

export function importData (client: ApolloClient<any>, externalDataSourceId: string) {
  const importJob = client.mutate<ImportDataMutation, ImportDataMutationVariables>({
    mutation: gql`
      mutation ImportData($id: String!) {
        importAll(externalDataSourceId: $id) {
          id
          importedDataCount
          isImporting
          jobs {
            status
            id
            taskName
            args
            lastEventAt
          }
        }
      }
    `,
    variables: {
      id: externalDataSourceId
    }
  })
  toastPromise(importJob, {
    loading: "Scheduling data import...",
    success: (d: FetchResult) => {
      if (!d.errors) {
        return {
          title: "Import is processing",
          description: "This may take a few minutes. You can check the logs for progress."
        }
      } else {
        throw new Error("Couldn't schedule data import")
      }
    },
    error: `Couldn't schedule data import`,
  });
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function LogsTable<TData, TValue>({
  columns,
  data,
  sortingState = [],
}: DataTableProps<TData, TValue> & {
  sortingState?: SortingState;
}) {
  const [sorting, setSorting] = useState<SortingState>(sortingState);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border border-meepGray-400">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
