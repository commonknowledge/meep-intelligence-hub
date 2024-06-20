import env from 'env-var'

export const BACKEND_URL = env.get('NEXT_PUBLIC_BACKEND_URL').default("http://127.0.0.1:8000").asString()
export const GRAPHQL_URL = new URL('/graphql', BACKEND_URL).toString()
export const FRONTEND_URL = env.get('NEXT_PUBLIC_FRONTEND_URL').default("http://localhost:3000").asString()
export const FRONTEND_HOSTNAME = new URL(FRONTEND_URL).hostname.split(':')[0]