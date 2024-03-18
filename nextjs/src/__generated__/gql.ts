/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  query ListExternalDataSources {\n    externalDataSources {\n      id\n      name\n      dataType\n      connectionDetails {\n        crmType: __typename\n      }\n      autoUpdateEnabled\n      jobs {\n        lastEventAt\n        status\n      }\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n": types.ListExternalDataSourcesDocument,
    "\n  query GetSourceMapping($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      autoUpdateEnabled\n      updateMapping {\n        destinationColumn\n        source\n        sourcePath\n      }\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      connectionDetails {\n        __typename\n      }\n      geographyColumn\n      geographyColumnType\n    }\n  }\n": types.GetSourceMappingDocument,
    "\n  query TestSourceConnection(\n    $apiKey: String!\n    $baseId: String!\n    $tableId: String!\n  ) {\n    testSourceConnection: testAirtableSource(apiKey: $apiKey, baseId: $baseId, tableId: $tableId) {\n      remoteName\n      healthcheck\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      __typename\n    }\n  }\n": types.TestSourceConnectionDocument,
    "\n  mutation CreateSource($AirtableSource: AirtableSourceInput!) {\n    createSource: createAirtableSource(data: $AirtableSource) {\n      id\n      name\n      healthcheck\n      dataType\n    }\n  }\n": types.CreateSourceDocument,
    "\n  query AllExternalDataSources {\n    externalDataSources {\n      id\n      name\n      createdAt\n      dataType\n      connectionDetails {\n        crmType: __typename\n        ... on AirtableSource {\n          baseId\n          tableId\n        }\n      }\n      autoUpdateEnabled\n    }\n  }\n": types.AllExternalDataSourcesDocument,
    "\n  query AutoUpdateCreationReview($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      geographyColumn\n      dataType\n      connectionDetails {\n        crmType: __typename\n      }\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n      jobs {\n        lastEventAt\n        status\n      }\n      ...DataSourceCard\n    }\n  }\n  \n": types.AutoUpdateCreationReviewDocument,
    "\n  query ExternalDataSourceInspectPage($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      dataType\n      remoteUrl\n      connectionDetails {\n        crmType: __typename\n        ... on AirtableSource {\n          baseId\n          tableId\n          apiKey\n        }\n      }\n      autoUpdateEnabled\n      webhookHealthcheck\n      geographyColumn\n      geographyColumnType\n      isImporting\n      importedDataCount\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n": types.ExternalDataSourceInspectPageDocument,
    "\n  mutation DeleteUpdateConfig($id: String!) {\n    deleteExternalDataSource(data: { id: $id }) {\n      id\n    }\n  }\n": types.DeleteUpdateConfigDocument,
    "\n      mutation ImportData($id: String!) {\n        importAll(externalDataSourceId: $id) {\n          id\n          importedDataCount\n          isImporting\n          jobs {\n            status\n            id\n            taskName\n            args\n            lastEventAt\n          }\n        }\n      }\n    ": types.ImportDataDocument,
    "\n  query ExternalDataSourceName($externalDataSourceId: ID!) {\n    externalDataSource(pk: $externalDataSourceId) {\n      name\n    }\n  }\n": types.ExternalDataSourceNameDocument,
    "\n  query ListReports {\n    reports {\n      id\n      name\n      lastUpdate\n    }\n  }\n": types.ListReportsDocument,
    "\nmutation CreateMapReport($data: MapReportInput!) {\n  createMapReport(data: $data) {\n    ... on MapReport {\n      id\n    }\n    ... on OperationInfo {\n      messages {\n        message\n      }\n    }\n  }\n}\n": types.CreateMapReportDocument,
    "\n  mutation Verify($token: String!) {\n    verifyAccount(token: $token) {\n      errors\n      success\n    }\n  }\n": types.VerifyDocument,
    "\n  query Example {\n    organisations {\n      id\n      name\n    }\n  }\n": types.ExampleDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      errors\n      success\n      token {\n        token\n        payload {\n          exp\n        }\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($email: String!, $password1: String!, $password2: String!, $username: String!) {\n    register(email: $email, password1: $password1, password2: $password2, username: $username) {\n      errors\n      success\n    }\n  }\n": types.RegisterDocument,
    "\n  query GetMapReportName($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n    }\n  }\n": types.GetMapReportNameDocument,
    "\n  fragment MapReportPage on MapReport {\n    id\n    name\n    ... MapReportLayersSummary\n  }\n  \n": types.MapReportPageFragmentDoc,
    "\n  query GetMapReport($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n      ... MapReportPage\n    }\n  }\n  \n": types.GetMapReportDocument,
    "\n  mutation UpdateMapReport($input: MapReportInput!) {\n    updateMapReport(data: $input) {\n      ... MapReportPage\n    }\n  }\n  \n": types.UpdateMapReportDocument,
    "\n  mutation DeleteMapReport($id: IDObject!) {\n    deleteMapReport(data: $id) {\n      id\n    }\n  }\n": types.DeleteMapReportDocument,
    "\n  mutation AutoUpdateWebhookRefresh($ID: String!) {\n    refreshWebhooks(externalDataSourceId: $ID) {\n      id\n      webhookHealthcheck\n    }\n  }\n": types.AutoUpdateWebhookRefreshDocument,
    "\n  fragment DataSourceCard on ExternalDataSource {\n    id\n    name\n    dataType\n    connectionDetails {\n      crmType: __typename\n    }\n    autoUpdateEnabled\n    updateMapping {\n      source\n      sourcePath\n      destinationColumn\n    }\n    jobs {\n      lastEventAt\n      status\n    }\n  }\n": types.DataSourceCardFragmentDoc,
    "\n  query ExternalDataSourceAutoUpdateCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...DataSourceCard\n    }\n  }\n  \n": types.ExternalDataSourceAutoUpdateCardDocument,
    "\n  mutation EnableAutoUpdate($ID: String!) {\n    enableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n": types.EnableAutoUpdateDocument,
    "\n  mutation DisableAutoUpdate($ID: String!) {\n    disableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n": types.DisableAutoUpdateDocument,
    "\n  mutation TriggerFullUpdate($externalDataSourceId: String!) {\n    triggerUpdate(externalDataSourceId: $externalDataSourceId) {\n      id\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      id\n      name\n      connectionDetails {\n        crmType: __typename\n      }\n    }\n  }\n": types.TriggerFullUpdateDocument,
    "\n  fragment ExternalDataSourceCardFields on ExternalDataSource {\n    id\n    name\n    connectionDetails {\n      crmType: __typename\n    }\n  }\n": types.ExternalDataSourceCardFieldsFragmentDoc,
    "\n  query ExternalDataSourceCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...ExternalDataSourceCardFields\n    }\n  }\n  \n": types.ExternalDataSourceCardDocument,
    "\n  query EnrichmentLayers {\n    externalDataSources {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      dataType\n      connectionDetails {\n        __typename\n      }\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n    }\n  }\n": types.EnrichmentLayersDocument,
    "\n  fragment MapReportLayersSummary on MapReport {\n    layers {\n      name\n      source {\n        id\n        name\n        isImporting\n        importedDataCount\n      }\n    }\n  }\n": types.MapReportLayersSummaryFragmentDoc,
    "\n  query GetMemberList {\n    externalDataSources(filters: { dataType: MEMBER }) {\n      id\n      name\n      importedDataCount\n    }\n  }\n": types.GetMemberListDocument,
    "\n  query GetSourceGeoJSON($externalDataSourceId: ID!) {\n    externalDataSource(pk: $externalDataSourceId) {\n      geojsonPointFeatures {\n        id\n        type\n        geometry {\n          type\n          coordinates\n        }\n      }\n    }\n  }\n": types.GetSourceGeoJsonDocument,
    "\n  mutation UpdateExternalDataSource($input: ExternalDataSourceInput!) {\n    updateExternalDataSource(data: $input) {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n": types.UpdateExternalDataSourceDocument,
    "\n  query PublicUser {\n    publicUser {\n      id\n      username\n      email\n    }\n  }\n": types.PublicUserDocument,
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
export function gql(source: "\n  query ListExternalDataSources {\n    externalDataSources {\n      id\n      name\n      dataType\n      connectionDetails {\n        crmType: __typename\n      }\n      autoUpdateEnabled\n      jobs {\n        lastEventAt\n        status\n      }\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListExternalDataSources {\n    externalDataSources {\n      id\n      name\n      dataType\n      connectionDetails {\n        crmType: __typename\n      }\n      autoUpdateEnabled\n      jobs {\n        lastEventAt\n        status\n      }\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSourceMapping($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      autoUpdateEnabled\n      updateMapping {\n        destinationColumn\n        source\n        sourcePath\n      }\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      connectionDetails {\n        __typename\n      }\n      geographyColumn\n      geographyColumnType\n    }\n  }\n"): (typeof documents)["\n  query GetSourceMapping($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      autoUpdateEnabled\n      updateMapping {\n        destinationColumn\n        source\n        sourcePath\n      }\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      connectionDetails {\n        __typename\n      }\n      geographyColumn\n      geographyColumnType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TestSourceConnection(\n    $apiKey: String!\n    $baseId: String!\n    $tableId: String!\n  ) {\n    testSourceConnection: testAirtableSource(apiKey: $apiKey, baseId: $baseId, tableId: $tableId) {\n      remoteName\n      healthcheck\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      __typename\n    }\n  }\n"): (typeof documents)["\n  query TestSourceConnection(\n    $apiKey: String!\n    $baseId: String!\n    $tableId: String!\n  ) {\n    testSourceConnection: testAirtableSource(apiKey: $apiKey, baseId: $baseId, tableId: $tableId) {\n      remoteName\n      healthcheck\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      __typename\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSource($AirtableSource: AirtableSourceInput!) {\n    createSource: createAirtableSource(data: $AirtableSource) {\n      id\n      name\n      healthcheck\n      dataType\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSource($AirtableSource: AirtableSourceInput!) {\n    createSource: createAirtableSource(data: $AirtableSource) {\n      id\n      name\n      healthcheck\n      dataType\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllExternalDataSources {\n    externalDataSources {\n      id\n      name\n      createdAt\n      dataType\n      connectionDetails {\n        crmType: __typename\n        ... on AirtableSource {\n          baseId\n          tableId\n        }\n      }\n      autoUpdateEnabled\n    }\n  }\n"): (typeof documents)["\n  query AllExternalDataSources {\n    externalDataSources {\n      id\n      name\n      createdAt\n      dataType\n      connectionDetails {\n        crmType: __typename\n        ... on AirtableSource {\n          baseId\n          tableId\n        }\n      }\n      autoUpdateEnabled\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AutoUpdateCreationReview($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      geographyColumn\n      dataType\n      connectionDetails {\n        crmType: __typename\n      }\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n      jobs {\n        lastEventAt\n        status\n      }\n      ...DataSourceCard\n    }\n  }\n  \n"): (typeof documents)["\n  query AutoUpdateCreationReview($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      geographyColumn\n      dataType\n      connectionDetails {\n        crmType: __typename\n      }\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n      jobs {\n        lastEventAt\n        status\n      }\n      ...DataSourceCard\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ExternalDataSourceInspectPage($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      dataType\n      remoteUrl\n      connectionDetails {\n        crmType: __typename\n        ... on AirtableSource {\n          baseId\n          tableId\n          apiKey\n        }\n      }\n      autoUpdateEnabled\n      webhookHealthcheck\n      geographyColumn\n      geographyColumnType\n      isImporting\n      importedDataCount\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"): (typeof documents)["\n  query ExternalDataSourceInspectPage($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      name\n      dataType\n      remoteUrl\n      connectionDetails {\n        crmType: __typename\n        ... on AirtableSource {\n          baseId\n          tableId\n          apiKey\n        }\n      }\n      autoUpdateEnabled\n      webhookHealthcheck\n      geographyColumn\n      geographyColumnType\n      isImporting\n      importedDataCount\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteUpdateConfig($id: String!) {\n    deleteExternalDataSource(data: { id: $id }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUpdateConfig($id: String!) {\n    deleteExternalDataSource(data: { id: $id }) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      mutation ImportData($id: String!) {\n        importAll(externalDataSourceId: $id) {\n          id\n          importedDataCount\n          isImporting\n          jobs {\n            status\n            id\n            taskName\n            args\n            lastEventAt\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation ImportData($id: String!) {\n        importAll(externalDataSourceId: $id) {\n          id\n          importedDataCount\n          isImporting\n          jobs {\n            status\n            id\n            taskName\n            args\n            lastEventAt\n          }\n        }\n      }\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ExternalDataSourceName($externalDataSourceId: ID!) {\n    externalDataSource(pk: $externalDataSourceId) {\n      name\n    }\n  }\n"): (typeof documents)["\n  query ExternalDataSourceName($externalDataSourceId: ID!) {\n    externalDataSource(pk: $externalDataSourceId) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListReports {\n    reports {\n      id\n      name\n      lastUpdate\n    }\n  }\n"): (typeof documents)["\n  query ListReports {\n    reports {\n      id\n      name\n      lastUpdate\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateMapReport($data: MapReportInput!) {\n  createMapReport(data: $data) {\n    ... on MapReport {\n      id\n    }\n    ... on OperationInfo {\n      messages {\n        message\n      }\n    }\n  }\n}\n"): (typeof documents)["\nmutation CreateMapReport($data: MapReportInput!) {\n  createMapReport(data: $data) {\n    ... on MapReport {\n      id\n    }\n    ... on OperationInfo {\n      messages {\n        message\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Verify($token: String!) {\n    verifyAccount(token: $token) {\n      errors\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Verify($token: String!) {\n    verifyAccount(token: $token) {\n      errors\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Example {\n    organisations {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Example {\n    organisations {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      errors\n      success\n      token {\n        token\n        payload {\n          exp\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      errors\n      success\n      token {\n        token\n        payload {\n          exp\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($email: String!, $password1: String!, $password2: String!, $username: String!) {\n    register(email: $email, password1: $password1, password2: $password2, username: $username) {\n      errors\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Register($email: String!, $password1: String!, $password2: String!, $username: String!) {\n    register(email: $email, password1: $password1, password2: $password2, username: $username) {\n      errors\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMapReportName($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetMapReportName($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MapReportPage on MapReport {\n    id\n    name\n    ... MapReportLayersSummary\n  }\n  \n"): (typeof documents)["\n  fragment MapReportPage on MapReport {\n    id\n    name\n    ... MapReportLayersSummary\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMapReport($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n      ... MapReportPage\n    }\n  }\n  \n"): (typeof documents)["\n  query GetMapReport($id: ID!) {\n    mapReport(pk: $id) {\n      id\n      name\n      ... MapReportPage\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateMapReport($input: MapReportInput!) {\n    updateMapReport(data: $input) {\n      ... MapReportPage\n    }\n  }\n  \n"): (typeof documents)["\n  mutation UpdateMapReport($input: MapReportInput!) {\n    updateMapReport(data: $input) {\n      ... MapReportPage\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteMapReport($id: IDObject!) {\n    deleteMapReport(data: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteMapReport($id: IDObject!) {\n    deleteMapReport(data: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AutoUpdateWebhookRefresh($ID: String!) {\n    refreshWebhooks(externalDataSourceId: $ID) {\n      id\n      webhookHealthcheck\n    }\n  }\n"): (typeof documents)["\n  mutation AutoUpdateWebhookRefresh($ID: String!) {\n    refreshWebhooks(externalDataSourceId: $ID) {\n      id\n      webhookHealthcheck\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DataSourceCard on ExternalDataSource {\n    id\n    name\n    dataType\n    connectionDetails {\n      crmType: __typename\n    }\n    autoUpdateEnabled\n    updateMapping {\n      source\n      sourcePath\n      destinationColumn\n    }\n    jobs {\n      lastEventAt\n      status\n    }\n  }\n"): (typeof documents)["\n  fragment DataSourceCard on ExternalDataSource {\n    id\n    name\n    dataType\n    connectionDetails {\n      crmType: __typename\n    }\n    autoUpdateEnabled\n    updateMapping {\n      source\n      sourcePath\n      destinationColumn\n    }\n    jobs {\n      lastEventAt\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ExternalDataSourceAutoUpdateCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...DataSourceCard\n    }\n  }\n  \n"): (typeof documents)["\n  query ExternalDataSourceAutoUpdateCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...DataSourceCard\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EnableAutoUpdate($ID: String!) {\n    enableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation EnableAutoUpdate($ID: String!) {\n    enableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DisableAutoUpdate($ID: String!) {\n    disableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation DisableAutoUpdate($ID: String!) {\n    disableAutoUpdate(externalDataSourceId: $ID) {\n      id\n      autoUpdateEnabled\n      webhookHealthcheck\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation TriggerFullUpdate($externalDataSourceId: String!) {\n    triggerUpdate(externalDataSourceId: $externalDataSourceId) {\n      id\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      id\n      name\n      connectionDetails {\n        crmType: __typename\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation TriggerFullUpdate($externalDataSourceId: String!) {\n    triggerUpdate(externalDataSourceId: $externalDataSourceId) {\n      id\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      id\n      name\n      connectionDetails {\n        crmType: __typename\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ExternalDataSourceCardFields on ExternalDataSource {\n    id\n    name\n    connectionDetails {\n      crmType: __typename\n    }\n  }\n"): (typeof documents)["\n  fragment ExternalDataSourceCardFields on ExternalDataSource {\n    id\n    name\n    connectionDetails {\n      crmType: __typename\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ExternalDataSourceCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...ExternalDataSourceCardFields\n    }\n  }\n  \n"): (typeof documents)["\n  query ExternalDataSourceCard($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      ...ExternalDataSourceCardFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query EnrichmentLayers {\n    externalDataSources {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      dataType\n      connectionDetails {\n        __typename\n      }\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query EnrichmentLayers {\n    externalDataSources {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      dataType\n      connectionDetails {\n        __typename\n      }\n      fieldDefinitions {\n        label\n        value\n        description\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MapReportLayersSummary on MapReport {\n    layers {\n      name\n      source {\n        id\n        name\n        isImporting\n        importedDataCount\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment MapReportLayersSummary on MapReport {\n    layers {\n      name\n      source {\n        id\n        name\n        isImporting\n        importedDataCount\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMemberList {\n    externalDataSources(filters: { dataType: MEMBER }) {\n      id\n      name\n      importedDataCount\n    }\n  }\n"): (typeof documents)["\n  query GetMemberList {\n    externalDataSources(filters: { dataType: MEMBER }) {\n      id\n      name\n      importedDataCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSourceGeoJSON($externalDataSourceId: ID!) {\n    externalDataSource(pk: $externalDataSourceId) {\n      geojsonPointFeatures {\n        id\n        type\n        geometry {\n          type\n          coordinates\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSourceGeoJSON($externalDataSourceId: ID!) {\n    externalDataSource(pk: $externalDataSourceId) {\n      geojsonPointFeatures {\n        id\n        type\n        geometry {\n          type\n          coordinates\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateExternalDataSource($input: ExternalDataSourceInput!) {\n    updateExternalDataSource(data: $input) {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateExternalDataSource($input: ExternalDataSourceInput!) {\n    updateExternalDataSource(data: $input) {\n      id\n      name\n      geographyColumn\n      geographyColumnType\n      autoUpdateEnabled\n      updateMapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PublicUser {\n    publicUser {\n      id\n      username\n      email\n    }\n  }\n"): (typeof documents)["\n  query PublicUser {\n    publicUser {\n      id\n      username\n      email\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;