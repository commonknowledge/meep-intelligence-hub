
import { useAuth } from "@/hooks/auth";



export default async function FeaturesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (

        <main className="flex justify-center ">
            <div className="max-w-4xl">
                {children}
            </div>


        </main>

    );
}
