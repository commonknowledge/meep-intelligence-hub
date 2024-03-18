import { AreaPattern } from "@/components/areaPattern";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useAuth } from "@/hooks/auth";
import { Toaster } from "sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useAuth();
  const isLoggedIn = Boolean(user);

  return (
    <div className='flex flex-col min-h-dvh'>
      <AreaPattern />
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="p-4 sm:p-8 md:p-20 relative 2xl:p-24">
          {children}
      </main>
      <Toaster />
      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  );
}