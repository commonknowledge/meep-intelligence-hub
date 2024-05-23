import { redirect } from "next/navigation";
import { gql } from "@apollo/client";
import { getClient } from "@/services/apollo-client";
import { PublicUserQuery } from "@/__generated__/graphql";

const USER_QUERY = gql`
  query PublicUser {
    publicUser {
      id
      username
      email
    }
  }
`;

export const useAuth = async () => {
  const client = getClient();

  let data = null;
  try {
    const response = await client.query<PublicUserQuery>({ query: USER_QUERY });
    data = response.data;
  } catch (e: any) {
    console.error(e.message);
  }
  return data?.publicUser;
};

export const useRequireAuth = async () => {
  const user = await useAuth();

  if (!user) {
    redirect("/login");
  }

  return user;
};

export const useRequireNoAuth = async () => {
  const user = await useAuth();

  if (user) {
    redirect("/");
  }

  return user;
};
