"use client"

import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Metadata } from 'next';
import { FetchResult, gql, useApolloClient, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { CreateMapReportMutation, CreateMapReportMutationVariables, ListReportsQuery, ListReportsQueryVariables } from '@/__generated__/graphql';
import { formatRelative } from 'date-fns';
import { useRouter } from 'next/navigation';

const LIST_REPORTS = gql`
  query ListReports {
    reports {
      id
      name
      lastUpdate
    }
  }
`;

export default function ReportList() {
  const { loading, error, data, refetch } = useQuery<ListReportsQuery, ListReportsQueryVariables>(LIST_REPORTS);

  useEffect(() => {
    refetch()
  }, [refetch])

  return (
    <div className="flex flex-row gap-lg">
      {loading ? (
        <section className="w-full grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-xl border border-meepGray-700 px-6 py-5 space-y-3">
            <Skeleton className="h-4 w-full max-w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </article>
          <CreateReportCard />
        </section>
      ) : error ? (
        <h2>Error: {error.message}</h2>
      ) : data ? (
        <section className="w-full grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
            />
          ))}
          <CreateReportCard />
        </section>
      ) : null}
    </div>
  );
}

export function PlaceholderReportCard () {
  return (
    <Card className="rounded-xl border border-meepGray-700 px-6 py-5 space-y-3">
      <Skeleton className="h-4 w-full max-w-[100px]" />
      <Skeleton className="h-10 w-full" />
    </Card>
  );
}

export function ReportCard ({ report }: { report: ListReportsQuery['reports'][0] }) {
  return (
    <Link href={`/reports/${report.id}`}>
      <Card>
        <CardHeader>
          <CardContent>
            <Image src="/reports_page_card_image.png" alt="Description of the image" width={300} height={300} />
          </CardContent>
          <CardTitle className="mb-1 px-5 pt-4">
            {report.name}
          </CardTitle>
          <CardDescription className="text-sm text-meepGray-400 px-5 pb-5">
            Last edited <span className='text-meepGray-300'>
              {formatRelative(report.lastUpdate, new Date())}
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export function CreateReportCard () {
  const client = useApolloClient();
  const router = useRouter();

  return (
    <Card>
      <CardContent className="p-6 relative space-y-5 h-full">
        <Skeleton className="h-4 w-full max-w-[100px]" />
        <Skeleton className="h-10 w-full" />
        <div className="!m-0 absolute inset-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <Button onClick={create} variant="reverse">Create new report</Button>
        </div>
      </CardContent>
    </Card>
  )

  function create() {
    const tid = toast.promise(
      client.mutate<CreateMapReportMutation, CreateMapReportMutationVariables>({
        mutation: CREATE_MAP_REPORT,
        variables: {
          data: {
            name: new Date().toISOString()
          }
        }
      }),
      {
        loading: 'Creating report...',
        success: (d: FetchResult<CreateMapReportMutation>) => {
          if (!d.errors && d.data?.createMapReport?.__typename === 'MapReport') {
            router.push(`/reports/${d.data.createMapReport.id}`)
            return 'Report created!'
          } else if (d.data?.createMapReport?.__typename === 'OperationInfo' ) {
            toast.error('Failed to create report', {
              id: tid,
              description: d.data.createMapReport.messages.map(m => m.message).join(', ')
            })
          } else {
            toast.error('Failed to create report', {
              id: tid,
              description: d.errors?.map(e => e.message).join(', ')
            })
          }
        },
        error: 'Failed to create report',
      }
    )
  }
}

const CREATE_MAP_REPORT = gql`
mutation CreateMapReport($data: MapReportInput!) {
  createMapReport(data: $data) {
    ... on MapReport {
      id
    }
    ... on OperationInfo {
      messages {
        message
      }
    }
  }
}
`