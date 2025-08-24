import Link from 'next/link'
import { Award, Share2, CheckCircle } from 'lucide-react'

const Certification = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Certification That Counts
            </h2>
            <p className="text-xl text-muted mb-8 leading-relaxed">
              Earn your ElevateCopilot digital badge and share it proudly on LinkedIn, your resume, and professional profiles.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Industry Recognition</h3>
                  <p className="text-muted text-sm">Your certification is backed by our partnership with Microsoft and industry experts</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">Digital Badge</h3>
                  <p className="text-muted text-sm">Shareable credential that showcases your AI productivity expertise</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary mb-1">LinkedIn Integration</h3>
                  <p className="text-muted text-sm">Automatically add to your LinkedIn profile for maximum visibility</p>
                </div>
              </div>
            </div>
            
            <Link
              href="/certification"
              className="btn-primary inline-flex items-center group"
            >
              View Certification Path
              <Share2 className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
          
          {/* Badge Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl p-12 border border-accent/20">
              <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-12 w-12 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-2 font-playfair">
                  ElevateCopilot
                </h3>
                <p className="text-accent font-semibold mb-4">
                  Microsoft Copilot Certified
                </p>
                
                <div className="text-sm text-muted mb-6">
                  <p>Issued: {new Date().toLocaleDateString()}</p>
                  <p>Credential ID: EC-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                </div>
                
                <div className="flex items-center justify-center space-x-4 text-xs text-muted">
                  <div className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    Verified
                  </div>
                  <div className="flex items-center">
                    <Share2 className="h-3 w-3 text-blue-500 mr-1" />
                    Shareable
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg">
              <div className="text-xs font-medium text-primary">LinkedIn Ready</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-white rounded-lg p-3 shadow-lg">
              <div className="text-xs font-medium">Industry Standard</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certification
