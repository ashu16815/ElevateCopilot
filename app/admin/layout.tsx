import { Metadata } from 'next'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminAuth from '../../components/admin/AdminAuth'

export const metadata: Metadata = {
  title: 'Admin Portal - ElevateCopilot',
  description: 'Administrative dashboard for managing courses, schedules, and users.',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminAuth>
  )
}
