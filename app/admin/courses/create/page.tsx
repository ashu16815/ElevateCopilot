'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { CourseRepository } from '@/lib/repositories/courseRepository'
import { Course } from '@/lib/data/courses'

const CreateCoursePage = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: '',
    duration: '',
    format: '',
    level: '',
    maxSeats: 20,
    enrolled: 0,
    instructor: '',
    category: '',
    status: 'draft' as 'draft' | 'active' | 'archived',
    visibility: 'public' as 'public' | 'private' | 'corporate',
    featured: false,
    certification: false,
    objectives: '',
    prerequisites: '',
    agenda: '',
    materials: '',
    metaTitle: '',
    metaDescription: '',
    keywords: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    setFormData(prev => ({
      ...prev,
      title,
      slug
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Parse objectives, prerequisites, and keywords from textareas into arrays
      const objectives = formData.objectives.split('\n').filter(obj => obj.trim() !== '')
      const prerequisites = formData.prerequisites.split('\n').filter(prereq => prereq.trim() !== '')
      const keywords = formData.keywords.split(',').map(keyword => keyword.trim()).filter(keyword => keyword !== '')

      // Create course data object
      const courseData = {
        ...formData,
        objectives,
        prerequisites,
        keywords
      }

      // Create the course using the repository
      const newCourse = CourseRepository.createCourse(courseData)
      
      alert(`Course "${newCourse.title}" created successfully!`)
      router.push('/admin/courses')
      
    } catch (error) {
      console.error('Error creating course:', error)
      alert('Failed to create course. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
                <p className="text-gray-600 mt-2">Add a new training program to your catalog</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Copilot Masterclass (90-min)"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., copilot-masterclass"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    required
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Brief description for course cards and previews"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Detailed description of the course content and benefits"
                  />
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., $199 or From $4,000"
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    required
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 90 minutes, 8 hours, Full day"
                  />
                </div>

                <div>
                  <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
                    Format *
                  </label>
                  <select
                    id="format"
                    name="format"
                    required
                    value={formData.format}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select format</option>
                    <option value="Online">Online</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Self-Paced">Self-Paced</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Level *
                  </label>
                  <select
                    id="level"
                    name="level"
                    required
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Masterclass">Masterclass</option>
                    <option value="Certification">Certification</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-2">
                    Instructor *
                  </label>
                  <input
                    type="text"
                    id="instructor"
                    name="instructor"
                    required
                    value={formData.instructor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Sarah Chen"
                  />
                </div>

                <div>
                  <label htmlFor="maxSeats" className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Seats
                  </label>
                  <input
                    type="number"
                    id="maxSeats"
                    name="maxSeats"
                    min="1"
                    value={formData.maxSeats}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="enrolled" className="block text-sm font-medium text-gray-700 mb-2">
                    Currently Enrolled
                  </label>
                  <input
                    type="number"
                    id="enrolled"
                    name="enrolled"
                    min="0"
                    value={formData.enrolled}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Course Settings */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility
                  </label>
                  <select
                    id="visibility"
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="corporate">Corporate Only</option>
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Featured Course</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="certification"
                      checked={formData.certification}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Certification Course</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Content</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="objectives" className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Objectives *
                  </label>
                  <textarea
                    id="objectives"
                    name="objectives"
                    required
                    rows={4}
                    value={formData.objectives}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter each learning objective on a new line&#10;e.g.,&#10;Master basic Copilot prompts and commands&#10;Learn to use Copilot in Outlook, Word, Excel & Teams"
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter each objective on a new line</p>
                </div>

                <div>
                  <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700 mb-2">
                    Prerequisites *
                  </label>
                  <textarea
                    id="prerequisites"
                    name="prerequisites"
                    required
                    rows={3}
                    value={formData.prerequisites}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter each prerequisite on a new line&#10;e.g.,&#10;Basic familiarity with Microsoft 365 applications&#10;Active Microsoft 365 subscription (recommended)"
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter each prerequisite on a new line</p>
                </div>

                <div>
                  <label htmlFor="agenda" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Agenda *
                  </label>
                  <textarea
                    id="agenda"
                    name="agenda"
                    required
                    rows={4}
                    value={formData.agenda}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Detailed breakdown of course content and timing&#10;e.g., Introduction to Copilot (15 min) • Outlook & Email Management (20 min) • Word & Document Creation (20 min)"
                  />
                </div>

                <div>
                  <label htmlFor="materials" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Materials
                  </label>
                  <textarea
                    id="materials"
                    name="materials"
                    rows={3}
                    value={formData.materials}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Course workbook, prompt templates, practice exercises, recording access"
                  />
                </div>
              </div>
            </div>

            {/* SEO & Marketing */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">SEO & Marketing</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="SEO title for search engines (recommended: 50-60 characters)"
                  />
                </div>

                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    rows={3}
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="SEO description for search engines (recommended: 150-160 characters)"
                  />
                </div>

                <div>
                  <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Comma-separated keywords for SEO (e.g., Microsoft Copilot, AI training, productivity)"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate keywords with commas</p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  name="action"
                  value="draft"
                  onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2 inline" />
                  Save as Draft
                </button>
                
                <button
                  type="submit"
                  name="action"
                  value="publish"
                  onClick={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  <Eye className="h-4 w-4 mr-2 inline" />
                  {isSubmitting ? 'Creating...' : 'Set to Publish'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCoursePage
