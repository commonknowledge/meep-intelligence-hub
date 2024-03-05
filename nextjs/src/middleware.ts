import { NextRequest, NextResponse } from 'next/server';

/**
 * Store the current pathname on a header that can be read
 * by server components. Used to handle redirecting to
 * login when trying to access a protected page while
 * logged out.
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}
