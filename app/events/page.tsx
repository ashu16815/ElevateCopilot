'use client';

import RequireAuth from '@/components/RequireAuth';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Events() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.rpc('session_seat_summary');
        if (!error) {
          setSessions(data || []);
        }
      } catch (error) {
        console.error('Error loading sessions:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NZ', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <RequireAuth>
      <main>
        {/* Hero Section */}
        <section className="ec-hero">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-extrabold">Live Sessions (Free)</h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl">
              90 minutes. Practical demos. Q&A. No sales pitch.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--ec-gold)]"></div>
              <p className="mt-2 text-gray-600">Loading sessions...</p>
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No upcoming sessions scheduled.</p>
              <p className="text-sm text-gray-500">Check back soon for new sessions!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map(session => (
                <div key={session.id} className="ec-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
                      <p className="text-gray-600 mb-2">{formatDate(session.starts_at)}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Registered: {session.registered}</span>
                        <span>•</span>
                        <span>Seats left: {session.seats_left}</span>
                        {session.capacity && (
                          <>
                            <span>•</span>
                            <span>Capacity: {session.capacity}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a 
                        className="ec-btn ec-btn-primary" 
                        href={`/events/register?date=${session.starts_at}`}
                      >
                        Register
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </RequireAuth>
  );
}