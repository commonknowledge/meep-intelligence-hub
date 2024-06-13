import { ApolloLink, HttpLink, gql } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { authLink, httpLink } from "./apollo";
import Cookies from 'js-cookie'

const getJwt = (): string | undefined => {
  return Cookies.get("jwt");
};

/**
 * Creates an apollo client that can be used in server-side components.
 * Example:
 *
 *     import { getClient } from "@/services/apollo-client.ts";
 *
 *     const MY_QUERY = gql`
 *         {
 *             ...
 *         }
 *     `
 *
 *     export default async function MyPage() {
 *         let data = null
 *         try {
 *             const response = await getClient().query({ query: MY_QUERY })
 *             data = response.data
 *         } catch (e) {
 *             console.error(e.message)
 *         }
 *         return <div>{JSON.stringify(data)}</div>
 *     }
 *
 * This will not work if "use client" is present. For client components,
 * use the useQuery() hook (see components/apollo-wrapper.tsx).
 */

const makeBackEndClient = () => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  });
};

export const { getClient } = registerApolloClient(() => {
  return makeBackEndClient();
});
