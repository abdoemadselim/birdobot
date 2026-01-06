'use client'

import { client } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CategoryEmptyState({ categoryName, categoryId }: { categoryName: string, categoryId: number }) {
    const { data } = useQuery({
        queryKey: [categoryName, "hasEvents"],
        queryFn: async () => {
            const res = await client.event.pullEvents.$get({ id: categoryId })
            const events = res.json()

            return events
        },
        refetchInterval: (query) => query.state.data?.hasEvents ? false : 2000
    })


    const codeSnippet = `await fetch('http://localhost:3000/api/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // for example: user id
      field2: 'value2' // for example: user email
    }
  })
})`

    return (
        <div className="bg-white ring-1 ring-inset ring-gray-200 py-14 flex flex-col items-center rounded-xl">
            <h2 className="text-xl font-medium">Create your first {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} event</h2>
            <p className='text-zinc-600 pt-2 pb-8'>Get started by sending a request to our tracking API:</p>

            <div className='rounded-40 bg-zinc-800 w-3xl rounded-xl'>
                <div className='bg-gray-800 w-full h-10 p-4 rounded-t-xl flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <div className='rounded-full bg-red-500 size-3' />
                        <div className='rounded-full bg-yellow-500 size-3' />
                        <div className='rounded-full bg-green-500 size-3' />
                    </div>
                    <p className='text-gray-500'>your-first-event.js</p>
                </div>
                <SyntaxHighlighter
                    language="typescript"
                    style={{
                        ...oneDark,
                        'pre[class*="language-"]': {
                            ...oneDark['pre[class*="language-"]'],
                            overflow: "hidden",
                            background: "transparent"
                        },
                        'code[class*="language-"]': {
                            ...oneDark['code[class*="language-"]'],
                            background: "transparent"
                        },
                    }}
                >
                    {codeSnippet}
                </SyntaxHighlighter>
            </div>

            <div className='flex items-center gap-3 pt-10'>
                <div className='rounded-full bg-green-500 animate-pulse size-2' />
                <p className='text-zinc-600'>Listening to incoming events...</p>
            </div>

            <p className='text-zinc-600 pt-2'>Need help? Check out our <Link href="" className='text-brand-700 hover:underline'>documentation</Link> or <a href="" className='text-brand-700 hover:underline'>contact support</a></p>
        </div>
    )
}
