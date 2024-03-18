import { Metadata } from "next";
import { useRequireAuth } from "../../../hooks/auth";
import YourOrganisations from "./your-organisations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Account() {
  const user = await useRequireAuth();

  return (
    <>
    
      <h1 className="mb-10 text-hLg">Welcome to your Mapped Account, {user.username}</h1>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="mb-5">
          <TabsTrigger value="account">Account Information</TabsTrigger>
          <TabsTrigger value="Table">Your organisations</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex flex-col gap-5">
            <div>
              <span className="label text-meepGray-300">Username</span>
              <div>{user.username}</div>
            </div>
            <div>
              <span className="label text-meepGray-300">Email</span>
              <div>{user.email}</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="Table">
          <YourOrganisations />
        </TabsContent>
      </Tabs>

    </>
  );
}

export const metadata: Metadata = {
  title: "Your Account",
};