import RequireAuth from '@/components/RequireAuth';

export default function Resources() {
  const items = [
    { 
      title: 'Starter Pack (Templates + Checklists)', 
      slug: 'starter-pack', 
      desc: 'A curated bundle to get productive with AI fast.',
      type: 'ZIP',
      size: '2.3 MB'
    },
    { 
      title: 'Copilot Prompts for Professionals', 
      slug: 'prompts', 
      desc: 'Ready-to-use prompts for Excel, Word, PowerPoint, Teams.',
      type: 'PDF',
      size: '1.8 MB'
    },
    { 
      title: 'Meeting → Actions Checklist', 
      slug: 'meetings', 
      desc: 'Turn notes into summaries and action lists.',
      type: 'PDF',
      size: '0.9 MB'
    },
    { 
      title: 'Responsible AI Quick Guide', 
      slug: 'rai', 
      desc: 'Practical do/Don\'t for safe AI at work.',
      type: 'PDF',
      size: '1.2 MB'
    },
    { 
      title: 'Excel AI Recipes', 
      slug: 'excel-recipes', 
      desc: 'Advanced Excel formulas and automation with AI assistance.',
      type: 'PDF',
      size: '2.1 MB'
    },
    { 
      title: 'PowerPoint Super Prompts', 
      slug: 'powerpoint-prompts', 
      desc: 'Create compelling presentations faster with AI prompts.',
      type: 'PDF',
      size: '1.5 MB'
    }
  ];

  return (
    <RequireAuth>
      <main>
        {/* Hero Section */}
        <section className="ec-hero">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-extrabold">AI Resources Library</h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl">
              Practical templates, checklists, and guides to apply AI at work. Download instantly after signing in.
            </p>
            <div className="mt-8">
              <a href="/resources/starter-pack" className="ec-btn ec-btn-primary">
                Download Starter Pack
              </a>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <div key={item.slug} className="ec-card p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                    </div>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                      {item.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.size}</span>
                    <a 
                      href={`/resources/${item.slug}`} 
                      className="ec-btn ec-btn-secondary text-sm"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-12 bg-[var(--ec-neutral)]">
          <div className="max-w-3xl mx-auto text-center px-6">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Get new resources and AI insights delivered to your inbox.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="ec-btn ec-btn-primary">Subscribe</button>
            </div>
          </div>
        </section>
      </main>
    </RequireAuth>
  );
}