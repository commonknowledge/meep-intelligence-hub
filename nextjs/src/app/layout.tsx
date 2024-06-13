import "./globals.css";
import { ApolloWrapper } from "@/components/apollo-wrapper";
import NextTopLoader from 'nextjs-toploader';
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import { openGraphImage } from './shared-metadata'
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react"

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ApolloWrapper>
        <html lang="en">
          <PHProvider>
            <body>
              <Suspense>
                <PostHogPageView />
              </Suspense>
              <NextTopLoader />
              {children}
            </body>
          </PHProvider>
        </html>
      </ApolloWrapper>
    </SessionProvider>
  );
}

export const metadata: Metadata = {
  openGraph: {
    ...openGraphImage,
  },
  title: {
    template: '%s | Mapped by Common Knowledge',
    default: 'Mapped by Common Knowledge', // a default is required when creating a template
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || 'http://localhost:3000'),
}
