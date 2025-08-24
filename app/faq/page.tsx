import { Metadata } from 'next'
import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - ElevateCopilot',
  description: 'Frequently asked questions about ElevateCopilot training programs, certification, and Microsoft Copilot courses.',
}

const FAQPage = () => {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "Do I need a Copilot license?",
          a: "While having a Copilot license is recommended for the best learning experience, it's not required for our training. We provide demo environments and examples that allow you to learn effectively even without a license."
        },
        {
          q: "What's the difference between the masterclass and certification?",
          a: "The 90-minute masterclass is a fast-paced introduction to core Copilot skills, perfect for beginners. The full-day certification course includes hands-on labs, assessment, and earns you a digital badge - ideal for those seeking formal recognition of their skills."
        },
        {
          q: "Are your courses suitable for beginners?",
          a: "Absolutely! Our courses are designed for all skill levels. We start with fundamentals and progressively build to advanced techniques. No prior AI experience is required."
        }
      ]
    },
    {
      category: "Training & Certification",
      questions: [
        {
          q: "Is certification included?",
          a: "Yes, certification is included with our full-day course. You'll receive a digital badge, PDF certificate, and the ability to share your achievement on LinkedIn immediately upon successful completion."
        },
        {
          q: "How long does it take to get certified?",
          a: "The certification process takes one full day (8 hours) including the assessment. You'll receive your digital badge immediately after passing the final assessment."
        },
        {
          q: "What if I don't pass the certification assessment?",
          a: "We offer one free retake within 30 days. If you need additional support, our instructors are available for follow-up sessions to ensure your success."
        }
      ]
    },
    {
      category: "Corporate & Private Sessions",
      questions: [
        {
          q: "Do you run private sessions?",
          a: "Yes, corporate packages are available. We offer executive briefings, team workshops, and ongoing governance support. All sessions can be customized to your organization's specific needs and industry."
        },
        {
          q: "Can you train our entire team?",
          a: "Absolutely! We specialize in organizational enablement and can train teams of any size. Our corporate packages include adoption strategies and ongoing support to maximize ROI."
        },
        {
          q: "What industries do you specialize in?",
          a: "We've successfully trained professionals across finance, healthcare, government, technology, and more. Our content is adaptable to any industry's specific workflows and compliance requirements."
        }
      ]
    },
    {
      category: "Technical & Support",
      questions: [
        {
          q: "What technology do I need for online courses?",
          a: "You'll need a computer with internet access and Zoom (free). We recommend using Microsoft 365 applications during training, but we provide alternatives if you don't have access."
        },
        {
          q: "Do you provide ongoing support after training?",
          a: "Yes! All participants get access to our exclusive Copilot community, monthly Q&A sessions, and ongoing support for 30 days after training completion."
        },
        {
          q: "Can I get a refund if I'm not satisfied?",
          a: "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your training experience, we'll provide a full refund or arrange additional training at no cost."
        }
      ]
    }
  ]

  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-playfair">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Find answers to common questions about our training programs, certification, and Microsoft Copilot courses.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <h2 className="text-2xl font-bold text-primary mb-8 font-playfair text-center">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${category.category}-${questionIndex}`
                  const isOpen = openItems[key]
                  
                  return (
                    <div key={questionIndex} className="card">
                      <button
                        onClick={() => toggleItem(category.category, questionIndex)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-start">
                          <HelpCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold text-primary text-lg">
                            {faq.q}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-accent flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-accent flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-100 pt-4">
                            <p className="text-muted leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6 font-playfair">
            Still Have Questions?
          </h2>
          <p className="text-xl text-muted mb-8">
            Our training advisors are here to help you find the perfect program
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
            <a href="/schedule" className="btn-secondary">
              View Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-6 font-playfair">
              Quick Tips for Success
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Make the most of your ElevateCopilot training experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-3 font-playfair">
                Come Prepared
              </h3>
              <p className="text-muted">
                Have your questions ready and ensure your technology is working before the session starts
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-3 font-playfair">
                Practice Regularly
              </h3>
              <p className="text-muted">
                Apply what you learn in your daily work to reinforce the skills and techniques
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-3 font-playfair">
                Join the Community
              </h3>
              <p className="text-muted">
                Connect with other learners and share experiences in our exclusive Copilot community
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQPage
