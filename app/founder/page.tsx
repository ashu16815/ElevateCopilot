export default function Founder() {
  const values = [
    {
      title: "Mission-First Approach",
      desc: "AI literacy as a public good, not a profit center. Free training that removes barriers and creates opportunity for everyone."
    },
    {
      title: "Practical Focus", 
      desc: "Skills that work in real jobs, not theoretical concepts. Every session teaches something you can use the next day."
    },
    {
      title: "Community-Driven",
      desc: "Building a movement where professionals learn from each other, share knowledge, and multiply impact across New Zealand."
    },
    {
      title: "Privacy & Safety",
      desc: "Responsible AI use that protects data and builds trust. Teaching people to use AI safely in professional environments."
    }
  ];

  const achievements = [
    "Led digital transformation initiatives across multiple organizations",
    "Helped teams adopt modern productivity tools and AI technologies", 
    "Built scalable learning programs that reach thousands of professionals",
    "Advocate for responsible AI adoption in New Zealand's public and private sectors"
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="ec-hero">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Meet the Founder</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Committed to making AI literacy a public good in New Zealand through practical, accessible training.
          </p>
        </div>
      </section>

      {/* Founder Bio */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="ec-card p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">AG</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Ankit Gupta</h2>
                <p className="text-amber-600 font-semibold mb-4">Founder & CEO</p>
                <p className="text-sm text-gray-600 mb-6">
                  Digital transformation leader with a passion for making AI accessible to every professional in New Zealand.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📍 Based in Auckland, New Zealand</p>
                  <p>🎯 Mission: 1,000 professionals trained</p>
                  <p>🚀 Vision: AI literacy as public good</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Why I Built ElevateCopilot</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-4">
                      After years leading digital initiatives and helping teams adopt modern tools, I saw a critical gap: 
                      many professionals want to use AI confidently, but don't know where to start—or how to do it safely at work.
                    </p>
                    
                    <p className="text-gray-700 mb-4">
                      So I created <strong>ElevateCopilot</strong> as a <strong>mission-first, open initiative</strong> to train 
                      <strong> 1,000 professionals</strong> and empower each to pass their skills to <strong>ten more people</strong>. 
                      Every session is free, practical, and designed for real work.
                    </p>
                    
                    <p className="text-gray-700 mb-6">
                      My goal isn't just better tools—it's <strong>better outcomes</strong>: hours saved, clearer communications, 
                      smarter analysis, and safer practices across NZ's public and private sectors.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">My Background</h3>
                  <ul className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ec-card p-6 bg-amber-50">
                  <h3 className="text-xl font-semibold mb-3 text-amber-800">Leadership Vision</h3>
                  <p className="text-amber-700">
                    I aspire to serve as a <strong>CIO/CDO</strong> in the region, contributing to national capability, 
                    policy alignment, and workforce uplift. ElevateCopilot is both a mission and a stepping stone toward 
                    broader impact on New Zealand's digital future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 bg-[var(--ec-neutral)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Drives Me</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The values that shape every decision and every session we run.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="ec-card p-6">
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Make AI Literacy New Zealand's Advantage</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join me in building a more productive, AI-ready New Zealand. Every professional we train becomes a multiplier, 
            sharing knowledge that transforms entire organizations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/events" className="ec-btn ec-btn-primary">
              Join the Next Session
            </a>
            <a href="/contact" className="ec-btn ec-btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
