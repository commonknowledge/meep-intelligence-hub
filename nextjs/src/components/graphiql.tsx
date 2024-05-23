"use client";

import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL, GraphiQLProps } from "graphiql";
import React, { useMemo } from "react";
import "graphiql/graphiql.css";
import { authenticationHeaders } from "@/lib/auth";
import { ErrorBoundary } from "@sentry/nextjs";

export function GraphQLPlayground(props: Partial<GraphiQLProps>) {
  const fetcher = useMemo(function getAuthenticatedFetcher() {
    if (typeof window === "undefined") return null;
    try {
      return createGraphiQLFetcher({
        url: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
        headers: authenticationHeaders(),
      });
    } catch (e) {
      console.error(e);
      return createGraphiQLFetcher({
        url: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/graphql`,
      });
    }
  }, []);
  if (!fetcher) return null;
  return (
    <ErrorBoundary>
      <GraphiQL {...props} fetcher={fetcher} />
    </ErrorBoundary>
  );
}
