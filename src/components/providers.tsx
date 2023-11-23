'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

type Props = {
    children: React.ReactNode
}

const Providers = ({ children }: Props) => {
    const client = new QueryClient()
    console.log("testing")
    return (
        <>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </>
    )
}

export default Providers