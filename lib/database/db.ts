// Client-side compatible database service using localStorage as fallback
// In production, this would connect to a real database via API routes

import { Course, Session } from '../data/courses'

// Storage keys for localStorage
const COURSES_STORAGE_KEY = 'elevatecopilot_courses'
const SESSIONS_STORAGE_KEY = 'elevatecopilot_sessions'

// Default sample data
const defaultCourses: Course[] = [
  {
    id: 1,
    title: "Copilot Masterclass (90-min)",
    slug: "copilot-masterclass",
    description: "Interactive online class covering Outlook, Word, Excel & Teams. Fast-paced, practical session on core Copilot skills.",
    shortDescription: "Fast-paced, practical session on core Copilot skills.",
    price: "$199",
    duration: "90 minutes",
    format: "Online",
    level: "Beginner",
    maxSeats: 20,
    enrolled: 15,
    instructor: "Sarah Chen",
    category: "Masterclass",
    status: "active",
    visibility: "public",
    featured: true,
    certification: false,
    objectives: [
      "Master basic Copilot prompts and commands",
      "Learn to use Copilot in Outlook, Word, Excel & Teams",
      "Understand best practices for AI-assisted productivity",
      "Get hands-on practice with real-world scenarios"
    ],
    prerequisites: [
      "Basic familiarity with Microsoft 365 applications",
      "Active Microsoft 365 subscription (recommended)"
    ],
    agenda: "Introduction to Copilot (15 min) • Outlook & Email Management (20 min) • Word & Document Creation (20 min) • Excel & Data Analysis (20 min) • Teams & Collaboration (10 min) • Q&A & Wrap-up (5 min)",
    materials: "Course workbook, prompt templates, practice exercises, recording access",
    metaTitle: "Copilot Masterclass - Learn Microsoft Copilot in 90 Minutes",
    metaDescription: "Master Microsoft Copilot with our interactive 90-minute online class. Learn to use AI assistance in Outlook, Word, Excel & Teams.",
    keywords: ["Microsoft Copilot", "AI training", "productivity", "Microsoft 365", "online course"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Copilot Certification (Full Day)",
    slug: "copilot-certification",
    description: "Hands-on labs, assessment & digital badge. Deep dive with comprehensive training and industry-recognized certification.",
    shortDescription: "Deep dive with labs, assessment & digital badge.",
    price: "$595",
    duration: "8 hours",
    format: "Hybrid",
    level: "Intermediate",
    maxSeats: 12,
    enrolled: 8,
    instructor: "Michael Rodriguez",
    category: "Certification",
    status: "active",
    visibility: "public",
    featured: true,
    certification: true,
    objectives: [
      "Achieve comprehensive understanding of Copilot capabilities",
      "Master advanced prompt engineering techniques",
      "Complete hands-on labs and assessments",
      "Earn industry-recognized certification"
    ],
    prerequisites: [
      "Completion of Copilot Masterclass or equivalent experience",
      "Proficiency with Microsoft 365 applications",
      "Active Microsoft 365 subscription"
    ],
    agenda: "Advanced Copilot Concepts (1 hour) • Prompt Engineering Workshop (2 hours) • Hands-on Labs (3 hours) • Assessment & Testing (1 hour) • Certification Process (1 hour)",
    materials: "Comprehensive workbook, lab exercises, assessment materials, digital badge, certificate",
    metaTitle: "Copilot Certification - Full-Day Training with Digital Badge",
    metaDescription: "Get certified in Microsoft Copilot with our comprehensive full-day program. Includes hands-on labs, assessment, and digital badge.",
    keywords: ["Copilot certification", "digital badge", "hands-on training", "assessment", "professional development"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Corporate Copilot Workshop",
    slug: "corporate-workshop",
    description: "Tailored sessions for teams & executives; includes adoption playbooks. Customized training for organizational success.",
    shortDescription: "Tailored sessions for teams & executives; includes adoption playbooks.",
    price: "From $4,000",
    duration: "Full day",
    format: "In-person",
    level: "All Levels",
    maxSeats: 20,
    enrolled: 0,
    instructor: "David Kim",
    category: "Corporate",
    status: "draft",
    visibility: "corporate",
    featured: false,
    certification: false,
    objectives: [
      "Develop organizational Copilot strategy",
      "Train teams on effective AI collaboration",
      "Create adoption and governance frameworks",
      "Measure ROI and productivity gains"
    ],
    prerequisites: [
      "Organizational commitment to AI adoption",
      "Access to Microsoft 365 with Copilot licenses",
      "Stakeholder buy-in and support"
    ],
    agenda: "Executive Strategy Session (2 hours) • Team Training Workshop (4 hours) • Governance & Security (1 hour) • Adoption Planning (1 hour)",
    materials: "Customized playbooks, governance templates, ROI measurement tools, ongoing support",
    metaTitle: "Corporate Copilot Workshop - Team Training & Adoption Strategy",
    metaDescription: "Transform your organization with our corporate Copilot workshop. Includes team training, adoption strategy, and governance frameworks.",
    keywords: ["corporate training", "team workshop", "adoption strategy", "governance", "ROI"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: "Advanced Copilot Techniques",
    slug: "advanced-copilot",
    description: "Master advanced prompt engineering and complex workflows. Take your Copilot skills to the next level.",
    shortDescription: "Master advanced prompt engineering and complex workflows.",
    price: "$299",
    duration: "4 hours",
    format: "Online",
    level: "Advanced",
    maxSeats: 15,
    enrolled: 12,
    instructor: "Lisa Thompson",
    category: "Advanced",
    status: "active",
    visibility: "public",
    featured: false,
    certification: false,
    objectives: [
      "Master advanced prompt engineering techniques",
      "Create complex workflows and automations",
      "Optimize Copilot for specific use cases",
      "Develop custom prompt libraries"
    ],
    prerequisites: [
      "Strong foundation in basic Copilot usage",
      "Experience with Microsoft 365 applications",
      "Understanding of workflow optimization"
    ],
    agenda: "Advanced Prompt Engineering (1 hour) • Complex Workflow Design (1.5 hours) • Custom Prompt Libraries (1 hour) • Optimization Strategies (30 min) • Q&A & Discussion (30 min)",
    materials: "Advanced workbook, prompt templates, workflow examples, optimization guide",
    metaTitle: "Advanced Copilot Techniques - Expert-Level Training",
    metaDescription: "Master advanced Copilot techniques with our expert-level training. Learn prompt engineering, workflow design, and optimization strategies.",
    keywords: ["advanced Copilot", "prompt engineering", "workflow design", "optimization", "expert training"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const defaultSessions: Session[] = [
  {
    id: 1,
    courseId: 1,
    course: defaultCourses[0],
    date: "2025-09-12",
    startTime: "10:00",
    endTime: "11:30",
    timezone: "AEST",
    format: "Online (Zoom)",
    location: "Virtual",
    instructor: "Sarah Chen",
    status: "scheduled",
    maxSeats: 20,
    enrolled: 15,
    price: "$199",
    waitlist: true,
    recording: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    courseId: 2,
    course: defaultCourses[1],
    date: "2025-09-26",
    startTime: "09:00",
    endTime: "17:00",
    timezone: "NZST",
    format: "In-Person",
    location: "Auckland, NZ",
    instructor: "Michael Rodriguez",
    status: "scheduled",
    maxSeats: 12,
    enrolled: 8,
    price: "$595",
    waitlist: false,
    recording: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    courseId: 3,
    course: defaultCourses[2],
    date: "2025-10-10",
    startTime: "09:00",
    endTime: "16:00",
    timezone: "AEST",
    format: "In-Person",
    location: "Sydney, AU",
    instructor: "David Kim",
    status: "draft",
    maxSeats: 20,
    enrolled: 0,
    price: "From $4,000",
    waitlist: false,
    recording: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    courseId: 4,
    course: defaultCourses[3],
    date: "2025-10-03",
    startTime: "14:00",
    endTime: "18:00",
    timezone: "PST",
    format: "Online (Zoom)",
    location: "Virtual",
    instructor: "Lisa Thompson",
    status: "scheduled",
    maxSeats: 15,
    enrolled: 12,
    price: "$299",
    waitlist: false,
    recording: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// Helper functions for localStorage
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue

  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error)
    return defaultValue
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error)
  }
}

// Get courses from localStorage or use defaults
function getCourses(): Course[] {
  return getFromStorage(COURSES_STORAGE_KEY, defaultCourses)
}

// Get sessions from localStorage or use defaults
function getSessions(): Session[] {
  return getFromStorage(SESSIONS_STORAGE_KEY, defaultSessions)
}

// CRUD Operations for Courses
export function createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course {
  const courses = getCourses()
  const newCourse: Course = {
    ...courseData,
    id: Math.max(...courses.map(c => c.id), 0) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  courses.push(newCourse)
  saveToStorage(COURSES_STORAGE_KEY, courses)

  // Update sessions with the new course reference
  updateSessionCourseReferences()

  return newCourse
}

export function getCourseById(id: number): Course | undefined {
  const courses = getCourses()
  return courses.find(c => c.id === id)
}

export function getAllCourses(): Course[] {
  return getCourses()
}

export function getActiveCourses(): Course[] {
  const courses = getCourses()
  return courses.filter(c => c.status === 'active' && c.visibility === 'public')
}

export function getFeaturedCourses(): Course[] {
  const courses = getCourses()
  return courses.filter(c => c.status === 'active' && c.visibility === 'public' && c.featured)
}

export function getCourseBySlug(slug: string): Course | undefined {
  const courses = getCourses()
  return courses.find(c => c.slug === slug)
}

export function updateCourse(id: number, updates: Partial<Course>): Course | null {
  const courses = getCourses()
  const index = courses.findIndex(c => c.id === id)
  if (index === -1) return null

  courses[index] = {
    ...courses[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }

  saveToStorage(COURSES_STORAGE_KEY, courses)

  // Update sessions with the updated course reference
  updateSessionCourseReferences()

  return courses[index]
}

export function deleteCourse(id: number): boolean {
  const courses = getCourses()
  const index = courses.findIndex(c => c.id === id)
  if (index === -1) return false

  courses.splice(index, 1)
  saveToStorage(COURSES_STORAGE_KEY, courses)

  // Also remove related sessions
  const sessions = getSessions()
  const filteredSessions = sessions.filter(s => s.courseId !== id)
  saveToStorage(SESSIONS_STORAGE_KEY, filteredSessions)

  return true
}

export function getCourseStats() {
  const courses = getCourses()
  const totalEnrollments = courses.reduce((sum, course) => sum + course.enrolled, 0)
  const activeCourses = courses.filter(c => c.status === 'active').length

  return {
    totalCourses: courses.length,
    totalEnrollments,
    activeCourses,
    averagePrice: "$275"
  }
}

// Session Operations
export function getUpcomingSessions(): Session[] {
  const sessions = getSessions()
  const today = new Date().toISOString().split('T')[0]
  return sessions.filter(s => s.status === 'scheduled' && s.date >= today)
}

export function getSessionsByCourse(courseId: number): Session[] {
  const sessions = getSessions()
  return sessions.filter(s => s.courseId === courseId)
}

// Update session course references when courses change
function updateSessionCourseReferences(): void {
  const courses = getCourses()
  const sessions = getSessions()

  // Update each session with the latest course reference
  const updatedSessions = sessions.map(session => {
    const course = courses.find(c => c.id === session.courseId)
    if (course) {
      return { ...session, course }
    }
    return session
  })

  saveToStorage(SESSIONS_STORAGE_KEY, updatedSessions)
}

// Reset to default data (useful for testing)
export function resetDatabase(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(COURSES_STORAGE_KEY)
    localStorage.removeItem(SESSIONS_STORAGE_KEY)
    console.log('Reset to default data')
  }
}
