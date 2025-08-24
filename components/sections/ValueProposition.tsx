import { Clock, Award, Users, Play } from 'lucide-react'

const ValueProposition = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Unlock productivity gains of up to 26 minutes per day",
      description: "Learn proven techniques to maximize your daily efficiency with AI assistance"
    },
    {
      icon: Award,
      title: "Get certified with an industry-recognized credential",
      description: "Earn a digital badge that validates your Copilot expertise"
    },
    {
      icon: Users,
      title: "Tailored corporate enablement to maximize ROI",
      description: "Customized training programs designed for your organization's specific needs"
    },
    {
      icon: Play,
      title: "Live expert-led sessions and hands-on practice",
      description: "Learn from certified instructors with real-world experience"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
            Why ElevateCopilot?
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            We're not just another training provider. We're your strategic partner in AI transformation.
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

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-playfair">
              500+
            </div>
            <div className="text-muted">Professionals Trained</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-playfair">
              95%
            </div>
            <div className="text-muted">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-playfair">
              26min
            </div>
            <div className="text-muted">Daily Productivity Gain</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ValueProposition
