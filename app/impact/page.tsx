'use client'

import { useEffect, useState } from 'react'

export default function ImpactPage() {
  const target = Number(process.env.NEXT_PUBLIC_IMPACT_TARGET || '1000');
  const [trained, setTrained] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ec_trained');
      setTrained(stored ? Number(stored) : 0);
    }
  }, []);

  const pct = Math.min(100, Math.round((trained / target) * 100));
  const pledge = `We pledge to train ${target.toLocaleString()} professionals in ${process.env.NEXT_PUBLIC_PRIMARY_MARKET} and equip each to share skills with 10 others.`;

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Impact</h1>
      <p className="mt-2 text-gray-700 mb-6">{pledge}</p>
      
      <div className="mt-6 rounded-2xl border p-6 bg-white shadow-sm">
        <div className="h-4 w-full bg-neutral-100 rounded-full overflow-hidden">
          <div 
            style={{ width: `${pct}%` }} 
            className="h-4 bg-amber-600 transition-all duration-500"
          />
        </div>
        <p className="mt-2 text-sm">
          {trained.toLocaleString()} / {target.toLocaleString()} trained
        </p>
        <p className="mt-4 text-sm text-gray-600">
          After each session we'll update the trained count based on attendance.
        </p>
      </div>
      
      <div className="mt-8 rounded-2xl border p-6 bg-white">
        <h2 className="text-xl font-semibold mb-3">How we measure</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>Registrations and attendance</li>
          <li>Post-session confidence lift</li>
          <li>Resource downloads</li>
          <li>Ambassador shares</li>
        </ul>
      </div>
    </div>
  )
}
