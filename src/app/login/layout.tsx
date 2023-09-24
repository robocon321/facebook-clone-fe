import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LoginProvider from 'providers/LoginProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login screen',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LoginProvider>
        {children}
    </LoginProvider>
  )
}
