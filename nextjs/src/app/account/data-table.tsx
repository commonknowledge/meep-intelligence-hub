"use client"

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const EXAMPLE_QUERY = gql`
query Areas {
    areas {
        id
        name
    }
}
`

export default function DataTable() {
    const { data, error, loading } = useQuery(EXAMPLE_QUERY);

    if (error) {
        return <p className="text-red-500">Error: {String(error)}</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }

    const areas = data?.areas || [];

    return (
        <table className="border-collapse table-auto w-full text-sm">
            <thead>
                <tr>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">ID</th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
                {areas.map((a: { id: string, name: string }) => (
                    <tr key={a.id} className="">
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{a.id}</td>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{a.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}