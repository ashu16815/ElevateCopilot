'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Award, 
  Calendar, 
  Users, 
  Building, 
  BarChart3, 
  Settings, 
  FileText,
  CreditCard,
  MessageSquare,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

const AdminSidebar = () => {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    courses: true,
    sessions: true,
    users: true
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: pathname === '/admin'
    },
    {
      name: 'Courses',
      icon: Award,
      current: pathname.startsWith('/admin/courses'),
      children: [
        { name: 'All Courses', href: '/admin/courses' },
        { name: 'Create Course', href: '/admin/courses/create' },
        { name: 'Categories', href: '/admin/courses/categories' },
        { name: 'Templates', href: '/admin/courses/templates' }
      ]
    },
    {
      name: 'Sessions',
      icon: Calendar,
      current: pathname.startsWith('/admin/sessions'),
      children: [
        { name: 'All Sessions', href: '/admin/sessions' },
        { name: 'Schedule Session', href: '/admin/sessions/create' },
        { name: 'Calendar View', href: '/admin/sessions/calendar' },
        { name: 'Waitlists', href: '/admin/sessions/waitlists' }
      ]
    },
    {
      name: 'Users & Enrollments',
      icon: Users,
      current: pathname.startsWith('/admin/users'),
      children: [
        { name: 'All Users', href: '/admin/users' },
        { name: 'Enrollments', href: '/admin/users/enrollments' },
        { name: 'Certifications', href: '/admin/users/certifications' },
        { name: 'Groups', href: '/admin/users/groups' }
      ]
    },
    {
      name: 'Corporate',
      icon: Building,
      current: pathname.startsWith('/admin/corporate'),
      children: [
        { name: 'Companies', href: '/admin/corporate/companies' },
        { name: 'Contracts', href: '/admin/corporate/contracts' },
        { name: 'Invoices', href: '/admin/corporate/invoices' },
        { name: 'Reports', href: '/admin/corporate/reports' }
      ]
    },
    {
      name: 'Financial',
      icon: CreditCard,
      current: pathname.startsWith('/admin/financial'),
      children: [
        { name: 'Payments', href: '/admin/financial/payments' },
        { name: 'Invoices', href: '/admin/financial/invoices' },
        { name: 'Refunds', href: '/admin/financial/refunds' },
        { name: 'Revenue', href: '/admin/financial/revenue' }
      ]
    },
    {
      name: 'Reports & Analytics',
      icon: BarChart3,
      current: pathname.startsWith('/admin/reports'),
      children: [
        { name: 'Overview', href: '/admin/reports' },
        { name: 'Course Performance', href: '/admin/reports/courses' },
        { name: 'User Analytics', href: '/admin/reports/users' },
        { name: 'Financial Reports', href: '/admin/reports/financial' }
      ]
    },
    {
      name: 'Content',
      icon: FileText,
      current: pathname.startsWith('/admin/content'),
      children: [
        { name: 'Pages', href: '/admin/content/pages' },
        { name: 'Blog Posts', href: '/admin/content/blog' },
        { name: 'Resources', href: '/admin/content/resources' },
        { name: 'Media Library', href: '/admin/content/media' }
      ]
    },
    {
      name: 'Communications',
      icon: MessageSquare,
      current: pathname.startsWith('/admin/communications'),
      children: [
        { name: 'Emails', href: '/admin/communications/emails' },
        { name: 'Notifications', href: '/admin/communications/notifications' },
        { name: 'Templates', href: '/admin/communications/templates' },
        { name: 'Campaigns', href: '/admin/communications/campaigns' }
      ]
    },
    {
      name: 'Settings',
      icon: Settings,
      current: pathname.startsWith('/admin/settings'),
      children: [
        { name: 'General', href: '/admin/settings/general' },
        { name: 'Users & Permissions', href: '/admin/settings/users' },
        { name: 'Integrations', href: '/admin/settings/integrations' },
        { name: 'Security', href: '/admin/settings/security' }
      ]
    }
  ]

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">EC</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Admin Portal</h1>
            <p className="text-xs text-gray-500">ElevateCopilot</p>
          </div>
        </div>
      </div>

      <nav className="px-3 pb-6">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.name.toLowerCase())}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.current
                        ? 'bg-accent/10 text-accent border-r-2 border-accent'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </div>
                    {expandedSections[item.name.toLowerCase()] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedSections[item.name.toLowerCase()] && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                              pathname === child.href
                                ? 'bg-accent/5 text-accent font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? 'bg-accent/10 text-accent border-r-2 border-accent'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Stats */}
      <div className="px-3 pb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Active Sessions:</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Approvals:</span>
              <span className="font-medium text-orange-600">5</span>
            </div>
            <div className="flex justify-between">
              <span>Today's Revenue:</span>
              <span className="font-medium text-green-600">$12,450</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
