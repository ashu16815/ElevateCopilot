export interface Course {
  id: number
  slug: string
  title: string
  price_nzd: number
  price_private_nzd?: number
  duration: string
  mode: string
  level: string
  tagline: string
  learn: string[]
  takeaways: string[]
  badge?: string
  cta: {
    label: string
    href: string
  }
  status: 'draft' | 'active' | 'archived'
  visibility: 'public' | 'private'
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  id: number
  courseId: number
  date: string
  time: string
  seats: number
  enrolled: number
  status: 'upcoming' | 'full' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

// Default courses based on the new specification
export const defaultCourses: Course[] = [
  {
    id: 1,
    slug: "kickstart-masterclass",
    title: "Copilot Kickstart (90-min Masterclass)",
    price_nzd: 99,
    duration: "90 minutes",
    mode: "Live Online",
    level: "Beginner",
    tagline: "Your fast track to Copilot confidence — learn it all in one session.",
    learn: [
      "Complete essentials across Word, Outlook, Excel, PowerPoint, Teams",
      "Prompting secrets for business-ready outputs",
      "Verification habits to reduce rework and risk"
    ],
    takeaways: [
      "Day-1 Copilot Playbook — 15+ ready-to-use prompts",
      "Practice Pack with step-by-step exercises",
      "Certificate of Participation (LinkedIn-ready)",
      "Confidence to say: \"I can do that in half the time.\""
    ],
    cta: { label: "Register Interest (NZ$99)", href: "/contact?course=kickstart-masterclass" },
    status: 'active',
    visibility: 'public',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    slug: "m365-deep-dive",
    title: "Copilot in M365 Deep Dive (Half-Day)",
    price_nzd: 199,
    duration: "3.5 hours",
    mode: "Live Online",
    level: "Intermediate",
    tagline: "Go from user to power-user — make Copilot your productivity edge.",
    learn: [
      "Advanced Excel, PowerPoint, Outlook workflows",
      "Multi-step prompts for reports and presentations",
      "Teams meeting → auto-summary → action list pipeline"
    ],
    takeaways: [
      "Executive-level deck templates built in minutes",
      "Reusable Prompt Library for your team",
      "Scenario Labs: sales reporting, finance summaries, board papers",
      "Hours saved every week in real work"
    ],
    cta: { label: "Register Interest (NZ$199)", href: "/contact?course=m365-deep-dive" },
    status: 'active',
    visibility: 'public',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    slug: "certification-practitioner",
    title: "Copilot Certification (Full-Day + Assessment)",
    price_nzd: 399,
    duration: "8 hours",
    mode: "Hybrid (Online + In-Person)",
    level: "Intermediate",
    badge: "ElevateCopilot Certified Practitioner",
    tagline: "Become a certified Copilot professional — showcase it on LinkedIn, prove it at work.",
    learn: [
      "Advanced prompt engineering: context, chaining, style commands",
      "Governance & safety best practice",
      "Designing workflows that scale across teams"
    ],
    takeaways: [
      "Digital Badge + PDF certificate (LinkedIn-shareable)",
      "Personalized 30-day adoption plan",
      "Hands-on projects: report, executive deck, financial analysis",
      "Workbook + templates for daily reuse"
    ],
    cta: { label: "Register Interest (NZ$399)", href: "/contact?course=certification-practitioner" },
    status: 'active',
    visibility: 'public',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    slug: "executive-briefing",
    title: "Executive Briefing: ROI, Risk & Rollout (90-min)",
    price_nzd: 199,
    price_private_nzd: 1499,
    duration: "90 minutes",
    mode: "Online or Private In-Person",
    level: "Leadership",
    tagline: "Make the business case. Lead the rollout. Minimize risk.",
    learn: [
      "Calculate & communicate Copilot ROI in your context",
      "Risk & compliance controls (data boundaries, DLP, approvals)",
      "Rollout strategies that stick (champions, telemetry, nudges)"
    ],
    takeaways: [
      "Board-Ready ROI Storyboard (editable)",
      "Rollout Playbook tailored to leadership",
      "Executive Insights Pack — 10 slides ready for ELT",
      "Confidence to secure budget and momentum"
    ],
    cta: { label: "Register Interest (NZ$199)", href: "/contact?course=executive-briefing" },
    status: 'active',
    visibility: 'public',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

// Empty sessions array since we're removing upcoming sessions
export const defaultSessions: Session[] = []

// Utility functions
export function getActiveCourses(): Course[] {
  return defaultCourses.filter(course => course.status === 'active' && course.visibility === 'public')
}

export function getFeaturedCourses(): Course[] {
  return defaultCourses.filter(course => course.status === 'active' && course.visibility === 'public')
}

export function getCourseBySlug(slug: string): Course | undefined {
  return defaultCourses.find(course => course.slug === slug)
}

export function getUpcomingSessions(): Session[] {
  return [] // Return empty array since we're removing upcoming sessions
}
