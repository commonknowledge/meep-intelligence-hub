import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import GetStarted from "@/components/marketing/GetStarted";

export default async function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center ">
      <div className="flex flex-col items-center max-w-7xl">{children}</div>
    </main>
  );
}
