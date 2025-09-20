'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Account() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  async function exportData() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: prof } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const { data: regs } = await supabase
      .from('session_registrations')
      .select('*')
      .eq('user_id', user.id);

    const blob = new Blob(
      [JSON.stringify({ profile: prof, registrations: regs }, null, 2)], 
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elevatecopilot_export.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold">My Account</h1>
      
      {user ? (
        <>
          <p className="text-gray-600 mt-2">Signed in as {user.email}</p>
          <div className="mt-6 grid gap-3">
            <a 
              className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 text-center transition-colors" 
              href="/onboard"
            >
              Update profile & consents
            </a>
            <button 
              onClick={exportData} 
              className="px-4 py-2 rounded-md bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
            >
              Export my data
            </button>
            <button 
              onClick={signOut} 
              className="px-4 py-2 rounded-md bg-neutral-200 hover:bg-neutral-300 transition-colors"
            >
              Sign out
            </button>
          </div>
        </>
      ) : (
        <p className="mt-3">
          Please <a className="text-blue-600 underline" href="/auth">sign in</a>.
        </p>
      )}
    </div>
  );
}