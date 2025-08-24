import { Metadata } from 'next'
import Link from 'next/link'
import { Award, CheckCircle, Share2, Linkedin, FileText, Users, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Certification - ElevateCopilot',
  description: 'Get certified with ElevateCopilot. Earn a digital badge and share your verified Copilot skills on LinkedIn.',
}

const CertificationPage = () => {
  const steps = [
    {
      number: "01",
      title: "Enroll in a full-day certification course",
      description: "Choose from our comprehensive certification programs designed for different skill levels"
    },
    {
      number: "02",
      title: "Complete labs & assessment",
      description: "Participate in hands-on exercises and pass the final assessment to demonstrate your skills"
    },
    {
      number: "03",
      title: "Receive digital badge & PDF certificate",
      description: "Get your industry-recognized credential immediately upon successful completion"
    },
    {
      number: "04",
      title: "Share your achievement on LinkedIn",
      description: "Add your certification to your professional profile and showcase your AI expertise"
    }
  ]

  const benefits = [
    {
      icon: Linkedin,
      title: "LinkedIn Integration",
      description: "Automatically add to your LinkedIn profile for maximum visibility"
    },
    {
      icon: Users,
      title: "Professional Recognition",
      description: "Stand out to employers and clients with verified AI skills"
    },
    {
      icon: Star,
      title: "Industry Standard",
      description: "Recognized by Microsoft partners and industry leaders"
    },
    {
      icon: FileText,
      title: "Portable Credential",
      description: "Share your badge across all professional platforms and resumes"
    }
  ]

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-playfair">
            Get Certified with ElevateCopilot
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Earn a digital badge and share your verified Copilot skills on LinkedIn. 
            Join the elite group of AI productivity experts.
          </p>
        </div>
      </section>

      {/* Badge Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
                Your Digital Badge
              </h2>
              <p className="text-xl text-muted mb-8 leading-relaxed">
                Our digital badge is more than just a certificate. It's a verifiable credential 
                that showcases your expertise in Microsoft Copilot and AI productivity.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Verifiable Credential</h3>
                    <p className="text-muted text-sm">Anyone can verify your certification through our secure platform</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Industry Recognition</h3>
                    <p className="text-muted text-sm">Backed by our partnership with Microsoft and industry experts</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Global Standard</h3>
                    <p className="text-muted text-sm">Recognized worldwide as a mark of AI productivity expertise</p>
                  </div>
                </div>
              </div>
              
              <Link
                href="/courses#certification"
                className="btn-primary inline-flex items-center group"
              >
                Start Your Certification
                <Award className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </Link>
            </div>
            
            {/* Badge Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl p-12 border border-accent/20">
                <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-16 w-16 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary mb-2 font-playfair">
                    ElevateCopilot
                  </h3>
                  <p className="text-accent font-semibold mb-4 text-lg">
                    Microsoft Copilot Certified
                  </p>
                  
                  <div className="text-sm text-muted mb-6">
                    <p>Issued: {new Date().toLocaleDateString()}</p>
                    <p>Credential ID: EC-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-6 text-xs text-muted">
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      Verified
                    </div>
                    <div className="flex items-center">
                      <Share2 className="h-3 w-3 text-blue-500 mr-1" />
                      Shareable
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      Industry Standard
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="text-xs font-medium text-primary">LinkedIn Ready</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-accent text-white rounded-lg p-3 shadow-lg">
                <div className="text-xs font-medium">Global Recognition</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              How to Get Certified
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Follow these simple steps to earn your ElevateCopilot certification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <span className="text-2xl font-bold text-accent font-playfair">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3 font-playfair">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Why Get Certified?
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Your certification opens doors to new opportunities and validates your expertise
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

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6 font-playfair">
            Ready to Get Certified?
          </h2>
          <p className="text-xl text-muted mb-8">
            Join the ranks of certified Copilot professionals and showcase your AI expertise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses#certification" className="btn-primary">
              View Certification Course
            </Link>
            <Link href="/schedule" className="btn-secondary">
              Check Schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CertificationPage
