'use client'

import { IS_MISSION } from '@/lib/mode'

export default function Impact() {
  if (!IS_MISSION) return null;
  
  const target = Number(process.env.NEXT_PUBLIC_IMPACT_TARGET || '1000');
  const trained = typeof window !== 'undefined' && localStorage.getItem('ec_trained') 
    ? Number(localStorage.getItem('ec_trained')) 
    : 0;
  const pct = Math.min(100, Math.round((trained / target) * 100));

  return (
    <section className="rounded-2xl border p-6 bg-white shadow-sm mt-8 mx-4">
      <h3 className="text-xl font-semibold">Mission Progress</h3>
      <p className="text-sm text-gray-600">
        Goal: Train {target.toLocaleString()} professionals in {process.env.NEXT_PUBLIC_PRIMARY_MARKET} to use AI responsibly and effectively.
      </p>
      <div className="mt-3 h-3 w-full bg-neutral-100 rounded-full overflow-hidden">
        <div 
          style={{ width: `${pct}%` }} 
          className="h-3 bg-amber-600"
        />
      </div>
      <p className="mt-2 text-sm">
        {trained.toLocaleString()} / {target.toLocaleString()} trained
      </p>
      <a 
        className="inline-block mt-3 px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700" 
        href="/impact"
      >
        View Impact
      </a>
    </section>
  );
}
