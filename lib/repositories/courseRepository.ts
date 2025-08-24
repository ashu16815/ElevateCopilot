import { 
  createCourse, 
  getCourseById, 
  getAllCourses, 
  getActiveCourses, 
  getFeaturedCourses, 
  getCourseBySlug, 
  updateCourse, 
  deleteCourse, 
  getCourseStats 
} from '../database/db'
import { Course, Session } from '../data/courses'

// Course Repository with client-side operations
export class CourseRepository {
  
  // Create a new course
  static createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course {
    return createCourse(courseData)
  }

  // Get course by ID
  static getCourseById(id: number): Course | undefined {
    return getCourseById(id)
  }

  // Get all courses
  static getAllCourses(): Course[] {
    return getAllCourses()
  }

  // Get active public courses
  static getActiveCourses(): Course[] {
    return getActiveCourses()
  }

  // Get featured courses
  static getFeaturedCourses(): Course[] {
    return getFeaturedCourses()
  }

  // Get course by slug
  static getCourseBySlug(slug: string): Course | undefined {
    return getCourseBySlug(slug)
  }

  // Update course
  static updateCourse(id: number, updates: Partial<Course>): Course | null {
    return updateCourse(id, updates)
  }

  // Delete course
  static deleteCourse(id: number): boolean {
    return deleteCourse(id)
  }

  // Get course statistics
  static getCourseStats() {
    return getCourseStats()
  }
}

// Session Repository with client-side operations
export class SessionRepository {
  
  // Get all sessions
  static getAllSessions(): Session[] {
    // This would need to be implemented in the database service
    // For now, return empty array
    return []
  }

  // Get upcoming sessions
  static getUpcomingSessions(): Session[] {
    const { getUpcomingSessions } = require('../database/db')
    return getUpcomingSessions()
  }

  // Get sessions by course
  static getSessionsByCourse(courseId: number): Session[] {
    const { getSessionsByCourse } = require('../database/db')
    return getSessionsByCourse(courseId)
  }
}
