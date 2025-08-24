import Link from 'next/link'
import { Award, Clock, Users, CheckCircle } from 'lucide-react'
import { Course } from '@/lib/data/courses'

interface OfferingsProps {
  featuredCourses: Course[]
}

const Offerings = ({ featuredCourses }: OfferingsProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'masterclass':
        return <Clock className="h-6 w-6" />
      case 'certification':
        return <Award className="h-6 w-6" />
      case 'corporate':
        return <Users className="h-6 w-6" />
      default:
        return <Award className="h-6 w-6" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'masterclass':
        return 'bg-blue-100 text-blue-600'
      case 'certification':
        return 'bg-green-100 text-green-600'
      case 'corporate':
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
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Choose from our carefully crafted training programs designed to accelerate your Copilot journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div key={course.id} className="card group hover:scale-105 transition-all duration-300">
              <div className="p-8">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                    {getCategoryIcon(course.category)}
                    <span className="ml-2">{course.category}</span>
                  </span>
                  {course.certification && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      <Award className="h-3 w-3 mr-1" />
                      Certification
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {course.title}
                </h3>

                {/* Course Description */}
                <p className="text-muted mb-6 leading-relaxed">
                  {course.shortDescription}
                </p>

                {/* Course Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-muted">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{course.format}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted">
                    <Award className="h-4 w-4 mr-2" />
                    <span>{course.level} Level</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-3">What's Included:</h4>
                  <div className="space-y-2">
                    {course.objectives.slice(0, 3).map((objective, index) => (
                      <div key={index} className="flex items-center text-sm text-muted">
                        <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        <span>{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {course.price}
                  </div>
                  <Link
                    href={`/courses#${course.slug}`}
                    className="bg-accent hover:bg-accent/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors inline-flex items-center group"
                  >
                    Learn More
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>

                {/* Enrollment Status */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Available Seats:</span>
                    <span className="font-medium text-primary">
                      {course.maxSeats - course.enrolled} of {course.maxSeats}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(course.enrolled / course.maxSeats) * 100}%` }}
                    ></div>
                  </div>
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
