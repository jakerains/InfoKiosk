import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InfoKiosk Admin - Manage Your Kiosks',
  description: 'Create and manage your information kiosks'
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 