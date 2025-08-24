import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Users,
  Clock,
  MapPin,
  DollarSign
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Manage Sessions - Admin Portal',
  description: 'Schedule and manage training sessions.',
}

const SessionsManagementPage = () => {
  const sessions = [
    {
      id: 1,
      course: "Copilot Masterclass",
      date: "2025-09-12",
      time: "10:00 AM - 11:30 AM",
      timezone: "AEST",
      format: "Online (Zoom)",
      instructor: "Sarah Chen",
      status: "scheduled",
      seats: 20,
      enrolled: 15,
      price: "$199",
      location: "Virtual"
    },
    {
      id: 2,
      course: "Copilot Certification",
      date: "2025-09-26",
      time: "9:00 AM - 5:00 PM",
      timezone: "NZST",
      format: "In-Person",
      instructor: "Michael Rodriguez",
      status: "scheduled",
      seats: 12,
      enrolled: 8,
      price: "$595",
      location: "Auckland, NZ"
    },
    {
      id: 3,
      course: "Corporate Workshop",
      date: "2025-10-10",
      time: "9:00 AM - 4:00 PM",
      timezone: "AEST",
      format: "In-Person",
      instructor: "David Kim",
      status: "draft",
      seats: 20,
      enrolled: 0,
      price: "From $4,000",
      location: "Sydney, AU"
    },
    {
      id: 4,
      course: "Advanced Copilot",
      date: "2025-10-03",
      time: "2:00 PM - 6:00 PM",
      timezone: "PST",
      format: "Online (Zoom)",
      instructor: "Lisa Thompson",
      status: "scheduled",
      seats: 15,
      enrolled: 12,
      price: "$299",
      location: "Virtual"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEnrollmentPercentage = (enrolled: number, seats: number) => {
    return Math.round((enrolled / seats) * 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Sessions</h1>
          <p className="text-gray-600">Schedule and manage all training sessions</p>
        </div>
        <Link
          href="/admin/sessions/create"
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Session
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sessions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
              <option value="">All Courses</option>
              <option value="masterclass">Masterclass</option>
              <option value="certification">Certification</option>
              <option value="corporate">Corporate</option>
              <option value="advanced">Advanced</option>
            </select>
            
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
              <option value="">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
              <option value="">All Formats</option>
              <option value="online">Online</option>
              <option value="in-person">In-Person</option>
              <option value="hybrid">Hybrid</option>
            </select>
            
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Sessions ({sessions.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{session.course}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(session.date)} • {session.time}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {session.location} • {session.timezone}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {session.format}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${getEnrollmentPercentage(session.enrolled, session.seats)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">
                        {session.enrolled}/{session.seats}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getEnrollmentPercentage(session.enrolled, session.seats)}% full
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {session.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {session.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/sessions/${session.id}`}
                        className="text-accent hover:text-accent/80 p-1"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/sessions/${session.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">
                {sessions.reduce((sum, session) => sum + session.enrolled, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {sessions.filter(session => session.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Enrollment</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(sessions.reduce((sum, session) => sum + session.enrolled, 0) / sessions.length)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View Link */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Calendar View</h3>
            <p className="text-gray-600">View all sessions in a calendar format for better scheduling</p>
          </div>
          <Link
            href="/admin/sessions/calendar"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SessionsManagementPage
