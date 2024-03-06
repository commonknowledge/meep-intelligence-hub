import { Inter } from "next/font/google";

import Link from "next/link";
import "./globals.css";
import { ApolloWrapper } from "@/components/apollo-wrapper";
import { useAuth } from "@/hooks/auth";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>
          <nav className="bg-gray-800 text-white flex flex-row justify-end">
            <ul className="flex flex-row items-center justify-between p-12 basis-1/2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/account">Account</Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <Link href="/logout">Logout</Link>
                </li>
              ) : (
                <li>
                  <Link href="/login">Login</Link>
                </li>
              )}
            </ul>
          </nav>
          <main className="flex flex-col items-center justify-between p-24">
            {children}
          </main>
        </body>
      </html>
    </ApolloWrapper>
  );
}
