import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { ReactNode } from 'react';


interface MarkertingPageHeaderProps {
    featureName: string;
    heading: ReactNode;
    description: string;
    btnLink: string;
}

const MarketingPageHeader: React.FC<MarkertingPageHeaderProps> = ({ featureName, heading, description, btnLink }) => {
    return (
        <header className="flex flex-col gap-10 items-center shrink text-center">
                  <p className="text-meepGray-300 -mb-5">{featureName}</p>

            <h1 className="text-hXlg font-light font-IBMPlexSans">{heading}</h1>
            <p className="text-meepGray-300 max-w-prose">{description}</p>
            <Link href={btnLink} className={buttonVariants({ variant: "brand" })}>Get started</Link>
        </header>
    )
}




export default MarketingPageHeader


