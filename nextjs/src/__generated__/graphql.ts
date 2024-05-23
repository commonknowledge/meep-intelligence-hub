/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date (isoformat) */
  Date: { input: any; output: any };
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any };
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
  ExpectedError: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  UUID: { input: any; output: any };
  /** Represents NULL values */
  Void: { input: any; output: any };
};

/** A model to store generated and revoked JWT tokens. */
export type ApiToken = {
  __typename?: "APIToken";
  createdAt: Scalars["DateTime"]["output"];
  expiresAt: Scalars["DateTime"]["output"];
  revoked: Scalars["Boolean"]["output"];
  signature: Scalars["ID"]["output"];
  token: Scalars["String"]["output"];
};

/** An Airtable table. */
export type AirtableSource = Analytics & {
  __typename?: "AirtableSource";
  addressField?: Maybe<Scalars["String"]["output"]>;
  /** Personal access token. Requires the following 4 scopes: data.records:read, data.records:write, schema.bases:read, webhook:manage */
  apiKey: Scalars["String"]["output"];
  autoImportEnabled: Scalars["Boolean"]["output"];
  autoUpdateEnabled: Scalars["Boolean"]["output"];
  autoUpdateWebhookUrl: Scalars["String"]["output"];
  baseId: Scalars["String"]["output"];
  connectionDetails: AirtableSourceMailchimpSource;
  createdAt: Scalars["DateTime"]["output"];
  crmType: Scalars["String"]["output"];
  dataType: DataSourceType;
  description?: Maybe<Scalars["String"]["output"]>;
  emailField?: Maybe<Scalars["String"]["output"]>;
  fieldDefinitions?: Maybe<Array<FieldDefinition>>;
  firstNameField?: Maybe<Scalars["String"]["output"]>;
  fullNameField?: Maybe<Scalars["String"]["output"]>;
  geographyColumn?: Maybe<Scalars["String"]["output"]>;
  geographyColumnType: PostcodesIoGeographyTypes;
  healthcheck: Scalars["Boolean"]["output"];
  id: Scalars["UUID"]["output"];
  importProgress?: Maybe<BatchJobProgress>;
  importedDataCount: Scalars["Int"]["output"];
  importedDataCountByConstituency: Array<GroupedDataCount>;
  importedDataCountByConstituency2024: Array<GroupedDataCount>;
  importedDataCountByConstituencyBySource: Array<GroupedDataCountWithBreakdown>;
  importedDataCountByCouncil: Array<GroupedDataCount>;
  importedDataCountByRegion: Array<GroupedDataCount>;
  importedDataCountByWard: Array<GroupedDataCount>;
  importedDataCountForConstituency?: Maybe<GroupedDataCount>;
  importedDataCountForConstituency2024?: Maybe<GroupedDataCount>;
  isImportScheduled: Scalars["Boolean"]["output"];
  isUpdateScheduled: Scalars["Boolean"]["output"];
  jobs: Array<QueueJob>;
  lastJob?: Maybe<QueueJob>;
  lastNameField?: Maybe<Scalars["String"]["output"]>;
  lastUpdate: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  organisation: Organisation;
  organisationId: Scalars["String"]["output"];
  orgsWithAccess: Array<Organisation>;
  phoneField?: Maybe<Scalars["String"]["output"]>;
  postcodeField?: Maybe<Scalars["String"]["output"]>;
  recordUrlTemplate?: Maybe<Scalars["String"]["output"]>;
  remoteName?: Maybe<Scalars["String"]["output"]>;
  remoteUrl?: Maybe<Scalars["String"]["output"]>;
  sharingPermissions: Array<SharingPermission>;
  tableId: Scalars["String"]["output"];
  updateMapping?: Maybe<Array<AutoUpdateConfig>>;
  updateProgress?: Maybe<BatchJobProgress>;
  webhookHealthcheck: Scalars["Boolean"]["output"];
};

/** An Airtable table. */
export type AirtableSourceImportedDataCountByConstituencyBySourceArgs = {
  gss: Scalars["String"]["input"];
};

/** An Airtable table. */
export type AirtableSourceImportedDataCountForConstituencyArgs = {
  gss: Scalars["String"]["input"];
};

/** An Airtable table. */
export type AirtableSourceImportedDataCountForConstituency2024Args = {
  gss: Scalars["String"]["input"];
};

/** An Airtable table. */
export type AirtableSourceOrgsWithAccessArgs = {
  filters?: InputMaybe<OrganisationFilters>;
};

/** An Airtable table. */
export type AirtableSourceInput = {
  addressField?: InputMaybe<Scalars["String"]["input"]>;
  /** Personal access token. Requires the following 4 scopes: data.records:read, data.records:write, schema.bases:read, webhook:manage */
  apiKey?: InputMaybe<Scalars["String"]["input"]>;
  autoImportEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  autoUpdateEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  baseId?: InputMaybe<Scalars["String"]["input"]>;
  dataType?: InputMaybe<DataSourceType>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  emailField?: InputMaybe<Scalars["String"]["input"]>;
  firstNameField?: InputMaybe<Scalars["String"]["input"]>;
  fullNameField?: InputMaybe<Scalars["String"]["input"]>;
  geographyColumn?: InputMaybe<Scalars["String"]["input"]>;
  geographyColumnType?: InputMaybe<PostcodesIoGeographyTypes>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  lastNameField?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organisation?: InputMaybe<OneToManyInput>;
  phoneField?: InputMaybe<Scalars["String"]["input"]>;
  postcodeField?: InputMaybe<Scalars["String"]["input"]>;
  tableId?: InputMaybe<Scalars["String"]["input"]>;
  updateMapping?: InputMaybe<Array<UpdateMappingItemInput>>;
};

export type AirtableSourceMailchimpSource = AirtableSource | MailchimpSource;

export type Analytics = {
  importedDataCount: Scalars["Int"]["output"];
  importedDataCountByConstituency: Array<GroupedDataCount>;
  importedDataCountByConstituency2024: Array<GroupedDataCount>;
  importedDataCountByConstituencyBySource: Array<GroupedDataCountWithBreakdown>;
  importedDataCountByCouncil: Array<GroupedDataCount>;
  importedDataCountByRegion: Array<GroupedDataCount>;
  importedDataCountByWard: Array<GroupedDataCount>;
  importedDataCountForConstituency?: Maybe<GroupedDataCount>;
  importedDataCountForConstituency2024?: Maybe<GroupedDataCount>;
};

export type AnalyticsImportedDataCountByConstituencyBySourceArgs = {
  gss: Scalars["String"]["input"];
};

export type AnalyticsImportedDataCountForConstituencyArgs = {
  gss: Scalars["String"]["input"];
};

export type AnalyticsImportedDataCountForConstituency2024Args = {
  gss: Scalars["String"]["input"];
};

/** Area(id, mapit_id, gss, name, area_type, geometry, polygon, point) */
export type Area = {
  __typename?: "Area";
  areaType: AreaType;
  data: Array<AreaData>;
  datum?: Maybe<AreaData>;
  fitBounds?: Maybe<Scalars["JSON"]["output"]>;
  geometry?: Maybe<Scalars["String"]["output"]>;
  gss: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lastElection?: Maybe<ConstituencyElectionResult>;
  mapitId: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  overlaps: Array<DjangoModelType>;
  people: Array<Person>;
  person?: Maybe<Person>;
  point?: Maybe<PointFeature>;
  polygon?: Maybe<MultiPolygonFeature>;
};

/** Area(id, mapit_id, gss, name, area_type, geometry, polygon, point) */
export type AreaDataArgs = {
  filters?: InputMaybe<CommonDataLoaderFilter>;
};

/** Area(id, mapit_id, gss, name, area_type, geometry, polygon, point) */
export type AreaDatumArgs = {
  filters?: InputMaybe<CommonDataLoaderFilter>;
};

/** Area(id, mapit_id, gss, name, area_type, geometry, polygon, point) */
export type AreaPeopleArgs = {
  filters?: InputMaybe<PersonFilter>;
};

/** Area(id, mapit_id, gss, name, area_type, geometry, polygon, point) */
export type AreaPersonArgs = {
  filters?: InputMaybe<PersonFilter>;
};

/** Area(id, mapit_id, gss, name, area_type, geometry, polygon, point) */
export type AreaPointArgs = {
  withParentData?: Scalars["Boolean"]["input"];
};

/** Area(id, mapit_id, gss, name, area_type, geometry, polygon, point) */
export type AreaPolygonArgs = {
  withParentData?: Scalars["Boolean"]["input"];
};

/** AreaData(id, data_type, data, date, float, int, json, area) */
export type AreaData = CommonData & {
  __typename?: "AreaData";
  area: Area;
  data: Scalars["String"]["output"];
  dataType: DataType;
  date?: Maybe<Scalars["DateTime"]["output"]>;
  float?: Maybe<Scalars["Float"]["output"]>;
  id: Scalars["ID"]["output"];
  int?: Maybe<Scalars["Int"]["output"]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
  shade?: Maybe<Scalars["String"]["output"]>;
};

/** AreaType(id, name, code, area_type, description) */
export type AreaType = {
  __typename?: "AreaType";
  areaType: Scalars["String"]["output"];
  code: Scalars["String"]["output"];
  dataTypes: Array<DataType>;
  description: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type AutoUpdateConfig = {
  __typename?: "AutoUpdateConfig";
  destinationColumn: Scalars["String"]["output"];
  source: Scalars["String"]["output"];
  sourcePath: Scalars["String"]["output"];
};

export type BatchJobProgress = {
  __typename?: "BatchJobProgress";
  doing: Scalars["Int"]["output"];
  done: Scalars["Int"]["output"];
  estimatedFinishTime: Scalars["DateTime"]["output"];
  estimatedSecondsRemaining: Scalars["Float"]["output"];
  failed: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  remaining: Scalars["Int"]["output"];
  secondsPerRecord: Scalars["Float"]["output"];
  startedAt: Scalars["DateTime"]["output"];
  status: ProcrastinateJobStatus;
  succeeded: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type CommonData = {
  data: Scalars["String"]["output"];
  dataType: DataType;
  date?: Maybe<Scalars["DateTime"]["output"]>;
  float?: Maybe<Scalars["Float"]["output"]>;
  int?: Maybe<Scalars["Int"]["output"]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
  shade?: Maybe<Scalars["String"]["output"]>;
};

export type CommonDataLoaderFilter = {
  dataType_Name: Scalars["String"]["input"];
};

export type ConstituencyElectionResult = {
  __typename?: "ConstituencyElectionResult";
  date: Scalars["String"]["output"];
  results: Array<PartyResult>;
  stats: ConstituencyElectionStats;
};

export type ConstituencyElectionStats = {
  __typename?: "ConstituencyElectionStats";
  constituencyName: Scalars["String"]["output"];
  constituencyType: Scalars["String"]["output"];
  countryName: Scalars["String"]["output"];
  countyName: Scalars["String"]["output"];
  date: Scalars["String"]["output"];
  declarationTime: Scalars["String"]["output"];
  electorate: Scalars["Int"]["output"];
  firstParty: Scalars["String"]["output"];
  firstPartyResult: PartyResult;
  invalidVotes: Scalars["Int"]["output"];
  majority: Scalars["Int"]["output"];
  memberFirstName: Scalars["String"]["output"];
  memberGender: Scalars["String"]["output"];
  memberSurname: Scalars["String"]["output"];
  onsRegionId: Scalars["String"]["output"];
  regionName: Scalars["String"]["output"];
  result: Scalars["String"]["output"];
  secondParty: Scalars["String"]["output"];
  secondPartyResult: PartyResult;
  validVotes: Scalars["Int"]["output"];
};

export type CreateExternalDataSourceInput = {
  airtable?: InputMaybe<AirtableSourceInput>;
  mailchimp?: InputMaybe<MailChimpSourceInput>;
};

export type CreateExternalDataSourceOutput = {
  __typename?: "CreateExternalDataSourceOutput";
  code: Scalars["Int"]["output"];
  errors: Array<MutationError>;
  result?: Maybe<ExternalDataSource>;
};

export type CreateMapReportPayload = MapReport | OperationInfo;

export type CreateOrganisationInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

/** DataSet(id, name, description, label, data_type, last_update, source_label, source, source_type, data_url, release_date, is_upload, is_range, featured, order, category, subcategory, table, comparators, options, default_value, is_filterable, is_shadable, is_public, fill_blanks, exclude_countries, unit_type, unit_distribution, external_data_source) */
export type DataSet = {
  __typename?: "DataSet";
  areasAvailable: Array<DjangoModelType>;
  category?: Maybe<Scalars["String"]["output"]>;
  dataType: DataType;
  dataUrl?: Maybe<Scalars["String"]["output"]>;
  defaultValue?: Maybe<Scalars["String"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  externalDataSource: ExternalDataSource;
  featured: Scalars["Boolean"]["output"];
  fillBlanks: Scalars["Boolean"]["output"];
  id: Scalars["ID"]["output"];
  isFilterable: Scalars["Boolean"]["output"];
  isPublic: Scalars["Boolean"]["output"];
  isRange: Scalars["Boolean"]["output"];
  isShadable: Scalars["Boolean"]["output"];
  isUpload: Scalars["Boolean"]["output"];
  label?: Maybe<Scalars["String"]["output"]>;
  lastUpdate: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  options: Array<DataSetOption>;
  order?: Maybe<Scalars["Int"]["output"]>;
  releaseDate?: Maybe<Scalars["String"]["output"]>;
  source: Scalars["String"]["output"];
  sourceLabel?: Maybe<Scalars["String"]["output"]>;
  sourceType?: Maybe<Scalars["String"]["output"]>;
  subcategory?: Maybe<Scalars["String"]["output"]>;
  table?: Maybe<Scalars["String"]["output"]>;
  unitDistribution?: Maybe<Scalars["String"]["output"]>;
  unitType?: Maybe<Scalars["String"]["output"]>;
};

export type DataSetOption = {
  __typename?: "DataSetOption";
  shader: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export enum DataSourceType {
  Member = "MEMBER",
  Other = "OTHER",
  Region = "REGION",
}

/** DataType(id, data_set, name, data_type, last_update, average, maximum, minimum, label, description, order, area_type, auto_converted, auto_converted_text) */
export type DataType = {
  __typename?: "DataType";
  areaType?: Maybe<DjangoModelType>;
  /** True if this has been auto converted from an area with overlapping geometry */
  autoConverted: Scalars["Boolean"]["output"];
  autoConvertedText?: Maybe<Scalars["String"]["output"]>;
  average?: Maybe<Scalars["Float"]["output"]>;
  dataSet: DataSet;
  dataType: Scalars["String"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  label?: Maybe<Scalars["String"]["output"]>;
  lastUpdate: Scalars["DateTime"]["output"];
  maximum?: Maybe<Scalars["Float"]["output"]>;
  minimum?: Maybe<Scalars["Float"]["output"]>;
  name: Scalars["String"]["output"];
  order?: Maybe<Scalars["Int"]["output"]>;
};

export type DatetimeFilterLookup = {
  contains?: InputMaybe<Scalars["DateTime"]["input"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
  exact?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  iContains?: InputMaybe<Scalars["DateTime"]["input"]>;
  iEndsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
  iExact?: InputMaybe<Scalars["DateTime"]["input"]>;
  iRegex?: InputMaybe<Scalars["String"]["input"]>;
  iStartsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
  inList?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  range?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  regex?: InputMaybe<Scalars["String"]["input"]>;
  startsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type DjangoImageType = {
  __typename?: "DjangoImageType";
  height: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  path: Scalars["String"]["output"];
  size: Scalars["Int"]["output"];
  url: Scalars["String"]["output"];
  width: Scalars["Int"]["output"];
};

export type DjangoModelType = {
  __typename?: "DjangoModelType";
  pk: Scalars["ID"]["output"];
};

export type ElectionDate = {
  __typename?: "ElectionDate";
  advanceVotingStation?: Maybe<Scalars["Void"]["output"]>;
  ballots: Array<ElectoralCommissionBallot>;
  date: Scalars["DateTime"]["output"];
  pollingStation: PollingStation;
};

export type ElectoralCommissionBallot = {
  __typename?: "ElectoralCommissionBallot";
  ballotPaperId: Scalars["String"]["output"];
  ballotTitle: Scalars["String"]["output"];
  cancellationReason?: Maybe<Scalars["Void"]["output"]>;
  cancelled: Scalars["Boolean"]["output"];
  candidates: Array<ElectoralCommissionCandidate>;
  candidatesVerified: Scalars["Boolean"]["output"];
  electedRole: Scalars["String"]["output"];
  electionId: Scalars["String"]["output"];
  electionName: Scalars["String"]["output"];
  metadata?: Maybe<Scalars["Void"]["output"]>;
  pollOpenDate: Scalars["DateTime"]["output"];
  postName: Scalars["String"]["output"];
  replacedBy?: Maybe<Scalars["Void"]["output"]>;
  replaces?: Maybe<Scalars["Void"]["output"]>;
  requiresVoterId: Scalars["String"]["output"];
  seatsContested: Scalars["Int"]["output"];
  votingSystem: ElectoralCommissionVotingSystem;
};

export type ElectoralCommissionCandidate = {
  __typename?: "ElectoralCommissionCandidate";
  party: ElectoralCommissionParty;
  person: ElectoralCommissionPerson;
};

export type ElectoralCommissionParty = {
  __typename?: "ElectoralCommissionParty";
  partyId: Scalars["String"]["output"];
  partyName: Scalars["String"]["output"];
};

export type ElectoralCommissionPerson = {
  __typename?: "ElectoralCommissionPerson";
  name: Scalars["String"]["output"];
  ynrId: Scalars["Int"]["output"];
};

export type ElectoralCommissionPostcodeLookup = {
  __typename?: "ElectoralCommissionPostcodeLookup";
  addressPicker: Scalars["Boolean"]["output"];
  addresses: Scalars["JSON"]["output"];
  dates: Array<ElectionDate>;
  electoralServices: ElectoralServices;
  postcodeLocation: ElectoralCommissionStation;
  registration: ElectoralServices;
};

export type ElectoralCommissionStation = {
  __typename?: "ElectoralCommissionStation";
  geometry: PointGeometry;
  id?: Maybe<Scalars["String"]["output"]>;
  properties?: Maybe<ElectoralCommissionStationProperties>;
  type: Scalars["String"]["output"];
};

export type ElectoralCommissionStationProperties = {
  __typename?: "ElectoralCommissionStationProperties";
  address: Scalars["String"]["output"];
  postcode: Scalars["String"]["output"];
};

export type ElectoralCommissionVotingSystem = {
  __typename?: "ElectoralCommissionVotingSystem";
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  usesPartyLists: Scalars["Boolean"]["output"];
};

export type ElectoralServices = {
  __typename?: "ElectoralServices";
  address: Scalars["String"]["output"];
  councilId: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  identifiers: Array<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  nation: Scalars["String"]["output"];
  phone: Scalars["String"]["output"];
  postcode: Scalars["String"]["output"];
  website: Scalars["String"]["output"];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type ExternalDataSource = Analytics & {
  __typename?: "ExternalDataSource";
  addressField?: Maybe<Scalars["String"]["output"]>;
  autoImportEnabled: Scalars["Boolean"]["output"];
  autoUpdateEnabled: Scalars["Boolean"]["output"];
  autoUpdateWebhookUrl: Scalars["String"]["output"];
  connectionDetails: AirtableSourceMailchimpSource;
  createdAt: Scalars["DateTime"]["output"];
  crmType: Scalars["String"]["output"];
  dataType: DataSourceType;
  description?: Maybe<Scalars["String"]["output"]>;
  emailField?: Maybe<Scalars["String"]["output"]>;
  fieldDefinitions?: Maybe<Array<FieldDefinition>>;
  firstNameField?: Maybe<Scalars["String"]["output"]>;
  fullNameField?: Maybe<Scalars["String"]["output"]>;
  geographyColumn?: Maybe<Scalars["String"]["output"]>;
  geographyColumnType: PostcodesIoGeographyTypes;
  healthcheck: Scalars["Boolean"]["output"];
  id: Scalars["UUID"]["output"];
  importProgress?: Maybe<BatchJobProgress>;
  importedDataCount: Scalars["Int"]["output"];
  importedDataCountByConstituency: Array<GroupedDataCount>;
  importedDataCountByConstituency2024: Array<GroupedDataCount>;
  importedDataCountByConstituencyBySource: Array<GroupedDataCountWithBreakdown>;
  importedDataCountByCouncil: Array<GroupedDataCount>;
  importedDataCountByRegion: Array<GroupedDataCount>;
  importedDataCountByWard: Array<GroupedDataCount>;
  importedDataCountForConstituency?: Maybe<GroupedDataCount>;
  importedDataCountForConstituency2024?: Maybe<GroupedDataCount>;
  isImportScheduled: Scalars["Boolean"]["output"];
  isUpdateScheduled: Scalars["Boolean"]["output"];
  jobs: Array<QueueJob>;
  lastJob?: Maybe<QueueJob>;
  lastNameField?: Maybe<Scalars["String"]["output"]>;
  lastUpdate: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  organisation: Organisation;
  organisationId: Scalars["String"]["output"];
  orgsWithAccess: Array<Organisation>;
  phoneField?: Maybe<Scalars["String"]["output"]>;
  postcodeField?: Maybe<Scalars["String"]["output"]>;
  recordUrlTemplate?: Maybe<Scalars["String"]["output"]>;
  remoteName?: Maybe<Scalars["String"]["output"]>;
  remoteUrl?: Maybe<Scalars["String"]["output"]>;
  sharingPermissions: Array<SharingPermission>;
  updateMapping?: Maybe<Array<AutoUpdateConfig>>;
  updateProgress?: Maybe<BatchJobProgress>;
  webhookHealthcheck: Scalars["Boolean"]["output"];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type ExternalDataSourceImportedDataCountByConstituencyBySourceArgs = {
  gss: Scalars["String"]["input"];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type ExternalDataSourceImportedDataCountForConstituencyArgs = {
  gss: Scalars["String"]["input"];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type ExternalDataSourceImportedDataCountForConstituency2024Args = {
  gss: Scalars["String"]["input"];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type ExternalDataSourceOrgsWithAccessArgs = {
  filters?: InputMaybe<OrganisationFilters>;
};

export type ExternalDataSourceAction = {
  __typename?: "ExternalDataSourceAction";
  externalDataSource: ExternalDataSource;
  id: Scalars["ID"]["output"];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type ExternalDataSourceFilter = {
  AND?: InputMaybe<ExternalDataSourceFilter>;
  NOT?: InputMaybe<ExternalDataSourceFilter>;
  OR?: InputMaybe<ExternalDataSourceFilter>;
  dataType?: InputMaybe<DataSourceType>;
  geographyColumnType?: InputMaybe<PostcodesIoGeographyTypes>;
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type ExternalDataSourceInput = {
  addressField?: InputMaybe<Scalars["String"]["input"]>;
  autoImportEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  autoUpdateEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  dataType?: InputMaybe<DataSourceType>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  emailField?: InputMaybe<Scalars["String"]["input"]>;
  firstNameField?: InputMaybe<Scalars["String"]["input"]>;
  fullNameField?: InputMaybe<Scalars["String"]["input"]>;
  geographyColumn?: InputMaybe<Scalars["String"]["input"]>;
  geographyColumnType?: InputMaybe<PostcodesIoGeographyTypes>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  lastNameField?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organisation?: InputMaybe<OneToManyInput>;
  phoneField?: InputMaybe<Scalars["String"]["input"]>;
  postcodeField?: InputMaybe<Scalars["String"]["input"]>;
  updateMapping?: InputMaybe<Array<UpdateMappingItemInput>>;
};

export type Feature = {
  id?: Maybe<Scalars["String"]["output"]>;
  type: GeoJsonTypes;
};

export type FieldDefinition = {
  __typename?: "FieldDefinition";
  description?: Maybe<Scalars["String"]["output"]>;
  externalId?: Maybe<Scalars["String"]["output"]>;
  label?: Maybe<Scalars["String"]["output"]>;
  value: Scalars["String"]["output"];
};

/** GenericData(id, data_type, data, date, float, int, json, last_update, point, polygon, postcode_data, postcode, first_name, last_name, full_name, email, phone, address) */
export type GenericData = CommonData & {
  __typename?: "GenericData";
  address?: Maybe<Scalars["String"]["output"]>;
  data: Scalars["String"]["output"];
  dataType: DataType;
  date?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  firstName?: Maybe<Scalars["String"]["output"]>;
  float?: Maybe<Scalars["Float"]["output"]>;
  fullName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  int?: Maybe<Scalars["Int"]["output"]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
  lastName?: Maybe<Scalars["String"]["output"]>;
  lastUpdate: Scalars["DateTime"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  phone?: Maybe<Scalars["String"]["output"]>;
  postcode?: Maybe<Scalars["String"]["output"]>;
  postcodeData?: Maybe<PostcodesIoResult>;
  remoteUrl: Scalars["String"]["output"];
  shade?: Maybe<Scalars["String"]["output"]>;
};

export enum GeoJsonTypes {
  Feature = "Feature",
  FeatureCollection = "FeatureCollection",
  MultiPolygon = "MultiPolygon",
  Point = "Point",
  Polygon = "Polygon",
}

export type GroupedDataCount = {
  __typename?: "GroupedDataCount";
  areaData?: Maybe<Area>;
  count: Scalars["Int"]["output"];
  gss?: Maybe<Scalars["String"]["output"]>;
  gssArea?: Maybe<Area>;
  label?: Maybe<Scalars["String"]["output"]>;
};

export type GroupedDataCountWithBreakdown = {
  __typename?: "GroupedDataCountWithBreakdown";
  areaData?: Maybe<Area>;
  count: Scalars["Int"]["output"];
  gss?: Maybe<Scalars["String"]["output"]>;
  gssArea?: Maybe<Area>;
  label?: Maybe<Scalars["String"]["output"]>;
  sources: Array<GroupedDataCount>;
};

export type IdFilterLookup = {
  contains?: InputMaybe<Scalars["ID"]["input"]>;
  endsWith?: InputMaybe<Scalars["ID"]["input"]>;
  exact?: InputMaybe<Scalars["ID"]["input"]>;
  gt?: InputMaybe<Scalars["ID"]["input"]>;
  gte?: InputMaybe<Scalars["ID"]["input"]>;
  iContains?: InputMaybe<Scalars["ID"]["input"]>;
  iEndsWith?: InputMaybe<Scalars["ID"]["input"]>;
  iExact?: InputMaybe<Scalars["ID"]["input"]>;
  iRegex?: InputMaybe<Scalars["String"]["input"]>;
  iStartsWith?: InputMaybe<Scalars["ID"]["input"]>;
  inList?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  lt?: InputMaybe<Scalars["ID"]["input"]>;
  lte?: InputMaybe<Scalars["ID"]["input"]>;
  range?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  regex?: InputMaybe<Scalars["String"]["input"]>;
  startsWith?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IdObject = {
  id: Scalars["String"]["input"];
};

export type IntFilterLookup = {
  contains?: InputMaybe<Scalars["Int"]["input"]>;
  endsWith?: InputMaybe<Scalars["Int"]["input"]>;
  exact?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  iContains?: InputMaybe<Scalars["Int"]["input"]>;
  iEndsWith?: InputMaybe<Scalars["Int"]["input"]>;
  iExact?: InputMaybe<Scalars["Int"]["input"]>;
  iRegex?: InputMaybe<Scalars["String"]["input"]>;
  iStartsWith?: InputMaybe<Scalars["Int"]["input"]>;
  inList?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  range?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  regex?: InputMaybe<Scalars["String"]["input"]>;
  startsWith?: InputMaybe<Scalars["Int"]["input"]>;
};

/** A Mailchimp list. */
export type MailChimpSourceInput = {
  addressField?: InputMaybe<Scalars["String"]["input"]>;
  /** Mailchimp API key. */
  apiKey?: InputMaybe<Scalars["String"]["input"]>;
  autoImportEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  autoUpdateEnabled?: InputMaybe<Scalars["Boolean"]["input"]>;
  dataType?: InputMaybe<DataSourceType>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  emailField?: InputMaybe<Scalars["String"]["input"]>;
  firstNameField?: InputMaybe<Scalars["String"]["input"]>;
  fullNameField?: InputMaybe<Scalars["String"]["input"]>;
  geographyColumn?: InputMaybe<Scalars["String"]["input"]>;
  geographyColumnType?: InputMaybe<PostcodesIoGeographyTypes>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  lastNameField?: InputMaybe<Scalars["String"]["input"]>;
  /** The unique identifier for the Mailchimp list. */
  listId?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organisation?: InputMaybe<OneToManyInput>;
  phoneField?: InputMaybe<Scalars["String"]["input"]>;
  postcodeField?: InputMaybe<Scalars["String"]["input"]>;
  updateMapping?: InputMaybe<Array<UpdateMappingItemInput>>;
};

/** A Mailchimp list. */
export type MailchimpSource = Analytics & {
  __typename?: "MailchimpSource";
  addressField?: Maybe<Scalars["String"]["output"]>;
  /** Mailchimp API key. */
  apiKey: Scalars["String"]["output"];
  autoImportEnabled: Scalars["Boolean"]["output"];
  autoUpdateEnabled: Scalars["Boolean"]["output"];
  autoUpdateWebhookUrl: Scalars["String"]["output"];
  connectionDetails: AirtableSourceMailchimpSource;
  createdAt: Scalars["DateTime"]["output"];
  crmType: Scalars["String"]["output"];
  dataType: DataSourceType;
  description?: Maybe<Scalars["String"]["output"]>;
  emailField?: Maybe<Scalars["String"]["output"]>;
  fieldDefinitions?: Maybe<Array<FieldDefinition>>;
  firstNameField?: Maybe<Scalars["String"]["output"]>;
  fullNameField?: Maybe<Scalars["String"]["output"]>;
  geographyColumn?: Maybe<Scalars["String"]["output"]>;
  geographyColumnType: PostcodesIoGeographyTypes;
  healthcheck: Scalars["Boolean"]["output"];
  id: Scalars["UUID"]["output"];
  importProgress?: Maybe<BatchJobProgress>;
  importedDataCount: Scalars["Int"]["output"];
  importedDataCountByConstituency: Array<GroupedDataCount>;
  importedDataCountByConstituency2024: Array<GroupedDataCount>;
  importedDataCountByConstituencyBySource: Array<GroupedDataCountWithBreakdown>;
  importedDataCountByCouncil: Array<GroupedDataCount>;
  importedDataCountByRegion: Array<GroupedDataCount>;
  importedDataCountByWard: Array<GroupedDataCount>;
  importedDataCountForConstituency?: Maybe<GroupedDataCount>;
  importedDataCountForConstituency2024?: Maybe<GroupedDataCount>;
  isImportScheduled: Scalars["Boolean"]["output"];
  isUpdateScheduled: Scalars["Boolean"]["output"];
  jobs: Array<QueueJob>;
  lastJob?: Maybe<QueueJob>;
  lastNameField?: Maybe<Scalars["String"]["output"]>;
  lastUpdate: Scalars["DateTime"]["output"];
  /** The unique identifier for the Mailchimp list. */
  listId: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  organisation: Organisation;
  organisationId: Scalars["String"]["output"];
  orgsWithAccess: Array<Organisation>;
  phoneField?: Maybe<Scalars["String"]["output"]>;
  postcodeField?: Maybe<Scalars["String"]["output"]>;
  recordUrlTemplate?: Maybe<Scalars["String"]["output"]>;
  remoteName?: Maybe<Scalars["String"]["output"]>;
  remoteUrl?: Maybe<Scalars["String"]["output"]>;
  sharingPermissions: Array<SharingPermission>;
  updateMapping?: Maybe<Array<AutoUpdateConfig>>;
  updateProgress?: Maybe<BatchJobProgress>;
  webhookHealthcheck: Scalars["Boolean"]["output"];
};

/** A Mailchimp list. */
export type MailchimpSourceImportedDataCountByConstituencyBySourceArgs = {
  gss: Scalars["String"]["input"];
};

/** A Mailchimp list. */
export type MailchimpSourceImportedDataCountForConstituencyArgs = {
  gss: Scalars["String"]["input"];
};

/** A Mailchimp list. */
export type MailchimpSourceImportedDataCountForConstituency2024Args = {
  gss: Scalars["String"]["input"];
};

/** A Mailchimp list. */
export type MailchimpSourceOrgsWithAccessArgs = {
  filters?: InputMaybe<OrganisationFilters>;
};

export type MapLayer = {
  __typename?: "MapLayer";
  id: Scalars["String"]["output"];
  isSharedSource: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  sharingPermission?: Maybe<SharingPermission>;
  source: SharedDataSource;
  visible?: Maybe<Scalars["Boolean"]["output"]>;
};

export type MapLayerInput = {
  id: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  source: Scalars["String"]["input"];
  visible?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** MapReport(polymorphic_ctype, id, organisation, name, slug, description, created_at, last_update, report_ptr, layers, display_options) */
export type MapReport = Analytics & {
  __typename?: "MapReport";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  displayOptions: Scalars["JSON"]["output"];
  id: Scalars["UUID"]["output"];
  importedDataCount: Scalars["Int"]["output"];
  importedDataCountByConstituency: Array<GroupedDataCount>;
  importedDataCountByConstituency2024: Array<GroupedDataCount>;
  importedDataCountByConstituencyBySource: Array<GroupedDataCountWithBreakdown>;
  importedDataCountByCouncil: Array<GroupedDataCount>;
  importedDataCountByRegion: Array<GroupedDataCount>;
  importedDataCountByWard: Array<GroupedDataCount>;
  importedDataCountForConstituency?: Maybe<GroupedDataCount>;
  importedDataCountForConstituency2024?: Maybe<GroupedDataCount>;
  lastUpdate: Scalars["DateTime"]["output"];
  layers: Array<MapLayer>;
  name: Scalars["String"]["output"];
  organisation: Organisation;
  organisationId: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

/** MapReport(polymorphic_ctype, id, organisation, name, slug, description, created_at, last_update, report_ptr, layers, display_options) */
export type MapReportImportedDataCountByConstituencyBySourceArgs = {
  gss: Scalars["String"]["input"];
};

/** MapReport(polymorphic_ctype, id, organisation, name, slug, description, created_at, last_update, report_ptr, layers, display_options) */
export type MapReportImportedDataCountForConstituencyArgs = {
  gss: Scalars["String"]["input"];
};

/** MapReport(polymorphic_ctype, id, organisation, name, slug, description, created_at, last_update, report_ptr, layers, display_options) */
export type MapReportImportedDataCountForConstituency2024Args = {
  gss: Scalars["String"]["input"];
};

/** MapReport(polymorphic_ctype, id, organisation, name, slug, description, created_at, last_update, report_ptr, layers, display_options) */
export type MapReportInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  displayOptions?: InputMaybe<Scalars["JSON"]["input"]>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  lastUpdate?: InputMaybe<Scalars["DateTime"]["input"]>;
  layers?: InputMaybe<Array<MapLayerInput>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  organisation?: InputMaybe<OneToManyInput>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type MapReportMemberFeature = Feature & {
  __typename?: "MapReportMemberFeature";
  geometry: PointGeometry;
  id?: Maybe<Scalars["String"]["output"]>;
  properties?: Maybe<GenericData>;
  type: GeoJsonTypes;
};

export type MappingSource = {
  __typename?: "MappingSource";
  author?: Maybe<Scalars["String"]["output"]>;
  builtin: Scalars["Boolean"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  descriptionUrl?: Maybe<Scalars["String"]["output"]>;
  externalDataSource?: Maybe<SharedDataSource>;
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
  sourcePaths: Array<MappingSourcePath>;
};

export type MappingSourcePath = {
  __typename?: "MappingSourcePath";
  description?: Maybe<Scalars["String"]["output"]>;
  label?: Maybe<Scalars["String"]["output"]>;
  value: Scalars["String"]["output"];
};

/** Membership(id, user, organisation, role) */
export type Membership = {
  __typename?: "Membership";
  id: Scalars["ID"]["output"];
  organisation: Organisation;
  organisationId: Scalars["String"]["output"];
  role: Scalars["String"]["output"];
  user: User;
  userId: Scalars["String"]["output"];
};

export type MultiPolygonFeature = Feature & {
  __typename?: "MultiPolygonFeature";
  geometry: MultiPolygonGeometry;
  id?: Maybe<Scalars["String"]["output"]>;
  properties: Scalars["JSON"]["output"];
  type: GeoJsonTypes;
};

export type MultiPolygonGeometry = {
  __typename?: "MultiPolygonGeometry";
  coordinates: Scalars["JSON"]["output"];
  type: GeoJsonTypes;
};

export type Mutation = {
  __typename?: "Mutation";
  createApiToken: ApiToken;
  createExternalDataSource: CreateExternalDataSourceOutput;
  createMapReport: CreateMapReportPayload;
  createOrganisation: Membership;
  createSharingPermission: SharingPermission;
  deleteExternalDataSource: ExternalDataSource;
  deleteMapReport: MapReport;
  deleteSharingPermission: SharingPermission;
  disableAutoUpdate: ExternalDataSource;
  enableAutoUpdate: ExternalDataSource;
  importAll: ExternalDataSourceAction;
  /**
   * Change user password without old password.
   *
   *     Receive the token that was sent by email.
   *
   *     If token and new passwords are valid, update user password and in
   *     case of using refresh tokens, revoke all of them.
   *
   *     Also, if user has not been verified yet, verify it.
   *
   */
  performPasswordReset: MutationNormalOutput;
  refreshWebhooks: ExternalDataSource;
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
   * Send password reset email.
   *
   *     For non verified users, send an activation email instead.
   *
   *     If there is no user with the requested email, a successful response
   *     is returned.
   *
   */
  requestPasswordReset: MutationNormalOutput;
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
  revokeApiToken: ApiToken;
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
  triggerUpdate: ExternalDataSourceAction;
  updateExternalDataSource: ExternalDataSource;
  updateMapReport: MapReport;
  updateOrganisation: Organisation;
  updateSharingPermission: SharingPermission;
  updateSharingPermissions: Array<ExternalDataSource>;
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

export type MutationCreateApiTokenArgs = {
  expiryDays?: Scalars["Int"]["input"];
};

export type MutationCreateExternalDataSourceArgs = {
  input: CreateExternalDataSourceInput;
};

export type MutationCreateMapReportArgs = {
  data: MapReportInput;
};

export type MutationCreateOrganisationArgs = {
  input: CreateOrganisationInput;
};

export type MutationCreateSharingPermissionArgs = {
  data: SharingPermissionCudInput;
};

export type MutationDeleteExternalDataSourceArgs = {
  data: IdObject;
};

export type MutationDeleteMapReportArgs = {
  data: IdObject;
};

export type MutationDeleteSharingPermissionArgs = {
  data: IdObject;
};

export type MutationDisableAutoUpdateArgs = {
  externalDataSourceId: Scalars["String"]["input"];
};

export type MutationEnableAutoUpdateArgs = {
  externalDataSourceId: Scalars["String"]["input"];
};

export type MutationImportAllArgs = {
  externalDataSourceId: Scalars["String"]["input"];
};

export type MutationPerformPasswordResetArgs = {
  newPassword1: Scalars["String"]["input"];
  newPassword2: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type MutationRefreshWebhooksArgs = {
  externalDataSourceId: Scalars["String"]["input"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"]["input"];
  password1: Scalars["String"]["input"];
  password2: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationRequestPasswordResetArgs = {
  email: Scalars["String"]["input"];
};

export type MutationResendActivationEmailArgs = {
  email: Scalars["String"]["input"];
};

export type MutationRevokeApiTokenArgs = {
  signature: Scalars["ID"]["input"];
};

export type MutationTokenAuthArgs = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationTriggerUpdateArgs = {
  externalDataSourceId: Scalars["String"]["input"];
};

export type MutationUpdateExternalDataSourceArgs = {
  data: ExternalDataSourceInput;
};

export type MutationUpdateMapReportArgs = {
  data: MapReportInput;
};

export type MutationUpdateOrganisationArgs = {
  data: OrganisationInputPartial;
};

export type MutationUpdateSharingPermissionArgs = {
  data: SharingPermissionCudInput;
};

export type MutationUpdateSharingPermissionsArgs = {
  fromOrgId: Scalars["String"]["input"];
  permissions: Array<SharingPermissionInput>;
};

export type MutationVerifyAccountArgs = {
  token: Scalars["String"]["input"];
};

export type MutationError = {
  __typename?: "MutationError";
  code: Scalars["Int"]["output"];
  message: Scalars["String"]["output"];
};

export type MutationNormalOutput = {
  __typename?: "MutationNormalOutput";
  errors?: Maybe<Scalars["ExpectedError"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

/**
 *
 *     encapsulates token data, and refresh token data if `JWT_LONG_RUNNING_REFRESH_TOKEN` is on.
 *     with an output interface.
 *
 */
export type ObtainJsonWebTokenType = OutputInterface & {
  __typename?: "ObtainJSONWebTokenType";
  errors?: Maybe<Scalars["ExpectedError"]["output"]>;
  refreshToken?: Maybe<RefreshTokenType>;
  success: Scalars["Boolean"]["output"];
  token?: Maybe<TokenType>;
  user?: Maybe<UserType>;
};

export type OffsetPaginationInput = {
  limit?: Scalars["Int"]["input"];
  offset?: Scalars["Int"]["input"];
};

export type OneToManyInput = {
  set?: InputMaybe<Scalars["ID"]["input"]>;
};

export type OperationInfo = {
  __typename?: "OperationInfo";
  /** List of messages returned by the operation. */
  messages: Array<OperationMessage>;
};

export type OperationMessage = {
  __typename?: "OperationMessage";
  /** The error code, or `null` if no error code was set. */
  code?: Maybe<Scalars["String"]["output"]>;
  /** The field that caused the error, or `null` if it isn't associated with any particular field. */
  field?: Maybe<Scalars["String"]["output"]>;
  /** The kind of this message. */
  kind: OperationMessageKind;
  /** The error message. */
  message: Scalars["String"]["output"];
};

export enum OperationMessageKind {
  Error = "ERROR",
  Info = "INFO",
  Permission = "PERMISSION",
  Validation = "VALIDATION",
  Warning = "WARNING",
}

/** Organisation(id, slug, name, description, website, logo) */
export type Organisation = {
  __typename?: "Organisation";
  externalDataSources: Array<ExternalDataSource>;
  id: Scalars["ID"]["output"];
  members: Array<Membership>;
  name: Scalars["String"]["output"];
  sharingPermissionsFromOtherOrgs: Array<SharingPermission>;
  slug: Scalars["String"]["output"];
};

/** Organisation(id, slug, name, description, website, logo) */
export type OrganisationExternalDataSourcesArgs = {
  filters?: InputMaybe<ExternalDataSourceFilter>;
};

/** Organisation(id, slug, name, description, website, logo) */
export type OrganisationFilters = {
  AND?: InputMaybe<OrganisationFilters>;
  NOT?: InputMaybe<OrganisationFilters>;
  OR?: InputMaybe<OrganisationFilters>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

/** Organisation(id, slug, name, description, website, logo) */
export type OrganisationInputPartial = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type OutputInterface = {
  errors?: Maybe<Scalars["ExpectedError"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type PartyResult = {
  __typename?: "PartyResult";
  party: Scalars["String"]["output"];
  shade: Scalars["String"]["output"];
  votes: Scalars["Int"]["output"];
};

/** Person(id, person_type, external_id, id_type, name, area, photo, start_date, end_date) */
export type Person = {
  __typename?: "Person";
  area: Area;
  endDate?: Maybe<Scalars["Date"]["output"]>;
  externalId: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  idType: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  personData: Array<PersonData>;
  personDatum?: Maybe<PersonData>;
  personType: Scalars["String"]["output"];
  photo?: Maybe<DjangoImageType>;
  startDate?: Maybe<Scalars["Date"]["output"]>;
};

/** Person(id, person_type, external_id, id_type, name, area, photo, start_date, end_date) */
export type PersonPersonDataArgs = {
  filters?: InputMaybe<CommonDataLoaderFilter>;
};

/** Person(id, person_type, external_id, id_type, name, area, photo, start_date, end_date) */
export type PersonPersonDatumArgs = {
  filters?: InputMaybe<CommonDataLoaderFilter>;
};

/** PersonData(id, data_type, data, date, float, int, json, person) */
export type PersonData = CommonData & {
  __typename?: "PersonData";
  data: Scalars["String"]["output"];
  dataType: DataType;
  date?: Maybe<Scalars["DateTime"]["output"]>;
  float?: Maybe<Scalars["Float"]["output"]>;
  id: Scalars["ID"]["output"];
  int?: Maybe<Scalars["Int"]["output"]>;
  json?: Maybe<Scalars["JSON"]["output"]>;
  person: Person;
  shade?: Maybe<Scalars["String"]["output"]>;
};

/** Person(id, person_type, external_id, id_type, name, area, photo, start_date, end_date) */
export type PersonFilter = {
  personType: Scalars["String"]["input"];
};

export type PointFeature = Feature & {
  __typename?: "PointFeature";
  geometry: PointGeometry;
  id?: Maybe<Scalars["String"]["output"]>;
  properties: Scalars["JSON"]["output"];
  type: GeoJsonTypes;
};

export type PointGeometry = {
  __typename?: "PointGeometry";
  coordinates: Array<Scalars["Float"]["output"]>;
  type: GeoJsonTypes;
};

export type PollingStation = {
  __typename?: "PollingStation";
  customFinder?: Maybe<Scalars["Void"]["output"]>;
  pollingStationKnown: Scalars["Boolean"]["output"];
  reportProblemUrl: Scalars["String"]["output"];
  station: ElectoralCommissionStation;
};

export type PostcodeQueryResponse = {
  __typename?: "PostcodeQueryResponse";
  constituency?: Maybe<Area>;
  customSourceData?: Maybe<Scalars["String"]["output"]>;
  electoralCommission?: Maybe<ElectoralCommissionPostcodeLookup>;
  postcode: Scalars["String"]["output"];
  postcodesIO?: Maybe<PostcodesIoResult>;
};

export type PostcodeQueryResponseCustomSourceDataArgs = {
  source: Scalars["String"]["input"];
  sourcePath: Scalars["String"]["input"];
};

export type PostcodesIoCodes = {
  __typename?: "PostcodesIOCodes";
  adminCounty: Scalars["String"]["output"];
  adminDistrict: Scalars["String"]["output"];
  adminWard: Scalars["String"]["output"];
  ccg: Scalars["String"]["output"];
  ccgId: Scalars["String"]["output"];
  ced: Scalars["String"]["output"];
  lau2: Scalars["String"]["output"];
  lsoa: Scalars["String"]["output"];
  msoa: Scalars["String"]["output"];
  nuts: Scalars["String"]["output"];
  parish?: Maybe<Scalars["String"]["output"]>;
  parliamentaryConstituency: Scalars["String"]["output"];
  parliamentaryConstituency2025: Scalars["String"]["output"];
  pfa: Scalars["String"]["output"];
};

export enum PostcodesIoGeographyTypes {
  Constituency = "CONSTITUENCY",
  Constituency_2025 = "CONSTITUENCY_2025",
  Council = "COUNCIL",
  Postcode = "POSTCODE",
  Ward = "WARD",
}

export type PostcodesIoResult = {
  __typename?: "PostcodesIOResult";
  adminCounty?: Maybe<Scalars["String"]["output"]>;
  adminDistrict: Scalars["String"]["output"];
  adminWard: Scalars["String"]["output"];
  ccg: Scalars["String"]["output"];
  ced?: Maybe<Scalars["String"]["output"]>;
  codes: PostcodesIoCodes;
  country: Scalars["String"]["output"];
  dateOfIntroduction: Scalars["Int"]["output"];
  eastings: Scalars["Int"]["output"];
  europeanElectoralRegion: Scalars["String"]["output"];
  feature: PointFeature;
  incode: Scalars["String"]["output"];
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
  lsoa: Scalars["String"]["output"];
  msoa: Scalars["String"]["output"];
  nhsHa: Scalars["String"]["output"];
  northings: Scalars["Int"]["output"];
  nuts: Scalars["String"]["output"];
  outcode: Scalars["String"]["output"];
  parish: Scalars["String"]["output"];
  parliamentaryConstituency: Scalars["String"]["output"];
  parliamentaryConstituency2025: Scalars["String"]["output"];
  pfa: Scalars["String"]["output"];
  postcode: Scalars["String"]["output"];
  primaryCareTrust: Scalars["String"]["output"];
  quality: Scalars["Int"]["output"];
  region: Scalars["String"]["output"];
};

export enum ProcrastinateJobStatus {
  Doing = "doing",
  Failed = "failed",
  Succeeded = "succeeded",
  Todo = "todo",
}

/** Organisation(id, slug, name, description, website, logo) */
export type PublicOrganisation = {
  __typename?: "PublicOrganisation";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  airtableSource: AirtableSource;
  airtableSources: Array<AirtableSource>;
  allOrganisations: Array<PublicOrganisation>;
  area?: Maybe<Area>;
  dataSet?: Maybe<DataSet>;
  enrichPostcode: PostcodeQueryResponse;
  enrichPostcodes: Array<PostcodeQueryResponse>;
  externalDataSource: ExternalDataSource;
  externalDataSources: Array<ExternalDataSource>;
  importedDataGeojsonPoint?: Maybe<MapReportMemberFeature>;
  job: QueueJob;
  jobs: Array<QueueJob>;
  listApiTokens: Array<ApiToken>;
  mailchimpSource: MailchimpSource;
  mailchimpSources: Array<MailchimpSource>;
  mapReport: MapReport;
  mapReports: Array<MapReport>;
  mappingSources: Array<MappingSource>;
  me: UserType;
  memberships: Array<Membership>;
  myOrganisations: Array<Organisation>;
  /** Returns the current user if he is not anonymous. */
  publicUser?: Maybe<UserType>;
  reports: Array<Report>;
  sharedDataSource: SharedDataSource;
  sharedDataSources: Array<SharedDataSource>;
  testDataSource: ExternalDataSource;
};

export type QueryAirtableSourceArgs = {
  pk: Scalars["ID"]["input"];
};

export type QueryAllOrganisationsArgs = {
  filters?: InputMaybe<OrganisationFilters>;
};

export type QueryAreaArgs = {
  gss: Scalars["String"]["input"];
};

export type QueryDataSetArgs = {
  name: Scalars["String"]["input"];
};

export type QueryEnrichPostcodeArgs = {
  postcode: Scalars["String"]["input"];
};

export type QueryEnrichPostcodesArgs = {
  postcodes: Array<Scalars["String"]["input"]>;
};

export type QueryExternalDataSourceArgs = {
  pk: Scalars["ID"]["input"];
};

export type QueryExternalDataSourcesArgs = {
  filters?: InputMaybe<ExternalDataSourceFilter>;
};

export type QueryImportedDataGeojsonPointArgs = {
  genericDataId: Scalars["String"]["input"];
};

export type QueryJobArgs = {
  pk: Scalars["ID"]["input"];
};

export type QueryJobsArgs = {
  filters?: InputMaybe<QueueFilter>;
  pagination?: InputMaybe<OffsetPaginationInput>;
};

export type QueryMailchimpSourceArgs = {
  pk: Scalars["ID"]["input"];
};

export type QueryMapReportArgs = {
  pk: Scalars["ID"]["input"];
};

export type QueryMyOrganisationsArgs = {
  filters?: InputMaybe<OrganisationFilters>;
};

export type QuerySharedDataSourceArgs = {
  pk: Scalars["ID"]["input"];
};

export type QuerySharedDataSourcesArgs = {
  filters?: InputMaybe<ExternalDataSourceFilter>;
};

export type QueryTestDataSourceArgs = {
  input: TestDataSourceInput;
};

/** ProcrastinateEvent(id, job, type, at) */
export type QueueEvent = {
  __typename?: "QueueEvent";
  at?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  job: QueueJob;
  type: Scalars["String"]["output"];
};

/** ProcrastinateJob(id, queue_name, task_name, lock, args, status, scheduled_at, attempts, queueing_lock) */
export type QueueFilter = {
  AND?: InputMaybe<QueueFilter>;
  NOT?: InputMaybe<QueueFilter>;
  OR?: InputMaybe<QueueFilter>;
  attempts?: InputMaybe<IntFilterLookup>;
  externalDataSourceId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<IdFilterLookup>;
  queueName?: InputMaybe<StrFilterLookup>;
  scheduledAt?: InputMaybe<DatetimeFilterLookup>;
  status: ProcrastinateJobStatus;
  taskName?: InputMaybe<StrFilterLookup>;
};

/** ProcrastinateJob(id, queue_name, task_name, lock, args, status, scheduled_at, attempts, queueing_lock) */
export type QueueJob = {
  __typename?: "QueueJob";
  args: Scalars["JSON"]["output"];
  attempts: Scalars["Int"]["output"];
  events: Array<QueueEvent>;
  id: Scalars["ID"]["output"];
  lastEventAt: Scalars["DateTime"]["output"];
  lock?: Maybe<Scalars["String"]["output"]>;
  queueName: Scalars["String"]["output"];
  queueingLock?: Maybe<Scalars["String"]["output"]>;
  scheduledAt?: Maybe<Scalars["DateTime"]["output"]>;
  status: ProcrastinateJobStatus;
  taskName: Scalars["String"]["output"];
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
  __typename?: "RefreshTokenType";
  created: Scalars["DateTime"]["output"];
  expiresAt: Scalars["DateTime"]["output"];
  isExpired: Scalars["Boolean"]["output"];
  revoked?: Maybe<Scalars["DateTime"]["output"]>;
  /** randomly generated token that is attached to a FK user. */
  token: Scalars["String"]["output"];
};

/** Report(polymorphic_ctype, id, organisation, name, slug, description, created_at, last_update) */
export type Report = {
  __typename?: "Report";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["UUID"]["output"];
  lastUpdate: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  organisation: Organisation;
  organisationId: Scalars["String"]["output"];
  slug: Scalars["String"]["output"];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type SharedDataSource = Analytics & {
  __typename?: "SharedDataSource";
  addressField?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  crmType: Scalars["String"]["output"];
  dataType: DataSourceType;
  description?: Maybe<Scalars["String"]["output"]>;
  emailField?: Maybe<Scalars["String"]["output"]>;
  firstNameField?: Maybe<Scalars["String"]["output"]>;
  fullNameField?: Maybe<Scalars["String"]["output"]>;
  geographyColumn?: Maybe<Scalars["String"]["output"]>;
  geographyColumnType: PostcodesIoGeographyTypes;
  id: Scalars["UUID"]["output"];
  importProgress?: Maybe<BatchJobProgress>;
  importedDataCount: Scalars["Int"]["output"];
  importedDataCountByConstituency: Array<GroupedDataCount>;
  importedDataCountByConstituency2024: Array<GroupedDataCount>;
  importedDataCountByConstituencyBySource: Array<GroupedDataCountWithBreakdown>;
  importedDataCountByCouncil: Array<GroupedDataCount>;
  importedDataCountByRegion: Array<GroupedDataCount>;
  importedDataCountByWard: Array<GroupedDataCount>;
  importedDataCountForConstituency?: Maybe<GroupedDataCount>;
  importedDataCountForConstituency2024?: Maybe<GroupedDataCount>;
  isImportScheduled: Scalars["Boolean"]["output"];
  isUpdateScheduled: Scalars["Boolean"]["output"];
  lastNameField?: Maybe<Scalars["String"]["output"]>;
  lastUpdate: Scalars["DateTime"]["output"];
  name: Scalars["String"]["output"];
  organisation: PublicOrganisation;
  organisationId: Scalars["String"]["output"];
  phoneField?: Maybe<Scalars["String"]["output"]>;
  postcodeField?: Maybe<Scalars["String"]["output"]>;
  recordUrlTemplate?: Maybe<Scalars["String"]["output"]>;
  updateProgress?: Maybe<BatchJobProgress>;
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type SharedDataSourceImportedDataCountByConstituencyBySourceArgs = {
  gss: Scalars["String"]["input"];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type SharedDataSourceImportedDataCountForConstituencyArgs = {
  gss: Scalars["String"]["input"];
};

/**
 * A third-party data source that can be read and optionally written back to.
 * E.g. Google Sheet or an Action Network table.
 * This class is to be subclassed by specific data source types.
 */
export type SharedDataSourceImportedDataCountForConstituency2024Args = {
  gss: Scalars["String"]["input"];
};

/** SharingPermission(id, created_at, last_update, external_data_source, organisation, visibility_record_coordinates, visibility_record_details) */
export type SharingPermission = {
  __typename?: "SharingPermission";
  createdAt: Scalars["DateTime"]["output"];
  deleted: Scalars["Boolean"]["output"];
  externalDataSource: SharedDataSource;
  externalDataSourceId: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  lastUpdate: Scalars["DateTime"]["output"];
  organisation: PublicOrganisation;
  organisationId: Scalars["String"]["output"];
  visibilityRecordCoordinates?: Maybe<Scalars["Boolean"]["output"]>;
  visibilityRecordDetails?: Maybe<Scalars["Boolean"]["output"]>;
};

/** SharingPermission(id, created_at, last_update, external_data_source, organisation, visibility_record_coordinates, visibility_record_details) */
export type SharingPermissionCudInput = {
  externalDataSourceId?: InputMaybe<OneToManyInput>;
  id?: InputMaybe<Scalars["UUID"]["input"]>;
  organisationId?: InputMaybe<OneToManyInput>;
  visibilityRecordCoordinates?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityRecordDetails?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SharingPermissionInput = {
  deleted?: InputMaybe<Scalars["Boolean"]["input"]>;
  externalDataSourceId: Scalars["ID"]["input"];
  id?: InputMaybe<Scalars["ID"]["input"]>;
  organisationId: Scalars["ID"]["input"];
  visibilityRecordCoordinates?: InputMaybe<Scalars["Boolean"]["input"]>;
  visibilityRecordDetails?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type StrFilterLookup = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  exact?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  iContains?: InputMaybe<Scalars["String"]["input"]>;
  iEndsWith?: InputMaybe<Scalars["String"]["input"]>;
  iExact?: InputMaybe<Scalars["String"]["input"]>;
  iRegex?: InputMaybe<Scalars["String"]["input"]>;
  iStartsWith?: InputMaybe<Scalars["String"]["input"]>;
  inList?: InputMaybe<Array<Scalars["String"]["input"]>>;
  isNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  range?: InputMaybe<Array<Scalars["String"]["input"]>>;
  regex?: InputMaybe<Scalars["String"]["input"]>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type TestDataSourceInput = {
  apiKey: Scalars["String"]["input"];
  baseId?: InputMaybe<Scalars["String"]["input"]>;
  listId?: InputMaybe<Scalars["String"]["input"]>;
  tableId?: InputMaybe<Scalars["String"]["input"]>;
  type: Scalars["String"]["input"];
};

/**
 *
 * the data that was used to create the token.
 *
 */
export type TokenPayloadType = {
  __typename?: "TokenPayloadType";
  /** when the token will be expired */
  exp: Scalars["DateTime"]["output"];
  /** when the token was created */
  origIat: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

/**
 *
 * encapsulates the token with the payload that was used to create the token.
 *
 */
export type TokenType = {
  __typename?: "TokenType";
  payload: TokenPayloadType;
  /** The encoded payload, namely a token. */
  token: Scalars["String"]["output"];
};

export type UpdateMappingItemInput = {
  destinationColumn: Scalars["String"]["input"];
  source: Scalars["String"]["input"];
  sourcePath: Scalars["String"]["input"];
};

/**
 * Users within the Django authentication system are represented by this
 * model.
 *
 * Username and password are required. Other fields are optional.
 */
export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  userProperties: UserProperties;
};

/** UserProperties(id, user, organisation_name, full_name, email_confirmed, account_confirmed, last_seen, agreed_terms) */
export type UserProperties = {
  __typename?: "UserProperties";
  fullName?: Maybe<Scalars["String"]["output"]>;
  user: User;
  userId: Scalars["String"]["output"];
};

/** A helper model that handles user account stuff. */
export type UserStatusType = {
  __typename?: "UserStatusType";
  archived: Scalars["Boolean"]["output"];
  verified: Scalars["Boolean"]["output"];
};

/**
 * Users within the Django authentication system are represented by this
 * model.
 *
 * Username and password are required. Other fields are optional.
 */
export type UserType = {
  __typename?: "UserType";
  archived: Scalars["Boolean"]["output"];
  dateJoined: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"]["output"];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars["Boolean"]["output"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"]["output"];
  lastLogin?: Maybe<Scalars["DateTime"]["output"]>;
  lastName?: Maybe<Scalars["String"]["output"]>;
  logentrySet: Array<DjangoModelType>;
  status: UserStatusType;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"]["output"];
  verified: Scalars["Boolean"]["output"];
};

export type ListOrganisationsQueryVariables = Exact<{ [key: string]: never }>;

export type ListOrganisationsQuery = {
  __typename?: "Query";
  myOrganisations: Array<{
    __typename?: "Organisation";
    id: string;
    externalDataSources: Array<{
      __typename?: "ExternalDataSource";
      id: any;
      name: string;
      dataType: DataSourceType;
      crmType: string;
      autoUpdateEnabled: boolean;
      connectionDetails:
        | { __typename?: "AirtableSource"; baseId: string; tableId: string }
        | { __typename?: "MailchimpSource"; apiKey: string; listId: string };
      jobs: Array<{
        __typename?: "QueueJob";
        lastEventAt: any;
        status: ProcrastinateJobStatus;
      }>;
      updateMapping?: Array<{
        __typename?: "AutoUpdateConfig";
        source: string;
        sourcePath: string;
        destinationColumn: string;
      }> | null;
      sharingPermissions: Array<{
        __typename?: "SharingPermission";
        id: any;
        organisation: {
          __typename?: "PublicOrganisation";
          id: string;
          name: string;
        };
      }>;
    }>;
    sharingPermissionsFromOtherOrgs: Array<{
      __typename?: "SharingPermission";
      id: any;
      externalDataSource: {
        __typename?: "SharedDataSource";
        id: any;
        name: string;
        dataType: DataSourceType;
        crmType: string;
        organisation: { __typename?: "PublicOrganisation"; name: string };
      };
    }>;
  }>;
};

export type GetSourceMappingQueryVariables = Exact<{
  ID: Scalars["ID"]["input"];
}>;

export type GetSourceMappingQuery = {
  __typename?: "Query";
  externalDataSource: {
    __typename?: "ExternalDataSource";
    id: any;
    autoUpdateEnabled: boolean;
    crmType: string;
    geographyColumn?: string | null;
    geographyColumnType: PostcodesIoGeographyTypes;
    postcodeField?: string | null;
    firstNameField?: string | null;
    lastNameField?: string | null;
    emailField?: string | null;
    phoneField?: string | null;
    addressField?: string | null;
    updateMapping?: Array<{
      __typename?: "AutoUpdateConfig";
      destinationColumn: string;
      source: string;
      sourcePath: string;
    }> | null;
    fieldDefinitions?: Array<{
      __typename?: "FieldDefinition";
      label?: string | null;
      value: string;
      description?: string | null;
    }> | null;
  };
};

export type TestDataSourceQueryVariables = Exact<{
  input: TestDataSourceInput;
}>;

export type TestDataSourceQuery = {
  __typename?: "Query";
  testDataSource: {
    __typename: "ExternalDataSource";
    crmType: string;
    geographyColumn?: string | null;
    geographyColumnType: PostcodesIoGeographyTypes;
    healthcheck: boolean;
    remoteName?: string | null;
    fieldDefinitions?: Array<{
      __typename?: "FieldDefinition";
      label?: string | null;
      value: string;
      description?: string | null;
    }> | null;
  };
};

export type CreateSourceMutationVariables = Exact<{
  input: CreateExternalDataSourceInput;
}>;

export type CreateSourceMutation = {
  __typename?: "Mutation";
  createExternalDataSource: {
    __typename?: "CreateExternalDataSourceOutput";
    code: number;
    errors: Array<{ __typename?: "MutationError"; message: string }>;
    result?: {
      __typename?: "ExternalDataSource";
      id: any;
      name: string;
      crmType: string;
      dataType: DataSourceType;
    } | null;
  };
};

export type AllExternalDataSourcesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AllExternalDataSourcesQuery = {
  __typename?: "Query";
  externalDataSources: Array<{
    __typename?: "ExternalDataSource";
    id: any;
    name: string;
    createdAt: any;
    dataType: DataSourceType;
    crmType: string;
    autoUpdateEnabled: boolean;
    connectionDetails:
      | { __typename?: "AirtableSource"; baseId: string; tableId: string }
      | { __typename?: "MailchimpSource"; apiKey: string; listId: string };
  }>;
};

export type AutoUpdateCreationReviewQueryVariables = Exact<{
  ID: Scalars["ID"]["input"];
}>;

export type AutoUpdateCreationReviewQuery = {
  __typename?: "Query";
  externalDataSource: {
    __typename?: "ExternalDataSource";
    id: any;
    name: string;
    geographyColumn?: string | null;
    geographyColumnType: PostcodesIoGeographyTypes;
    dataType: DataSourceType;
    crmType: string;
    autoUpdateEnabled: boolean;
    updateMapping?: Array<{
      __typename?: "AutoUpdateConfig";
      source: string;
      sourcePath: string;
      destinationColumn: string;
    }> | null;
    jobs: Array<{
      __typename?: "QueueJob";
      lastEventAt: any;
      status: ProcrastinateJobStatus;
    }>;
  } & { " $fragmentRefs"?: { DataSourceCardFragment: DataSourceCardFragment } };
};

export type ExternalDataSourceInspectPageQueryVariables = Exact<{
  ID: Scalars["ID"]["input"];
}>;

export type ExternalDataSourceInspectPageQuery = {
  __typename?: "Query";
  externalDataSource: {
    __typename?: "ExternalDataSource";
    id: any;
    name: string;
    dataType: DataSourceType;
    remoteUrl?: string | null;
    crmType: string;
    autoUpdateEnabled: boolean;
    webhookHealthcheck: boolean;
    geographyColumn?: string | null;
    geographyColumnType: PostcodesIoGeographyTypes;
    postcodeField?: string | null;
    firstNameField?: string | null;
    lastNameField?: string | null;
    fullNameField?: string | null;
    emailField?: string | null;
    phoneField?: string | null;
    addressField?: string | null;
    isImportScheduled: boolean;
    isUpdateScheduled: boolean;
    importedDataCount: number;
    organisationId: string;
    connectionDetails:
      | {
          __typename?: "AirtableSource";
          apiKey: string;
          baseId: string;
          tableId: string;
        }
      | { __typename?: "MailchimpSource"; apiKey: string; listId: string };
    lastJob?: {
      __typename?: "QueueJob";
      id: string;
      lastEventAt: any;
      status: ProcrastinateJobStatus;
    } | null;
    importProgress?: {
      __typename?: "BatchJobProgress";
      id: string;
      status: ProcrastinateJobStatus;
      total: number;
      succeeded: number;
      estimatedFinishTime: any;
    } | null;
    updateProgress?: {
      __typename?: "BatchJobProgress";
      id: string;
      status: ProcrastinateJobStatus;
      total: number;
      succeeded: number;
      estimatedFinishTime: any;
    } | null;
    fieldDefinitions?: Array<{
      __typename?: "FieldDefinition";
      label?: string | null;
      value: string;
      description?: string | null;
    }> | null;
    updateMapping?: Array<{
      __typename?: "AutoUpdateConfig";
      source: string;
      sourcePath: string;
      destinationColumn: string;
    }> | null;
    sharingPermissions: Array<{ __typename?: "SharingPermission"; id: any }>;
  };
};

export type DeleteUpdateConfigMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DeleteUpdateConfigMutation = {
  __typename?: "Mutation";
  deleteExternalDataSource: { __typename?: "ExternalDataSource"; id: any };
};

export type ImportDataMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type ImportDataMutation = {
  __typename?: "Mutation";
  importAll: {
    __typename?: "ExternalDataSourceAction";
    id: string;
    externalDataSource: {
      __typename?: "ExternalDataSource";
      importedDataCount: number;
      isImportScheduled: boolean;
      importProgress?: {
        __typename?: "BatchJobProgress";
        status: ProcrastinateJobStatus;
        id: string;
        total: number;
        succeeded: number;
        failed: number;
        estimatedFinishTime: any;
      } | null;
    };
  };
};

export type ManageSourceSharingQueryVariables = Exact<{
  externalDataSourceId: Scalars["ID"]["input"];
}>;

export type ManageSourceSharingQuery = {
  __typename?: "Query";
  externalDataSource: {
    __typename?: "ExternalDataSource";
    sharingPermissions: Array<{
      __typename?: "SharingPermission";
      id: any;
      organisationId: string;
      externalDataSourceId: string;
      visibilityRecordCoordinates?: boolean | null;
      visibilityRecordDetails?: boolean | null;
      deleted: boolean;
      organisation: { __typename?: "PublicOrganisation"; name: string };
    }>;
  };
};

export type UpdateSourceSharingObjectMutationVariables = Exact<{
  data: SharingPermissionCudInput;
}>;

export type UpdateSourceSharingObjectMutation = {
  __typename?: "Mutation";
  updateSharingPermission: {
    __typename?: "SharingPermission";
    id: any;
    organisationId: string;
    externalDataSourceId: string;
    visibilityRecordCoordinates?: boolean | null;
    visibilityRecordDetails?: boolean | null;
    deleted: boolean;
  };
};

export type DeleteSourceSharingObjectMutationVariables = Exact<{
  pk: Scalars["String"]["input"];
}>;

export type DeleteSourceSharingObjectMutation = {
  __typename?: "Mutation";
  deleteSharingPermission: { __typename?: "SharingPermission"; id: any };
};

export type ExternalDataSourceNameQueryVariables = Exact<{
  externalDataSourceId: Scalars["ID"]["input"];
}>;

export type ExternalDataSourceNameQuery = {
  __typename?: "Query";
  externalDataSource: {
    __typename?: "ExternalDataSource";
    name: string;
    crmType: string;
    dataType: DataSourceType;
    remoteUrl?: string | null;
  };
};

export type ShareDataSourcesMutationVariables = Exact<{
  fromOrgId: Scalars["String"]["input"];
  permissions: Array<SharingPermissionInput> | SharingPermissionInput;
}>;

export type ShareDataSourcesMutation = {
  __typename?: "Mutation";
  updateSharingPermissions: Array<{
    __typename?: "ExternalDataSource";
    id: any;
    sharingPermissions: Array<{
      __typename?: "SharingPermission";
      id: any;
      organisationId: string;
      externalDataSourceId: string;
      visibilityRecordCoordinates?: boolean | null;
      visibilityRecordDetails?: boolean | null;
      deleted: boolean;
    }>;
  }>;
};

export type YourSourcesForSharingQueryVariables = Exact<{
  [key: string]: never;
}>;

export type YourSourcesForSharingQuery = {
  __typename?: "Query";
  myOrganisations: Array<{
    __typename?: "Organisation";
    id: string;
    name: string;
    externalDataSources: Array<{
      __typename?: "ExternalDataSource";
      id: any;
      name: string;
      crmType: string;
      importedDataCount: number;
      dataType: DataSourceType;
      organisationId: string;
      fieldDefinitions?: Array<{
        __typename?: "FieldDefinition";
        label?: string | null;
      }> | null;
      sharingPermissions: Array<{
        __typename?: "SharingPermission";
        id: any;
        organisationId: string;
        externalDataSourceId: string;
        visibilityRecordCoordinates?: boolean | null;
        visibilityRecordDetails?: boolean | null;
        deleted: boolean;
      }>;
    }>;
  }>;
};

export type ShareWithOrgPageQueryVariables = Exact<{
  orgSlug: Scalars["String"]["input"];
}>;

export type ShareWithOrgPageQuery = {
  __typename?: "Query";
  allOrganisations: Array<{
    __typename?: "PublicOrganisation";
    id: string;
    name: string;
  }>;
};

export type ListReportsQueryVariables = Exact<{ [key: string]: never }>;

export type ListReportsQuery = {
  __typename?: "Query";
  reports: Array<{
    __typename?: "Report";
    id: any;
    name: string;
    lastUpdate: any;
  }>;
};

export type CreateMapReportMutationVariables = Exact<{
  data: MapReportInput;
}>;

export type CreateMapReportMutation = {
  __typename?: "Mutation";
  createMapReport:
    | { __typename?: "MapReport"; id: any }
    | {
        __typename?: "OperationInfo";
        messages: Array<{ __typename?: "OperationMessage"; message: string }>;
      };
};

export type DeveloperApiContextQueryVariables = Exact<{ [key: string]: never }>;

export type DeveloperApiContextQuery = {
  __typename?: "Query";
  listApiTokens: Array<{
    __typename?: "APIToken";
    token: string;
    signature: string;
    revoked: boolean;
    createdAt: any;
    expiresAt: any;
  }>;
};

export type CreateTokenMutationVariables = Exact<{ [key: string]: never }>;

export type CreateTokenMutation = {
  __typename?: "Mutation";
  createApiToken: {
    __typename?: "APIToken";
    token: string;
    signature: string;
    revoked: boolean;
    createdAt: any;
    expiresAt: any;
  };
};

export type RevokeTokenMutationVariables = Exact<{
  signature: Scalars["ID"]["input"];
}>;

export type RevokeTokenMutation = {
  __typename?: "Mutation";
  revokeApiToken: {
    __typename?: "APIToken";
    signature: string;
    revoked: boolean;
  };
};

export type VerifyMutationVariables = Exact<{
  token: Scalars["String"]["input"];
}>;

export type VerifyMutation = {
  __typename?: "Mutation";
  verifyAccount: {
    __typename?: "MutationNormalOutput";
    errors?: any | null;
    success: boolean;
  };
};

export type ExampleQueryVariables = Exact<{ [key: string]: never }>;

export type ExampleQuery = {
  __typename?: "Query";
  myOrganisations: Array<{
    __typename?: "Organisation";
    id: string;
    name: string;
  }>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  tokenAuth: {
    __typename?: "ObtainJSONWebTokenType";
    errors?: any | null;
    success: boolean;
    token?: {
      __typename?: "TokenType";
      token: string;
      payload: { __typename?: "TokenPayloadType"; exp: any };
    } | null;
  };
};

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type ResetPasswordMutation = {
  __typename?: "Mutation";
  requestPasswordReset: {
    __typename?: "MutationNormalOutput";
    errors?: any | null;
    success: boolean;
  };
};

export type RegisterMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password1: Scalars["String"]["input"];
  password2: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "MutationNormalOutput";
    errors?: any | null;
    success: boolean;
  };
};

export type ListExternalDataSourcesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ListExternalDataSourcesQuery = {
  __typename?: "Query";
  myOrganisations: Array<{
    __typename?: "Organisation";
    id: string;
    externalDataSources: Array<{ __typename?: "ExternalDataSource"; id: any }>;
  }>;
};

export type GetMapReportNameQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetMapReportNameQuery = {
  __typename?: "Query";
  mapReport: { __typename?: "MapReport"; id: any; name: string };
};

export type MapReportLayersSummaryFragment = {
  __typename?: "MapReport";
  layers: Array<{
    __typename?: "MapLayer";
    id: string;
    name: string;
    sharingPermission?: {
      __typename?: "SharingPermission";
      visibilityRecordDetails?: boolean | null;
      visibilityRecordCoordinates?: boolean | null;
      organisation: { __typename?: "PublicOrganisation"; name: string };
    } | null;
    source: {
      __typename?: "SharedDataSource";
      id: any;
      name: string;
      isImportScheduled: boolean;
      importedDataCount: number;
      recordUrlTemplate?: string | null;
      crmType: string;
      dataType: DataSourceType;
      organisation: { __typename?: "PublicOrganisation"; name: string };
    };
  }>;
} & { " $fragmentName"?: "MapReportLayersSummaryFragment" };

export type MapReportPageFragment = ({
  __typename?: "MapReport";
  id: any;
  name: string;
} & {
  " $fragmentRefs"?: {
    MapReportLayersSummaryFragment: MapReportLayersSummaryFragment;
  };
}) & { " $fragmentName"?: "MapReportPageFragment" };

export type GetMapReportQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetMapReportQuery = {
  __typename?: "Query";
  mapReport: {
    __typename?: "MapReport";
    id: any;
    name: string;
    displayOptions: any;
    organisation: {
      __typename?: "Organisation";
      id: string;
      slug: string;
      name: string;
    };
  } & { " $fragmentRefs"?: { MapReportPageFragment: MapReportPageFragment } };
};

export type UpdateMapReportMutationVariables = Exact<{
  input: MapReportInput;
}>;

export type UpdateMapReportMutation = {
  __typename?: "Mutation";
  updateMapReport: {
    __typename?: "MapReport";
    id: any;
    name: string;
    displayOptions: any;
    layers: Array<{
      __typename?: "MapLayer";
      id: string;
      name: string;
      source: { __typename?: "SharedDataSource"; id: any; name: string };
    }>;
  };
};

export type DeleteMapReportMutationVariables = Exact<{
  id: IdObject;
}>;

export type DeleteMapReportMutation = {
  __typename?: "Mutation";
  deleteMapReport: { __typename?: "MapReport"; id: any };
};

export type AutoUpdateWebhookRefreshMutationVariables = Exact<{
  ID: Scalars["String"]["input"];
}>;

export type AutoUpdateWebhookRefreshMutation = {
  __typename?: "Mutation";
  refreshWebhooks: {
    __typename?: "ExternalDataSource";
    id: any;
    webhookHealthcheck: boolean;
  };
};

export type ExternalDataSourceAutoUpdateCardQueryVariables = Exact<{
  ID: Scalars["ID"]["input"];
}>;

export type ExternalDataSourceAutoUpdateCardQuery = {
  __typename?: "Query";
  externalDataSource: { __typename?: "ExternalDataSource" } & {
    " $fragmentRefs"?: { DataSourceCardFragment: DataSourceCardFragment };
  };
};

export type EnableAutoUpdateMutationVariables = Exact<{
  ID: Scalars["String"]["input"];
}>;

export type EnableAutoUpdateMutation = {
  __typename?: "Mutation";
  enableAutoUpdate: {
    __typename?: "ExternalDataSource";
    id: any;
    autoUpdateEnabled: boolean;
    webhookHealthcheck: boolean;
    name: string;
  };
};

export type DisableAutoUpdateMutationVariables = Exact<{
  ID: Scalars["String"]["input"];
}>;

export type DisableAutoUpdateMutation = {
  __typename?: "Mutation";
  disableAutoUpdate: {
    __typename?: "ExternalDataSource";
    id: any;
    autoUpdateEnabled: boolean;
    webhookHealthcheck: boolean;
    name: string;
  };
};

export type DataSourceCardFragment = {
  __typename?: "ExternalDataSource";
  id: any;
  name: string;
  dataType: DataSourceType;
  crmType: string;
  autoUpdateEnabled: boolean;
  updateMapping?: Array<{
    __typename?: "AutoUpdateConfig";
    source: string;
    sourcePath: string;
    destinationColumn: string;
  }> | null;
  jobs: Array<{
    __typename?: "QueueJob";
    lastEventAt: any;
    status: ProcrastinateJobStatus;
  }>;
  sharingPermissions: Array<{
    __typename?: "SharingPermission";
    id: any;
    organisation: {
      __typename?: "PublicOrganisation";
      id: string;
      name: string;
    };
  }>;
} & { " $fragmentName"?: "DataSourceCardFragment" };

export type ExternalDataSourceExternalDataSourceCardQueryVariables = Exact<{
  ID: Scalars["ID"]["input"];
}>;

export type ExternalDataSourceExternalDataSourceCardQuery = {
  __typename?: "Query";
  externalDataSource: { __typename?: "ExternalDataSource" } & {
    " $fragmentRefs"?: { DataSourceCardFragment: DataSourceCardFragment };
  };
};

export type TriggerFullUpdateMutationVariables = Exact<{
  externalDataSourceId: Scalars["String"]["input"];
}>;

export type TriggerFullUpdateMutation = {
  __typename?: "Mutation";
  triggerUpdate: {
    __typename?: "ExternalDataSourceAction";
    id: string;
    externalDataSource: {
      __typename?: "ExternalDataSource";
      id: any;
      name: string;
      crmType: string;
      jobs: Array<{
        __typename?: "QueueJob";
        status: ProcrastinateJobStatus;
        id: string;
        taskName: string;
        args: any;
        lastEventAt: any;
      }>;
    };
  };
};

export type ConstituencyStatsOverviewQueryVariables = Exact<{
  reportID: Scalars["ID"]["input"];
}>;

export type ConstituencyStatsOverviewQuery = {
  __typename?: "Query";
  mapReport: {
    __typename?: "MapReport";
    id: any;
    importedDataCountByConstituency: Array<{
      __typename?: "GroupedDataCount";
      label?: string | null;
      gss?: string | null;
      count: number;
      gssArea?: {
        __typename?: "Area";
        name: string;
        fitBounds?: any | null;
        mp?: {
          __typename?: "Person";
          id: string;
          name: string;
          photo?: { __typename?: "DjangoImageType"; url: string } | null;
          party?: { __typename?: "PersonData"; name: string } | null;
        } | null;
        lastElection?: {
          __typename?: "ConstituencyElectionResult";
          stats: {
            __typename?: "ConstituencyElectionStats";
            date: string;
            majority: number;
            electorate: number;
            firstPartyResult: {
              __typename?: "PartyResult";
              party: string;
              shade: string;
              votes: number;
            };
            secondPartyResult: {
              __typename?: "PartyResult";
              party: string;
              shade: string;
              votes: number;
            };
          };
        } | null;
      } | null;
    }>;
  };
};

export type EnrichmentLayersQueryVariables = Exact<{ [key: string]: never }>;

export type EnrichmentLayersQuery = {
  __typename?: "Query";
  mappingSources: Array<{
    __typename?: "MappingSource";
    slug: string;
    name: string;
    author?: string | null;
    description?: string | null;
    descriptionUrl?: string | null;
    sourcePaths: Array<{
      __typename?: "MappingSourcePath";
      label?: string | null;
      value: string;
      description?: string | null;
    }>;
    externalDataSource?: {
      __typename?: "SharedDataSource";
      crmType: string;
    } | null;
  }>;
};

export type GetMemberListQueryVariables = Exact<{ [key: string]: never }>;

export type GetMemberListQuery = {
  __typename?: "Query";
  myOrganisations: Array<{
    __typename?: "Organisation";
    externalDataSources: Array<{
      __typename?: "ExternalDataSource";
      id: any;
      name: string;
      importedDataCount: number;
      crmType: string;
      dataType: DataSourceType;
    }>;
    sharingPermissionsFromOtherOrgs: Array<{
      __typename?: "SharingPermission";
      externalDataSource: {
        __typename?: "SharedDataSource";
        id: any;
        name: string;
        importedDataCount: number;
        crmType: string;
        dataType: DataSourceType;
        organisation: { __typename?: "PublicOrganisation"; name: string };
      };
    }>;
  }>;
};

export type MapReportLayerGeoJsonPointQueryVariables = Exact<{
  genericDataId: Scalars["String"]["input"];
}>;

export type MapReportLayerGeoJsonPointQuery = {
  __typename?: "Query";
  importedDataGeojsonPoint?: {
    __typename?: "MapReportMemberFeature";
    id?: string | null;
    type: GeoJsonTypes;
    geometry: {
      __typename?: "PointGeometry";
      type: GeoJsonTypes;
      coordinates: Array<number>;
    };
    properties?: {
      __typename?: "GenericData";
      id: string;
      lastUpdate: any;
      name?: string | null;
      phone?: string | null;
      email?: string | null;
      json?: any | null;
      remoteUrl: string;
      postcodeData?: {
        __typename?: "PostcodesIOResult";
        postcode: string;
      } | null;
      dataType: {
        __typename?: "DataType";
        dataSet: {
          __typename?: "DataSet";
          externalDataSource: {
            __typename?: "ExternalDataSource";
            name: string;
          };
        };
      };
    } | null;
  } | null;
};

export type MapReportLayerAnalyticsQueryVariables = Exact<{
  reportID: Scalars["ID"]["input"];
}>;

export type MapReportLayerAnalyticsQuery = {
  __typename?: "Query";
  mapReport: {
    __typename?: "MapReport";
    id: any;
    layers: Array<{
      __typename?: "MapLayer";
      id: string;
      name: string;
      source: {
        __typename?: "SharedDataSource";
        id: any;
        organisation: { __typename?: "PublicOrganisation"; name: string };
      };
    }>;
  };
};

export type MapReportRegionStatsQueryVariables = Exact<{
  reportID: Scalars["ID"]["input"];
}>;

export type MapReportRegionStatsQuery = {
  __typename?: "Query";
  mapReport: {
    __typename?: "MapReport";
    id: any;
    importedDataCountByRegion: Array<{
      __typename?: "GroupedDataCount";
      label?: string | null;
      gss?: string | null;
      count: number;
      gssArea?: {
        __typename?: "Area";
        point?: {
          __typename?: "PointFeature";
          id?: string | null;
          type: GeoJsonTypes;
          geometry: {
            __typename?: "PointGeometry";
            type: GeoJsonTypes;
            coordinates: Array<number>;
          };
        } | null;
      } | null;
    }>;
  };
};

export type MapReportConstituencyStatsQueryVariables = Exact<{
  reportID: Scalars["ID"]["input"];
}>;

export type MapReportConstituencyStatsQuery = {
  __typename?: "Query";
  mapReport: {
    __typename?: "MapReport";
    id: any;
    importedDataCountByConstituency: Array<{
      __typename?: "GroupedDataCount";
      label?: string | null;
      gss?: string | null;
      count: number;
      gssArea?: {
        __typename?: "Area";
        point?: {
          __typename?: "PointFeature";
          id?: string | null;
          type: GeoJsonTypes;
          geometry: {
            __typename?: "PointGeometry";
            type: GeoJsonTypes;
            coordinates: Array<number>;
          };
        } | null;
      } | null;
    }>;
  };
};

export type MapReportWardStatsQueryVariables = Exact<{
  reportID: Scalars["ID"]["input"];
}>;

export type MapReportWardStatsQuery = {
  __typename?: "Query";
  mapReport: {
    __typename?: "MapReport";
    id: any;
    importedDataCountByWard: Array<{
      __typename?: "GroupedDataCount";
      label?: string | null;
      gss?: string | null;
      count: number;
      gssArea?: {
        __typename?: "Area";
        point?: {
          __typename?: "PointFeature";
          id?: string | null;
          type: GeoJsonTypes;
          geometry: {
            __typename?: "PointGeometry";
            type: GeoJsonTypes;
            coordinates: Array<number>;
          };
        } | null;
      } | null;
    }>;
  };
};

export type GetConstituencyDataQueryVariables = Exact<{
  gss: Scalars["String"]["input"];
  reportID: Scalars["ID"]["input"];
}>;

export type GetConstituencyDataQuery = {
  __typename?: "Query";
  constituency?: {
    __typename?: "Area";
    id: string;
    name: string;
    mp?: {
      __typename?: "Person";
      id: string;
      name: string;
      photo?: { __typename?: "DjangoImageType"; url: string } | null;
      party?: {
        __typename?: "PersonData";
        shade?: string | null;
        name: string;
      } | null;
    } | null;
    lastElection?: {
      __typename?: "ConstituencyElectionResult";
      stats: {
        __typename?: "ConstituencyElectionStats";
        date: string;
        electorate: number;
        validVotes: number;
        majority: number;
        firstPartyResult: {
          __typename?: "PartyResult";
          party: string;
          shade: string;
          votes: number;
        };
        secondPartyResult: {
          __typename?: "PartyResult";
          party: string;
          shade: string;
          votes: number;
        };
      };
    } | null;
  } | null;
  mapReport: {
    __typename?: "MapReport";
    id: any;
    importedDataCountForConstituency?: {
      __typename?: "GroupedDataCount";
      gss?: string | null;
      count: number;
    } | null;
    layers: Array<{
      __typename?: "MapLayer";
      id: string;
      name: string;
      source: {
        __typename?: "SharedDataSource";
        id: any;
        importedDataCountForConstituency?: {
          __typename?: "GroupedDataCount";
          gss?: string | null;
          count: number;
        } | null;
      };
    }>;
  };
};

export type UpdateExternalDataSourceMutationVariables = Exact<{
  input: ExternalDataSourceInput;
}>;

export type UpdateExternalDataSourceMutation = {
  __typename?: "Mutation";
  updateExternalDataSource: {
    __typename?: "ExternalDataSource";
    id: any;
    name: string;
    geographyColumn?: string | null;
    geographyColumnType: PostcodesIoGeographyTypes;
    postcodeField?: string | null;
    firstNameField?: string | null;
    lastNameField?: string | null;
    emailField?: string | null;
    phoneField?: string | null;
    addressField?: string | null;
    autoUpdateEnabled: boolean;
    updateMapping?: Array<{
      __typename?: "AutoUpdateConfig";
      source: string;
      sourcePath: string;
      destinationColumn: string;
    }> | null;
  };
};

export type PublicUserQueryVariables = Exact<{ [key: string]: never }>;

export type PublicUserQuery = {
  __typename?: "Query";
  publicUser?: {
    __typename?: "UserType";
    id: string;
    username: string;
    email: string;
  } | null;
};

export const MapReportLayersSummaryFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "MapReportLayersSummary" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "MapReport" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "layers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sharingPermission" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordDetails",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordCoordinates",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisation" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "source" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isImportScheduled" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "importedDataCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "recordUrlTemplate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "crmType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisation" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MapReportLayersSummaryFragment, unknown>;
export const MapReportPageFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "MapReportPage" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "MapReport" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "MapReportLayersSummary" },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "MapReportLayersSummary" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "MapReport" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "layers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sharingPermission" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordDetails",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordCoordinates",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisation" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "source" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isImportScheduled" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "importedDataCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "recordUrlTemplate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "crmType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisation" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MapReportPageFragment, unknown>;
export const DataSourceCardFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DataSourceCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ExternalDataSource" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "dataType" } },
          { kind: "Field", name: { kind: "Name", value: "crmType" } },
          { kind: "Field", name: { kind: "Name", value: "autoUpdateEnabled" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMapping" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "source" } },
                { kind: "Field", name: { kind: "Name", value: "sourcePath" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "destinationColumn" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "jobs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "lastEventAt" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sharingPermissions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organisation" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DataSourceCardFragment, unknown>;
export const ListOrganisationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListOrganisations" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myOrganisations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "externalDataSources" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "connectionDetails" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "AirtableSource" },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "baseId" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "tableId" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "InlineFragment",
                              typeCondition: {
                                kind: "NamedType",
                                name: {
                                  kind: "Name",
                                  value: "MailchimpSource",
                                },
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "apiKey" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "listId" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "crmType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "autoUpdateEnabled" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobs" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastEventAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "status" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updateMapping" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "source" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "sourcePath" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "destinationColumn",
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sharingPermissions" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organisation" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "sharingPermissionsFromOtherOrgs",
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "externalDataSource" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "crmType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organisation" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ListOrganisationsQuery,
  ListOrganisationsQueryVariables
>;
export const GetSourceMappingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetSourceMapping" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ID" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "externalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "autoUpdateEnabled" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateMapping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "destinationColumn" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sourcePath" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fieldDefinitions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "value" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "crmType" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumn" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumnType" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "postcodeField" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firstNameField" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastNameField" },
                },
                { kind: "Field", name: { kind: "Name", value: "emailField" } },
                { kind: "Field", name: { kind: "Name", value: "phoneField" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addressField" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSourceMappingQuery,
  GetSourceMappingQueryVariables
>;
export const TestDataSourceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TestDataSource" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TestDataSourceInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "testDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                { kind: "Field", name: { kind: "Name", value: "crmType" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fieldDefinitions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "value" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumn" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumnType" },
                },
                { kind: "Field", name: { kind: "Name", value: "healthcheck" } },
                { kind: "Field", name: { kind: "Name", value: "remoteName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TestDataSourceQuery, TestDataSourceQueryVariables>;
export const CreateSourceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateSource" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateExternalDataSourceInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createExternalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "code" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "crmType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataType" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateSourceMutation,
  CreateSourceMutationVariables
>;
export const AllExternalDataSourcesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AllExternalDataSources" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "externalDataSources" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "dataType" } },
                { kind: "Field", name: { kind: "Name", value: "crmType" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionDetails" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "AirtableSource" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "baseId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tableId" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "MailchimpSource" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "apiKey" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "listId" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "autoUpdateEnabled" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AllExternalDataSourcesQuery,
  AllExternalDataSourcesQueryVariables
>;
export const AutoUpdateCreationReviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AutoUpdateCreationReview" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ID" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "externalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumn" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumnType" },
                },
                { kind: "Field", name: { kind: "Name", value: "dataType" } },
                { kind: "Field", name: { kind: "Name", value: "crmType" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "autoUpdateEnabled" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateMapping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sourcePath" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "destinationColumn" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "jobs" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastEventAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                    ],
                  },
                },
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "DataSourceCard" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DataSourceCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ExternalDataSource" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "dataType" } },
          { kind: "Field", name: { kind: "Name", value: "crmType" } },
          { kind: "Field", name: { kind: "Name", value: "autoUpdateEnabled" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMapping" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "source" } },
                { kind: "Field", name: { kind: "Name", value: "sourcePath" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "destinationColumn" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "jobs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "lastEventAt" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sharingPermissions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organisation" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AutoUpdateCreationReviewQuery,
  AutoUpdateCreationReviewQueryVariables
>;
export const ExternalDataSourceInspectPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ExternalDataSourceInspectPage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ID" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "externalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "dataType" } },
                { kind: "Field", name: { kind: "Name", value: "remoteUrl" } },
                { kind: "Field", name: { kind: "Name", value: "crmType" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "connectionDetails" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "AirtableSource" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "apiKey" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "baseId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tableId" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "MailchimpSource" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "apiKey" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "listId" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastJob" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastEventAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "autoUpdateEnabled" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "webhookHealthcheck" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumn" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumnType" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "postcodeField" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firstNameField" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastNameField" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fullNameField" },
                },
                { kind: "Field", name: { kind: "Name", value: "emailField" } },
                { kind: "Field", name: { kind: "Name", value: "phoneField" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addressField" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isImportScheduled" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "importProgress" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "total" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "succeeded" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "estimatedFinishTime" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "isUpdateScheduled" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateProgress" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "status" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "total" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "succeeded" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "estimatedFinishTime" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "importedDataCount" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "fieldDefinitions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "value" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateMapping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sourcePath" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "destinationColumn" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sharingPermissions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organisationId" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ExternalDataSourceInspectPageQuery,
  ExternalDataSourceInspectPageQueryVariables
>;
export const DeleteUpdateConfigDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteUpdateConfig" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteExternalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "id" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteUpdateConfigMutation,
  DeleteUpdateConfigMutationVariables
>;
export const ImportDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ImportData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "importAll" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "externalDataSourceId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "externalDataSource" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "importedDataCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isImportScheduled" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "importProgress" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "status" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "total" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "succeeded" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "failed" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "estimatedFinishTime",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ImportDataMutation, ImportDataMutationVariables>;
export const ManageSourceSharingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ManageSourceSharing" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "externalDataSourceId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "externalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "externalDataSourceId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sharingPermissions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisationId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisation" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "externalDataSourceId" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordCoordinates",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordDetails",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deleted" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ManageSourceSharingQuery,
  ManageSourceSharingQueryVariables
>;
export const UpdateSourceSharingObjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateSourceSharingObject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SharingPermissionCUDInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateSharingPermission" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organisationId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "externalDataSourceId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityRecordCoordinates" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "visibilityRecordDetails" },
                },
                { kind: "Field", name: { kind: "Name", value: "deleted" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateSourceSharingObjectMutation,
  UpdateSourceSharingObjectMutationVariables
>;
export const DeleteSourceSharingObjectDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteSourceSharingObject" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "pk" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteSharingPermission" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pk" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteSourceSharingObjectMutation,
  DeleteSourceSharingObjectMutationVariables
>;
export const ExternalDataSourceNameDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ExternalDataSourceName" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "externalDataSourceId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "externalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "externalDataSourceId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "crmType" } },
                { kind: "Field", name: { kind: "Name", value: "dataType" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "remoteUrl" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ExternalDataSourceNameQuery,
  ExternalDataSourceNameQueryVariables
>;
export const ShareDataSourcesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ShareDataSources" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "fromOrgId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "permissions" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "SharingPermissionInput" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateSharingPermissions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "fromOrgId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "fromOrgId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "permissions" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "permissions" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sharingPermissions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisationId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "externalDataSourceId" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordCoordinates",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordDetails",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deleted" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ShareDataSourcesMutation,
  ShareDataSourcesMutationVariables
>;
export const YourSourcesForSharingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "YourSourcesForSharing" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myOrganisations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "externalDataSources" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "crmType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "importedDataCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fieldDefinitions" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "label" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisationId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sharingPermissions" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organisationId" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "externalDataSourceId",
                              },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "visibilityRecordCoordinates",
                              },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "visibilityRecordDetails",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "deleted" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  YourSourcesForSharingQuery,
  YourSourcesForSharingQueryVariables
>;
export const ShareWithOrgPageDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ShareWithOrgPage" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "orgSlug" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allOrganisations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filters" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "slug" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "orgSlug" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ShareWithOrgPageQuery,
  ShareWithOrgPageQueryVariables
>;
export const ListReportsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListReports" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "reports" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "lastUpdate" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ListReportsQuery, ListReportsQueryVariables>;
export const CreateMapReportDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateMapReport" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "MapReportInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createMapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "MapReport" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "OperationInfo" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "messages" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "message" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateMapReportMutation,
  CreateMapReportMutationVariables
>;
export const DeveloperApiContextDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "DeveloperAPIContext" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "listApiTokens" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "signature" } },
                { kind: "Field", name: { kind: "Name", value: "revoked" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeveloperApiContextQuery,
  DeveloperApiContextQueryVariables
>;
export const CreateTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateToken" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createApiToken" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "signature" } },
                { kind: "Field", name: { kind: "Name", value: "revoked" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTokenMutation, CreateTokenMutationVariables>;
export const RevokeTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RevokeToken" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "signature" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "revokeApiToken" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "signature" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "signature" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "signature" } },
                { kind: "Field", name: { kind: "Name", value: "revoked" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RevokeTokenMutation, RevokeTokenMutationVariables>;
export const VerifyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Verify" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "token" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "verifyAccount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "token" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "errors" } },
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyMutation, VerifyMutationVariables>;
export const ExampleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Example" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myOrganisations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ExampleQuery, ExampleQueryVariables>;
export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tokenAuth" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "errors" } },
                { kind: "Field", name: { kind: "Name", value: "success" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "token" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "token" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "payload" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "exp" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ResetPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "requestPasswordReset" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "errors" } },
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const RegisterDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Register" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password1" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password2" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password1" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password1" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password2" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password2" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "errors" } },
                { kind: "Field", name: { kind: "Name", value: "success" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ListExternalDataSourcesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ListExternalDataSources" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myOrganisations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "externalDataSources" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ListExternalDataSourcesQuery,
  ListExternalDataSourcesQueryVariables
>;
export const GetMapReportNameDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMapReportName" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMapReportNameQuery,
  GetMapReportNameQueryVariables
>;
export const GetMapReportDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMapReport" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "displayOptions" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organisation" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "MapReportPage" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "MapReportLayersSummary" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "MapReport" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "layers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sharingPermission" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordDetails",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "visibilityRecordCoordinates",
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisation" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "source" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isImportScheduled" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "importedDataCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "recordUrlTemplate" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "crmType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "organisation" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "MapReportPage" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "MapReport" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          {
            kind: "FragmentSpread",
            name: { kind: "Name", value: "MapReportLayersSummary" },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMapReportQuery, GetMapReportQueryVariables>;
export const UpdateMapReportDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateMapReport" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "MapReportInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "displayOptions" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "layers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateMapReportMutation,
  UpdateMapReportMutationVariables
>;
export const DeleteMapReportDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteMapReport" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "IDObject" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteMapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteMapReportMutation,
  DeleteMapReportMutationVariables
>;
export const AutoUpdateWebhookRefreshDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AutoUpdateWebhookRefresh" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ID" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "refreshWebhooks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "externalDataSourceId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "webhookHealthcheck" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AutoUpdateWebhookRefreshMutation,
  AutoUpdateWebhookRefreshMutationVariables
>;
export const ExternalDataSourceAutoUpdateCardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ExternalDataSourceAutoUpdateCard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ID" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "externalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "DataSourceCard" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DataSourceCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ExternalDataSource" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "dataType" } },
          { kind: "Field", name: { kind: "Name", value: "crmType" } },
          { kind: "Field", name: { kind: "Name", value: "autoUpdateEnabled" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMapping" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "source" } },
                { kind: "Field", name: { kind: "Name", value: "sourcePath" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "destinationColumn" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "jobs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "lastEventAt" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sharingPermissions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organisation" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ExternalDataSourceAutoUpdateCardQuery,
  ExternalDataSourceAutoUpdateCardQueryVariables
>;
export const EnableAutoUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "EnableAutoUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ID" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "enableAutoUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "externalDataSourceId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "autoUpdateEnabled" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "webhookHealthcheck" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EnableAutoUpdateMutation,
  EnableAutoUpdateMutationVariables
>;
export const DisableAutoUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DisableAutoUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ID" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "disableAutoUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "externalDataSourceId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "autoUpdateEnabled" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "webhookHealthcheck" },
                },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DisableAutoUpdateMutation,
  DisableAutoUpdateMutationVariables
>;
export const ExternalDataSourceExternalDataSourceCardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ExternalDataSourceExternalDataSourceCard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ID" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "externalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "DataSourceCard" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "DataSourceCard" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "ExternalDataSource" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "dataType" } },
          { kind: "Field", name: { kind: "Name", value: "crmType" } },
          { kind: "Field", name: { kind: "Name", value: "autoUpdateEnabled" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMapping" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "source" } },
                { kind: "Field", name: { kind: "Name", value: "sourcePath" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "destinationColumn" },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "jobs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "lastEventAt" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sharingPermissions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "organisation" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ExternalDataSourceExternalDataSourceCardQuery,
  ExternalDataSourceExternalDataSourceCardQueryVariables
>;
export const TriggerFullUpdateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TriggerFullUpdate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "externalDataSourceId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "triggerUpdate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "externalDataSourceId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "externalDataSourceId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "externalDataSource" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "jobs" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "status" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "taskName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "args" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastEventAt" },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "crmType" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TriggerFullUpdateMutation,
  TriggerFullUpdateMutationVariables
>;
export const ConstituencyStatsOverviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ConstituencyStatsOverview" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportID" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "importedDataCountByConstituency",
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "gss" } },
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gssArea" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fitBounds" },
                            },
                            {
                              kind: "Field",
                              alias: { kind: "Name", value: "mp" },
                              name: { kind: "Name", value: "person" },
                              arguments: [
                                {
                                  kind: "Argument",
                                  name: { kind: "Name", value: "filters" },
                                  value: {
                                    kind: "ObjectValue",
                                    fields: [
                                      {
                                        kind: "ObjectField",
                                        name: {
                                          kind: "Name",
                                          value: "personType",
                                        },
                                        value: {
                                          kind: "StringValue",
                                          value: "MP",
                                          block: false,
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "photo" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "url" },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    alias: { kind: "Name", value: "party" },
                                    name: {
                                      kind: "Name",
                                      value: "personDatum",
                                    },
                                    arguments: [
                                      {
                                        kind: "Argument",
                                        name: {
                                          kind: "Name",
                                          value: "filters",
                                        },
                                        value: {
                                          kind: "ObjectValue",
                                          fields: [
                                            {
                                              kind: "ObjectField",
                                              name: {
                                                kind: "Name",
                                                value: "dataType_Name",
                                              },
                                              value: {
                                                kind: "StringValue",
                                                value: "party",
                                                block: false,
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          alias: {
                                            kind: "Name",
                                            value: "name",
                                          },
                                          name: { kind: "Name", value: "data" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lastElection" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "stats" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "date" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "majority",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "electorate",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "firstPartyResult",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "party",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "shade",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "votes",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "secondPartyResult",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "party",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "shade",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "votes",
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConstituencyStatsOverviewQuery,
  ConstituencyStatsOverviewQueryVariables
>;
export const EnrichmentLayersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "EnrichmentLayers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mappingSources" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "author" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "descriptionUrl" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sourcePaths" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "value" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "externalDataSource" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "crmType" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  EnrichmentLayersQuery,
  EnrichmentLayersQueryVariables
>;
export const GetMemberListDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMemberList" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myOrganisations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "externalDataSources" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filters" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "dataType" },
                            value: { kind: "EnumValue", value: "MEMBER" },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "importedDataCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "crmType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataType" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "sharingPermissionsFromOtherOrgs",
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "externalDataSource" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "importedDataCount",
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "crmType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataType" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organisation" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMemberListQuery, GetMemberListQueryVariables>;
export const MapReportLayerGeoJsonPointDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MapReportLayerGeoJSONPoint" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "genericDataId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "importedDataGeojsonPoint" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "genericDataId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "genericDataId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geometry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "coordinates" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "properties" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lastUpdate" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "postcodeData" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "postcode" },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "json" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "remoteUrl" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dataType" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "dataSet" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "externalDataSource",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MapReportLayerGeoJsonPointQuery,
  MapReportLayerGeoJsonPointQueryVariables
>;
export const MapReportLayerAnalyticsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MapReportLayerAnalytics" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportID" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "layers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "organisation" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MapReportLayerAnalyticsQuery,
  MapReportLayerAnalyticsQueryVariables
>;
export const MapReportRegionStatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MapReportRegionStats" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportID" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "importedDataCountByRegion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "gss" } },
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gssArea" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "point" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "geometry" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "type" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "coordinates",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MapReportRegionStatsQuery,
  MapReportRegionStatsQueryVariables
>;
export const MapReportConstituencyStatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MapReportConstituencyStats" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportID" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "importedDataCountByConstituency",
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "gss" } },
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gssArea" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "point" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "geometry" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "type" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "coordinates",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MapReportConstituencyStatsQuery,
  MapReportConstituencyStatsQueryVariables
>;
export const MapReportWardStatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MapReportWardStats" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportID" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "mapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "importedDataCountByWard" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      { kind: "Field", name: { kind: "Name", value: "gss" } },
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gssArea" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "point" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "geometry" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "type" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "coordinates",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MapReportWardStatsQuery,
  MapReportWardStatsQueryVariables
>;
export const GetConstituencyDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetConstituencyData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "gss" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "reportID" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "constituency" },
            name: { kind: "Name", value: "area" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "gss" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "gss" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  alias: { kind: "Name", value: "mp" },
                  name: { kind: "Name", value: "person" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filters" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "personType" },
                            value: {
                              kind: "StringValue",
                              value: "MP",
                              block: false,
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "photo" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "url" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        alias: { kind: "Name", value: "party" },
                        name: { kind: "Name", value: "personDatum" },
                        arguments: [
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "filters" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: {
                                    kind: "Name",
                                    value: "dataType_Name",
                                  },
                                  value: {
                                    kind: "StringValue",
                                    value: "party",
                                    block: false,
                                  },
                                },
                              ],
                            },
                          },
                        ],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              alias: { kind: "Name", value: "name" },
                              name: { kind: "Name", value: "data" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "shade" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastElection" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "stats" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "date" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "electorate" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "validVotes" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "majority" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "firstPartyResult" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "party" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "shade" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "votes" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "secondPartyResult",
                              },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "party" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "shade" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "votes" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "mapReport" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "reportID" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "importedDataCountForConstituency",
                  },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "gss" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "gss" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "gss" } },
                      { kind: "Field", name: { kind: "Name", value: "count" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "layers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "importedDataCountForConstituency",
                              },
                              arguments: [
                                {
                                  kind: "Argument",
                                  name: { kind: "Name", value: "gss" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "gss" },
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "gss" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "count" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetConstituencyDataQuery,
  GetConstituencyDataQueryVariables
>;
export const UpdateExternalDataSourceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateExternalDataSource" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ExternalDataSourceInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateExternalDataSource" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumn" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "geographyColumnType" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "postcodeField" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "firstNameField" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lastNameField" },
                },
                { kind: "Field", name: { kind: "Name", value: "emailField" } },
                { kind: "Field", name: { kind: "Name", value: "phoneField" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "addressField" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "autoUpdateEnabled" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "updateMapping" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "source" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sourcePath" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "destinationColumn" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateExternalDataSourceMutation,
  UpdateExternalDataSourceMutationVariables
>;
export const PublicUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PublicUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publicUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublicUserQuery, PublicUserQueryVariables>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    AirtableSourceMailchimpSource: ["AirtableSource", "MailchimpSource"],
    Analytics: [
      "AirtableSource",
      "ExternalDataSource",
      "MailchimpSource",
      "MapReport",
      "SharedDataSource",
    ],
    CommonData: ["AreaData", "GenericData", "PersonData"],
    CreateMapReportPayload: ["MapReport", "OperationInfo"],
    Feature: ["MapReportMemberFeature", "MultiPolygonFeature", "PointFeature"],
    OutputInterface: ["ObtainJSONWebTokenType"],
  },
};
export default result;
