'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { CourseRepository } from '@/lib/repositories/courseRepository'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'

const EditCoursePage = () => {
  const router = useRouter()
  const params = useParams()
  const courseId = Number(params.id)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    price_nzd: 0,
    price_private_nzd: 0,
    duration: '',
    mode: '',
    level: '',
    tagline: '',
    learn: [''],
    takeaways: [''],
    cta_label: '',
    cta_href: '',
    status: 'draft' as 'draft' | 'active' | 'archived',
    visibility: 'public' as 'public' | 'private'
  })

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const course = CourseRepository.getCourseById(courseId)
        if (course) {
          setFormData({
            slug: course.slug,
            title: course.title,
            price_nzd: course.price_nzd,
            price_private_nzd: course.price_private_nzd || 0,
            duration: course.duration,
            mode: course.mode,
            level: course.level,
            tagline: course.tagline,
            learn: course.learn.length > 0 ? course.learn : [''],
            takeaways: course.takeaways.length > 0 ? course.takeaways : [''],
            cta_label: course.cta.label,
            cta_href: course.cta.href,
            status: course.status,
            visibility: course.visibility
          })
        } else {
          alert('Course not found')
          router.push('/admin/courses')
        }
      } catch (error) {
        console.error('Error loading course:', error)
        alert('Failed to load course. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCourse()
  }, [courseId, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleArrayChange = (field: 'learn' | 'takeaways', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field: 'learn' | 'takeaways') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field: 'learn' | 'takeaways', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Filter out empty learn and takeaways items
      const filteredLearn = formData.learn.filter(item => item.trim() !== '')
      const filteredTakeaways = formData.takeaways.filter(item => item.trim() !== '')

      const courseData = {
        slug: formData.slug,
        title: formData.title,
        price_nzd: Number(formData.price_nzd),
        price_private_nzd: formData.price_private_nzd > 0 ? Number(formData.price_private_nzd) : undefined,
        duration: formData.duration,
        mode: formData.mode,
        level: formData.level,
        tagline: formData.tagline,
        learn: filteredLearn,
        takeaways: filteredTakeaways,
        cta: {
          label: formData.cta_label,
          href: formData.cta_href
        },
        status: formData.status,
        visibility: formData.visibility
      }

      const updatedCourse = CourseRepository.updateCourse(courseId, courseData)
      
      if (updatedCourse) {
        alert(`Course "${updatedCourse.title}" updated successfully!`)
        router.push('/admin/courses')
      } else {
        alert('Failed to update course. Please try again.')
      }
      
    } catch (error) {
      console.error('Error updating course:', error)
      alert('Failed to update course. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted">Loading course...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-3xl font-bold text-primary">Edit Course</h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-primary mb-4">Basic Information</h2>
            </div>
            
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-primary mb-2">
                Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., kickstart-masterclass"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-primary mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., Copilot Kickstart (90-min Masterclass)"
              />
            </div>

            <div>
              <label htmlFor="price_nzd" className="block text-sm font-medium text-primary mb-2">
                Price (NZD) *
              </label>
              <input
                type="number"
                id="price_nzd"
                name="price_nzd"
                value={formData.price_nzd}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="99"
              />
            </div>

            <div>
              <label htmlFor="price_private_nzd" className="block text-sm font-medium text-primary mb-2">
                Private Price (NZD)
              </label>
              <input
                type="number"
                id="price_private_nzd"
                name="price_private_nzd"
                value={formData.price_private_nzd}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="1499 (optional)"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-primary mb-2">
                Duration *
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., 90 minutes"
              />
            </div>

            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-primary mb-2">
                Mode *
              </label>
              <input
                type="text"
                id="mode"
                name="mode"
                value={formData.mode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., Live Online"
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-primary mb-2">
                Level *
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Leadership">Leadership</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="tagline" className="block text-sm font-medium text-primary mb-2">
                Tagline *
              </label>
              <textarea
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., Your fast track to Copilot confidence — learn it all in one session."
              />
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">What You'll Learn</h2>
              <button
                type="button"
                onClick={() => addArrayItem('learn')}
                className="btn-secondary px-4 py-2 text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
            </div>
            {formData.learn.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('learn', index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="e.g., Complete essentials across Word, Outlook, Excel, PowerPoint, Teams"
                />
                {formData.learn.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('learn', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-primary">Key Takeaways</h2>
              <button
                type="button"
                onClick={() => addArrayItem('takeaways')}
                className="btn-secondary px-4 py-2 text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
            </div>
            {formData.takeaways.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('takeaways', index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="e.g., Day-1 Copilot Playbook — 15+ ready-to-use prompts"
                />
                {formData.takeaways.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('takeaways', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="cta_label" className="block text-sm font-medium text-primary mb-2">
                CTA Label *
              </label>
              <input
                type="text"
                id="cta_label"
                name="cta_label"
                value={formData.cta_label}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., Register Interest (NZ$99)"
              />
            </div>

            <div>
              <label htmlFor="cta_href" className="block text-sm font-medium text-primary mb-2">
                CTA Link *
              </label>
              <input
                type="text"
                id="cta_href"
                name="cta_href"
                value={formData.cta_href}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="e.g., /contact?course=kickstart-masterclass"
              />
            </div>
          </div>

          {/* Status and Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-primary mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-primary mb-2">
                Visibility
              </label>
              <select
                id="visibility"
                name="visibility"
                value={formData.visibility}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-8 py-3 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Updating...' : 'Update Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCoursePage
