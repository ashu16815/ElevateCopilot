'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail, Phone, MapPin, Clock, Calendar, Users, DollarSign, BookOpen, Target, MessageSquare, Building, Globe, Zap } from 'lucide-react'
import { SessionRepository, CourseRepository } from '@/lib/repositories/courseRepository'
import { Session, Course } from '@/lib/data/courses'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    inquiryType: 'general',
    urgency: 'standard',
    courseInterest: '',
    sessionInterest: '',
    participants: 1,
    preferredDate: '',
    preferredTime: '',
    budget: '',
    message: '',
    newsletter: false,
    corporateTraining: false
  })

  const [sessions, setSessions] = useState<Session[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState('')

  useEffect(() => {
    // Load sessions and courses
    const loadData = async () => {
      try {
        const upcomingSessions = SessionRepository.getUpcomingSessions()
        const activeCourses = CourseRepository.getActiveCourses()
        setSessions(upcomingSessions)
        setCourses(activeCourses)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    // Pre-fill form if session ID is provided
    if (sessionId && sessions.length > 0) {
      const session = sessions.find(s => s.id.toString() === sessionId)
      if (session) {
        setSelectedSession(session)
        setFormData(prev => ({
          ...prev,
          inquiryType: 'session',
          sessionInterest: session.id.toString(),
          courseInterest: session.course.id.toString(),
          message: `I'm interested in the ${session.course.title} session on ${session.date} at ${session.startTime} ${session.timezone}.`
        }))
      }
    }
  }, [sessionId, sessions])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult('Sending...')

    try {
      // Create FormData for web3forms
      const formDataToSend = new FormData()
      
      // Add all form fields
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone || 'Not provided')
      formDataToSend.append('company', formData.company || 'Not provided')
      formDataToSend.append('jobTitle', formData.jobTitle || 'Not provided')
      formDataToSend.append('inquiryType', formData.inquiryType)
      formDataToSend.append('urgency', formData.urgency)
      formDataToSend.append('message', formData.message)
      
      // Add course/session specific information
      if (formData.inquiryType === 'course' && formData.courseInterest) {
        const course = courses.find(c => c.id.toString() === formData.courseInterest)
        formDataToSend.append('courseInterest', course?.title || 'N/A')
      }
      
      if (formData.inquiryType === 'session' && formData.sessionInterest) {
        const session = sessions.find(s => s.id.toString() === formData.sessionInterest)
        formDataToSend.append('sessionInterest', `${session?.course.title || 'N/A'} on ${session?.date || 'N/A'} at ${session?.startTime || 'N/A'} ${session?.timezone || 'N/A'}`)
      }
      
      // Add additional details
      formDataToSend.append('participants', formData.participants.toString())
      formDataToSend.append('preferredDate', formData.preferredDate || 'Not specified')
      formDataToSend.append('preferredTime', formData.preferredTime || 'Not specified')
      formDataToSend.append('budget', formData.budget || 'Not specified')
      formDataToSend.append('newsletter', formData.newsletter ? 'Yes' : 'No')
      formDataToSend.append('corporateTraining', formData.corporateTraining ? 'Yes' : 'No')
      
      // Add web3forms access key
      formDataToSend.append('access_key', 'be6ff4a1-4ba7-45b1-ba03-4b1137ca0574')
      
      // Add subject line
      formDataToSend.append('subject', `New Contact Inquiry: ${formData.inquiryType} - ${formData.name}`)
      
      // Add recipient email
      formDataToSend.append('to', 'elevatecopilot@outlook.com')
      
      // Add from name
      formDataToSend.append('from_name', 'ElevateCopilot Website Contact Form')

      // Submit to web3forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()

      if (data.success) {
        setSubmitResult('Thank you for your inquiry! We will get back to you within 24 hours.')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          jobTitle: '',
          inquiryType: 'general',
          urgency: 'standard',
          courseInterest: '',
          sessionInterest: '',
          participants: 1,
          preferredDate: '',
          preferredTime: '',
          budget: '',
          message: '',
          newsletter: false,
          corporateTraining: false
        })
        setSelectedSession(null)
        
      } else {
        console.error('Error submitting form:', data)
        setSubmitResult('There was an error submitting your inquiry. Please try again or contact us directly.')
      }
      
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitResult('There was an error submitting your inquiry. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Ready to elevate your Copilot skills? Have questions about our training programs? 
            We're here to help you succeed.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>
              
              {/* Submit Result Message */}
              {submitResult && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitResult.includes('Thank you') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : submitResult.includes('error') 
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {submitResult}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Manager, Developer, Executive"
                  />
                </div>

                {/* Inquiry Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="course">Course Information</option>
                      <option value="session">Session Booking</option>
                      <option value="corporate">Corporate Training</option>
                      <option value="certification">Certification</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="standard">Standard (3-5 business days)</option>
                      <option value="urgent">Urgent (1-2 business days)</option>
                      <option value="critical">Critical (Same day)</option>
                    </select>
                  </div>
                </div>

                {/* Course/Session Specific Fields */}
                {formData.inquiryType === 'course' && (
                  <div>
                    <label htmlFor="courseInterest" className="block text-sm font-medium text-gray-700 mb-2">
                      Course of Interest
                    </label>
                    <select
                      id="courseInterest"
                      name="courseInterest"
                      value={formData.courseInterest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.title} - {course.price}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {formData.inquiryType === 'session' && (
                  <div>
                    <label htmlFor="sessionInterest" className="block text-sm font-medium text-gray-700 mb-2">
                      Training Session
                    </label>
                    <select
                      id="sessionInterest"
                      name="sessionInterest"
                      value={formData.sessionInterest}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a session</option>
                      {sessions.map(session => (
                        <option key={session.id} value={session.id}>
                          {session.course.title} - {session.date} {session.startTime} {session.timezone}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Additional Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Participants
                    </label>
                    <input
                      type="number"
                      id="participants"
                      name="participants"
                      min="1"
                      max="100"
                      value={formData.participants}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under $500">Under $500</option>
                      <option value="$500 - $1,000">$500 - $1,000</option>
                      <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                      <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                      <option value="Over $5,000">Over $5,000</option>
                      <option value="To be discussed">To be discussed</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                      <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Please provide details about your inquiry, specific requirements, or any questions you have..."
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      Subscribe to our newsletter for training updates and Copilot tips
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="corporateTraining"
                      checked={formData.corporateTraining}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      I'm interested in corporate training solutions for my team
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="mailto:elevatecopilot@outlook.com"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span className="text-gray-700">Send Direct Email</span>
                </a>
                
                <a
                  href="tel:+61412345678"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span className="text-gray-700">Call Us Directly</span>
                </a>
                
                <a
                  href="/schedule"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-colors"
                >
                  <Calendar className="h-5 w-5 text-primary mr-3" />
                  <span className="text-gray-700">View Schedule</span>
                </a>
                
                <a
                  href="/courses"
                  className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-blue-50 transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-primary mr-3" />
                  <span className="text-gray-700">Browse Courses</span>
                </a>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:elevatecopilot@outlook.com" className="text-primary hover:underline">
                      elevatecopilot@outlook.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href="tel:+61412345678" className="text-primary hover:underline">
                      +61 412 345 678
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Website</p>
                    <a href="https://elevatecopilot.com" className="text-primary hover:underline">
                      elevatecopilot.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Response Time</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Standard Inquiries</p>
                    <p className="text-sm text-gray-600">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-orange-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Urgent Requests</p>
                    <p className="text-sm text-gray-600">Same day response</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Corporate Training</p>
                    <p className="text-sm text-gray-600">Within 2 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
