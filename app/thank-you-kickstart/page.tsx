import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Thank You — Copilot Kickstart',
  description: 'Thank you for registering for Copilot Kickstart (90-min Masterclass)',
  robots: 'noindex, nofollow',
}

export default function ThankYouKickstart() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank you!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your registration for <strong>Copilot Kickstart (90-min Masterclass)</strong> was received.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              We've emailed next steps. If you don't see it, check your spam folder.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/courses"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to courses
            </Link>
            
            <div className="text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
