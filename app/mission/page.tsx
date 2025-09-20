import { TARGET } from '@/lib/site.config';

export default function Mission() {
  const goals = [
    {
      title: "Train 1,000 Professionals",
      desc: "Equip New Zealand professionals with practical AI skills they can use immediately",
      icon: "👥"
    },
    {
      title: "10x Knowledge Multiplier", 
      desc: "Help each person pass their skills to ten more, creating exponential impact",
      icon: "🚀"
    },
    {
      title: "Build AI-Ready Workforce",
      desc: "Create New Zealand's competitive advantage through widespread AI literacy",
      icon: "🇳🇿"
    }
  ];

  const whyMatters = [
    "AI is transforming every industry, but many professionals lack practical skills to use it safely and effectively at work.",
    "New Zealand needs to build its AI capability to remain competitive globally and create high-value jobs.",
    "Free, practical training removes barriers and ensures AI literacy becomes a public good, not a privilege.",
    "By training professionals who then teach others, we create exponential impact across the entire workforce."
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="ec-hero">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Our Mission</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Building AI literacy as a foundation for New Zealand's productivity leap through free, practical training.
          </p>
        </div>
      </section>

      {/* Why AI Literacy Matters */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Why AI Literacy Matters</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              AI is transforming every industry, but many professionals lack the practical skills to use it safely and effectively at work. 
              We're changing that.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              {whyMatters.map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[var(--ec-gold)] bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-[var(--ec-gold)] font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
            
            <div className="ec-card p-8">
              <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Professionals who want AI skills:</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Who know where to start:</span>
                  <span className="font-semibold">23%</span>
                </div>
                <div className="flex justify-between">
                  <span>Who can afford training:</span>
                  <span className="font-semibold">31%</span>
                </div>
                <div className="flex justify-between">
                  <span>Who use AI safely at work:</span>
                  <span className="font-semibold">12%</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-[var(--ec-gold)] bg-opacity-10 rounded-lg">
                <p className="text-sm font-medium text-[var(--ec-text)]">
                  "We're bridging this gap with free, practical training that anyone can access."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goals */}
      <section className="py-12 bg-[var(--ec-neutral)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Goals</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just training individuals—we're building a movement that multiplies across New Zealand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="ec-card p-8 text-center">
                <div className="text-4xl mb-4">{goal.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{goal.title}</h3>
                <p className="text-gray-600">{goal.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 ec-card p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">The Math of Impact</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="ec-stat-num text-3xl mb-2">{TARGET.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Professionals trained directly</p>
                </div>
                <div>
                  <div className="ec-stat-num text-3xl mb-2">{(TARGET * 10).toLocaleString()}</div>
                  <p className="text-sm text-gray-600">People reached through knowledge sharing</p>
                </div>
                <div>
                  <div className="ec-stat-num text-3xl mb-2">{(TARGET * 11).toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total impact across New Zealand</p>
                </div>
              </div>
              <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
                Each person we train becomes a multiplier, sharing their knowledge with colleagues, 
                friends, and family. This creates exponential impact that transforms entire organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Do It */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Do It</h2>
            <p className="text-lg text-gray-600">
              Free, practical, and immediately applicable—no barriers, no sales pitch, just results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[var(--ec-gold)] rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Free Live Sessions</h3>
                  <p className="text-gray-600">90-minute hands-on sessions every fortnight. No cost, no catch—just practical AI skills you can use the next day.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[var(--ec-gold)] rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Open Resources</h3>
                  <p className="text-gray-600">Templates, checklists, and guides available to everyone. Download, customize, and share with your team.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[var(--ec-gold)] rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Community Learning</h3>
                  <p className="text-gray-600">Connect with other professionals, share experiences, and learn from real-world case studies across New Zealand.</p>
                </div>
              </div>
            </div>

            <div className="ec-card p-8">
              <h3 className="text-xl font-semibold mb-4">Our Promise</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Always free—no hidden costs or upsells
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Practical focus—skills you can use immediately
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Safe and responsible—privacy-first approach
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Community-driven—learn from peers across NZ
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[var(--ec-neutral)]">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Movement?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Be part of building New Zealand's AI-ready workforce. Start with our free resources or join the next live session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/resources" className="ec-btn ec-btn-primary">
              Explore Resources
            </a>
            <a href="/events" className="ec-btn ec-btn-secondary">
              Join Live Session
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}