import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { gql } from "@apollo/client";

import { getClient } from "@/services/apollo-client";
import { isClient } from "@/util";

const USER_QUERY = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

const getPathname = (): string => {
  if (isClient()) {
    return window.location.pathname;
  }
  // nextjs doesn't yet have an easy way to get the pathname on the backend
  // this header is set in a custom middleware (see middleware.ts)
  const headerMap = headers();
  return headerMap.get("x-pathname") || "/";
};

interface User {
  id: string;
  username: string;
}

export const useAuth = async (): Promise<User> => {
  const client = getClient();

  let data = null;
  try {
    const response = await client.query({ query: USER_QUERY });
    data = response.data;
  } catch (e: any) {
    console.error(e.message);
  }
  return data?.me;
};

export const useRequireAuth = async () => {
  const user = await useAuth();
  const path = getPathname();

  // If the user is logged in and the current path is "/login", redirect to the account page.
  if (user && path === "/login") {
    redirect("/account");
  }

  // If there's no user and the current path is not "/login", redirect to the login page.
  if (!user && path !== "/login") {
    redirect("/login");
  }

  return user;
};
