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
  ArrowRight,
  DollarSign
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

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      case 'leadership':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getModeColor = (mode: string) => {
    if (mode.includes('Online')) return 'bg-blue-100 text-blue-800'
    if (mode.includes('Hybrid')) return 'bg-purple-100 text-purple-800'
    if (mode.includes('In-Person')) return 'bg-green-100 text-green-800'
    return 'bg-gray-100 text-gray-800'
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
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getModeColor(course.mode)}`}>
                        {course.mode}
                      </span>
                      <h3 className="text-2xl font-bold text-primary">
                        {course.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-accent">
                        NZ${course.price_nzd}
                      </div>
                      {course.price_private_nzd && (
                        <div className="text-sm text-muted">
                          Private: NZ${course.price_private_nzd}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-muted mb-6 italic">
                    {course.tagline}
                  </p>

                  {/* Course Details */}
                  <div className="flex items-center space-x-6 mb-6 text-sm text-muted">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* What You'll Learn */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3">What You'll Learn:</h4>
                    <ul className="space-y-2">
                      {course.learn.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-muted">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Takeaways */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3">Key Takeaways:</h4>
                    <ul className="space-y-2">
                      {course.takeaways.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-muted">
                          <Star className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <Link
                      href={course.cta.href}
                      className="btn-primary w-full flex items-center justify-center group"
                    >
                      {course.cta.label}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already mastered Microsoft Copilot with our proven training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-secondary px-8 py-4 text-lg font-semibold"
            >
              Register Interest
            </Link>
            <Link
              href="/corporate-training"
              className="btn-outline-white px-8 py-4 text-lg font-semibold"
            >
              Corporate Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoursesPage
