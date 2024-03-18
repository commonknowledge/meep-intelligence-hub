import {
  ApolloClient,
  FetchResult,
  gql,
  useApolloClient,
} from "@apollo/client";
import { getSourceOptionForTypename } from "@/lib/data";
import { ExternalDataSourceCardFieldsFragment } from "@/__generated__/graphql";

export function ExternalDataSourceCard({
  externalDataSource,
}: {
  externalDataSource: ExternalDataSourceCardFieldsFragment
}) {
  const Logo = getSourceOptionForTypename(
    externalDataSource.connectionDetails.crmType,
  )!.logo;

  return (
    <article className="rounded-xl border border-meepGray-600 px-6 py-5 space-y-3">
      <header className="flex flex-row justify-between items-start">
        <div className='space-y-3'>
          <Logo className='w-20'/>
          <h3 className="text-hSm">
            {externalDataSource?.name || externalDataSource?.connectionDetails?.crmType}
          </h3>
        </div>
      </header>
    </article>
  );
}

export const EXTERNAL_DATA_SOURCE_CARD_FRAGMENT = gql`
  fragment ExternalDataSourceCardFields on ExternalDataSource {
    id
    name
    connectionDetails {
      crmType: __typename
    }
  }
`;

export const GET_EXTERNAL_DATA_SOURCE_CARD = gql`
  query ExternalDataSourceCard($ID: ID!) {
    externalDataSource(pk: $ID) {
      ...ExternalDataSourceCardFields
    }
  }
  ${EXTERNAL_DATA_SOURCE_CARD_FRAGMENT}
`;
