import { NextRequest, NextResponse } from "next/server";
import type { NextMiddleware } from "next/server";
import { FRONTEND_HOSTNAME } from "./env";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|markers/|[\\w-]+\\.\\w+).*)",
  ],
};

export const middleware: NextMiddleware = (req) => {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Don't process Sentry requests
  // (see next.config.js Sentry tunnelRoute)
  if (req.nextUrl.pathname === "/monitoring") {
    return response
  }

  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .split(":")[0]

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${FRONTEND_HOSTNAME}`;
  }

  // For the main app domain, continue as normal
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === FRONTEND_HOSTNAME
  ) {
    return response
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // Rewrite all custom domains to the microsite renderer
  return NextResponse.rewrite(new URL(`/hub/render/${hostname}${path}`, req.url));
}