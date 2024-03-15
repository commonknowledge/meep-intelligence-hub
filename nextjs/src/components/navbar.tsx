'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation'

import { cn } from "@/lib/utils"
import * as React from "react"


import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Mail } from "lucide-react";



interface NavbarProps {
  isLoggedIn: boolean;
}


const crmSync: { title: string; href: string; description: string }[] = [
  {
    title: "Airtable",
    href: "/crm/airtable",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Action Network",
    href: "/crm/action-network",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Zetkin",
    href: "/crm/Zetkin",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Don't see your CRM?",
    href: "/crm/Zetkin",
    description:
      "Make a request",
  },
]


export default function Navbar({ isLoggedIn }: NavbarProps) {
  const pathname = usePathname()

  function MappedIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="29" height="43" viewBox="0 0 29 43" fill="none">
        <circle cx="14.7351" cy="14.2833" r="13.9737" fill="#678DE3" />
        <path d="M16.3481 39.9C15.6435 41.1625 13.8271 41.1625 13.1226 39.9L2.23064 20.3842C1.54355 19.153 2.43356 17.6371 3.84342 17.6371L25.6273 17.6371C27.0371 17.6371 27.9271 19.1531 27.24 20.3842L16.3481 39.9Z" fill="#678DE3" />
      </svg>
    )
  }

  function CollapsibleIcon() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1.74599 0.12793L5.09712 3.47176L8.44825 0.12793L9.47769 1.15736L5.09712 5.53793L0.716553 1.15736L1.74599 0.12793Z" fill="white" />
      </svg>
    )
  }
  return (
    <>
      {isLoggedIn ? (
        <nav className='flex flex-row justify-start items-stretch gap-md font-IBMPlexSansCondensed text-lg border-b border-meepGray-700 px-sm'>
          <Link href='/' className="py-sm"><MappedIcon /></Link>
          <Link
            className={`link ${pathname === '/reports' ? 'active' : 'flex items-center'}`}
            href="/reports"
          >
            Reports
          </Link>
          <Link
            className={`link ${pathname === '/data-layers' ? 'active' : 'flex items-center'}`}
            href="/data-layers"
          >
            Data layers
          </Link>
          <Link
            className={`link ${pathname === '/external-data-source-updates' ? 'active' : 'flex items-center'}`}
            href="/external-data-source-updates"
          >
            CRM Data Sync
          </Link>
          <div className="ml-auto flex items-stretch gap-md ">
            <Link
              className={`link ${pathname === '/account' ? 'active' : 'flex items-center'}`}
              href="/account"
            >
              Account
            </Link>
            <div className="flex items-center">
              <Link href="/logout" className={twMerge('', buttonVariants({ variant: "brand" }))}>Logout</Link>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="p-sm">
          <ul className="flex flex-row">
            <div className="flex flex-row items-center gap-xs">
              <Link className="pl-xs" href='/'><MappedIcon />
              </Link>
              <div className="flex flex-col">
                <Link href='/'>
                  <div className="text-hLg font-PPRightGrotesk">Mapped</div>
                  <p className="text-[9px] tracking-[-0.185px]"><em>by</em> Common Knowledge</p>
                </Link>
              </div>
            </div>


            <div className="basis-1/2 flex flex-row items-center justify-center  gap-md grow">

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-meepGray-700 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <div className="mb-2 mt-4 text-hMd font-medium">
                                ✊
                                Empowering the movement
                              </div>
                              <p className="text-sm leading-tight text-meepGray-400">
                                Stay up to date with new ways to empower your organising.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/features/member-maps" title="Member Maps">
                          Simple but effective geographic mapping of your people
                        </ListItem>
                        <ListItem href="/features/data-enrichment" title="Data Enrichment">
                          Unlock new insights for your campaign
                        </ListItem>
                        <ListItem href="/features/crm-sync" title="Sync with your CRM">
                          Sync your member list seamlessly
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Integrate</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {crmSync.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/support" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Support
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/About" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div>
              <li>
                <Link href="/login" className={buttonVariants({ variant: "brand" })}>Login</Link></li>
            </div>
          </ul>
        </nav>
      )}
    </>
  )
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-meepGray-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
