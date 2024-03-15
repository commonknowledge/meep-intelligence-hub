
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";



export default async function FeaturesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (

        <main className="flex justify-center ">
            <div className="max-w-4xl flex flex-col items-center ">
                {children}
                <div className="space-x-2">
                    <Link href="/login" className={buttonVariants({ variant: "brand" })}>Get Started</Link>
                    <Link href="/about" className={buttonVariants({ variant: "default" })}>Learn more about us</Link>
                </div>
            </div>
        </main>

    );
}
