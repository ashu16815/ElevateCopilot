import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  Calendar,
  MapPin,
  ArrowRight
} from 'lucide-react'
import { CourseRepository } from '@/lib/repositories/courseRepository'
import { SessionRepository } from '@/lib/repositories/courseRepository'

export const metadata: Metadata = {
  title: 'Training Courses - ElevateCopilot',
  description: 'Explore our comprehensive Microsoft Copilot training programs. From masterclasses to certification courses, find the perfect program for your skill level.',
  keywords: ['Microsoft Copilot courses', 'AI training', 'productivity courses', 'certification programs', 'online training'],
}

const CoursesPage = async () => {
  const courses = CourseRepository.getActiveCourses()
const upcomingSessions = SessionRepository.getUpcomingSessions()

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'masterclass':
        return 'bg-blue-100 text-blue-800'
      case 'certification':
        return 'bg-green-100 text-green-800'
      case 'corporate':
        return 'bg-purple-100 text-purple-800'
      case 'advanced':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-accent/10 text-accent'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
            Training Programs
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Master Microsoft Copilot with our expert-led training programs designed for every skill level
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              From quick masterclasses to comprehensive certification programs, we have the perfect training for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.id} id={course.slug} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="space-y-2">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                        {course.category}
                      </span>
                      <h3 className="text-2xl font-bold text-primary">
                        {course.title}
                      </h3>
                    </div>
                    {course.certification && (
                      <div className="bg-accent/10 p-3 rounded-lg">
                        <Award className="h-6 w-6 text-accent" />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-muted">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted">
                      <Users className="h-4 w-4" />
                      <span>{course.format}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted">
                      <Award className="h-4 w-4" />
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted">
                      <Star className="h-4 w-4" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3">What You'll Learn:</h4>
                    <div className="space-y-2">
                      {course.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm text-muted">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {course.prerequisites.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-primary mb-3">Prerequisites:</h4>
                      <div className="space-y-2">
                        {course.prerequisites.map((prerequisite, index) => (
                          <div key={index} className="flex items-start space-x-2 text-sm text-muted">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span>{prerequisite}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Course Content */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3">Course Content:</h4>
                    <p className="text-sm text-muted leading-relaxed">
                      {course.agenda}
                    </p>
                  </div>

                  {/* Materials */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3">Materials Included:</h4>
                    <p className="text-sm text-muted leading-relaxed">
                      {course.materials}
                    </p>
                  </div>

                  {/* Price and Enrollment */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-accent">
                        {course.price}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted">Available Seats</div>
                        <div className="font-semibold text-primary">
                          {course.maxSeats - course.enrolled} of {course.maxSeats}
                        </div>
                      </div>
                    </div>
                    
                    {/* Enrollment Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-muted mb-1">
                        <span>Enrollment Progress</span>
                        <span>{Math.round((course.enrolled / course.maxSeats) * 100)}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(course.enrolled / course.maxSeats) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/schedule"
                      className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center group"
                    >
                      Book Your Seat
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Upcoming Training Sessions
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Join our live training sessions and learn from expert instructors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-primary mb-1">
                      {session.course.title}
                    </h3>
                    <p className="text-sm text-muted">{session.instructor}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    session.status === 'scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(session.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted">
                    <Clock className="h-4 w-4" />
                    <span>{session.startTime} - {session.endTime} ({session.timezone})</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted">
                    <MapPin className="h-4 w-4" />
                    <span>{session.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-accent">
                    {session.price}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted">Seats Available</div>
                    <div className="font-semibold text-primary">
                      {session.maxSeats - session.enrolled} of {session.maxSeats}
                    </div>
                  </div>
                </div>

                <Link
                  href="/schedule"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center justify-center text-sm"
                >
                  Book Session
                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {/* View All Sessions CTA */}
          <div className="text-center mt-12">
            <Link
              href="/schedule"
              className="inline-flex items-center text-accent hover:text-accent/80 font-semibold text-lg group"
            >
              View All Training Sessions
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoursesPage
