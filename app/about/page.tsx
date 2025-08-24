import { Metadata } from 'next'
import { Users, Globe, Award, Target, Heart, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - ElevateCopilot',
  description: 'Learn about ElevateCopilot, the global-first Copilot academy helping professionals and businesses unlock the true power of AI.',
}

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards in all our training programs and services"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about AI and helping others succeed with these powerful tools"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously evolve our methods to stay ahead of AI technology trends"
    },
    {
      icon: Users,
      title: "Community",
      description: "We build lasting relationships with our learners and partners"
    }
  ]

  const stats = [
    { number: "1,247+", label: "Professionals Trained" },
    { number: "25+", label: "Countries Served" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "3+", label: "Years of Experience" }
  ]

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-playfair">
            Who We Are
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            ElevateCopilot was founded to help professionals and businesses unlock the true power of AI and Microsoft Copilot.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
                Our Story
              </h2>
              <div className="space-y-6 text-muted leading-relaxed">
                <p>
                  Founded in 2022, ElevateCopilot emerged from a simple observation: while Microsoft Copilot 
                  was revolutionizing productivity, most professionals lacked the knowledge to use it effectively.
                </p>
                <p>
                  Our founders, seasoned Microsoft consultants and AI enthusiasts, recognized the gap between 
                  technology availability and practical application. They set out to create the world's premier 
                  Copilot training academy.
                </p>
                <p>
                  Today, we're proud to be the global-first Copilot academy, having trained professionals 
                  across 25+ countries and helped organizations achieve remarkable productivity gains.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl p-8 border border-accent/20">
                <div className="bg-white rounded-xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-primary mb-4 font-playfair">
                    Our Mission
                  </h3>
                  <p className="text-muted mb-4">
                    To democratize AI productivity by making Microsoft Copilot accessible, understandable, 
                    and actionable for every professional.
                  </p>
                  <div className="flex items-center text-accent font-semibold">
                    <Globe className="h-5 w-5 mr-2" />
                    Global First Approach
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Our Values
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <value.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3 font-playfair">
                  {value.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2 font-playfair">
                  {stat.number}
                </div>
                <div className="text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Our Leadership Team
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Meet the experts behind ElevateCopilot's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-16 w-16 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 font-playfair">
                Sarah Chen
              </h3>
              <p className="text-accent font-semibold mb-2">Founder & CEO</p>
              <p className="text-muted text-sm">
                Former Microsoft consultant with 15+ years in AI and productivity solutions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Award className="h-16 w-16 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 font-playfair">
                Michael Rodriguez
              </h3>
              <p className="text-accent font-semibold mb-2">Head of Training</p>
              <p className="text-muted text-sm">
                Certified Microsoft trainer specializing in organizational AI adoption
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Globe className="h-16 w-16 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 font-playfair">
                David Kim
              </h3>
              <p className="text-accent font-semibold mb-2">Global Operations</p>
              <p className="text-muted text-sm">
                Expert in scaling training operations across multiple time zones and cultures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Global Reach, New Zealand Roots
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Headquartered in New Zealand, serving 1,247+ professionals across the US, APAC, and EMEA.
            </p>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-playfair">
              Our Partnerships & Ecosystem
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              We collaborate with leading Microsoft Cloud Solution Providers (CSPs), resellers, and industry experts to deliver high-quality training and adoption programs. ElevateCopilot is independent and not affiliated with or endorsed by Microsoft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">C</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Cloud Solution Providers</h3>
              <p className="text-muted text-sm">
                Working with leading CSPs to deliver enterprise-ready training solutions
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">R</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Resellers & Partners</h3>
              <p className="text-muted text-sm">
                Network of trusted partners delivering training across different regions
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">E</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">Industry Experts</h3>
              <p className="text-muted text-sm">
                Collaboration with subject matter experts and thought leaders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6 font-playfair">
            Join Our Mission
          </h2>
          <p className="text-xl text-muted mb-8">
            Be part of the AI productivity revolution. Let's transform how you work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/courses" className="btn-primary">
              Start Learning
            </a>
            <a href="/contact" className="btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
