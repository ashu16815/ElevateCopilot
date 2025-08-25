'use client'

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Gift, Users, DollarSign, TrendingUp, Mail } from 'lucide-react'
import ReferralCodeForm from '@/components/ReferralCodeForm'
import ShareReferralBlock from '@/components/ShareReferralBlock'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'Referral Program - ElevateCopilot',
  description: 'Give 10% off. Get 10% back. Share ElevateCopilot training with friends and colleagues to earn rewards.',
  keywords: ['referral program', 'discount', 'cashback', 'training rewards', 'ElevateCopilot'],
}

export default function ReferralsPage() {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link
              href="/"
              className="flex items-center text-gray-200 hover:text-white transition-colors mr-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Referral Program
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Give 10% off. Get 10% back. It's a win–win.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">1. Generate Code</h3>
                <p className="text-muted">Create your unique referral code</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">2. Share & Save</h3>
                <p className="text-muted">Friends get 10% discount</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">3. Earn Rewards</h3>
                <p className="text-muted">You get 10% cashback</p>
              </div>
            </div>
          </div>

          {/* Example Calculation */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              Example Calculation
            </h3>
            <div className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-muted mb-2">List Price</p>
                  <p className="text-2xl font-bold text-primary">$199</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-2">Friend Pays (10% off)</p>
                  <p className="text-2xl font-bold text-green-600">$179.10</p>
                </div>
                <div>
                  <p className="text-sm text-muted mb-2">Your Reward (10% of paid)</p>
                  <p className="text-2xl font-bold text-accent">$17.91</p>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-muted">
                  Your friend saves $19.90, you earn $17.91
                </p>
              </div>
            </div>
          </div>

          {/* Referral Code Generator */}
          <div className="max-w-2xl mx-auto">
            <ReferralCodeForm onCreated={setGeneratedCode} />
          </div>
          
          {/* Share Block - appears after code generation */}
          {generatedCode && (
            <div className="max-w-2xl mx-auto mt-8">
              <ShareReferralBlock code={generatedCode} />
            </div>
          )}
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6 font-playfair">
                Start referring
              </h3>
              <ul className="space-y-4 text-muted">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  If you already trained with us, generate your code on your dashboard (or contact us).
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Corporate? Ask for customized team codes.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-6 font-playfair">
                Payouts
              </h3>
              <ul className="space-y-4 text-muted">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Rewards are transferred <strong>directly to your bank account</strong> monthly.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Or you can opt to apply rewards as credit for future courses.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  You earn 10% cash back on the <em>amount actually paid</em> by your referrals.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Use & Contact */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-primary mb-6 font-playfair">
              Fair use
            </h3>
            <ul className="space-y-3 text-muted mb-8">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                No self-referrals with the same email/payment account.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                One referral code per order; fraud screening applies.
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                Refunds void the related reward.
              </li>
            </ul>

            <div className="text-center">
              <p className="text-lg text-muted mb-4">
                Questions? Email us at{' '}
                <a 
                  href="mailto:elevatecopilot@outlook.com" 
                  className="text-accent hover:underline font-medium"
                >
                  elevatecopilot@outlook.com
                </a>
              </p>
              <Link
                href="/contact"
                className="btn-primary px-8 py-3 inline-flex items-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
