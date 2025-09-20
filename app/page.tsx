import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ValueProposition from '@/components/sections/ValueProposition'
import Offerings from '@/components/sections/Offerings'
import Certification from '@/components/sections/Certification'
import Partnerships from '@/components/sections/Partnerships'
import TrustSection from '@/components/sections/TrustSection'
import Testimonials from '@/components/sections/Testimonials'
import FinalCTA from '@/components/sections/FinalCTA'
import Impact from '@/components/Impact'

export const metadata: Metadata = {
  title: 'ElevateCopilot — AI Literacy for New Zealand (Free, Fortnightly)',
  description: 'Open mission to train 1,000 professionals in NZ on practical, responsible AI. Free live sessions, resources, and community. Join and pass it on.',
  keywords: ['AI literacy', 'Microsoft Copilot', 'New Zealand', 'free training', 'AI education', 'community'],
  openGraph: {
    title: 'ElevateCopilot — AI Literacy for New Zealand (Free, Fortnightly)',
    description: 'Open mission to train 1,000 professionals in NZ on practical, responsible AI. Free live sessions, resources, and community.',
    url: 'https://www.elevatecopilot.com',
    siteName: 'ElevateCopilot',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElevateCopilot — AI Literacy for New Zealand (Free, Fortnightly)',
    description: 'Open mission to train 1,000 professionals in NZ on practical, responsible AI. Free live sessions, resources, and community.',
  },
}

export default async function Home() {
  // Default course stats to avoid runtime errors
  const courseStats = {
    totalCourses: 4,
    totalEnrollments: "1,247",
    upcomingSessions: "10+",
    averagePrice: "US$134"
  }

  return (
    <main>
      <Hero />
      <Impact />
      <ValueProposition />
      <Offerings featuredCourses={[]} />
      <Certification />
      <Partnerships />
      <TrustSection />
      <Testimonials />
      <FinalCTA courseStats={courseStats} />
    </main>
  )
}
