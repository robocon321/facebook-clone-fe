import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import RequestsProvider from './_providers/RequestsProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Facebook | Requests to make friends',
    description: 'Friends screen',
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <RequestsProvider>
            {children}
        </RequestsProvider>
    )
}
