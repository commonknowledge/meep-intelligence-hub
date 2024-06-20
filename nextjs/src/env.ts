export const BACKEND_URL =process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"
export const GRAPHQL_URL = new URL('/graphql', BACKEND_URL).toString()
export const FRONTEND_URL =process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"
export const FRONTEND_HOSTNAME = new URL(FRONTEND_URL).hostname.split(':')[0]