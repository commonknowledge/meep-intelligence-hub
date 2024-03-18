/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  /**
   *
   *      Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  ExpectedError: { input: any; output: any; }
  /** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
  GlobalID: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

/** An Airtable table. */
export type AirtableSource = {
  __typename?: 'AirtableSource';
  /** Personal access token. Requires the following 4 scopes: data.records:read, data.records:write, schema.bases:read, webhook:manage */
  apiKey: Scalars['String']['output'];
  baseId: Scalars['String']['output'];
  connectionDetails: AirtableSource;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  healthcheck: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  name?: Maybe<Scalars['String']['output']>;
  organisation: Organisation;
  tableId: Scalars['String']['output'];
  updateConfigs: Array<ExternalDataSourceUpdateConfig>;
};

/** An Airtable table. */
export type AirtableSourceInput = {
  /** Personal access token. Requires the following 4 scopes: data.records:read, data.records:write, schema.bases:read, webhook:manage */
  apiKey: Scalars['String']['input'];
  baseId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organisation?: InputMaybe<Scalars['String']['input']>;
  tableId: Scalars['String']['input'];
};

export type CreateOrganisationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type DatetimeFilterLookup = {
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  exact?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  iContains?: InputMaybe<Scalars['DateTime']['input']>;
  iEndsWith?: InputMaybe<Scalars['DateTime']['input']>;
  iExact?: InputMaybe<Scalars['DateTime']['input']>;
  iRegex?: InputMaybe<Scalars['String']['input']>;
  iStartsWith?: InputMaybe<Scalars['DateTime']['input']>;
  inList?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  range?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DjangoModelType = {
  __typename?: 'DjangoModelType';
  pk: Scalars['ID']['output'];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type ExternalDataSource = {
  __typename?: 'ExternalDataSource';
  connectionDetails: AirtableSource;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  healthcheck: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  name?: Maybe<Scalars['String']['output']>;
  organisation: Organisation;
  updateConfigs: Array<ExternalDataSourceUpdateConfig>;
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type ExternalDataSourceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organisation?: InputMaybe<OneToManyInput>;
};

/** A configuration for updating a data source. */
export type ExternalDataSourceUpdateConfig = {
  __typename?: 'ExternalDataSourceUpdateConfig';
  enabled: Scalars['Boolean']['output'];
  externalDataSource: ExternalDataSource;
  id: Scalars['UUID']['output'];
  jobs: Array<QueueJob>;
  mapping: Array<UpdateConfigDict>;
  postcodeColumn?: Maybe<Scalars['String']['output']>;
  webhookHealthcheck: Scalars['Boolean']['output'];
  webhookUrl: Scalars['String']['output'];
};

/** A configuration for updating a data source. */
export type ExternalDataSourceUpdateConfigInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  externalDataSource?: InputMaybe<OneToManyInput>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  mapping: Array<UpdateConfigDictInput>;
  postcodeColumn?: InputMaybe<Scalars['String']['input']>;
};

export type IdFilterLookup = {
  contains?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  exact?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  iContains?: InputMaybe<Scalars['ID']['input']>;
  iEndsWith?: InputMaybe<Scalars['ID']['input']>;
  iExact?: InputMaybe<Scalars['ID']['input']>;
  iRegex?: InputMaybe<Scalars['String']['input']>;
  iStartsWith?: InputMaybe<Scalars['ID']['input']>;
  inList?: InputMaybe<Array<Scalars['ID']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  range?: InputMaybe<Array<Scalars['ID']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IdObject = {
  id: Scalars['String']['input'];
};

export type IntFilterLookup = {
  contains?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  exact?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  iContains?: InputMaybe<Scalars['Int']['input']>;
  iEndsWith?: InputMaybe<Scalars['Int']['input']>;
  iExact?: InputMaybe<Scalars['Int']['input']>;
  iRegex?: InputMaybe<Scalars['String']['input']>;
  iStartsWith?: InputMaybe<Scalars['Int']['input']>;
  inList?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  range?: InputMaybe<Array<Scalars['Int']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

/** Membership(id, user, organisation, role) */
export type Membership = {
  __typename?: 'Membership';
  id: Scalars['ID']['output'];
  organisation: Organisation;
  role: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAirtableSource: AirtableSource;
  createExternalDataSourceUpdateConfig: ExternalDataSourceUpdateConfig;
  createOrganisation: Membership;
  deleteAirtableSource: AirtableSource;
  deleteExternalDataSource: ExternalDataSource;
  deleteExternalDataSourceUpdateConfig: ExternalDataSourceUpdateConfig;
  disableUpdateConfig: ExternalDataSourceUpdateConfig;
  enableUpdateConfig: ExternalDataSourceUpdateConfig;
  refreshWebhook: ExternalDataSourceUpdateConfig;
  /**
   * Register user with fields defined in the settings. If the email field of
   *     the user model is part of the registration fields (default), check if there
   *     is no user with that email.
   *
   *     If it exists, it does not register the user, even if the email field
   *     is not defined as unique (default of the default django user model).
   *
   *     When creating the user, it also creates a `UserStatus` related to
   *     that user, making it possible to track if the user is archived /
   *     verified.
   *
   *     Send account verification email.
   *
   *     If allowed to not verified users login, return token.
   *
   */
  register: MutationNormalOutput;
  /**
   * Sends activation email.
   *
   *     It is called resend because theoretically the first activation email
   *     was sent when the user registered.
   *
   *     If there is no user with the requested email, a successful response
   *     is returned.
   *
   */
  resendActivationEmail: MutationNormalOutput;
  /**
   * Obtain JSON web token for given user.
   *
   *     Allow to perform login with different fields, The fields are defined
   *     on settings.
   *
   *     Not verified users can log in by default. This can be changes on
   *     settings.
   *
   *     If user is archived, make it unarchived and return
   *     `unarchiving=True` on OutputBase.
   *
   */
  tokenAuth: ObtainJsonWebTokenType;
  updateAirtableSource: AirtableSource;
  updateAll: ExternalDataSourceUpdateConfig;
  updateExternalDataSource: ExternalDataSource;
  updateExternalDataSourceUpdateConfig: ExternalDataSourceUpdateConfig;
  updateOrganisation: Organisation;
  /**
   * Verify user account.
   *
   *     Receive the token that was sent by email. If the token is valid,
   *     make the user verified by making the `user.status.verified` field
   *     true.
   *
   */
  verifyAccount: MutationNormalOutput;
};


export type MutationCreateAirtableSourceArgs = {
  data: AirtableSourceInput;
};


export type MutationCreateExternalDataSourceUpdateConfigArgs = {
  data: ExternalDataSourceUpdateConfigInput;
};


export type MutationCreateOrganisationArgs = {
  input: CreateOrganisationInput;
};


export type MutationDeleteAirtableSourceArgs = {
  data: Scalars['String']['input'];
};


export type MutationDeleteExternalDataSourceArgs = {
  data: IdObject;
};


export type MutationDeleteExternalDataSourceUpdateConfigArgs = {
  data: NodeInput;
};


export type MutationDisableUpdateConfigArgs = {
  configId: Scalars['String']['input'];
};


export type MutationEnableUpdateConfigArgs = {
  configId: Scalars['String']['input'];
};


export type MutationRefreshWebhookArgs = {
  configId: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password1: Scalars['String']['input'];
  password2: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationResendActivationEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationTokenAuthArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateAirtableSourceArgs = {
  data: AirtableSourceInput;
};


export type MutationUpdateAllArgs = {
  configId: Scalars['String']['input'];
};


export type MutationUpdateExternalDataSourceArgs = {
  data: ExternalDataSourceInput;
};


export type MutationUpdateExternalDataSourceUpdateConfigArgs = {
  data: ExternalDataSourceUpdateConfigInput;
};


export type MutationUpdateOrganisationArgs = {
  data: OrganisationInputPartial;
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String']['input'];
};

export type MutationNormalOutput = {
  __typename?: 'MutationNormalOutput';
  errors?: Maybe<Scalars['ExpectedError']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Input of an object that implements the `Node` interface. */
export type NodeInput = {
  id: Scalars['GlobalID']['input'];
};

/**
 *
 *     encapsulates token data, and refresh token data if `JWT_LONG_RUNNING_REFRESH_TOKEN` is on.
 *     with an output interface.
 *
 */
export type ObtainJsonWebTokenType = OutputInterface & {
  __typename?: 'ObtainJSONWebTokenType';
  errors?: Maybe<Scalars['ExpectedError']['output']>;
  refreshToken?: Maybe<RefreshTokenType>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<TokenType>;
  user?: Maybe<UserType>;
};

export type OffsetPaginationInput = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type OneToManyInput = {
  set?: InputMaybe<Scalars['ID']['input']>;
};

/** Organisation(id, slug, name, description, website, logo) */
export type Organisation = {
  __typename?: 'Organisation';
  externalDataSources: Array<ExternalDataSource>;
  id: Scalars['ID']['output'];
  members: Array<Membership>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

/** Organisation(id, slug, name, description, website, logo) */
export type OrganisationInputPartial = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type OutputInterface = {
  errors?: Maybe<Scalars['ExpectedError']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  airtableSource: AirtableSource;
  airtableSources: Array<AirtableSource>;
  event: QueueJob;
  externalDataSource: ExternalDataSource;
  externalDataSourceUpdateConfig: ExternalDataSourceUpdateConfig;
  externalDataSourceUpdateConfigs: Array<ExternalDataSourceUpdateConfig>;
  externalDataSources: Array<ExternalDataSource>;
  jobs: Array<QueueJob>;
  me: UserType;
  memberships: Array<Membership>;
  organisations: Array<Organisation>;
  /** Returns the current user if he is not anonymous. */
  publicUser?: Maybe<UserType>;
  testAirtableSource: Scalars['Boolean']['output'];
};


export type QueryAirtableSourceArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryEventArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryExternalDataSourceArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryExternalDataSourceUpdateConfigArgs = {
  pk: Scalars['ID']['input'];
};


export type QueryJobsArgs = {
  filters?: InputMaybe<QueueFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};


export type QueryTestAirtableSourceArgs = {
  apiKey: Scalars['String']['input'];
  baseId: Scalars['String']['input'];
  tableId: Scalars['String']['input'];
};

/** ProcrastinateEvent(id, job, type, at) */
export type QueueEvent = {
  __typename?: 'QueueEvent';
  at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  job: QueueJob;
  type: Scalars['String']['output'];
};

/** ProcrastinateJob(id, queue_name, task_name, lock, args, status, scheduled_at, attempts, queueing_lock) */
export type QueueFilter = {
  AND?: InputMaybe<QueueFilter>;
  NOT?: InputMaybe<QueueFilter>;
  OR?: InputMaybe<QueueFilter>;
  attempts?: InputMaybe<IntFilterLookup>;
  configId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<IdFilterLookup>;
  queueName?: InputMaybe<StrFilterLookup>;
  scheduledAt?: InputMaybe<DatetimeFilterLookup>;
  status?: InputMaybe<StrFilterLookup>;
  taskName?: InputMaybe<StrFilterLookup>;
};

/** ProcrastinateJob(id, queue_name, task_name, lock, args, status, scheduled_at, attempts, queueing_lock) */
export type QueueJob = {
  __typename?: 'QueueJob';
  args: Scalars['JSON']['output'];
  attempts: Scalars['Int']['output'];
  events: Array<QueueEvent>;
  id: Scalars['ID']['output'];
  lastEventAt: Scalars['DateTime']['output'];
  lock?: Maybe<Scalars['String']['output']>;
  queueName: Scalars['String']['output'];
  queueingLock?: Maybe<Scalars['String']['output']>;
  scheduledAt?: Maybe<Scalars['DateTime']['output']>;
  status: Scalars['String']['output'];
  taskName: Scalars['String']['output'];
};

/**
 *
 * Refresh token can be used to obtain a new token instead of log in again
 * when the token expires.
 *
 * *This is only used if `JWT_LONG_RUNNING_REFRESH_TOKEN` is set to True.*
 *
 */
export type RefreshTokenType = {
  __typename?: 'RefreshTokenType';
  created: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  isExpired: Scalars['Boolean']['output'];
  revoked?: Maybe<Scalars['DateTime']['output']>;
  /** randomly generated token that is attached to a FK user. */
  token: Scalars['String']['output'];
};

export type StrFilterLookup = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  exact?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iContains?: InputMaybe<Scalars['String']['input']>;
  iEndsWith?: InputMaybe<Scalars['String']['input']>;
  iExact?: InputMaybe<Scalars['String']['input']>;
  iRegex?: InputMaybe<Scalars['String']['input']>;
  iStartsWith?: InputMaybe<Scalars['String']['input']>;
  inList?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  range?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/**
 *
 * the data that was used to create the token.
 *
 */
export type TokenPayloadType = {
  __typename?: 'TokenPayloadType';
  /** when the token will be expired */
  exp: Scalars['DateTime']['output'];
  /** when the token was created */
  origIat: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

/**
 *
 * encapsulates the token with the payload that was used to create the token.
 *
 */
export type TokenType = {
  __typename?: 'TokenType';
  payload: TokenPayloadType;
  /** The encoded payload, namely a token. */
  token: Scalars['String']['output'];
};

export type UpdateConfigDict = {
  __typename?: 'UpdateConfigDict';
  destinationColumn: Scalars['String']['output'];
  source: Scalars['String']['output'];
  sourcePath: Scalars['String']['output'];
};

export type UpdateConfigDictInput = {
  destinationColumn: Scalars['String']['input'];
  source: Scalars['String']['input'];
  sourcePath: Scalars['String']['input'];
};

/**
 * Users within the Django authentication system are represented by this
 * model.
 *
 * Username and password are required. Other fields are optional.
 */
export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  userProperties: UserProperties;
};

/** UserProperties(id, user, organisation_name, full_name, email_confirmed, account_confirmed, last_seen, agreed_terms) */
export type UserProperties = {
  __typename?: 'UserProperties';
  fullName?: Maybe<Scalars['String']['output']>;
  user: User;
};

/** A helper model that handles user account stuff. */
export type UserStatusType = {
  __typename?: 'UserStatusType';
  archived: Scalars['Boolean']['output'];
  verified: Scalars['Boolean']['output'];
};

/**
 * Users within the Django authentication system are represented by this
 * model.
 *
 * Username and password are required. Other fields are optional.
 */
export type UserType = {
  __typename?: 'UserType';
  archived: Scalars['Boolean']['output'];
  dateJoined: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean']['output'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean']['output'];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  logentrySet: Array<DjangoModelType>;
  status: UserStatusType;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type ExampleQueryVariables = Exact<{ [key: string]: never; }>;


export type ExampleQuery = { __typename?: 'Query', organisations: Array<{ __typename?: 'Organisation', id: string, name: string }> };

export type VerifyMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyMutation = { __typename?: 'Mutation', verifyAccount: { __typename?: 'MutationNormalOutput', errors?: any | null, success: boolean } };

export type ListUpdateConfigsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUpdateConfigsQuery = { __typename?: 'Query', externalDataSourceUpdateConfigs: Array<{ __typename?: 'ExternalDataSourceUpdateConfig', id: any, enabled: boolean, externalDataSource: { __typename?: 'ExternalDataSource', id: any, name?: string | null, connectionDetails: { __typename?: 'AirtableSource', crmType: 'AirtableSource' } }, jobs: Array<{ __typename?: 'QueueJob', lastEventAt: any, status: string }>, mapping: Array<{ __typename?: 'UpdateConfigDict', source: string, sourcePath: string, destinationColumn: string }> }> };

export type PageForExternalDataSourceUpdateConfigQueryVariables = Exact<{
  ID: Scalars['ID']['input'];
}>;


export type PageForExternalDataSourceUpdateConfigQuery = { __typename?: 'Query', externalDataSourceUpdateConfig: { __typename?: 'ExternalDataSourceUpdateConfig', id: any, enabled: boolean, postcodeColumn?: string | null, externalDataSource: { __typename?: 'ExternalDataSource', id: any, name?: string | null, connectionDetails: { __typename?: 'AirtableSource', crmType: 'AirtableSource' } }, jobs: Array<{ __typename?: 'QueueJob', status: string, id: string, taskName: string, args: any, lastEventAt: any }>, mapping: Array<{ __typename?: 'UpdateConfigDict', source: string, sourcePath: string, destinationColumn: string }> } };

export type UpdateSourceMutationVariables = Exact<{
  config: ExternalDataSourceInput;
}>;


export type UpdateSourceMutation = { __typename?: 'Mutation', updateExternalDataSource: { __typename?: 'ExternalDataSource', id: any, name?: string | null } };

export type UpdateConfigMutationVariables = Exact<{
  config: ExternalDataSourceUpdateConfigInput;
}>;


export type UpdateConfigMutation = { __typename?: 'Mutation', updateExternalDataSourceUpdateConfig: { __typename?: 'ExternalDataSourceUpdateConfig', id: any, postcodeColumn?: string | null, mapping: Array<{ __typename?: 'UpdateConfigDict', source: string, sourcePath: string, destinationColumn: string }> } };

export type DeleteSourceMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSourceMutation = { __typename?: 'Mutation', deleteExternalDataSource: { __typename?: 'ExternalDataSource', id: any } };

export type CheckIfSourceHasConfigQueryVariables = Exact<{
  ID: Scalars['ID']['input'];
}>;


export type CheckIfSourceHasConfigQuery = { __typename?: 'Query', externalDataSource: { __typename?: 'ExternalDataSource', id: any, updateConfigs: Array<{ __typename?: 'ExternalDataSourceUpdateConfig', id: any }> } };

export type CreateUpdateConfigMutationVariables = Exact<{
  config: ExternalDataSourceUpdateConfigInput;
}>;


export type CreateUpdateConfigMutation = { __typename?: 'Mutation', createExternalDataSourceUpdateConfig: { __typename?: 'ExternalDataSourceUpdateConfig', id: any, postcodeColumn?: string | null, mapping: Array<{ __typename?: 'UpdateConfigDict', destinationColumn: string, source: string, sourcePath: string }> } };

export type TestAirtableSourceQueryVariables = Exact<{
  apiKey: Scalars['String']['input'];
  baseId: Scalars['String']['input'];
  tableId: Scalars['String']['input'];
}>;


export type TestAirtableSourceQuery = { __typename?: 'Query', testAirtableSource: boolean };

export type CreateAirtableSourceMutationVariables = Exact<{
  AirtableSource: AirtableSourceInput;
}>;


export type CreateAirtableSourceMutation = { __typename?: 'Mutation', createAirtableSource: { __typename?: 'AirtableSource', id: any, name?: string | null, healthcheck: boolean } };

export type AllExternalDataSourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllExternalDataSourcesQuery = { __typename?: 'Query', externalDataSources: Array<{ __typename?: 'ExternalDataSource', id: any, name?: string | null, createdAt: any, connectionDetails: { __typename?: 'AirtableSource', baseId: string, tableId: string, crmType: 'AirtableSource' }, updateConfigs: Array<{ __typename?: 'ExternalDataSourceUpdateConfig', id: any, enabled: boolean }> }> };

export type PageForExternalDataSourceUpdateConfigReviewQueryVariables = Exact<{
  ID: Scalars['ID']['input'];
}>;


export type PageForExternalDataSourceUpdateConfigReviewQuery = { __typename?: 'Query', externalDataSourceUpdateConfig: { __typename?: 'ExternalDataSourceUpdateConfig', id: any, enabled: boolean, externalDataSource: { __typename?: 'ExternalDataSource', id: any, name?: string | null, connectionDetails: { __typename?: 'AirtableSource', crmType: 'AirtableSource' } }, jobs: Array<{ __typename?: 'QueueJob', lastEventAt: any, status: string }> } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', tokenAuth: { __typename?: 'ObtainJSONWebTokenType', errors?: any | null, success: boolean, token?: { __typename?: 'TokenType', token: string, payload: { __typename?: 'TokenPayloadType', exp: any } } | null } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password1: Scalars['String']['input'];
  password2: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'MutationNormalOutput', errors?: any | null, success: boolean } };

export type UpdateConfigCardFieldsFragment = { __typename?: 'ExternalDataSourceUpdateConfig', id: any, enabled: boolean, externalDataSource: { __typename?: 'ExternalDataSource', id: any, name?: string | null, connectionDetails: { __typename?: 'AirtableSource', crmType: 'AirtableSource' } }, jobs: Array<{ __typename?: 'QueueJob', lastEventAt: any, status: string }> } & { ' $fragmentName'?: 'UpdateConfigCardFieldsFragment' };

export type ExternalDataSourceUpdateConfigCardQueryVariables = Exact<{
  ID: Scalars['ID']['input'];
}>;


export type ExternalDataSourceUpdateConfigCardQuery = { __typename?: 'Query', externalDataSourceUpdateConfig: (
    { __typename?: 'ExternalDataSourceUpdateConfig' }
    & { ' $fragmentRefs'?: { 'UpdateConfigCardFieldsFragment': UpdateConfigCardFieldsFragment } }
  ) };

export type EnableUpdateConfigMutationVariables = Exact<{
  ID: Scalars['String']['input'];
}>;


export type EnableUpdateConfigMutation = { __typename?: 'Mutation', enableUpdateConfig: { __typename?: 'ExternalDataSourceUpdateConfig', id: any, enabled: boolean, externalDataSource: { __typename?: 'ExternalDataSource', id: any, name?: string | null, connectionDetails: { __typename?: 'AirtableSource', crmType: 'AirtableSource' } } } };

export type DisableUpdateConfigMutationVariables = Exact<{
  ID: Scalars['String']['input'];
}>;


export type DisableUpdateConfigMutation = { __typename?: 'Mutation', disableUpdateConfig: { __typename?: 'ExternalDataSourceUpdateConfig', id: any, enabled: boolean, externalDataSource: { __typename?: 'ExternalDataSource', id: any, name?: string | null, connectionDetails: { __typename?: 'AirtableSource', crmType: 'AirtableSource' } } } };

export type TriggerFullUpdateMutationVariables = Exact<{
  configId: Scalars['String']['input'];
}>;


export type TriggerFullUpdateMutation = { __typename?: 'Mutation', updateAll: { __typename?: 'ExternalDataSourceUpdateConfig', id: any, jobs: Array<{ __typename?: 'QueueJob', status: string, id: string, taskName: string, args: any, lastEventAt: any }>, externalDataSource: { __typename?: 'ExternalDataSource', id: any, name?: string | null, connectionDetails: { __typename?: 'AirtableSource', crmType: 'AirtableSource' } } } };

export type PublicUserQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicUserQuery = { __typename?: 'Query', publicUser?: { __typename?: 'UserType', id: string, username: string, email: string } | null };

export const UpdateConfigCardFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpdateConfigCardFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExternalDataSourceUpdateConfig"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"externalDataSource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"crmType"},"name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastEventAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateConfigCardFieldsFragment, unknown>;
export const ExampleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Example"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organisations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ExampleQuery, ExampleQueryVariables>;
export const VerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<VerifyMutation, VerifyMutationVariables>;
export const ListUpdateConfigsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListUpdateConfigs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalDataSourceUpdateConfigs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"externalDataSource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"crmType"},"name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastEventAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mapping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"sourcePath"}},{"kind":"Field","name":{"kind":"Name","value":"destinationColumn"}}]}}]}}]}}]} as unknown as DocumentNode<ListUpdateConfigsQuery, ListUpdateConfigsQueryVariables>;
export const PageForExternalDataSourceUpdateConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PageForExternalDataSourceUpdateConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalDataSourceUpdateConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"externalDataSource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"crmType"},"name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskName"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"lastEventAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"postcodeColumn"}},{"kind":"Field","name":{"kind":"Name","value":"mapping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"sourcePath"}},{"kind":"Field","name":{"kind":"Name","value":"destinationColumn"}}]}}]}}]}}]} as unknown as DocumentNode<PageForExternalDataSourceUpdateConfigQuery, PageForExternalDataSourceUpdateConfigQueryVariables>;
export const UpdateSourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"config"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExternalDataSourceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExternalDataSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"config"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateSourceMutation, UpdateSourceMutationVariables>;
export const UpdateConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"config"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExternalDataSourceUpdateConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExternalDataSourceUpdateConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"config"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postcodeColumn"}},{"kind":"Field","name":{"kind":"Name","value":"mapping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"sourcePath"}},{"kind":"Field","name":{"kind":"Name","value":"destinationColumn"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateConfigMutation, UpdateConfigMutationVariables>;
export const DeleteSourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExternalDataSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSourceMutation, DeleteSourceMutationVariables>;
export const CheckIfSourceHasConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckIfSourceHasConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalDataSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updateConfigs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CheckIfSourceHasConfigQuery, CheckIfSourceHasConfigQueryVariables>;
export const CreateUpdateConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUpdateConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"config"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExternalDataSourceUpdateConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExternalDataSourceUpdateConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"config"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postcodeColumn"}},{"kind":"Field","name":{"kind":"Name","value":"mapping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"destinationColumn"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"sourcePath"}}]}}]}}]}}]} as unknown as DocumentNode<CreateUpdateConfigMutation, CreateUpdateConfigMutationVariables>;
export const TestAirtableSourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestAirtableSource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"apiKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"baseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tableId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testAirtableSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"apiKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"apiKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"baseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"baseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tableId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tableId"}}}]}]}}]} as unknown as DocumentNode<TestAirtableSourceQuery, TestAirtableSourceQueryVariables>;
export const CreateAirtableSourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAirtableSource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"AirtableSource"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AirtableSourceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAirtableSource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"AirtableSource"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"healthcheck"}}]}}]}}]} as unknown as DocumentNode<CreateAirtableSourceMutation, CreateAirtableSourceMutationVariables>;
export const AllExternalDataSourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllExternalDataSources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalDataSources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"crmType"},"name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AirtableSource"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseId"}},{"kind":"Field","name":{"kind":"Name","value":"tableId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updateConfigs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}}]}}]}}]}}]} as unknown as DocumentNode<AllExternalDataSourcesQuery, AllExternalDataSourcesQueryVariables>;
export const PageForExternalDataSourceUpdateConfigReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PageForExternalDataSourceUpdateConfigReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalDataSourceUpdateConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"externalDataSource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"crmType"},"name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastEventAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<PageForExternalDataSourceUpdateConfigReviewQuery, PageForExternalDataSourceUpdateConfigReviewQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"payload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exp"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password1"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password1"}}},{"kind":"Argument","name":{"kind":"Name","value":"password2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password2"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ExternalDataSourceUpdateConfigCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExternalDataSourceUpdateConfigCard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalDataSourceUpdateConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UpdateConfigCardFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpdateConfigCardFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExternalDataSourceUpdateConfig"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"externalDataSource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"crmType"},"name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastEventAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ExternalDataSourceUpdateConfigCardQuery, ExternalDataSourceUpdateConfigCardQueryVariables>;
export const EnableUpdateConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnableUpdateConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enableUpdateConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"configId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"externalDataSource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"crmType"},"name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EnableUpdateConfigMutation, EnableUpdateConfigMutationVariables>;
export const DisableUpdateConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisableUpdateConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableUpdateConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"configId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"externalDataSource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"crmType"},"name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DisableUpdateConfigMutation, DisableUpdateConfigMutationVariables>;
export const TriggerFullUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TriggerFullUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"configId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"configId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"configId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskName"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"lastEventAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"externalDataSource"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"connectionDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"crmType"},"name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TriggerFullUpdateMutation, TriggerFullUpdateMutationVariables>;
export const PublicUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<PublicUserQuery, PublicUserQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "OutputInterface": [
      "ObtainJSONWebTokenType"
    ]
  }
};
      export default result;
    