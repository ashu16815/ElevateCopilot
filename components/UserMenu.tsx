'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: p } = await supabase
          .from('profiles')
          .select('full_name, is_admin, blocked')
          .eq('user_id', user.id)
          .maybeSingle();
        
        setName(p?.full_name || user.email || '');
        setIsAdmin(!!p?.is_admin);
      }
    })();
  }, []);

  if (!user) {
    return <a className="ec-link" href="/auth">Sign in</a>;
  }

  return (
    <div className="relative group inline-flex items-center gap-2">
      <span className="text-sm font-medium">{name}</span>
      <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-white border rounded-lg shadow-md min-w-[180px] p-2 z-50">
        <a className="block px-3 py-2 hover:bg-neutral-50 rounded" href="/account">
          My profile
        </a>
        <a className="block px-3 py-2 hover:bg-neutral-50 rounded" href="/resources">
          Resources
        </a>
        {isAdmin && (
          <a className="block px-3 py-2 hover:bg-neutral-50 rounded" href="/admin">
            Admin
          </a>
        )}
        <button 
          onClick={async () => {
            await supabase.auth.signOut();
            location.href = '/';
          }} 
          className="block w-full text-left px-3 py-2 hover:bg-neutral-50 rounded"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
