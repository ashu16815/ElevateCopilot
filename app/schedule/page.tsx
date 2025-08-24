import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Filter,
  Search,
  ArrowRight
} from 'lucide-react'
import { getUpcomingSessions, getActiveCourses } from '@/lib/data/courses'

export const metadata: Metadata = {
  title: 'Training Schedule - ElevateCopilot',
  description: 'View upcoming Microsoft Copilot training sessions and book your seat. Online and in-person options available.',
  keywords: ['training schedule', 'Copilot sessions', 'book training', 'upcoming courses', 'live sessions'],
}

const SchedulePage = async () => {
  const sessions = getUpcomingSessions()
  const courses = getActiveCourses()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800'
      case 'published':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEnrollmentPercentage = (enrolled: number, seats: number) => {
    return Math.round((enrolled / seats) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
            Training Schedule
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Book your seat in our upcoming Microsoft Copilot training sessions. Choose from online and in-person options.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
                <option value="">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.slug}>
                    {course.title}
                  </option>
                ))}
              </select>
              
              <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
                <option value="">All Formats</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
              
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Upcoming Training Sessions
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              {sessions.length} sessions available. Book early to secure your spot!
            </p>
          </div>

          {sessions.length > 0 ? (
            <div className="space-y-6">
              {sessions.map((session) => (
                <div key={session.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Session Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-primary mb-2">
                              {session.course.title}
                            </h3>
                            <p className="text-muted">Instructor: {session.instructor}</p>
                          </div>
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                            {session.status}
                          </span>
                        </div>

                        <p className="text-muted mb-6 leading-relaxed">
                          {session.course.shortDescription}
                        </p>

                        {/* Session Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center space-x-3">
                            <Calendar className="h-5 w-5 text-accent" />
                            <div>
                              <div className="font-medium text-primary">{formatDate(session.date)}</div>
                              <div className="text-sm text-muted">{session.startTime} - {session.endTime}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Clock className="h-5 w-5 text-accent" />
                            <div>
                              <div className="font-medium text-primary">{session.timezone}</div>
                              <div className="text-sm text-muted">Duration: {session.course.duration}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <MapPin className="h-5 w-5 text-accent" />
                            <div>
                              <div className="font-medium text-primary">{session.location}</div>
                              <div className="text-sm text-muted">{session.format}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-accent" />
                            <div>
                              <div className="font-medium text-primary">{session.course.level} Level</div>
                              <div className="text-sm text-muted">{session.course.category}</div>
                            </div>
                          </div>
                        </div>

                        {/* Course Features */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-primary mb-3">What's Included:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {session.course.objectives.slice(0, 4).map((objective, index) => (
                              <div key={index} className="flex items-center text-sm text-muted">
                                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                                <span>{objective}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Booking Section */}
                      <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-accent mb-2">
                              {session.price}
                            </div>
                            <div className="text-sm text-muted">per participant</div>
                          </div>

                          {/* Enrollment Status */}
                          <div className="mb-6">
                            <div className="flex justify-between text-sm text-muted mb-2">
                              <span>Available Seats</span>
                              <span>{session.maxSeats - session.enrolled} of {session.maxSeats}</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-accent h-3 rounded-full transition-all duration-300"
                                style={{ width: `${getEnrollmentPercentage(session.enrolled, session.maxSeats)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-muted mt-1 text-center">
                              {getEnrollmentPercentage(session.enrolled, session.maxSeats)}% full
                            </div>
                          </div>

                          {/* Features */}
                          <div className="space-y-3 mb-6">
                            {session.recording && (
                              <div className="flex items-center text-sm text-muted">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span>Session recording included</span>
                              </div>
                            )}
                            {session.waitlist && (
                              <div className="flex items-center text-sm text-muted">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span>Waitlist available</span>
                              </div>
                            )}
                            <div className="flex items-center text-sm text-muted">
                              <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                              <span>Course materials included</span>
                            </div>
                            {session.course.certification && (
                              <div className="flex items-center text-sm text-muted">
                                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                                <span>Certification included</span>
                              </div>
                            )}
                          </div>

                          {/* CTA */}
                          <Link
                            href={`/contact?session=${session.id}`}
                            className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center group mb-3"
                          >
                            Book This Session
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                          
                          <Link
                            href={`/courses#${session.course.slug}`}
                            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-6 rounded-lg transition-colors inline-flex items-center justify-center text-sm"
                          >
                            View Course Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">No Upcoming Sessions</h3>
              <p className="text-muted mb-8 max-w-2xl mx-auto">
                We're currently planning our next training sessions. Check back soon or contact us to be notified when new sessions are available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/courses"
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  View All Courses
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Need a Custom Training Solution?
          </h2>
          <p className="text-xl text-muted mb-8 max-w-3xl mx-auto">
            We offer tailored corporate training packages and private sessions for teams and organizations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/corporate-training"
              className="bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Corporate Training
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SchedulePage
