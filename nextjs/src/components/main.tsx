"use client";

import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo-client';


export default function Main({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ApolloProvider client={client}>
            <main className="flex flex-col items-center justify-between p-24">{children}</main>
        </ApolloProvider>
    )
}
