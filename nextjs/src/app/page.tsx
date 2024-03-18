import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link';

export default function Home() {
  return (
    <div className='p-8'>
      <h1 className="text-hXlg tracking-[-1.47px] font-light font-IBMPlexSans w-[915px] mb-6">
      Empowering <span className="font-PPRightGrotesk font-bold text-[84.468px] tracking-normal">organisers</span> and <span className="font-PPRightGrotesk font-bold text-[84.468px] tracking-normal">activists</span> with mapping tools and data enrichment ✊</h1>
      <p className="text-base w-[582px] mb-9">Take your organising to the next level with our free to use tools that enhance your existing membership lists with geographic and political data. </p>
      <Link href="/" className={buttonVariants({ variant: "brand" })}>Get started</Link>
    </div>
  );
}
