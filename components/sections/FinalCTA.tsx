import Link from 'next/link'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'

interface FinalCTAProps {
  courseStats: {
    totalCourses: number
    totalEnrollments: number
    upcomingSessions: number
    averagePrice: string
  }
}

const FinalCTA = ({ courseStats }: FinalCTAProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
          Ready to Elevate with Copilot?
        </h2>
        <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
          Join thousands of professionals who have transformed their productivity with our expert-led training programs
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">{courseStats.totalCourses}</div>
            <div className="text-sm text-gray-300">Training Programs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">{courseStats.totalEnrollments}+</div>
            <div className="text-sm text-gray-300">Professionals Trained</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">{courseStats.upcomingSessions}</div>
            <div className="text-sm text-gray-300">Upcoming Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">{courseStats.averagePrice}</div>
            <div className="text-sm text-gray-300">Average Price</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/schedule"
            className="bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center group"
          >
            See Upcoming Sessions
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/corporate-training"
            className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            Corporate Training Enquiry
          </Link>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Industry Recognition</h3>
            <p className="text-sm text-gray-300">Certified by leading industry bodies and recognized by employers worldwide</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Instructors</h3>
            <p className="text-sm text-gray-300">Learn from certified professionals with years of real-world experience</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Satisfaction Guarantee</h3>
            <p className="text-sm text-gray-300">100% satisfaction guarantee or your money back within 30 days</p>
          </div>
        </div>

        {/* Final Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold mb-4">Transform Your Productivity Today</h3>
          <p className="text-gray-200 mb-6">
            Don't let AI pass you by. Join the professionals who are already saving 26+ minutes per day with Copilot.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors group"
          >
            Explore All Programs
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
