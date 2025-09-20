export default function Testimonials() {
  const items = [
    {quote:'The AI prompts I learned saved me 2 hours every day. Game changer!', name:'Sarah Chen', role:'Finance Manager'},
    {quote:'Finally, AI that makes sense for my actual work. Highly recommend!', name:'Mike Thompson', role:'Project Manager'},
    {quote:'Free, practical, and immediately applicable. What more could you want?', name:'Lisa Park', role:'HR Director'}
  ];

  return (
    <section className='bg-[var(--ec-neutral)] py-16'>
      <div className='max-w-6xl mx-auto px-6'>
        <h2 className='text-2xl font-bold text-center mb-10'>What Our Community Says</h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {items.map((t,i)=>(
            <div key={i} className='ec-card p-6 flex flex-col'>
              <span className='text-[var(--ec-gold)] text-3xl mb-3'>&ldquo;</span>
              <p className='text-gray-700 italic'>"{t.quote}"</p>
              <div className='mt-4'>
                <p className='font-semibold'>{t.name}</p>
                <p className='text-sm text-gray-500'>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

