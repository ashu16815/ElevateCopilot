import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Users, Award, Building } from 'lucide-react'
import { getAllCourses } from '@/lib/database/db'

export const metadata: Metadata = {
  title: 'Training Courses - ElevateCopilot',
  description: 'Choose your path to Microsoft Copilot mastery. Every course includes practice materials, a certificate, and a LinkedIn-shareable badge.',
  keywords: ['Microsoft Copilot training', 'Copilot courses', 'AI productivity training', 'Copilot certification'],
}

export default async function CoursesPage() {
  const courses = await getAllCourses()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Choose Your Path
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Every course includes practice materials, a certificate, and a LinkedIn-shareable badge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-secondary px-8 py-3"
              >
                Get Personalized Guidance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.id} id={course.slug} className="flex h-full flex-col rounded-2xl bg-white shadow-sm p-6 min-h-[560px]">
                <div className="flex-1 space-y-5">
                  {/* Header */}
                  <div className="text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-3">
                      {course.level}
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2 font-playfair">
                      {course.title}
                    </h2>
                    <p className="text-muted text-lg">
                      {course.tagline}
                    </p>
                  </div>

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted">
                      <Clock className="h-4 w-4 mr-2" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-muted">
                      <Building className="h-4 w-4 mr-2" />
                      {course.mode}
                    </div>
                  </div>

                  {/* What You'll Learn */}
                  <div>
                    <h3 className="font-semibold text-primary mb-3">What You'll Learn:</h3>
                    <ul className="space-y-3">
                      {course.learn.map((item, index) => (
                        <li key={index} className="flex items-start text-muted">
                          <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Takeaways */}
                  <div>
                    <h3 className="font-semibold text-primary mb-3">Key Takeaways:</h3>
                    <ul className="space-y-3">
                      {course.takeaways.map((item, index) => (
                        <li key={index} className="flex items-start text-muted">
                          <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Tray - Price and CTA */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-4 flex-wrap">
                  {/* Price */}
                  <div className="text-2xl font-extrabold leading-none text-slate-900 whitespace-nowrap">
                    NZ${course.price_nzd}
                  </div>
                  
                  {/* CTA Button */}
                  <Link
                    href={course.cta.href}
                    className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-[#C6A664] text-white hover:opacity-90 w-full sm:w-auto"
                  >
                    {course.cta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6 font-playfair">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            Join hundreds of professionals who've already mastered Microsoft Copilot and are seeing measurable results in their daily work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-primary px-8 py-3"
            >
              Get Started Today
            </Link>
            <Link
              href="/corporate-training"
              className="btn-secondary px-8 py-3"
            >
              Corporate Training
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
