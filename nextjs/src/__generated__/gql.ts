/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  query ListOrganisations {\n    myOrganisations {\n      id\n      externalDataSources {\n        id\n        name\n        dataType\n        connectionDetails {\n          ... on AirtableSource {\n            baseId\n            tableId\n          }\n          ... on MailchimpSource {\n            apiKey\n            listId\n          }\n        }\n        crmType\n        autoUpdateEnabled\n        jobs {\n          lastEventAt\n          status\n        }\n        updateMapping {\n          source\n          sourcePath\n          destinationColumn\n        }\n        sharingPermissions {\n          id\n          organisation {\n            id\n            name\n          }\n        }\n      }\n      sharingPermissionsFromOtherOrgs {\n        id\n        externalDataSource {\n          id\n          name\n          dataType\n          crmType\n          organisation {\n            name\n          }\n        }\n      }\n    }\n  }\n":
    types.ListOrganisationsDocument,
  "\n  query GetSourceMapping($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      autoUpdateEnabled\n      updateMapping {\n        destinationColumn\n        source\n        sourcePath\n      }\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      crmType\n      geographyColumn\n      geographyColumnType\n      postcodeField\n      firstNameField\n      lastNameField\n      emailField\n      phoneField\n      addressField\n    }\n  }\n":
    types.GetSourceMappingDocument,
  "\n  query TestDataSource($input: TestDataSourceInput!) {\n    testDataSource(input: $input) {\n      __typename\n      crmType\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      geographyColumn,\n      geographyColumnType\n      healthcheck\n      remoteName\n    }\n  }\n":
    types.TestDataSourceDocument,
  "\n  mutation CreateSource ($input: CreateExternalDataSourceInput!) {\n    createExternalDataSource (input: $input) {\n      code\n      errors {\n        message\n      }\n      result {\n        id\n        name\n        crmType\n        dataType\n      }\n    }\n  }\n":
    types.CreateSourceDocument,
  "\n  query AllExternalDataSources {\n    externalDataSources {\n      id\n      name\n      createdAt\n      dataType\n      crmType\n      connectionDetails {\n        ... on AirtableSource {\n          baseId\n          tableId\n        }\n        ... on MailchimpSource {\n          apiKey\n          listId\n        }\n      }\n      autoUpdateEnabled\n    }\n  }\n":
    types.AllExternalDataSourcesDocument,
  "\n  query AutoUpdateCreationReview($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      dataType\n      crmType\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n      jobs {\n        lastEventAt\n        status\n      }\n      ...DataSourceCard\n    }\n  }\n  \n":
    types.AutoUpdateCreationReviewDocument,
  "\n  query ExternalDataSourceInspectPage($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      dataType\n      remoteUrl\n      crmType\n      connectionDetails {\n        ... on AirtableSource {\n          apiKey\n          baseId\n          tableId\n        }\n        ... on MailchimpSource {\n          apiKey\n          listId\n        }\n      }\n      lastJob {\n        id\n        lastEventAt\n        status\n      }\n      autoUpdateEnabled\n      webhookHealthcheck\n      geographyColumn\n      geographyColumnType\n      postcodeField\n      firstNameField\n      lastNameField\n      fullNameField\n      emailField\n      phoneField\n      addressField\n      isImportScheduled\n      importProgress {\n        id\n        status\n        total\n        succeeded\n        estimatedFinishTime\n      }\n      isUpdateScheduled\n      updateProgress {\n        id\n        status\n        total\n        succeeded\n        estimatedFinishTime\n      }\n      importedDataCount\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n      sharingPermissions {\n        id\n      }\n      organisationId\n    }\n  }\n":
    types.ExternalDataSourceInspectPageDocument,
  "\n  mutation DeleteUpdateConfig($id: String!) {\n    deleteExternalDataSource(data: { id: $id }) {\n      id\n    }\n  }\n":
    types.DeleteUpdateConfigDocument,
  "\n      mutation ImportData($id: String!) {\n        importAll(externalDataSourceId: $id) {\n          id\n          externalDataSource {\n            importedDataCount\n            isImportScheduled\n            importProgress {\n              status\n              id\n              total\n              succeeded\n              failed\n              estimatedFinishTime\n            }\n          }\n        }\n      }\n    ":
    types.ImportDataDocument,
  "\n    query ManageSourceSharing($externalDataSourceId: ID!) {\n      externalDataSource(pk: $externalDataSourceId) {\n        sharingPermissions {\n          id\n          organisationId\n          organisation {\n            name\n          }\n          externalDataSourceId\n          visibilityRecordCoordinates\n          visibilityRecordDetails\n          deleted\n        }\n      }\n    }\n  ":
    types.ManageSourceSharingDocument,
  "\n          mutation UpdateSourceSharingObject($data: SharingPermissionCUDInput!) {\n            updateSharingPermission(data: $data) {\n              id\n              organisationId\n              externalDataSourceId\n              visibilityRecordCoordinates\n              visibilityRecordDetails\n              deleted\n            }\n          }\n        ":
    types.UpdateSourceSharingObjectDocument,
  "\n          mutation DeleteSourceSharingObject($pk: String!) {\n            deleteSharingPermission(data: { id: $pk }) {\n              id\n            }\n          }\n        ":
    types.DeleteSourceSharingObjectDocument,
  "\n  query ExternalDataSourceName($externalDataSourceId: ID!) {\n    externalDataSource(pk: $externalDataSourceId) {\n      name\n      crmType\n      dataType\n      name\n      remoteUrl\n    }\n  }\n":
    types.ExternalDataSourceNameDocument,
  "\n          mutation ShareDataSources($fromOrgId: String!, $permissions: [SharingPermissionInput!]!) {\n            updateSharingPermissions(fromOrgId: $fromOrgId, permissions: $permissions) {\n              id\n              sharingPermissions {\n                id\n                organisationId\n                externalDataSourceId\n                visibilityRecordCoordinates\n                visibilityRecordDetails\n                deleted\n              }\n            }\n          }\n        ":
    types.ShareDataSourcesDocument,
  "\n  query YourSourcesForSharing {\n    myOrganisations {\n      id\n      name\n      externalDataSources {\n        id\n        name\n        crmType\n        importedDataCount\n        dataType\n        fieldDefinitions {\n          label\n        }\n        organisationId\n        sharingPermissions {\n          id\n          organisationId\n          externalDataSourceId\n          visibilityRecordCoordinates\n          visibilityRecordDetails\n          deleted\n        }\n      }\n    }\n  }\n":
    types.YourSourcesForSharingDocument,
  "\n  query ShareWithOrgPage($orgSlug: String!) {\n    allOrganisations(filters: {slug: $orgSlug}) {\n      id\n      name\n    }\n  }\n":
    types.ShareWithOrgPageDocument,
  "\n  query ListReports {\n    reports {\n      id\n      name\n      lastUpdate\n    }\n  }\n":
    types.ListReportsDocument,
  "\nmutation CreateMapReport($data: MapReportInput!) {\n  createMapReport(data: $data) {\n    ... on MapReport {\n      id\n    }\n    ... on OperationInfo {\n      messages {\n        message\n      }\n    }\n  }\n}\n":
    types.CreateMapReportDocument,
  "\n  query DeveloperAPIContext {\n    listApiTokens {\n      token\n      signature\n      revoked\n      createdAt\n      expiresAt\n    }\n  }\n":
    types.DeveloperApiContextDocument,
  "\n        mutation CreateToken {\n          createApiToken {\n            token\n            signature\n            revoked\n            createdAt\n            expiresAt\n          }\n        }\n      ":
    types.CreateTokenDocument,
  "\n        mutation RevokeToken($signature: ID!) {\n          revokeApiToken(signature: $signature) {\n            signature\n            revoked\n          }\n        }\n      ":
    types.RevokeTokenDocument,
  "\n  mutation Verify($token: String!) {\n    verifyAccount(token: $token) {\n      errors\n      success\n    }\n  }\n":
    types.VerifyDocument,
  "\n  query Example {\n    myOrganisations {\n      id\n      name\n    }\n  }\n":
    types.ExampleDocument,
  "\n  mutation Login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      errors\n      success\n      token {\n        token\n        payload {\n          exp\n        }\n      }\n    }\n  }\n":
    types.LoginDocument,
  "\n  mutation ResetPassword($email: String!) {\n    requestPasswordReset(email: $email) {\n      errors\n      success\n    }\n  }\n":
    types.ResetPasswordDocument,
  "\n  mutation Register($email: String!, $password1: String!, $password2: String!, $username: String!) {\n    register(email: $email, password1: $password1, password2: $password2, username: $username) {\n      errors\n      success\n    }\n  }\n":
    types.RegisterDocument,
  "\n  query ListExternalDataSources {\n    myOrganisations {\n      id\n      externalDataSources {\n        id\n      }\n    }\n  }\n":
    types.ListExternalDataSourcesDocument,
  "\n  query GetMapReportName($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n    }\n  }\n":
    types.GetMapReportNameDocument,
  "\n  fragment MapReportLayersSummary on MapReport {\n    layers {\n      id\n      name\n      sharingPermission {\n        visibilityRecordDetails\n        visibilityRecordCoordinates\n        organisation {\n          name\n        }\n      }\n      source {\n        id\n        name\n        isImportScheduled\n        importedDataCount\n        recordUrlTemplate\n        crmType\n        dataType\n        organisation {\n          name\n        }\n      }\n    }\n  }\n":
    types.MapReportLayersSummaryFragmentDoc,
  "\n  fragment MapReportPage on MapReport {\n    id\n    name\n    ... MapReportLayersSummary\n  }\n  \n":
    types.MapReportPageFragmentDoc,
  "\n  query GetMapReport($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n      displayOptions\n      organisation {\n        id\n        slug\n        name\n      }\n      ... MapReportPage\n    }\n  }\n  \n":
    types.GetMapReportDocument,
  "\n  mutation UpdateMapReport($input: MapReportInput!) {\n    updateMapReport(data: $input) {\n      id\n      name\n      displayOptions\n      layers {\n        id\n        name\n        source {\n          id\n          name\n        }\n      }\n    }\n  }\n":
    types.UpdateMapReportDocument,
  "\n  mutation DeleteMapReport($id: IDObject!) {\n    deleteMapReport(data: $id) {\n      id\n    }\n  }\n":
    types.DeleteMapReportDocument,
  "\n  mutation AutoUpdateWebhookRefresh($ID: String!) {\n    refreshWebhooks(externalDataSourceId: $ID) {\n      id\n      webhookHealthcheck\n    }\n  }\n":
    types.AutoUpdateWebhookRefreshDocument,
  "\n  query ExternalDataSourceAutoUpdateCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...DataSourceCard\n    }\n  }\n  \n":
    types.ExternalDataSourceAutoUpdateCardDocument,
  "\n  mutation EnableAutoUpdate($ID: String!) {\n    enableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n":
    types.EnableAutoUpdateDocument,
  "\n  mutation DisableAutoUpdate($ID: String!) {\n    disableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n":
    types.DisableAutoUpdateDocument,
  "\n  fragment DataSourceCard on ExternalDataSource {\n    id\n    name\n    dataType\n    crmType\n    autoUpdateEnabled\n    updateMapping {\n      source\n      sourcePath\n      destinationColumn\n    }\n    jobs {\n      lastEventAt\n      status\n    }\n    sharingPermissions {\n      id\n      organisation {\n        id\n        name\n      }\n    }\n  }\n":
    types.DataSourceCardFragmentDoc,
  "\n  query ExternalDataSourceExternalDataSourceCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...DataSourceCard\n    }\n  }\n  \n":
    types.ExternalDataSourceExternalDataSourceCardDocument,
  "\n  mutation TriggerFullUpdate($externalDataSourceId: String!) {\n    triggerUpdate(externalDataSourceId: $externalDataSourceId) {\n      id\n      externalDataSource {\n        jobs {\n          status\n          id\n          taskName\n          args\n          lastEventAt\n        }\n        id\n        name\n        crmType\n      }\n    }\n  }\n":
    types.TriggerFullUpdateDocument,
  '\n  query ConstituencyStatsOverview ($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByConstituency {\n        label\n        gss\n        count\n        gssArea {\n          name\n          fitBounds\n          mp: person(filters:{personType:"MP"}) {\n            id\n            name\n            photo {\n              url\n            }\n            party: personDatum(filters:{\n              dataType_Name: "party"\n            }) {\n              name: data\n            }\n          }\n          lastElection {\n            stats {\n              date\n              majority\n              electorate\n              firstPartyResult {\n                party\n                shade\n                votes\n              }\n              secondPartyResult {\n                party\n                shade\n                votes\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.ConstituencyStatsOverviewDocument,
  "\n  query EnrichmentLayers {\n    mappingSources {\n      slug\n      name\n      author\n      description\n      descriptionUrl\n      sourcePaths {\n        label\n        value\n        description\n      }\n      # For custom data sources, get some useful data\n      externalDataSource {\n        crmType\n      }\n    }\n  }\n":
    types.EnrichmentLayersDocument,
  "\n  query GetMemberList {\n    myOrganisations {\n      externalDataSources(filters: { dataType: MEMBER }) {\n        id\n        name\n        importedDataCount\n        crmType\n        dataType\n      }\n      sharingPermissionsFromOtherOrgs {\n        externalDataSource {\n          id\n          name\n          importedDataCount\n          crmType\n          dataType\n          organisation {\n            name\n          }\n        }\n      }\n    }\n  }\n":
    types.GetMemberListDocument,
  "\nquery MapReportLayerGeoJSONPoint($genericDataId: String!) {\n  importedDataGeojsonPoint(genericDataId: $genericDataId) {\n    id\n    type\n    geometry {\n      type\n      coordinates\n    }\n    properties {\n      id\n      lastUpdate\n      name\n      phone\n      email\n      postcodeData {\n        postcode\n      }\n      json\n      remoteUrl\n      dataType {\n        dataSet {\n          externalDataSource {\n            name\n          }\n        }\n      }\n    }\n  }\n}\n":
    types.MapReportLayerGeoJsonPointDocument,
  "\n  query MapReportLayerAnalytics($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      layers {\n        id\n        name\n        source {\n          id\n          organisation {\n            name\n          }\n        }\n      }\n    }\n  }\n":
    types.MapReportLayerAnalyticsDocument,
  "\n  query MapReportRegionStats($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByRegion {\n        label\n        gss\n        count\n        gssArea {\n          point {\n            id\n            type\n            geometry {\n              type\n              coordinates\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.MapReportRegionStatsDocument,
  "\n  query MapReportConstituencyStats($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByConstituency {\n        label\n        gss\n        count\n        gssArea {\n          point {\n            id\n            type\n            geometry {\n              type\n              coordinates\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.MapReportConstituencyStatsDocument,
  "\n  query MapReportWardStats($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByWard {\n        label\n        gss\n        count\n        gssArea {\n          point {\n            id\n            type\n            geometry {\n              type\n              coordinates\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.MapReportWardStatsDocument,
  '\n  query GetConstituencyData($gss: String!, $reportID: ID!) {\n    constituency: area(gss: $gss) {\n      id\n      name\n      mp: person(filters:{personType:"MP"}) {\n        id\n        name\n        photo {\n          url\n        }\n        party: personDatum(filters:{\n          dataType_Name: "party"\n        }) {\n          name: data\n          shade\n        }\n      }\n      lastElection {\n        stats {\n          date\n          electorate\n          validVotes\n          majority\n          firstPartyResult {\n            party\n            shade\n            votes\n          }\n          secondPartyResult {\n            party\n            shade\n            votes\n          }\n        }\n      }\n    }\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountForConstituency(gss: $gss) {\n        gss\n        count\n      }\n      layers {\n        id\n        name\n        source {\n          id\n          importedDataCountForConstituency(gss: $gss) {\n            gss\n            count\n          }\n        }\n      }\n    }\n  }\n':
    types.GetConstituencyDataDocument,
  "\n  mutation UpdateExternalDataSource($input: ExternalDataSourceInput!) {\n    updateExternalDataSource(data: $input) {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      postcodeField\n      firstNameField\n      lastNameField\n      emailField\n      phoneField\n      addressField\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n":
    types.UpdateExternalDataSourceDocument,
  "\n  query PublicUser {\n    publicUser {\n      id\n      username\n      email\n    }\n  }\n":
    types.PublicUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query ListOrganisations {\n    myOrganisations {\n      id\n      externalDataSources {\n        id\n        name\n        dataType\n        connectionDetails {\n          ... on AirtableSource {\n            baseId\n            tableId\n          }\n          ... on MailchimpSource {\n            apiKey\n            listId\n          }\n        }\n        crmType\n        autoUpdateEnabled\n        jobs {\n          lastEventAt\n          status\n        }\n        updateMapping {\n          source\n          sourcePath\n          destinationColumn\n        }\n        sharingPermissions {\n          id\n          organisation {\n            id\n            name\n          }\n        }\n      }\n      sharingPermissionsFromOtherOrgs {\n        id\n        externalDataSource {\n          id\n          name\n          dataType\n          crmType\n          organisation {\n            name\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query ListOrganisations {\n    myOrganisations {\n      id\n      externalDataSources {\n        id\n        name\n        dataType\n        connectionDetails {\n          ... on AirtableSource {\n            baseId\n            tableId\n          }\n          ... on MailchimpSource {\n            apiKey\n            listId\n          }\n        }\n        crmType\n        autoUpdateEnabled\n        jobs {\n          lastEventAt\n          status\n        }\n        updateMapping {\n          source\n          sourcePath\n          destinationColumn\n        }\n        sharingPermissions {\n          id\n          organisation {\n            id\n            name\n          }\n        }\n      }\n      sharingPermissionsFromOtherOrgs {\n        id\n        externalDataSource {\n          id\n          name\n          dataType\n          crmType\n          organisation {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetSourceMapping($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      autoUpdateEnabled\n      updateMapping {\n        destinationColumn\n        source\n        sourcePath\n      }\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      crmType\n      geographyColumn\n      geographyColumnType\n      postcodeField\n      firstNameField\n      lastNameField\n      emailField\n      phoneField\n      addressField\n    }\n  }\n",
): (typeof documents)["\n  query GetSourceMapping($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      autoUpdateEnabled\n      updateMapping {\n        destinationColumn\n        source\n        sourcePath\n      }\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      crmType\n      geographyColumn\n      geographyColumnType\n      postcodeField\n      firstNameField\n      lastNameField\n      emailField\n      phoneField\n      addressField\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query TestDataSource($input: TestDataSourceInput!) {\n    testDataSource(input: $input) {\n      __typename\n      crmType\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      geographyColumn,\n      geographyColumnType\n      healthcheck\n      remoteName\n    }\n  }\n",
): (typeof documents)["\n  query TestDataSource($input: TestDataSourceInput!) {\n    testDataSource(input: $input) {\n      __typename\n      crmType\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      geographyColumn,\n      geographyColumnType\n      healthcheck\n      remoteName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation CreateSource ($input: CreateExternalDataSourceInput!) {\n    createExternalDataSource (input: $input) {\n      code\n      errors {\n        message\n      }\n      result {\n        id\n        name\n        crmType\n        dataType\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation CreateSource ($input: CreateExternalDataSourceInput!) {\n    createExternalDataSource (input: $input) {\n      code\n      errors {\n        message\n      }\n      result {\n        id\n        name\n        crmType\n        dataType\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query AllExternalDataSources {\n    externalDataSources {\n      id\n      name\n      createdAt\n      dataType\n      crmType\n      connectionDetails {\n        ... on AirtableSource {\n          baseId\n          tableId\n        }\n        ... on MailchimpSource {\n          apiKey\n          listId\n        }\n      }\n      autoUpdateEnabled\n    }\n  }\n",
): (typeof documents)["\n  query AllExternalDataSources {\n    externalDataSources {\n      id\n      name\n      createdAt\n      dataType\n      crmType\n      connectionDetails {\n        ... on AirtableSource {\n          baseId\n          tableId\n        }\n        ... on MailchimpSource {\n          apiKey\n          listId\n        }\n      }\n      autoUpdateEnabled\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query AutoUpdateCreationReview($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      dataType\n      crmType\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n      jobs {\n        lastEventAt\n        status\n      }\n      ...DataSourceCard\n    }\n  }\n  \n",
): (typeof documents)["\n  query AutoUpdateCreationReview($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      dataType\n      crmType\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n      jobs {\n        lastEventAt\n        status\n      }\n      ...DataSourceCard\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query ExternalDataSourceInspectPage($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      dataType\n      remoteUrl\n      crmType\n      connectionDetails {\n        ... on AirtableSource {\n          apiKey\n          baseId\n          tableId\n        }\n        ... on MailchimpSource {\n          apiKey\n          listId\n        }\n      }\n      lastJob {\n        id\n        lastEventAt\n        status\n      }\n      autoUpdateEnabled\n      webhookHealthcheck\n      geographyColumn\n      geographyColumnType\n      postcodeField\n      firstNameField\n      lastNameField\n      fullNameField\n      emailField\n      phoneField\n      addressField\n      isImportScheduled\n      importProgress {\n        id\n        status\n        total\n        succeeded\n        estimatedFinishTime\n      }\n      isUpdateScheduled\n      updateProgress {\n        id\n        status\n        total\n        succeeded\n        estimatedFinishTime\n      }\n      importedDataCount\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n      sharingPermissions {\n        id\n      }\n      organisationId\n    }\n  }\n",
): (typeof documents)["\n  query ExternalDataSourceInspectPage($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      dataType\n      remoteUrl\n      crmType\n      connectionDetails {\n        ... on AirtableSource {\n          apiKey\n          baseId\n          tableId\n        }\n        ... on MailchimpSource {\n          apiKey\n          listId\n        }\n      }\n      lastJob {\n        id\n        lastEventAt\n        status\n      }\n      autoUpdateEnabled\n      webhookHealthcheck\n      geographyColumn\n      geographyColumnType\n      postcodeField\n      firstNameField\n      lastNameField\n      fullNameField\n      emailField\n      phoneField\n      addressField\n      isImportScheduled\n      importProgress {\n        id\n        status\n        total\n        succeeded\n        estimatedFinishTime\n      }\n      isUpdateScheduled\n      updateProgress {\n        id\n        status\n        total\n        succeeded\n        estimatedFinishTime\n      }\n      importedDataCount\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n      sharingPermissions {\n        id\n      }\n      organisationId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DeleteUpdateConfig($id: String!) {\n    deleteExternalDataSource(data: { id: $id }) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation DeleteUpdateConfig($id: String!) {\n    deleteExternalDataSource(data: { id: $id }) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n      mutation ImportData($id: String!) {\n        importAll(externalDataSourceId: $id) {\n          id\n          externalDataSource {\n            importedDataCount\n            isImportScheduled\n            importProgress {\n              status\n              id\n              total\n              succeeded\n              failed\n              estimatedFinishTime\n            }\n          }\n        }\n      }\n    ",
): (typeof documents)["\n      mutation ImportData($id: String!) {\n        importAll(externalDataSourceId: $id) {\n          id\n          externalDataSource {\n            importedDataCount\n            isImportScheduled\n            importProgress {\n              status\n              id\n              total\n              succeeded\n              failed\n              estimatedFinishTime\n            }\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n    query ManageSourceSharing($externalDataSourceId: ID!) {\n      externalDataSource(pk: $externalDataSourceId) {\n        sharingPermissions {\n          id\n          organisationId\n          organisation {\n            name\n          }\n          externalDataSourceId\n          visibilityRecordCoordinates\n          visibilityRecordDetails\n          deleted\n        }\n      }\n    }\n  ",
): (typeof documents)["\n    query ManageSourceSharing($externalDataSourceId: ID!) {\n      externalDataSource(pk: $externalDataSourceId) {\n        sharingPermissions {\n          id\n          organisationId\n          organisation {\n            name\n          }\n          externalDataSourceId\n          visibilityRecordCoordinates\n          visibilityRecordDetails\n          deleted\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n          mutation UpdateSourceSharingObject($data: SharingPermissionCUDInput!) {\n            updateSharingPermission(data: $data) {\n              id\n              organisationId\n              externalDataSourceId\n              visibilityRecordCoordinates\n              visibilityRecordDetails\n              deleted\n            }\n          }\n        ",
): (typeof documents)["\n          mutation UpdateSourceSharingObject($data: SharingPermissionCUDInput!) {\n            updateSharingPermission(data: $data) {\n              id\n              organisationId\n              externalDataSourceId\n              visibilityRecordCoordinates\n              visibilityRecordDetails\n              deleted\n            }\n          }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n          mutation DeleteSourceSharingObject($pk: String!) {\n            deleteSharingPermission(data: { id: $pk }) {\n              id\n            }\n          }\n        ",
): (typeof documents)["\n          mutation DeleteSourceSharingObject($pk: String!) {\n            deleteSharingPermission(data: { id: $pk }) {\n              id\n            }\n          }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query ExternalDataSourceName($externalDataSourceId: ID!) {\n    externalDataSource(pk: $externalDataSourceId) {\n      name\n      crmType\n      dataType\n      name\n      remoteUrl\n    }\n  }\n",
): (typeof documents)["\n  query ExternalDataSourceName($externalDataSourceId: ID!) {\n    externalDataSource(pk: $externalDataSourceId) {\n      name\n      crmType\n      dataType\n      name\n      remoteUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n          mutation ShareDataSources($fromOrgId: String!, $permissions: [SharingPermissionInput!]!) {\n            updateSharingPermissions(fromOrgId: $fromOrgId, permissions: $permissions) {\n              id\n              sharingPermissions {\n                id\n                organisationId\n                externalDataSourceId\n                visibilityRecordCoordinates\n                visibilityRecordDetails\n                deleted\n              }\n            }\n          }\n        ",
): (typeof documents)["\n          mutation ShareDataSources($fromOrgId: String!, $permissions: [SharingPermissionInput!]!) {\n            updateSharingPermissions(fromOrgId: $fromOrgId, permissions: $permissions) {\n              id\n              sharingPermissions {\n                id\n                organisationId\n                externalDataSourceId\n                visibilityRecordCoordinates\n                visibilityRecordDetails\n                deleted\n              }\n            }\n          }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query YourSourcesForSharing {\n    myOrganisations {\n      id\n      name\n      externalDataSources {\n        id\n        name\n        crmType\n        importedDataCount\n        dataType\n        fieldDefinitions {\n          label\n        }\n        organisationId\n        sharingPermissions {\n          id\n          organisationId\n          externalDataSourceId\n          visibilityRecordCoordinates\n          visibilityRecordDetails\n          deleted\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query YourSourcesForSharing {\n    myOrganisations {\n      id\n      name\n      externalDataSources {\n        id\n        name\n        crmType\n        importedDataCount\n        dataType\n        fieldDefinitions {\n          label\n        }\n        organisationId\n        sharingPermissions {\n          id\n          organisationId\n          externalDataSourceId\n          visibilityRecordCoordinates\n          visibilityRecordDetails\n          deleted\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query ShareWithOrgPage($orgSlug: String!) {\n    allOrganisations(filters: {slug: $orgSlug}) {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  query ShareWithOrgPage($orgSlug: String!) {\n    allOrganisations(filters: {slug: $orgSlug}) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query ListReports {\n    reports {\n      id\n      name\n      lastUpdate\n    }\n  }\n",
): (typeof documents)["\n  query ListReports {\n    reports {\n      id\n      name\n      lastUpdate\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation CreateMapReport($data: MapReportInput!) {\n  createMapReport(data: $data) {\n    ... on MapReport {\n      id\n    }\n    ... on OperationInfo {\n      messages {\n        message\n      }\n    }\n  }\n}\n",
): (typeof documents)["\nmutation CreateMapReport($data: MapReportInput!) {\n  createMapReport(data: $data) {\n    ... on MapReport {\n      id\n    }\n    ... on OperationInfo {\n      messages {\n        message\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query DeveloperAPIContext {\n    listApiTokens {\n      token\n      signature\n      revoked\n      createdAt\n      expiresAt\n    }\n  }\n",
): (typeof documents)["\n  query DeveloperAPIContext {\n    listApiTokens {\n      token\n      signature\n      revoked\n      createdAt\n      expiresAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n        mutation CreateToken {\n          createApiToken {\n            token\n            signature\n            revoked\n            createdAt\n            expiresAt\n          }\n        }\n      ",
): (typeof documents)["\n        mutation CreateToken {\n          createApiToken {\n            token\n            signature\n            revoked\n            createdAt\n            expiresAt\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n        mutation RevokeToken($signature: ID!) {\n          revokeApiToken(signature: $signature) {\n            signature\n            revoked\n          }\n        }\n      ",
): (typeof documents)["\n        mutation RevokeToken($signature: ID!) {\n          revokeApiToken(signature: $signature) {\n            signature\n            revoked\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Verify($token: String!) {\n    verifyAccount(token: $token) {\n      errors\n      success\n    }\n  }\n",
): (typeof documents)["\n  mutation Verify($token: String!) {\n    verifyAccount(token: $token) {\n      errors\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Example {\n    myOrganisations {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  query Example {\n    myOrganisations {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      errors\n      success\n      token {\n        token\n        payload {\n          exp\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      errors\n      success\n      token {\n        token\n        payload {\n          exp\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation ResetPassword($email: String!) {\n    requestPasswordReset(email: $email) {\n      errors\n      success\n    }\n  }\n",
): (typeof documents)["\n  mutation ResetPassword($email: String!) {\n    requestPasswordReset(email: $email) {\n      errors\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation Register($email: String!, $password1: String!, $password2: String!, $username: String!) {\n    register(email: $email, password1: $password1, password2: $password2, username: $username) {\n      errors\n      success\n    }\n  }\n",
): (typeof documents)["\n  mutation Register($email: String!, $password1: String!, $password2: String!, $username: String!) {\n    register(email: $email, password1: $password1, password2: $password2, username: $username) {\n      errors\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query ListExternalDataSources {\n    myOrganisations {\n      id\n      externalDataSources {\n        id\n      }\n    }\n  }\n",
): (typeof documents)["\n  query ListExternalDataSources {\n    myOrganisations {\n      id\n      externalDataSources {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetMapReportName($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n    }\n  }\n",
): (typeof documents)["\n  query GetMapReportName($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment MapReportLayersSummary on MapReport {\n    layers {\n      id\n      name\n      sharingPermission {\n        visibilityRecordDetails\n        visibilityRecordCoordinates\n        organisation {\n          name\n        }\n      }\n      source {\n        id\n        name\n        isImportScheduled\n        importedDataCount\n        recordUrlTemplate\n        crmType\n        dataType\n        organisation {\n          name\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment MapReportLayersSummary on MapReport {\n    layers {\n      id\n      name\n      sharingPermission {\n        visibilityRecordDetails\n        visibilityRecordCoordinates\n        organisation {\n          name\n        }\n      }\n      source {\n        id\n        name\n        isImportScheduled\n        importedDataCount\n        recordUrlTemplate\n        crmType\n        dataType\n        organisation {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment MapReportPage on MapReport {\n    id\n    name\n    ... MapReportLayersSummary\n  }\n  \n",
): (typeof documents)["\n  fragment MapReportPage on MapReport {\n    id\n    name\n    ... MapReportLayersSummary\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetMapReport($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n      displayOptions\n      organisation {\n        id\n        slug\n        name\n      }\n      ... MapReportPage\n    }\n  }\n  \n",
): (typeof documents)["\n  query GetMapReport($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n      displayOptions\n      organisation {\n        id\n        slug\n        name\n      }\n      ... MapReportPage\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpdateMapReport($input: MapReportInput!) {\n    updateMapReport(data: $input) {\n      id\n      name\n      displayOptions\n      layers {\n        id\n        name\n        source {\n          id\n          name\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateMapReport($input: MapReportInput!) {\n    updateMapReport(data: $input) {\n      id\n      name\n      displayOptions\n      layers {\n        id\n        name\n        source {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DeleteMapReport($id: IDObject!) {\n    deleteMapReport(data: $id) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation DeleteMapReport($id: IDObject!) {\n    deleteMapReport(data: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation AutoUpdateWebhookRefresh($ID: String!) {\n    refreshWebhooks(externalDataSourceId: $ID) {\n      id\n      webhookHealthcheck\n    }\n  }\n",
): (typeof documents)["\n  mutation AutoUpdateWebhookRefresh($ID: String!) {\n    refreshWebhooks(externalDataSourceId: $ID) {\n      id\n      webhookHealthcheck\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query ExternalDataSourceAutoUpdateCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...DataSourceCard\n    }\n  }\n  \n",
): (typeof documents)["\n  query ExternalDataSourceAutoUpdateCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...DataSourceCard\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation EnableAutoUpdate($ID: String!) {\n    enableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n",
): (typeof documents)["\n  mutation EnableAutoUpdate($ID: String!) {\n    enableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation DisableAutoUpdate($ID: String!) {\n    disableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n",
): (typeof documents)["\n  mutation DisableAutoUpdate($ID: String!) {\n    disableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  fragment DataSourceCard on ExternalDataSource {\n    id\n    name\n    dataType\n    crmType\n    autoUpdateEnabled\n    updateMapping {\n      source\n      sourcePath\n      destinationColumn\n    }\n    jobs {\n      lastEventAt\n      status\n    }\n    sharingPermissions {\n      id\n      organisation {\n        id\n        name\n      }\n    }\n  }\n",
): (typeof documents)["\n  fragment DataSourceCard on ExternalDataSource {\n    id\n    name\n    dataType\n    crmType\n    autoUpdateEnabled\n    updateMapping {\n      source\n      sourcePath\n      destinationColumn\n    }\n    jobs {\n      lastEventAt\n      status\n    }\n    sharingPermissions {\n      id\n      organisation {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query ExternalDataSourceExternalDataSourceCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...DataSourceCard\n    }\n  }\n  \n",
): (typeof documents)["\n  query ExternalDataSourceExternalDataSourceCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...DataSourceCard\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation TriggerFullUpdate($externalDataSourceId: String!) {\n    triggerUpdate(externalDataSourceId: $externalDataSourceId) {\n      id\n      externalDataSource {\n        jobs {\n          status\n          id\n          taskName\n          args\n          lastEventAt\n        }\n        id\n        name\n        crmType\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation TriggerFullUpdate($externalDataSourceId: String!) {\n    triggerUpdate(externalDataSourceId: $externalDataSourceId) {\n      id\n      externalDataSource {\n        jobs {\n          status\n          id\n          taskName\n          args\n          lastEventAt\n        }\n        id\n        name\n        crmType\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ConstituencyStatsOverview ($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByConstituency {\n        label\n        gss\n        count\n        gssArea {\n          name\n          fitBounds\n          mp: person(filters:{personType:"MP"}) {\n            id\n            name\n            photo {\n              url\n            }\n            party: personDatum(filters:{\n              dataType_Name: "party"\n            }) {\n              name: data\n            }\n          }\n          lastElection {\n            stats {\n              date\n              majority\n              electorate\n              firstPartyResult {\n                party\n                shade\n                votes\n              }\n              secondPartyResult {\n                party\n                shade\n                votes\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query ConstituencyStatsOverview ($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByConstituency {\n        label\n        gss\n        count\n        gssArea {\n          name\n          fitBounds\n          mp: person(filters:{personType:"MP"}) {\n            id\n            name\n            photo {\n              url\n            }\n            party: personDatum(filters:{\n              dataType_Name: "party"\n            }) {\n              name: data\n            }\n          }\n          lastElection {\n            stats {\n              date\n              majority\n              electorate\n              firstPartyResult {\n                party\n                shade\n                votes\n              }\n              secondPartyResult {\n                party\n                shade\n                votes\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query EnrichmentLayers {\n    mappingSources {\n      slug\n      name\n      author\n      description\n      descriptionUrl\n      sourcePaths {\n        label\n        value\n        description\n      }\n      # For custom data sources, get some useful data\n      externalDataSource {\n        crmType\n      }\n    }\n  }\n",
): (typeof documents)["\n  query EnrichmentLayers {\n    mappingSources {\n      slug\n      name\n      author\n      description\n      descriptionUrl\n      sourcePaths {\n        label\n        value\n        description\n      }\n      # For custom data sources, get some useful data\n      externalDataSource {\n        crmType\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query GetMemberList {\n    myOrganisations {\n      externalDataSources(filters: { dataType: MEMBER }) {\n        id\n        name\n        importedDataCount\n        crmType\n        dataType\n      }\n      sharingPermissionsFromOtherOrgs {\n        externalDataSource {\n          id\n          name\n          importedDataCount\n          crmType\n          dataType\n          organisation {\n            name\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query GetMemberList {\n    myOrganisations {\n      externalDataSources(filters: { dataType: MEMBER }) {\n        id\n        name\n        importedDataCount\n        crmType\n        dataType\n      }\n      sharingPermissionsFromOtherOrgs {\n        externalDataSource {\n          id\n          name\n          importedDataCount\n          crmType\n          dataType\n          organisation {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery MapReportLayerGeoJSONPoint($genericDataId: String!) {\n  importedDataGeojsonPoint(genericDataId: $genericDataId) {\n    id\n    type\n    geometry {\n      type\n      coordinates\n    }\n    properties {\n      id\n      lastUpdate\n      name\n      phone\n      email\n      postcodeData {\n        postcode\n      }\n      json\n      remoteUrl\n      dataType {\n        dataSet {\n          externalDataSource {\n            name\n          }\n        }\n      }\n    }\n  }\n}\n",
): (typeof documents)["\nquery MapReportLayerGeoJSONPoint($genericDataId: String!) {\n  importedDataGeojsonPoint(genericDataId: $genericDataId) {\n    id\n    type\n    geometry {\n      type\n      coordinates\n    }\n    properties {\n      id\n      lastUpdate\n      name\n      phone\n      email\n      postcodeData {\n        postcode\n      }\n      json\n      remoteUrl\n      dataType {\n        dataSet {\n          externalDataSource {\n            name\n          }\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query MapReportLayerAnalytics($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      layers {\n        id\n        name\n        source {\n          id\n          organisation {\n            name\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query MapReportLayerAnalytics($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      layers {\n        id\n        name\n        source {\n          id\n          organisation {\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query MapReportRegionStats($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByRegion {\n        label\n        gss\n        count\n        gssArea {\n          point {\n            id\n            type\n            geometry {\n              type\n              coordinates\n            }\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query MapReportRegionStats($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByRegion {\n        label\n        gss\n        count\n        gssArea {\n          point {\n            id\n            type\n            geometry {\n              type\n              coordinates\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query MapReportConstituencyStats($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByConstituency {\n        label\n        gss\n        count\n        gssArea {\n          point {\n            id\n            type\n            geometry {\n              type\n              coordinates\n            }\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query MapReportConstituencyStats($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByConstituency {\n        label\n        gss\n        count\n        gssArea {\n          point {\n            id\n            type\n            geometry {\n              type\n              coordinates\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query MapReportWardStats($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByWard {\n        label\n        gss\n        count\n        gssArea {\n          point {\n            id\n            type\n            geometry {\n              type\n              coordinates\n            }\n          }\n        }\n      }\n    }\n  }\n",
): (typeof documents)["\n  query MapReportWardStats($reportID: ID!) {\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountByWard {\n        label\n        gss\n        count\n        gssArea {\n          point {\n            id\n            type\n            geometry {\n              type\n              coordinates\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetConstituencyData($gss: String!, $reportID: ID!) {\n    constituency: area(gss: $gss) {\n      id\n      name\n      mp: person(filters:{personType:"MP"}) {\n        id\n        name\n        photo {\n          url\n        }\n        party: personDatum(filters:{\n          dataType_Name: "party"\n        }) {\n          name: data\n          shade\n        }\n      }\n      lastElection {\n        stats {\n          date\n          electorate\n          validVotes\n          majority\n          firstPartyResult {\n            party\n            shade\n            votes\n          }\n          secondPartyResult {\n            party\n            shade\n            votes\n          }\n        }\n      }\n    }\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountForConstituency(gss: $gss) {\n        gss\n        count\n      }\n      layers {\n        id\n        name\n        source {\n          id\n          importedDataCountForConstituency(gss: $gss) {\n            gss\n            count\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetConstituencyData($gss: String!, $reportID: ID!) {\n    constituency: area(gss: $gss) {\n      id\n      name\n      mp: person(filters:{personType:"MP"}) {\n        id\n        name\n        photo {\n          url\n        }\n        party: personDatum(filters:{\n          dataType_Name: "party"\n        }) {\n          name: data\n          shade\n        }\n      }\n      lastElection {\n        stats {\n          date\n          electorate\n          validVotes\n          majority\n          firstPartyResult {\n            party\n            shade\n            votes\n          }\n          secondPartyResult {\n            party\n            shade\n            votes\n          }\n        }\n      }\n    }\n    mapReport(pk: $reportID) {\n      id\n      importedDataCountForConstituency(gss: $gss) {\n        gss\n        count\n      }\n      layers {\n        id\n        name\n        source {\n          id\n          importedDataCountForConstituency(gss: $gss) {\n            gss\n            count\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation UpdateExternalDataSource($input: ExternalDataSourceInput!) {\n    updateExternalDataSource(data: $input) {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      postcodeField\n      firstNameField\n      lastNameField\n      emailField\n      phoneField\n      addressField\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation UpdateExternalDataSource($input: ExternalDataSourceInput!) {\n    updateExternalDataSource(data: $input) {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      postcodeField\n      firstNameField\n      lastNameField\n      emailField\n      phoneField\n      addressField\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query PublicUser {\n    publicUser {\n      id\n      username\n      email\n    }\n  }\n",
): (typeof documents)["\n  query PublicUser {\n    publicUser {\n      id\n      username\n      email\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
