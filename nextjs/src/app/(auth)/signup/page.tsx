import WaitlistForm from "@/components/WaitListSignUp";
import { useRequireNoAuth } from "@/hooks/auth";
import RegisterForm from "./register-form";
import { Metadata } from "next";

// This has been split into a two components to separate the client-side (RegisterForm)
// and the server side (this component), which allows using useRequireNoAuth() here
export default async function Login() {
  await useRequireNoAuth();

  return (
    <div className="m-8 text-center">
      <h1 className="text-hLg font-IBMPlexSans mb-8">Join the waitlist ⏳</h1>
      <p className="max-w-md text-center my-8 mx-auto text-lg">
        We{"'"}re just getting started and we want to work closely with
        organisers to make sure we{"'"}re building the right tools and building
        them right.
      </p>
      {process.env.NEXT_PUBLIC_ALLOW_SIGNUPS ? (
        <RegisterForm />
      ) : (
        <WaitlistForm />
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Signup",
};
