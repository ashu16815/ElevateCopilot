import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Users, 
  Calendar, 
  Award, 
  Building, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Dashboard - ElevateCopilot',
  description: 'Administrative dashboard overview and statistics.',
}

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Enrollments",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue"
    },
    {
      title: "Active Courses",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: Award,
      color: "green"
    },
    {
      title: "Upcoming Sessions",
      value: "23",
      change: "This week",
      changeType: "neutral",
      icon: Calendar,
      color: "purple"
    },
    {
      title: "Revenue (MTD)",
      value: "$89,420",
      change: "+18%",
      changeType: "positive",
      icon: DollarSign,
      color: "yellow"
    }
  ]

  const quickActions = [
    {
      title: "Create New Course",
      description: "Add a new training program",
      href: "/admin/courses/create",
      icon: Award,
      color: "blue"
    },
    {
      title: "Schedule Session",
      description: "Book a new training session",
      href: "/admin/sessions/create",
      icon: Calendar,
      color: "green"
    },
    {
      title: "Manage Users",
      description: "View and manage participants",
      href: "/admin/users",
      icon: Users,
      color: "purple"
    },
    {
      title: "View Reports",
      description: "Analytics and insights",
      href: "/admin/reports",
      icon: TrendingUp,
      color: "#C6A664"
    }
  ]

  const recentActivity = [
    {
      action: "New enrollment in Copilot Masterclass",
      user: "Sarah Johnson",
      time: "2 minutes ago",
      type: "enrollment"
    },
    {
      action: "Course 'Advanced Copilot' published",
      user: "Admin",
      time: "1 hour ago",
      type: "course"
    },
    {
      action: "Session scheduled for Oct 15",
      user: "Admin",
      time: "3 hours ago",
      type: "session"
    },
    {
      action: "Payment received from ABC Corp",
      user: "ABC Corporation",
      time: "5 hours ago",
      type: "payment"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your training programs.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/courses/create"
            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            + New Course
          </Link>
          <Link
            href="/admin/sessions/create"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            + New Session
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 
                stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="p-4 border border-gray-200 rounded-lg hover:border-accent hover:bg-accent/5 transition-colors duration-200"
              >
                <div className={`w-10 h-10 bg-${action.color}-100 rounded-full flex items-center justify-center mb-3`}>
                  <action.icon className={`h-5 w-5 text-${action.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {action.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Upcoming Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/activity"
                className="text-sm text-accent hover:text-accent/80 font-medium"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-primary">Copilot Masterclass</p>
                  <p className="text-xs text-muted">Sep 12, 2025 • 10:00 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">15/20 seats</p>
                  <p className="text-xs text-muted">75% full</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-primary">Full-Day Certification</p>
                  <p className="text-xs text-muted">Sep 26, 2025 • 9:00 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">8/12 seats</p>
                  <p className="text-xs text-muted">67% full</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-primary">Corporate Workshop</p>
                  <p className="text-xs text-muted">Oct 10, 2025 • 9:00 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">12/20 seats</p>
                  <p className="text-xs text-muted">60% full</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/sessions"
                className="text-sm text-accent hover:text-accent/80 font-medium"
              >
                View all sessions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
