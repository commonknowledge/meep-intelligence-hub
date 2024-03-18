import { Metadata } from "next";

export default function GraphiQL ({ children }: { children: React.ReactNode }) {
  return <div className='h-[100dvh]'>{children}</div>
}

export const metadata: Metadata = {
  title: "GraphiQL",
};