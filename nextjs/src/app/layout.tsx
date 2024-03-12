import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import Link from "next/link";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { ApolloWrapper } from "@/components/apollo-wrapper";
import { useAuth } from "@/hooks/auth";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { AreaPattern } from "@/components/areaPattern";
import { NavigationMenuDemo } from "@/components/nav-v2";



function MappedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="43"
      viewBox="0 0 29 43"
      fill="none"
    >
      <circle cx="14.7351" cy="14.2833" r="13.9737" fill="#678DE3" />
      <path
        d="M16.3481 39.9C15.6435 41.1625 13.8271 41.1625 13.1226 39.9L2.23064 20.3842C1.54355 19.153 2.43356 17.6371 3.84342 17.6371L25.6273 17.6371C27.0371 17.6371 27.9271 19.1531 27.24 20.3842L16.3481 39.9Z"
        fill="#678DE3"
      />
    </svg>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await useAuth();
  const isLoggedIn = Boolean(user);

  return (
    <ApolloWrapper>
      <html lang="en">
        <body>
        {!isLoggedIn && <AreaPattern/>}
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="p-20 relative">{children}</main>
          <Toaster />
          {!isLoggedIn && (
            <Footer/>
          )}
        </body>
      </html>
    </ApolloWrapper>
  );
}
