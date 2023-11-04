import AdminNav from '@/components/admin/AdminNav'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-shop Admin ',
  description: 'E-Shop admin dashboard',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  )
}
