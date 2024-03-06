"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";

/**
 * Creates an apollo client that can be used in client components.
 * This client is provided to components through the <ApolloWrapper>
 * below, which is used in the RootLayout (see layout.tsx).
 *
 * To use the apollo client in client components:
 *
 *     "use client";
 *
 *     import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
 *
 *     const MY_QUERY = gql`
 *         {
 *             ...
 *         }
 *     `
 *
 *     export default function MyPage() {
 *         const { data, error, loading } = useQuery(MY_QUERY);
 *     }
 *
 * The "use client" is required. For server components (no use client),
 * see services/apollo-client.ts.
 */
function makeFrontEndClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : "",
      },
    };
    return config;
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeFrontEndClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
