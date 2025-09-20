'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name, is_admin')
          .eq('user_id', user.id)
          .maybeSingle();
        
        setProfile(data);
      }
    })();
  }, []);

  if (!user) {
    return <a className="ec-link" href="/auth">Sign in</a>;
  }

  const name = profile?.full_name || user.email;

  return (
    <div className="relative group">
      <button className="text-sm font-medium hover:text-[var(--ec-gold)] transition-colors">
        {name}
      </button>
      <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-white border rounded-lg shadow-md min-w-[190px] p-2 z-50">
        <a className="block px-3 py-2 hover:bg-neutral-50 rounded" href="/dashboard">
          My dashboard
        </a>
        <a className="block px-3 py-2 hover:bg-neutral-50 rounded" href="/resources">
          Resources
        </a>
        {profile?.is_admin && (
          <a className="block px-3 py-2 hover:bg-neutral-50 rounded" href="/admin">
            Admin
          </a>
        )}
        <button 
          className="block w-full text-left px-3 py-2 hover:bg-neutral-50 rounded"
          onClick={async () => {
            await supabase.auth.signOut();
            location.href = '/';
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
