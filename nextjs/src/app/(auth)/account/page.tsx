import { Metadata } from "next";
import { useRequireAuth } from "../../../hooks/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YourOrganisations from "./your-organisations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Account() {
  const user = await useRequireAuth();

  return (
    <div className="grid grid-cols-1 gap-6">
      <h1 className="text-hLg">
        Welcome to your Mapped Account, {user.username}
      </h1>
      <YourOrganisations />
      <Card className="">
        <CardHeader className="p-4">
          <CardTitle>Your email</CardTitle>
        </CardHeader>
        <CardContent className="px-4">{user.email}</CardContent>
      </Card>
      <Card x-chunk="dashboard-04-chunk-2">
        <CardHeader className="p-4">
          <CardTitle>Your organisations</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <YourOrganisations />
        </CardContent>
      </Card>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Your Account",
};
