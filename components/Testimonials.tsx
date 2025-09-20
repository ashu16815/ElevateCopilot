export default function Testimonials() {
  const quotes = [
    { q: 'This training saved me 5 hours a week', a: 'Finance Manager, Auckland' },
    { q: 'I finally feel confident using Copilot with my team', a: 'Consultant, Wellington' },
    { q: 'Clear, practical, and community-first', a: 'Project Lead, Christchurch' }
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-2xl font-bold">What Professionals Say</h2>
        <div className="mt-6 grid sm:grid-cols-3 gap-6">
          {quotes.map((x, i) => (
            <blockquote key={i} className="rounded-xl border p-4 shadow-sm bg-neutral-50">
              <p className="italic text-gray-800">"{x.q}"</p>
              <p className="mt-2 text-sm text-gray-600">— {x.a}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

