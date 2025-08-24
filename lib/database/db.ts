// Client-side compatible database service using localStorage as fallback
import { Course, Session, defaultCourses, defaultSessions } from '../data/courses'

const COURSES_STORAGE_KEY = 'elevatecopilot_courses'
const SESSIONS_STORAGE_KEY = 'elevatecopilot_sessions'

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
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
  courses.push(newCourse)
  saveToStorage(COURSES_STORAGE_KEY, courses)
  
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
  return courses.filter(course => course.status === 'active' && course.visibility === 'public')
}

export function getFeaturedCourses(): Course[] {
  const courses = getCourses()
  return courses.filter(course => course.status === 'active' && course.visibility === 'public')
}

export function getCourseBySlug(slug: string): Course | undefined {
  const courses = getCourses()
  return courses.find(course => course.slug === slug)
}

export function updateCourse(id: number, updates: Partial<Course>): Course | null {
  const courses = getCourses()
  const index = courses.findIndex(c => c.id === id)
  if (index === -1) return null
  
  courses[index] = {
    ...courses[index],
    ...updates,
    updatedAt: new Date()
  }
  
  saveToStorage(COURSES_STORAGE_KEY, courses)
  
  return courses[index]
}

export function deleteCourse(id: number): boolean {
  const courses = getCourses()
  const index = courses.findIndex(c => c.id === id)
  if (index === -1) return false
  
  courses.splice(index, 1)
  saveToStorage(COURSES_STORAGE_KEY, courses)
  
  return true
}

export function getCourseStats() {
  const activeCourses = getActiveCourses()
  
  return {
    totalCourses: activeCourses.length,
    totalEnrollments: 0, // No sessions anymore
    upcomingSessions: 0, // No sessions anymore
    averagePrice: "NZ$249" // Updated to NZD
  }
}

// Session functions now return empty arrays
export function getUpcomingSessions(): Session[] {
  return [] // No upcoming sessions
}

export function getSessionsByCourse(courseId: number): Session[] {
  return [] // No sessions
}

// Reset to default data (useful for testing)
export function resetDatabase(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(COURSES_STORAGE_KEY)
    localStorage.removeItem(SESSIONS_STORAGE_KEY)
    console.log('Reset to default data')
  }
}
