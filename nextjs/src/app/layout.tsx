import { Inter } from "next/font/google";
import Link from 'next/link';

import "./globals.css";
import Main from "../components/main";
import { getAuthToken } from "../hooks/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = Boolean(getAuthToken());
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white flex flex-row justify-end">
          <ul className="flex flex-row items-center justify-between p-12 basis-1/2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/account">Account</Link></li>
            {isLoggedIn ? (
              <li><Link href="/logout">Logout</Link></li>
            ) : (
              <li><Link href="/login">Login</Link></li>
            )}
          </ul>
        </nav>
        <Main>
          {children}
        </Main>
      </body>
    </html>
  );
}
