import { AuthUserQuery, LoginMutation, LoginMutationVariables } from "@/__generated__/graphql"
import { LOGIN_MUTATION } from "@/app/(auth)/login/login-form"
import { gql } from "@apollo/client"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Cookies from 'js-cookie';
import { backendApolloClient } from "@/services/apollo-api-client"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'email & password',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const tokenQuery = await backendApolloClient.mutate<LoginMutation, LoginMutationVariables>({
            mutation: gql`
              mutation LoginBackend($username: String!, $password: String!) {
                tokenAuth(username: $username, password: $password) {
                  errors
                  success
                  token {
                    token
                    payload {
                      exp
                    }
                  }
                }
              }
            `,
            variables: credentials
          })

          if (!tokenQuery.data?.tokenAuth.token?.token) {
            return null
          }

          const token = tokenQuery.data?.tokenAuth?.token
          const cookieExpires = new Date(token?.payload?.exp);
          Cookies.set('jwt', token?.token, { expires: cookieExpires });

          const userQuery = await backendApolloClient.query<AuthUserQuery>({
            query: gql`
              query AuthUser {
                me {
                  id
                  email
                  username
                }
              }
            `
          })

          // If no error and we have user data, return it
          if (!userQuery.errors && userQuery.data?.me) {
            return userQuery.data.me
          }
          // Return null if user data could not be retrieved
          return null
        } catch (error) {
          console.error(error)
          return null
        }
      }
    })
  ]
})

export { handler as GET, handler as POST }