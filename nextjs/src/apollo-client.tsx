
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from "@apollo/client";

const httpLink = new HttpLink({ uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql` });

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = typeof window === 'undefined' ? null : localStorage.getItem('jwt');
    // return the headers to the context so httpLink can read them
    const config = {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : "",
        }
    }
    return config
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});