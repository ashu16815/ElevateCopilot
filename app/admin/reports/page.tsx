import { Metadata } from 'next'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Reports & Analytics - Admin Portal',
  description: 'View analytics and insights for your training programs.',
}

const ReportsPage = () => {
  const stats = [
    {
      title: "Total Revenue (MTD)",
      value: "$89,420",
      change: "+18%",
      changeType: "positive",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Total Enrollments",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue"
    },
    {
      title: "Course Completion Rate",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: Award,
      color: "purple"
    },
    {
      title: "Average Session Attendance",
      value: "92%",
      change: "+3%",
      changeType: "positive",
      icon: Calendar,
      color: "#C6A664"
    }
  ]

  const topCourses = [
    { name: "Copilot Masterclass", enrollments: 156, revenue: "$31,044", rating: 4.8 },
    { name: "Full-Day Certification", enrollments: 89, revenue: "$52,855", rating: 4.9 },
    { name: "Corporate Workshop", enrollments: 23, revenue: "$92,000", rating: 4.7 },
    { name: "Advanced Copilot", enrollments: 67, revenue: "$20,033", rating: 4.6 }
  ]

  const monthlyData = [
    { month: "Jan", enrollments: 89, revenue: 12450 },
    { month: "Feb", enrollments: 156, revenue: 21800 },
    { month: "Mar", enrollments: 134, revenue: 18760 },
    { month: "Apr", enrollments: 178, revenue: 24920 },
    { month: "May", enrollments: 145, revenue: 20300 },
    { month: "Jun", enrollments: 167, revenue: 23380 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your training programs</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{data.enrollments} enrollments</span>
                  <span className="text-sm font-medium text-gray-900">${data.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Courses</h2>
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{course.name}</p>
                  <p className="text-sm text-gray-500">{course.enrollments} enrollments</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{course.revenue}</p>
                  <p className="text-sm text-gray-500">★ {course.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Detailed Analytics</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrollment Analytics</h3>
              <p className="text-sm text-gray-600">Track participant growth and course popularity</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Reports</h3>
              <p className="text-sm text-gray-600">Revenue analysis and profitability insights</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Metrics</h3>
              <p className="text-sm text-gray-600">Course completion rates and satisfaction scores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Generate Custom Reports</h3>
            <p className="text-gray-600">Create detailed reports for specific time periods or courses</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Course Report
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Financial Report
            </button>
            <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
              Custom Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
