'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { TARGET } from '@/lib/site.config';

export default function LiveCounters() {
  const [trained, setTrained] = useState(57);
  const [sessions, setSessions] = useState(0);
  const [downloads, setDownloads] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        // Get trained count (57 + distinct registrations)
        const c1 = await supabase
          .from('session_registrations')
          .select('user_id', { count: 'exact', head: true, distinct: true });
        
        if (!c1.error && typeof c1.count === 'number') {
          setTrained(57 + c1.count);
        }

        // Get upcoming sessions count
        const c2 = await supabase
          .from('sessions')
          .select('id', { count: 'exact', head: true })
          .gte('starts_at', new Date().toISOString());
        
        if (!c2.error && typeof c2.count === 'number') {
          setSessions(c2.count);
        }

        // Get downloads count
        const c3 = await supabase
          .from('download_events')
          .select('id', { count: 'exact', head: true });
        
        if (!c3.error && typeof c3.count === 'number') {
          setDownloads(c3.count);
        }
      } catch (error) {
        console.error('Error loading live counters:', error);
      }
    })();
  }, []);

  return (
    <section className="bg-[var(--ec-neutral)] py-10">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 text-center px-6">
        <div>
          <p className="text-2xl font-extrabold text-[var(--ec-gold)]">
            {trained.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Professionals Trained</p>
        </div>
        
        <div>
          <p className="text-2xl font-extrabold text-[var(--ec-gold)]">
            {sessions}
          </p>
          <p className="text-sm text-gray-600">Upcoming Sessions</p>
        </div>
        
        <div>
          <p className="text-2xl font-extrabold text-[var(--ec-gold)]">
            {downloads.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Resources Downloaded</p>
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-2">
        Live counters update from Supabase. Target: {TARGET.toLocaleString()} trained.
      </p>
    </section>
  );
}
