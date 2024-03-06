import { useRequireAuth } from "../../hooks/auth";
import LogoutForm from "./logout-form";

// This has been split into a two components to separate the client-side (LogoutForm)
// and the server side (this component), which allows using useRequireAuth() here
export default async function Logout() {
  await useRequireAuth();

  return <LogoutForm />;
}
