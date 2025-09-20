import RequireAuth from '@/components/RequireAuth';

export default function Resources() {
  const items = [
    { title: 'Starter Pack (Templates + Checklists)', slug: 'starter-pack', desc: 'A curated bundle to get productive with AI fast.' },
    { title: 'Copilot prompts for professionals', slug: 'prompts', desc: 'Ready-to-use prompts for Excel, Word, PowerPoint, Teams.' },
    { title: 'Meeting → Actions checklist', slug: 'meetings', desc: 'Turn notes into summaries and action lists.' },
    { title: 'Responsible AI quick guide', slug: 'rai', desc: 'Practical do/Don\'t for safe AI at work.' }
  ];

  return (
    <RequireAuth>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold">AI Resources Library</h1>
          <p className="text-gray-600 mt-2">Practical templates, checklists, and guides to apply AI at work.</p>
          <a href="/resources/starter-pack" className="mt-4 ec-btn ec-btn-primary">Download Starter Pack</a>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(i => (
            <a key={i.slug} href={`/resources/${i.slug}`} className="ec-card p-4 hover:shadow-sm">
              <h3 className="font-semibold">{i.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{i.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </RequireAuth>
  );
}