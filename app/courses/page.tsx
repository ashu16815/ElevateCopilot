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
              Every course includes practice materials, a certificate, and a LinkedIn-shareable badge. Join the 1,247+ professionals already trained.
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

      {/* Weekly Sessions Notice */}
      <section className="py-12 bg-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-muted">
            We run live sessions every week. Tell us what you need—our team will match you to the next cohort.
          </p>
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
                    US${course.price_usd}
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

      {/* Course Bundles */}
      <section id="course-bundles" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Course Bundles
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Best value: master Copilot end-to-end and earn your badge.
            </p>
            <p className="text-sm text-muted mt-4">
              All prices in USD. Every course includes practice materials, a certificate, and a LinkedIn-shareable badge.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-3xl p-8 border border-accent/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-accent/20 text-accent mb-4">
                  Most Popular
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 font-playfair">
                  All 4 Courses + Badge
                </h3>
                <div className="text-4xl font-bold text-accent mb-2">
                  $499
                </div>
                <p className="text-muted text-sm">
                  Save compared to buying individually.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-primary mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-muted">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Copilot Kickstart (90-min Masterclass)
                    </li>
                    <li className="flex items-start text-muted">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Copilot in M365 Deep Dive (Half-Day)
                    </li>
                    <li className="flex items-start text-muted">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Copilot Certification (Full-Day + Assessment)
                    </li>
                    <li className="flex items-start text-muted">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Executive Briefing: ROI, Risk & Rollout (90-min)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-4">Bundle Benefits:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-muted">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      One seamless learning path from zero-to-confident
                    </li>
                    <li className="flex items-start text-muted">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Hands-on practice files and prompt libraries
                    </li>
                    <li className="flex items-start text-muted">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Final assessment + ElevateCopilot Practitioner Badge
                    </li>
                    <li className="flex items-start text-muted">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Email support during the learning path
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mb-6">
                <Link
                  href="/contact?course=bundle-all-4"
                  className="btn-primary px-8 py-3 text-lg"
                >
                  Register Interest for Bundle
                </Link>
              </div>

              <div className="text-center space-y-4">
                <div className="bg-white rounded-lg p-4 border border-accent/20">
                  <h5 className="font-semibold text-primary mb-2">Referral Program</h5>
                  <p className="text-muted text-sm">
                    Get 10% off with our referral program — please reach out to us for details.
                  </p>
                  <p className="text-accent text-sm font-medium mt-2">
                    elevatecopilot@outlook.com
                  </p>
                </div>
                
                <p className="text-xs text-muted">
                  Group booking discounts available — please contact us.
                </p>
              </div>
            </div>
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
