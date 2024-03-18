import { Button } from "@/components/ui/button";
import { useRequireNoAuth } from "../../../hooks/auth";
import RegisterForm from "./register-form";
import Link from "next/link";
import { Metadata } from "next";

// This has been split into a two components to separate the client-side (RegisterForm)
// and the server side (this component), which allows using useRequireNoAuth() here
export default async function Login() {
  await useRequireNoAuth();

  return (
    <div className='m-8 md:ml-36 max-w-xs space-y-4 rounded border border-meepGray-600 bg-meepGray-800 p-8'>
      <h1 className='text-hLg font-IBMPlexSans'>Sign up</h1>
      <RegisterForm />
      <div aria-roledescription="divider" className="border-t border-meepGray-600"></div>
      <div className='text-labelMain text-meepGray-400'>Already have an account?</div>
      <Link href="/login" className='block'>
        <Button className='w-full' variant='outline' size="sm">
          Login
        </Button>
      </Link>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Signup",
};