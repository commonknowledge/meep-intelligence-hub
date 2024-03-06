import { useRequireAuth } from "../../hooks/auth";
import LoginForm from "./login-form";

// LoginForm has been split out as it is requires "use client"
// which does not work with the server-side useRequireAuth()
export default async function Login() {
  await useRequireAuth();

  return <LoginForm />;
}
