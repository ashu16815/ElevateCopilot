'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Mail, MapPin, Clock, Calendar, Users, DollarSign, BookOpen, Target, MessageSquare, Building, Globe, Zap } from 'lucide-react'
import { CourseRepository } from '@/lib/repositories/courseRepository'
import { Course } from '@/lib/data/courses'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const courseSlug = searchParams.get('course')
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    company: '',
    course: courseSlug || '',
    availability: '',
    goals: '',
    referral_code: '',
    consent: false
  })

  const [referralValidation, setReferralValidation] = useState({
    isValid: false,
    message: '',
    referrerName: '',
    isChecking: false
  })

  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState('')

  useEffect(() => {
    // Load courses
    const loadData = async () => {
      try {
        const activeCourses = CourseRepository.getActiveCourses()
        setCourses(activeCourses)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    // Pre-fill form if course slug is provided
    if (courseSlug && courses.length > 0) {
      const course = courses.find(c => c.slug === courseSlug)
      if (course) {
        setSelectedCourse(course)
        setFormData(prev => ({
          ...prev,
          course: course.slug
        }))
      }
    }
  }, [courseSlug, courses])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const validateReferralCode = useCallback(async (code: string) => {
    if (!code || code.trim() === '') {
      setReferralValidation({
        isValid: false,
        message: '',
        referrerName: '',
        isChecking: false
      });
      return;
    }

    setReferralValidation(prev => ({ ...prev, isChecking: true }));

    try {
      const response = await fetch('/api/referrals/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referral_code: code.trim() })
      });

      const data = await response.json();

      if (data.valid) {
        setReferralValidation({
          isValid: true,
          message: data.message,
          referrerName: data.referrer_name || 'Unknown',
          isChecking: false
        });
      } else {
        setReferralValidation({
          isValid: false,
          message: data.message,
          referrerName: '',
          isChecking: false
        });
      }
    } catch (error) {
      setReferralValidation({
        isValid: false,
        message: 'Error validating referral code',
        referrerName: '',
        isChecking: false
      });
    }
  }, [])

  // Debounced validation effect
  useEffect(() => {
    if (!formData.referral_code.trim()) {
      setReferralValidation({
        isValid: false,
        message: '',
        referrerName: '',
        isChecking: false
      });
      return;
    }

    const timeoutId = setTimeout(() => {
      validateReferralCode(formData.referral_code);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [formData.referral_code, validateReferralCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate referral code if provided
    if (formData.referral_code.trim() && !referralValidation.isValid) {
      setSubmitResult('Please enter a valid referral code or remove it to continue.')
      return
    }
    
    // Wait for validation to complete if still checking
    if (formData.referral_code.trim() && referralValidation.isChecking) {
      setSubmitResult('Please wait while we validate your referral code...')
      return
    }
    
    setIsSubmitting(true)
    setSubmitResult('Sending...')

    try {
      // Create FormData for web3forms
      const formDataToSend = new FormData()
      
      // Add all form fields
      formDataToSend.append('firstName', formData.firstName)
      formDataToSend.append('lastName', formData.lastName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('role', formData.role || 'Not provided')
      formDataToSend.append('company', formData.company || 'Not provided')
      formDataToSend.append('course', formData.course || 'Not specified')
      formDataToSend.append('availability', formData.availability || 'Not specified')
      formDataToSend.append('goals', formData.goals || 'Not specified')
      formDataToSend.append('referral_code', formData.referral_code || 'Not provided')
      formDataToSend.append('consent', formData.consent ? 'Yes' : 'No')
      
      // Add web3forms specific fields
      formDataToSend.append('access_key', 'be6ff4a1-4ba7-45b1-ba03-4b1137ca0574')
      formDataToSend.append('subject', `Training Interest: ${formData.course} - ${formData.firstName} ${formData.lastName}`)
      formDataToSend.append('to', 'elevatecopilot@outlook.com')
      formDataToSend.append('from_name', 'ElevateCopilot Contact Form')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      })
      const data = await response.json()

      if (data.success) {
        setSubmitResult('Thanks! We\'ll email options that match your availability.')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          company: '',
          course: '',
          availability: '',
          goals: '',
          referral_code: '',
          consent: false
        })
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
            Register Your Interest
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We run live sessions every week. Tell us what you need and your availability—our team will match you to the next cohort.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-primary mb-2">
                    Job Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="e.g., Marketing Manager"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="e.g., Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="course" className="block text-sm font-medium text-primary mb-2">
                  Course Interest *
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select a course</option>
                  <option value="kickstart-masterclass">Copilot Kickstart (90-min Masterclass)</option>
                  <option value="m365-deep-dive">Copilot in M365 Deep Dive (Half-Day)</option>
                  <option value="certification-practitioner">Copilot Certification (Full-Day + Assessment)</option>
                  <option value="executive-briefing">Executive Briefing: ROI, Risk & Rollout (90-min)</option>
                  <option value="not-sure">Not sure—recommend one</option>
                </select>
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-primary mb-2">
                  Availability *
                </label>
                <textarea
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Days/times that suit you (e.g., Tue/Thu mornings, next 2 weeks)"
                />
              </div>

              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-primary mb-2">
                  Goals
                </label>
                <textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="What problems should this help you solve at work?"
                />
              </div>

              <div>
                <label htmlFor="referral_code" className="block text-sm font-medium text-primary mb-2">
                  Referral Code (optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="referral_code"
                    name="referral_code"
                    value={formData.referral_code}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent ${
                      referralValidation.isChecking 
                        ? 'border-gray-300' 
                        : referralValidation.isValid 
                          ? 'border-green-500' 
                          : referralValidation.message 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                    }`}
                    placeholder="Enter a code if you have one"
                  />
                  {referralValidation.isChecking && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent"></div>
                    </div>
                  )}
                  {referralValidation.isValid && !referralValidation.isChecking && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="text-green-500">✓</div>
                    </div>
                  )}
                  {!referralValidation.isValid && referralValidation.message && !referralValidation.isChecking && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="text-red-500">✗</div>
                    </div>
                  )}
                </div>
                
                {/* Validation Messages */}
                {referralValidation.isValid && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      ✅ Valid referral code! You'll get 10% off and {referralValidation.referrerName} will earn 10% back.
                    </p>
                  </div>
                )}
                
                {!referralValidation.isValid && referralValidation.message && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-800">
                      ❌ {referralValidation.message}
                    </p>
                  </div>
                )}
                
                <p className="text-sm text-muted mt-2">
                  Have a referral code? Enter it to receive 10% off. Your referrer will earn 10% back when you purchase.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded mt-1"
                />
                <label htmlFor="consent" className="text-sm text-muted">
                  I consent to ElevateCopilot contacting me about training opportunities and agree to the{' '}
                  <a href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</a>
                </label>
              </div>

              {submitResult && (
                <div className={`text-center p-4 rounded-lg ${
                  submitResult.includes('Thanks') 
                    ? 'bg-green-100 text-green-800' 
                    : submitResult.includes('error') 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                }`}>
                  {submitResult}
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Register Interest'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8 font-playfair">
            Get in Touch
          </h2>
          <p className="text-xl text-muted mb-8">
            We reply within one business day. Use the form above or email us directly.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mail className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
              <p className="text-muted">
                <a href="mailto:elevatecopilot@outlook.com" className="text-accent hover:underline">
                  elevatecopilot@outlook.com
                </a>
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">Business Hours</h3>
              <p className="text-muted">Mon–Fri 9:00–17:00 NZT</p>
            </div>
            
            <div className="text-center">
              <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary mb-2">Location</h3>
              <p className="text-muted">New Zealand (Online worldwide)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
