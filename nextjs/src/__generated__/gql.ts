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
    "\n  query Example {\n    organisations {\n      id\n      name\n    }\n  }\n": types.ExampleDocument,
    "\n  mutation Verify($token: String!) {\n    verifyAccount(token: $token) {\n      errors\n      success\n    }\n  }\n": types.VerifyDocument,
    "\n  query ListUpdateConfigs {\n    externalDataSourceUpdateConfigs {\n      id\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n      enabled\n      jobs {\n        lastEventAt\n        status\n      }\n      mapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n": types.ListUpdateConfigsDocument,
    "\n  query PageForExternalDataSourceUpdateConfig($ID: ID!) {\n    externalDataSourceUpdateConfig(pk: $ID) {\n      id\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n      enabled\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      postcodeColumn\n      mapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n": types.PageForExternalDataSourceUpdateConfigDocument,
    "\n  mutation UpdateSource($config: ExternalDataSourceInput!) {\n    updateExternalDataSource(data: $config) {\n      id\n      name\n    }\n  }\n": types.UpdateSourceDocument,
    "\n  mutation UpdateConfig($config: ExternalDataSourceUpdateConfigInput!) {\n    updateExternalDataSourceUpdateConfig(data: $config) {\n      id\n      postcodeColumn\n      mapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n": types.UpdateConfigDocument,
    "\n  mutation DeleteSource($id: String!) {\n    deleteExternalDataSource(data: { id: $id }) {\n      id\n    }\n  }\n": types.DeleteSourceDocument,
    "\n  query CheckIfSourceHasConfig($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      updateConfigs {\n        id\n      }\n    }\n  }\n": types.CheckIfSourceHasConfigDocument,
    "\n  mutation CreateUpdateConfig($config: ExternalDataSourceUpdateConfigInput!) {\n    createExternalDataSourceUpdateConfig(data: $config) {\n      id\n      postcodeColumn\n      mapping {\n        destinationColumn\n        source\n        sourcePath\n      }\n    }\n  }\n": types.CreateUpdateConfigDocument,
    "\n  query TestAirtableSource(\n    $apiKey: String!\n    $baseId: String!\n    $tableId: String!\n  ) {\n    testAirtableSource(apiKey: $apiKey, baseId: $baseId, tableId: $tableId)\n  }\n": types.TestAirtableSourceDocument,
    "\n  mutation CreateAirtableSource($AirtableSource: AirtableSourceInput!) {\n    createAirtableSource(data: $AirtableSource) {\n      id\n      name\n      healthcheck\n    }\n  }\n": types.CreateAirtableSourceDocument,
    "\n  query AllExternalDataSources {\n    externalDataSources {\n      id\n      name\n      createdAt\n      connectionDetails {\n        crmType: __typename\n        ... on AirtableSource {\n          baseId\n          tableId\n        }\n      }\n      updateConfigs {\n        id\n        enabled\n      }\n    }\n  }\n": types.AllExternalDataSourcesDocument,
    "\n  query PageForExternalDataSourceUpdateConfigReview($ID: ID!) {\n    externalDataSourceUpdateConfig(pk: $ID) {\n      id\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n      enabled\n      jobs {\n        lastEventAt\n        status\n      }\n    }\n  }\n": types.PageForExternalDataSourceUpdateConfigReviewDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    tokenAuth(username: $username, password: $password) {\n      errors\n      success\n      token {\n        token\n        payload {\n          exp\n        }\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($email: String!, $password1: String!, $password2: String!, $username: String!) {\n    register(email: $email, password1: $password1, password2: $password2, username: $username) {\n      errors\n      success\n    }\n  }\n": types.RegisterDocument,
    "\n  fragment UpdateConfigCardFields on ExternalDataSourceUpdateConfig {\n    id\n    externalDataSource {\n      id\n      name\n      connectionDetails {\n        crmType: __typename\n      }\n    }\n    enabled\n    jobs {\n      lastEventAt\n      status\n    }\n  }\n": types.UpdateConfigCardFieldsFragmentDoc,
    "\n  query ExternalDataSourceUpdateConfigCard($ID: ID!) {\n    externalDataSourceUpdateConfig(pk: $ID) {\n      ...UpdateConfigCardFields\n    }\n  }\n  \n": types.ExternalDataSourceUpdateConfigCardDocument,
    "\n  mutation EnableUpdateConfig($ID: String!) {\n    enableUpdateConfig(configId: $ID) {\n      id\n      enabled\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n    }\n  }\n": types.EnableUpdateConfigDocument,
    "\n  mutation DisableUpdateConfig($ID: String!) {\n    disableUpdateConfig(configId: $ID) {\n      id\n      enabled\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n    }\n  }\n": types.DisableUpdateConfigDocument,
    "\n  mutation TriggerFullUpdate($configId: String!) {\n    updateAll(configId: $configId) {\n      id\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n    }\n  }\n": types.TriggerFullUpdateDocument,
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
export function gql(source: "\n  query Example {\n    organisations {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Example {\n    organisations {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Verify($token: String!) {\n    verifyAccount(token: $token) {\n      errors\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Verify($token: String!) {\n    verifyAccount(token: $token) {\n      errors\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ListUpdateConfigs {\n    externalDataSourceUpdateConfigs {\n      id\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n      enabled\n      jobs {\n        lastEventAt\n        status\n      }\n      mapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListUpdateConfigs {\n    externalDataSourceUpdateConfigs {\n      id\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n      enabled\n      jobs {\n        lastEventAt\n        status\n      }\n      mapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PageForExternalDataSourceUpdateConfig($ID: ID!) {\n    externalDataSourceUpdateConfig(pk: $ID) {\n      id\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n      enabled\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      postcodeColumn\n      mapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"): (typeof documents)["\n  query PageForExternalDataSourceUpdateConfig($ID: ID!) {\n    externalDataSourceUpdateConfig(pk: $ID) {\n      id\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n      enabled\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      postcodeColumn\n      mapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSource($config: ExternalDataSourceInput!) {\n    updateExternalDataSource(data: $config) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSource($config: ExternalDataSourceInput!) {\n    updateExternalDataSource(data: $config) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateConfig($config: ExternalDataSourceUpdateConfigInput!) {\n    updateExternalDataSourceUpdateConfig(data: $config) {\n      id\n      postcodeColumn\n      mapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateConfig($config: ExternalDataSourceUpdateConfigInput!) {\n    updateExternalDataSourceUpdateConfig(data: $config) {\n      id\n      postcodeColumn\n      mapping {\n        source\n        sourcePath\n        destinationColumn\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteSource($id: String!) {\n    deleteExternalDataSource(data: { id: $id }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSource($id: String!) {\n    deleteExternalDataSource(data: { id: $id }) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CheckIfSourceHasConfig($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      updateConfigs {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query CheckIfSourceHasConfig($ID: ID!) {\n    externalDataSource(pk: $ID) {\n      id\n      updateConfigs {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUpdateConfig($config: ExternalDataSourceUpdateConfigInput!) {\n    createExternalDataSourceUpdateConfig(data: $config) {\n      id\n      postcodeColumn\n      mapping {\n        destinationColumn\n        source\n        sourcePath\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUpdateConfig($config: ExternalDataSourceUpdateConfigInput!) {\n    createExternalDataSourceUpdateConfig(data: $config) {\n      id\n      postcodeColumn\n      mapping {\n        destinationColumn\n        source\n        sourcePath\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TestAirtableSource(\n    $apiKey: String!\n    $baseId: String!\n    $tableId: String!\n  ) {\n    testAirtableSource(apiKey: $apiKey, baseId: $baseId, tableId: $tableId)\n  }\n"): (typeof documents)["\n  query TestAirtableSource(\n    $apiKey: String!\n    $baseId: String!\n    $tableId: String!\n  ) {\n    testAirtableSource(apiKey: $apiKey, baseId: $baseId, tableId: $tableId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAirtableSource($AirtableSource: AirtableSourceInput!) {\n    createAirtableSource(data: $AirtableSource) {\n      id\n      name\n      healthcheck\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAirtableSource($AirtableSource: AirtableSourceInput!) {\n    createAirtableSource(data: $AirtableSource) {\n      id\n      name\n      healthcheck\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllExternalDataSources {\n    externalDataSources {\n      id\n      name\n      createdAt\n      connectionDetails {\n        crmType: __typename\n        ... on AirtableSource {\n          baseId\n          tableId\n        }\n      }\n      updateConfigs {\n        id\n        enabled\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllExternalDataSources {\n    externalDataSources {\n      id\n      name\n      createdAt\n      connectionDetails {\n        crmType: __typename\n        ... on AirtableSource {\n          baseId\n          tableId\n        }\n      }\n      updateConfigs {\n        id\n        enabled\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PageForExternalDataSourceUpdateConfigReview($ID: ID!) {\n    externalDataSourceUpdateConfig(pk: $ID) {\n      id\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n      enabled\n      jobs {\n        lastEventAt\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query PageForExternalDataSourceUpdateConfigReview($ID: ID!) {\n    externalDataSourceUpdateConfig(pk: $ID) {\n      id\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n      enabled\n      jobs {\n        lastEventAt\n        status\n      }\n    }\n  }\n"];
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
export function gql(source: "\n  fragment UpdateConfigCardFields on ExternalDataSourceUpdateConfig {\n    id\n    externalDataSource {\n      id\n      name\n      connectionDetails {\n        crmType: __typename\n      }\n    }\n    enabled\n    jobs {\n      lastEventAt\n      status\n    }\n  }\n"): (typeof documents)["\n  fragment UpdateConfigCardFields on ExternalDataSourceUpdateConfig {\n    id\n    externalDataSource {\n      id\n      name\n      connectionDetails {\n        crmType: __typename\n      }\n    }\n    enabled\n    jobs {\n      lastEventAt\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ExternalDataSourceUpdateConfigCard($ID: ID!) {\n    externalDataSourceUpdateConfig(pk: $ID) {\n      ...UpdateConfigCardFields\n    }\n  }\n  \n"): (typeof documents)["\n  query ExternalDataSourceUpdateConfigCard($ID: ID!) {\n    externalDataSourceUpdateConfig(pk: $ID) {\n      ...UpdateConfigCardFields\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EnableUpdateConfig($ID: String!) {\n    enableUpdateConfig(configId: $ID) {\n      id\n      enabled\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EnableUpdateConfig($ID: String!) {\n    enableUpdateConfig(configId: $ID) {\n      id\n      enabled\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DisableUpdateConfig($ID: String!) {\n    disableUpdateConfig(configId: $ID) {\n      id\n      enabled\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DisableUpdateConfig($ID: String!) {\n    disableUpdateConfig(configId: $ID) {\n      id\n      enabled\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation TriggerFullUpdate($configId: String!) {\n    updateAll(configId: $configId) {\n      id\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation TriggerFullUpdate($configId: String!) {\n    updateAll(configId: $configId) {\n      id\n      jobs {\n        status\n        id\n        taskName\n        args\n        lastEventAt\n      }\n      externalDataSource {\n        id\n        name\n        connectionDetails {\n          crmType: __typename\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PublicUser {\n    publicUser {\n      id\n      username\n      email\n    }\n  }\n"): (typeof documents)["\n  query PublicUser {\n    publicUser {\n      id\n      username\n      email\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;