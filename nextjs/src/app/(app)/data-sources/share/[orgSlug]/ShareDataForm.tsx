"use client"

import { DataSourceType, ListOrganisationsQuery, ListOrganisationsQueryVariables, ShareDataSourcesMutation, ShareDataSourcesMutationVariables, YourSourcesForSharingQuery, YourSourcesForSharingQueryVariables } from "@/__generated__/graphql"
import { DataSourceIcon } from "@/components/DataSourceIcon"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingIcon } from "@/components/ui/loadingIcon"
import { Switch } from "@/components/ui/switch"
import { currentOrganisationIdAtom } from "@/data/organisation"
import { toastPromise } from "@/lib/toast"
import { gql, useApolloClient, useQuery } from "@apollo/client"
import { useAtomValue } from "jotai"
import pluralize from "pluralize"
import { useEffect, useState } from "react"
import { FormProvider, FormSubmitHandler, SubmitHandler, UseFormHandleSubmit, useFieldArray, useForm } from "react-hook-form"
import { LIST_DATA_SOURCES } from "../../ExternalDataSourceList"

export function ShareDataForm ({ toOrgId }: { toOrgId: string }) {
  const query = useQuery<YourSourcesForSharingQuery, YourSourcesForSharingQueryVariables>(SHARE_WITH_ORG_PAGE)
  const fromOrgId = useAtomValue(currentOrganisationIdAtom)
  const { loading, error, data, refetch } = useQuery<ListOrganisationsQuery, ListOrganisationsQueryVariables>(LIST_DATA_SOURCES, {
    variables: { currentOrganisationId: fromOrgId },
  });

  const allOrgSources = data?.myOrganisations.flatMap(org => org.externalDataSources) || []

  if (loading) return <LoadingIcon />

  return (
    <SharingForm fromOrgId={fromOrgId} toOrgId={toOrgId} initialData={allOrgSources} />
  )
}

type FormInput = {
  dataSources: YourSourcesForSharingQuery['myOrganisations'][0]["externalDataSources"]
}

export function SharingForm ({ initialData, fromOrgId, toOrgId }: {
  initialData: ListOrganisationsQuery['myOrganisations'][0]["externalDataSources"],
  fromOrgId: string,
  toOrgId: string
}) {
  const form = useForm<FormInput>({
    defaultValues: {
      dataSources: initialData || [],
    }
  })

  const dataSources = useFieldArray({
    control: form.control,
    name: 'dataSources',
  })

  const client = useApolloClient()

  const onSubmit: SubmitHandler<FormInput> = (data, e) => {
    e?.preventDefault()
    toastPromise(
      client.mutate<ShareDataSourcesMutation, ShareDataSourcesMutationVariables>({
        mutation: gql`
          mutation ShareDataSources($fromOrgId: String!, $permissions: [SharingPermissionInput!]!) {
            updateSharingPermissions(fromOrgId: $fromOrgId, permissions: $permissions) {
              id
              sharingPermissions {
                id
                organisationId
                externalDataSourceId
                visibilityRecordCoordinates
                visibilityRecordDetails
                deleted
              }
            }
          }
        `,
        variables: {
          fromOrgId,
          permissions: data.dataSources.map((source) => (
            source.sharingPermissions.map(({ __typename, ...permission }) => ({
              ...permission,
              externalDataSourceId: source.id
            }))
          )).flat()
        }
      }), {
        success: 'Sharing settings saved',
        loading: 'Saving sharing settings',
        error: 'Error saving share settings',
      }
    )
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 p-2 gap-2'>
          {dataSources.fields.sort((a, b) => {
            // sort member lists first (a.dataType === DataSourceType.Member )
            if (a.dataType === DataSourceType.Member && b.dataType !== DataSourceType.Member) {
              return -1
            }
            // then sort by import count
            if (a.importedDataCount > b.importedDataCount) {
              return -1
            }
            // then by name
            if (a.name.localeCompare(b.name) < 0) {
              return -1
            }
            return 0
          })
          // Don't allow sharing an org to itself
          .filter((source) => !!source.organisationId && source.organisationId !== toOrgId)
          .map((source, index) => (
            <DataSourceSharingPanel
              key={source.id}
              source={source}
              index={index}
              fromOrgId={fromOrgId}
              toOrgId={toOrgId}
            />
          ))}
          <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
            Save sharing preferences
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

function DataSourceSharingPanel ({
  source,
  index,
  fromOrgId,
  toOrgId
}: {
  source: YourSourcesForSharingQuery['myOrganisations'][0]["externalDataSources"][0],
  index: number,
  fromOrgId: string
  toOrgId: string
}) {
  const sharingPermissions = useFieldArray<{
    dataSources: YourSourcesForSharingQuery['myOrganisations'][0]['externalDataSources'][0]['sharingPermissions']
  }>({
    name: `dataSources.${index}.sharingPermissions`,
  })

  const indexOfExistingPermissionInDB = sharingPermissions.fields.findIndex(
    (permission) => !!permission.id
  )
  const hasExistingPermissionInDB = indexOfExistingPermissionInDB > -1 
  const nonDeletedPermissions = sharingPermissions.fields.filter((permission) => !permission.deleted)

  return (
    <Card key={source.id} className='flex flex-col gap-1 px-3 py-2 min-h-14'>
      <div className='flex flex-row items-center gap-1 px-3 py-2 min-h-12 w-full'>
        <div className='flex flex-row gap-1'>
          <DataSourceIcon crmType={source?.crmType} className="w-5" />
          <div className='-space-y-1'>
            <span>{source?.name}</span>
            {!!source?.importedDataCount && (
              <div className='text-meepGray-400 text-xs'>
                {source?.importedDataCount} {pluralize("member", source?.importedDataCount)}
              </div>
            )}
          </div>
        </div>
        <Switch
          className='ml-auto'
          checked={!!nonDeletedPermissions.length}
          onCheckedChange={(enabled) => {
            if (hasExistingPermissionInDB) {
              sharingPermissions.update(0, {
                ...source.sharingPermissions[indexOfExistingPermissionInDB],
                deleted: !enabled
              })
            } else {
              if (enabled) {
                sharingPermissions.insert(0, {
                  // @ts-ignore - ID can be null for inserts, but we're using query types here
                  id: null,
                  organisationId: toOrgId,
                  externalDataSourceId: source.id,
                  visibilityRecordCoordinates: false,
                  visibilityRecordDetails: false,
                  deleted: false
                })
              } else {
                sharingPermissions.remove(0)
              } 
            }
          }}
        />
      </div>
      <div>
      {nonDeletedPermissions.map((permission, index) => (
        <div key={index} className='flex flex-col gap-2 px-3 py-2 min-h-14'>
          <div className='flex flex-row gap-1 uppercase font-semibold text-sm text-meepGray-400'>
            <span>Share settings</span>
          </div>
          <div className='flex flex-row gap-1 items-start'>
            <Checkbox
              checked={!!permission.visibilityRecordCoordinates}
              onCheckedChange={() => {
                const nextValue = !permission.visibilityRecordCoordinates
                sharingPermissions.update(0, {
                  ...permission,
                  visibilityRecordCoordinates: nextValue,
                  visibilityRecordDetails: !nextValue ? false : permission.visibilityRecordDetails
                })
              }}
              id={`checkbox-location-${index}`}
            />
            <label htmlFor={`checkbox-location-${index}`} className='-mt-1'>
              <span>
                Precise {source.dataType === DataSourceType.Member ? "member" : "record"} locations
              </span>
              <p className='text-meepGray-400 text-xs'>
                If enabled, pins will be placed on a map for each {source.dataType === DataSourceType.Member ? "member" : "record"}. If disabled, only aggregate ward / constituency / region data will be shared.  
              </p>
            </label>
          </div>
          {!!(permission.visibilityRecordCoordinates || permission.visibilityRecordDetails) && (
            <div className='flex flex-row gap-1 items-start'>
              <Checkbox
                checked={!!permission.visibilityRecordDetails}
                onCheckedChange={() => {
                  sharingPermissions.update(0, {
                    ...permission,
                    visibilityRecordDetails: !permission.visibilityRecordDetails,
                  })
                }}
                id={`checkbox-details-${index}`}
              />
              <label htmlFor={`checkbox-details-${index}`} className='-mt-1'>
                <span>
                  {source.dataType === DataSourceType.Member ? "Member" : "Record"} details
                </span>
                <p className='text-meepGray-400 text-xs'>
                  Specific data like {source.fieldDefinitions?.length ? <code className='text-sm px-2 rounded bg-meepGray-700 font-IBMPlexMono'>{source.fieldDefinitions[0].label}</code> : "name"}</p>
              </label>
            </div>
          )}
        </div>
      ))}
      </div>
    </Card>
  )
}

const SHARE_WITH_ORG_PAGE = gql`
  query YourSourcesForSharing {
    myOrganisations {
      id
      name
      externalDataSources {
        id
        name
        crmType
        importedDataCount
        dataType
        fieldDefinitions {
          label
          editable
        }
        organisationId
        sharingPermissions {
          id
          organisationId
          externalDataSourceId
          visibilityRecordCoordinates
          visibilityRecordDetails
          deleted
        }
      }
    }
  }
`