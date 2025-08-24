import { Quote, Star } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      text: "This course transformed how I use Microsoft 365 daily. The productivity gains are real - I'm saving at least 30 minutes every day!",
      author: "Business Analyst, Finance",
      company: "Global Bank",
      rating: 5
    },
    {
      text: "Our execs finally understood Copilot's ROI after the briefing. The adoption rate jumped from 15% to 85% in just two weeks.",
      author: "Head of IT, Public Sector",
      company: "Government Agency",
      rating: 5
    },
    {
      text: "The hands-on labs and real-world examples made all the difference. I went from being skeptical to being a Copilot evangelist.",
      author: "Product Manager, Tech",
      company: "Software Company",
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
            What Our Learners Say
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Join hundreds of professionals who have transformed their productivity with our training
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card p-8 relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-white" />
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Quote Text */}
              <blockquote className="text-muted mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </blockquote>
              
              {/* Author */}
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-primary">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted">
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg">
            <div className="text-sm text-muted mr-4">Trusted by professionals from:</div>
            <div className="flex items-center space-x-6">
              <div className="text-xs font-medium text-primary">Microsoft</div>
              <div className="w-1 h-1 bg-muted rounded-full"></div>
              <div className="text-xs font-medium text-primary">LinkedIn</div>
              <div className="w-1 h-1 bg-muted rounded-full"></div>
              <div className="text-xs font-medium text-primary">Fortune 500</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
