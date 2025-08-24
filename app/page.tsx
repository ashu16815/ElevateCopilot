import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import ValueProposition from '@/components/sections/ValueProposition'
import Offerings from '@/components/sections/Offerings'
import Certification from '@/components/sections/Certification'
import Testimonials from '@/components/sections/Testimonials'
import FinalCTA from '@/components/sections/FinalCTA'
import { CourseRepository } from '@/lib/repositories/courseRepository'

export const metadata: Metadata = {
  title: 'ElevateCopilot - Learn Copilot. Lead with AI.',
  description: 'Premium training & certification for professionals and teams worldwide. Master Microsoft Copilot with expert-led sessions and hands-on practice.',
  keywords: ['Microsoft Copilot', 'AI training', 'productivity training', 'certification', 'corporate training'],
  openGraph: {
    title: 'ElevateCopilot - Learn Copilot. Lead with AI.',
    description: 'Premium training & certification for professionals and teams worldwide.',
    url: 'https://www.elevatecopilot.com',
    siteName: 'ElevateCopilot',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ElevateCopilot - Learn Copilot. Lead with AI.',
    description: 'Premium training & certification for professionals and teams worldwide.',
  },
}

export default async function Home() {
  const featuredCourses = CourseRepository.getFeaturedCourses()
  const courseStats = CourseRepository.getCourseStats()

  return (
    <main>
      <Hero />
      <ValueProposition />
      <Offerings featuredCourses={featuredCourses} />
      <Certification />
      <Testimonials />
      <FinalCTA courseStats={courseStats} />
    </main>
  )
}
