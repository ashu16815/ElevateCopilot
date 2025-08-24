'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building, Users, Award, CheckCircle, ArrowRight, Mail, Phone, Globe } from 'lucide-react'

const CorporateTrainingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    headcount: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult('Sending...')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone || 'Not provided')
      formDataToSend.append('company', formData.company)
      formDataToSend.append('headcount', formData.headcount)
      formDataToSend.append('message', formData.message)
      formDataToSend.append('access_key', 'be6ff4a1-4ba7-45b1-ba03-4b1137ca0574')
      formDataToSend.append('subject', `Corporate Training Inquiry: ${formData.company} - ${formData.name}`)
      formDataToSend.append('to', 'elevatecopilot@outlook.com')
      formDataToSend.append('from_name', 'ElevateCopilot Corporate Training Form')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      })
      const data = await response.json()

      if (data.success) {
        setSubmitResult('Thank you for your inquiry! We will get back to you within 24 hours.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          headcount: '',
          message: ''
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

  const packages = [
    {
      title: "Executive Briefing",
      desc: "90-min session for leadership teams.",
      duration: "90 minutes",
      audience: "C-Suite & Directors",
      features: [
        "Strategic overview of Copilot capabilities",
        "ROI analysis and business case",
        "Implementation roadmap",
        "Q&A with leadership team"
      ]
    },
    {
      title: "Team Workshop",
      desc: "Hands-on enablement for teams of up to 20.",
      duration: "Full day",
      audience: "Knowledge Workers",
      features: [
        "Hands-on training with real scenarios",
        "Team-specific use cases",
        "Adoption strategies",
        "Follow-up support"
      ]
    },
    {
      title: "Governance & Adoption Pack",
      desc: "Admin readiness, security, usage telemetry.",
      duration: "Ongoing",
      audience: "IT & HR Teams",
      features: [
        "Security and compliance setup",
        "Usage monitoring and analytics",
        "Change management support",
        "Ongoing consultation"
      ]
    }
  ]

  const benefits = [
    {
      icon: Users,
      title: "Scalable Learning",
      description: "Train entire teams simultaneously with our proven methodology"
    },
    {
      icon: Award,
      title: "Certified Instructors",
      description: "Learn from Microsoft-certified experts with real-world experience"
    },
    {
      icon: Building,
      title: "Customized Content",
      description: "Tailored to your industry, workflows, and specific use cases"
    },
    {
      icon: Globe,
      title: "Global Delivery",
      description: "Available worldwide with flexible scheduling options"
    }
  ]

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-playfair">
            Corporate Training for Real ROI
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            We partner with enterprises to safely unlock Copilot productivity at scale. 
            Evidence-based training that delivers measurable results.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Why Choose Corporate Training?
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Maximize your investment with our comprehensive approach to organizational AI adoption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <benefit.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3 font-playfair">
                  {benefit.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Training Packages
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Choose the package that best fits your organization's needs and scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="card p-8 relative">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-4 font-playfair">
                    {pkg.title}
                  </h3>

                  <p className="text-muted mb-4">
                    {pkg.desc}
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted">
                    <span>{pkg.duration}</span>
                    <span>•</span>
                    <span>{pkg.audience}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-muted">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="#enquire"
                  className="btn-primary w-full flex items-center justify-center group"
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence & ROI Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Evidence-Based Results
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Our training programs are backed by independent research and real-world data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Independent Trials</h3>
              <p className="text-muted mb-4">
                Independent trials report 11–26 minutes/day saved depending on role and maturity.
              </p>
              <div className="flex items-center text-accent">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Verified productivity gains</span>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">1,247+ Professionals Trained</h3>
              <p className="text-muted mb-4">
                1,247+ professionals have already trained with ElevateCopilot.
              </p>
              <div className="flex items-center text-accent">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Proven track record</span>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">Forrester TEI Analysis</h3>
              <p className="text-muted mb-4">
                Forrester TEI models show triple-digit ROI ranges when adoption sticks.
              </p>
              <div className="flex items-center text-accent">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Triple-digit ROI potential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              What You Get
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Comprehensive training packages designed for enterprise success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Tailored Curriculum</h3>
                  <p className="text-muted">Customized to match your workflows and data boundaries</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Governance Pack</h3>
                  <p className="text-muted">Data boundaries, DLP checklist, safe-use guidelines</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Adoption Toolkit</h3>
                  <p className="text-muted">Champions program, nudge scripts, usage telemetry</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-4 mt-1">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Measurement Framework</h3>
                  <p className="text-muted">Before/after benchmarks, ROI tracking, monthly reviews</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-primary mb-4">Procurement Friendly</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-3" />
                  <span className="text-muted">GST invoices provided</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-3" />
                  <span className="text-muted">Vendor-agnostic (works with your Microsoft CSP)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-3" />
                  <span className="text-muted">Scalable for small teams to enterprise rollouts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
                Measurable ROI & Results
              </h2>
              <p className="text-xl text-muted mb-8 leading-relaxed">
                Our corporate clients consistently see significant improvements in productivity, 
                adoption rates, and overall AI readiness.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-green-600">26</span>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Minutes saved per day</div>
                    <div className="text-sm text-muted">Average productivity gain per user</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-blue-600">85%</span>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Adoption rate increase</div>
                    <div className="text-sm text-muted">Within 30 days of training</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-purple-600">3x</span>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">Faster onboarding</div>
                    <div className="text-sm text-muted">For new team members</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-primary mb-6 font-playfair">
                Success Story: Global Bank
              </h3>
              <div className="space-y-4 text-muted">
                <p>
                  "After implementing ElevateCopilot's corporate training program, 
                  we saw a 40% increase in productivity across our 1,247+ knowledge workers."
                </p>
                <p>
                  "The executive briefing helped our leadership team understand the 
                  strategic value, leading to full organizational buy-in."
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <div className="font-semibold text-primary">Sarah Johnson</div>
                  <div className="text-sm text-muted">Chief Digital Officer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquire" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Enquire About Corporate Training
            </h2>
            <p className="text-xl text-muted">
              Let's discuss how we can help transform your organization with AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="headcount" className="block text-sm font-medium text-primary mb-2">
                Team Size *
              </label>
              <select
                id="headcount"
                name="headcount"
                value={formData.headcount}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">Select team size</option>
                <option value="1-10">1-10 people</option>
                <option value="11-50">11-50 people</option>
                <option value="51-200">51-200 people</option>
                <option value="200+">200+ people</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell us about your training needs, goals, and any specific requirements..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              ></textarea>
            </div>
            
            {submitResult && (
              <div className={`text-center p-4 rounded-lg ${
                submitResult.includes('Thank you') 
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
                {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default CorporateTrainingPage
