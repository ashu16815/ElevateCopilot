import RequireAuth from '@/components/RequireAuth';

export default function Events() {
  const dates = ['2025-09-20', '2025-10-04', '2025-10-18', '2025-11-01'];

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold">Live Sessions (Free)</h1>
        <p className="text-gray-600 mt-2">90 minutes. Practical demos. Q&A. No sales pitch.</p>
        
        <ul className="mt-6 space-y-3">
          {dates.map(d => (
            <li key={d} className="ec-card p-4 flex items-center justify-between">
              <span className="font-medium">
                {new Date(d).toLocaleDateString('en-NZ', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <a 
                className="ec-btn ec-btn-primary" 
                href={`/events/register?date=${d}`}
              >
                Register
              </a>
            </li>
          ))}
        </ul>
      </div>
    </RequireAuth>
  );
}