'use client';

import RequireAuth from '@/components/RequireAuth';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Register() {
  return (
    <RequireAuth>
      <RegisterInner />
    </RequireAuth>
  );
}

function RegisterInner() {
  const sp = useSearchParams();
  const date = sp.get('date') || '';
  const [msg, setMsg] = useState('');

  async function submit() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMsg('Not signed in');
      return;
    }

    const { data: sess } = await supabase
      .from('sessions')
      .select('id')
      .eq('starts_at', new Date(date).toISOString())
      .maybeSingle();

    const sid = sess?.id;
    if (!sid) {
      setMsg('Thanks! You are on the list—we will confirm your calendar invite.');
      return;
    }

    const { error } = await supabase.rpc('register_for_session', {
      p_session: sid,
      p_answers: {}
    });

    setMsg(error ? error.message : '✅ Registered! Check your email for invite.');
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold">Register for {date || 'upcoming session'}</h1>
      <p className="text-gray-600 mt-2">We'll email your calendar invite and materials.</p>
      
      <button 
        onClick={submit} 
        className="mt-6 w-full px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700"
      >
        Confirm Registration
      </button>
      <p className="text-sm text-gray-600 mt-3">{msg}</p>
    </div>
  );
}