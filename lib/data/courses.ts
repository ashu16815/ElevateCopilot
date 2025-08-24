export interface Course {
  id: number
  slug: string
  title: string
  price_usd: number
  price_private_usd?: number
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
    price_usd: 59,
    duration: "90 minutes",
    mode: "Live Online",
    level: "Beginner",
    tagline: "Your fast track to Copilot confidence — learn it all in one session.",
    learn: [
      "Complete essentials: Word, Outlook, Excel, PowerPoint, Teams",
      "Prompting secrets for business-ready outputs",
      "Verification hacks to reduce rework"
    ],
    takeaways: [
      "Day-1 Copilot Playbook — 15+ ready-to-use prompts",
      "Practice Pack with exercises",
      "Certificate of Participation (add to LinkedIn)",
      "Confidence to impress in your next team meeting"
    ],
    cta: {
      label: "Register Interest",
      href: "/contact?course=kickstart-masterclass"
    },
    badge: "Kickstart",
    status: "active",
    visibility: "public",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    slug: "m365-deep-dive",
    title: "Copilot in M365 Deep Dive (Half-Day)",
    price_usd: 119,
    duration: "3.5 hours",
    mode: "Live Online",
    level: "Intermediate",
    tagline: "Go from user to power-user — make Copilot your productivity edge.",
    learn: [
      "Advanced workflows in Excel, PowerPoint, Outlook",
      "Multi-step prompts for reports and presentations",
      "Collaboration workflows: Teams meetings → summaries → actions"
    ],
    takeaways: [
      "Executive-level deck templates built in minutes",
      "Reusable Prompt Library to share with your team",
      "Scenario Labs: sales reporting, finance summaries, board papers",
      "Hours saved every week in real work"
    ],
    cta: {
      label: "Register Interest",
      href: "/contact?course=m365-deep-dive"
    },
    badge: "Deep Dive",
    status: "active",
    visibility: "public",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    slug: "certification-practitioner",
    title: "Copilot Certification (Full-Day + Assessment)",
    price_usd: 239,
    duration: "8 hours",
    mode: "Hybrid (Online + In-Person)",
    level: "Intermediate",
    tagline: "Become a certified Copilot professional — showcase it on LinkedIn, prove it at work.",
    learn: [
      "Advanced prompt engineering — context, chaining, style commands",
      "Governance & safety best practice",
      "Design workflows that scale across teams"
    ],
    takeaways: [
      "ElevateCopilot Certified Practitioner Badge (LinkedIn-ready)",
      "Personalized adoption plan for your manager",
      "Hands-on projects: report, executive deck, financial analysis",
      "Workbook + templates for daily reuse",
      "Stand-out certified skills for career growth"
    ],
    cta: {
      label: "Register Interest",
      href: "/contact?course=certification-practitioner"
    },
    badge: "Certified",
    status: "active",
    visibility: "public",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    slug: "executive-briefing",
    title: "Executive Briefing: ROI, Risk & Rollout (90-min)",
    price_usd: 119,
    price_private_usd: 899,
    duration: "90 minutes",
    mode: "Online or Private In-Person",
    level: "Leadership",
    tagline: "Make the business case. Lead the rollout. Minimize risk.",
    learn: [
      "Calculate & communicate Copilot ROI (Forrester TEI shows up to 353% ROI)",
      "Risk & compliance controls for approval",
      "Rollout strategies that stick"
    ],
    takeaways: [
      "Board-Ready ROI Storyboard",
      "Rollout Playbook tailored to leadership",
      "Executive Insights Pack — 10 slides ready for ELT",
      "Confidence to present ROI & risk to the boardroom"
    ],
    cta: {
      label: "Register Interest",
      href: "/contact?course=executive-briefing"
    },
    badge: "Executive",
    status: "active",
    visibility: "public",
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
