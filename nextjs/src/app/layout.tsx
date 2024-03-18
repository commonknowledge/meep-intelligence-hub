import "./globals.css";
import { ApolloWrapper } from "@/components/apollo-wrapper";
import { Metadata } from 'next'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloWrapper>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ApolloWrapper>
  );
}
 
export const metadata: Metadata = {
  title: {
    template: '%s | Mapped by CK',
    default: 'Mapped by Common Knowledge', // a default is required when creating a template
  },
}