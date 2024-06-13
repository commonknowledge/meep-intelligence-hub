import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { authLink, httpLink } from "./apollo";

export const backendApolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
});