import Link from 'next/link'
import { Award, Clock, Users, CheckCircle, DollarSign } from 'lucide-react'
import { Course } from '@/lib/data/courses'

interface OfferingsProps {
  featuredCourses: Course[]
}

const Offerings = ({ featuredCourses }: OfferingsProps) => {
  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return <Clock className="h-6 w-6" />
      case 'intermediate':
        return <Award className="h-6 w-6" />
      case 'advanced':
        return <Users className="h-6 w-6" />
      case 'leadership':
        return <Award className="h-6 w-6" />
      default:
        return <Award className="h-6 w-6" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-600'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-600'
      case 'advanced':
        return 'bg-red-100 text-red-600'
      case 'leadership':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-accent/10 text-accent'
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
            Our Programs
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-4">
            Choose from our carefully crafted training programs designed to accelerate your Copilot journey
          </p>
          <p className="text-lg text-muted max-w-4xl mx-auto">
            Every course includes practice materials, a certificate, and a LinkedIn-shareable badge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div key={course.id} className="card group hover:scale-105 transition-all duration-300">
              <div className="p-8">
                {/* Level Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {getLevelIcon(course.level)}
                    <span className="ml-2">{course.level}</span>
                  </span>
                  {course.badge && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      <Award className="h-3 w-3 mr-1" />
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {course.title}
                </h3>

                {/* Course Tagline */}
                <p className="text-muted mb-6 leading-relaxed italic">
                  {course.tagline}
                </p>

                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-muted">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{course.mode}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>NZ${course.price_nzd}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">What You'll Learn:</h4>
                  <div className="space-y-2">
                    {course.learn.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center text-sm text-muted">
                        <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    NZ${course.price_nzd}
                  </div>
                  <Link
                    href={course.cta.href}
                    className="bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors inline-flex items-center group"
                  >
                    {course.cta.label}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>


              </div>
            </div>
          ))}
        </div>

        {/* View All Courses CTA */}
        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center text-accent hover:text-accent/80 font-semibold text-lg group"
          >
            View All Training Programs
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Offerings
