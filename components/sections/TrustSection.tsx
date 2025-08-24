import { Shield, Award, Users, Globe } from 'lucide-react'

const TrustSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
            Trusted by professionals worldwide
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Join hundreds of learners who have transformed their productivity with our evidence-based training
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">1,247+ Learners Trained</h3>
            <p className="text-muted">98% satisfaction rate across all programs</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Independent & Unbiased</h3>
            <p className="text-muted">Evidence-based training with no vendor bias</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Complete Value Package</h3>
            <p className="text-muted">All materials & certification included in pricing</p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-6 w-6 text-accent mr-2" />
            <h3 className="text-xl font-bold text-primary">Global Support Coverage</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div>
              <p className="font-semibold text-primary mb-1">New Zealand</p>
              <p className="text-muted">Mon–Fri 9:00–17:00 NZT</p>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1">United States</p>
              <p className="text-muted">3pm–11pm PT / 6pm–2am ET</p>
            </div>
          </div>
          <p className="text-sm text-muted mt-4">
            We provide support across multiple time zones to serve our global community
          </p>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
