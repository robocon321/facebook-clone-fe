import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import RegisterProvider from 'app/(auth)/signup/_providers/RegisterProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup screen',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RegisterProvider>
        {children}
    </RegisterProvider>
  )
}
