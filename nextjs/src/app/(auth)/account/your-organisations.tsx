"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const YOUR_ORGANISATIONS = gql`
  query Example {
    organisations {
      id
      name
    }
  }
`

export default function YourOrganisations() {
  const { data, error, loading } = useQuery(YOUR_ORGANISATIONS);

  if (error) {
    return <p className="text-red-500">Error: {String(error)}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

    const orgs = data?.organisations || [];

    return (
      <div>
        {orgs.map((a: { id: string, name: string }) => (
          <div key={a.id}>
            {a.name}
          </div>
        ))}
      </div>
    )
}
