import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from 'js-cookie'

export const getJwt = (): string | undefined => {
    return Cookies.get("jwt");
};

export const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
});

export const authLink = setContext((_, { headers }) => {
    const token = getJwt();
    const config = {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : "",
        },
    };
    return config;
});