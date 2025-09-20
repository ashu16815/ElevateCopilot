'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import RequireAuth from '@/components/RequireAuth';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [nextSession, setNextSession] = useState<any>(null);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Get profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        setProfile(profileData);

        // Get next upcoming session
        const { data: sessionData } = await supabase
          .from('sessions')
          .select('*')
          .gte('starts_at', new Date().toISOString())
          .order('starts_at', { ascending: true })
          .limit(1)
          .maybeSingle();
        setNextSession(sessionData);

        // Get user's downloads
        const { data: downloadData } = await supabase
          .from('download_events')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);
        setDownloads(downloadData || []);

        // Get user's registrations
        const { data: regData } = await supabase
          .from('session_registrations')
          .select('*, sessions(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        setRegistrations(regData || []);
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
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Welcome back, {profile?.full_name || user?.email?.split('@')[0] || 'there'}!
            </h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl">
              Your AI learning journey dashboard. Track progress, access resources, and manage your sessions.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Next Session */}
            <div className="lg:col-span-2">
              <div className="ec-card p-6">
                <h2 className="text-2xl font-bold mb-4">Next Session</h2>
                {nextSession ? (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{nextSession.title}</h3>
                    <p className="text-gray-600 mb-4">{formatDate(nextSession.starts_at)}</p>
                    <div className="flex gap-3">
                      <a href="/events" className="ec-btn ec-btn-primary">
                        View All Sessions
                      </a>
                      <a href={`/events/register?date=${nextSession.starts_at}`} className="ec-btn ec-btn-secondary">
                        Register
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">No upcoming sessions scheduled.</p>
                    <a href="/events" className="ec-btn ec-btn-primary">
                      View Sessions
                    </a>
                  </div>
                )}
              </div>

              {/* Recent Downloads */}
              <div className="ec-card p-6 mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent Downloads</h2>
                {downloads.length > 0 ? (
                  <div className="space-y-3">
                    {downloads.map((download, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium">{download.slug}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(download.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No downloads yet.</p>
                )}
                <div className="mt-4">
                  <a href="/resources" className="ec-btn ec-btn-secondary">
                    Browse Resources
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="ec-card p-6">
                <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sessions Attended</span>
                    <span className="font-semibold">{registrations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resources Downloaded</span>
                    <span className="font-semibold">{downloads.length}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="ec-card p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a href="/resources" className="block ec-btn ec-btn-primary w-full text-center">
                    Download Resources
                  </a>
                  <a href="/events" className="block ec-btn ec-btn-secondary w-full text-center">
                    Join Live Session
                  </a>
                  <a href="/account" className="block ec-btn ec-btn-secondary w-full text-center">
                    Update Profile
                  </a>
                </div>
              </div>

              {/* Session History */}
              <div className="ec-card p-6">
                <h3 className="text-lg font-semibold mb-4">Session History</h3>
                {registrations.length > 0 ? (
                  <div className="space-y-2">
                    {registrations.slice(0, 3).map((reg, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium">{reg.sessions?.title || 'AI Literacy Session'}</div>
                        <div className="text-gray-500">
                          {reg.sessions ? formatDate(reg.sessions.starts_at) : 'Date TBD'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">No sessions yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </RequireAuth>
  );
}
