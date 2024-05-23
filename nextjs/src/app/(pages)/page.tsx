import { useAuth } from "@/hooks/auth";
import Dashboard from "./Dashboard";
import MarketingHome from "./MarketingHome";

export default async function Home() {
  const user = await useAuth();

  return (
    <div className="">
      {user ? <Dashboard user={user} /> : <MarketingHome />}
    </div>
  );
}
