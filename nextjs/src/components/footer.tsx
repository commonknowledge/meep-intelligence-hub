import { CommonKnowledgeLogo, CiviPowerFundLogo } from '@/components/logos';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mx-16 py-8 flex flex-row justify-between items-center border-t border-meepGray-700">
            <div className="flex flex-row items-center gap-[100px] pt-md">
                <Link href="https://commonknowledge.coop/"><CommonKnowledgeLogo /></Link>
                <Link href="https://www.civicpower.org.uk/">   <CiviPowerFundLogo /></Link></div>
            <Link href="/" className="text-muted font-IBMPlexMono text-[15px] tracking-[-0.3px] leading-[150%]">Privacy policy</Link>
        </footer>)


}
