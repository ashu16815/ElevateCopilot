'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setOk(false);
        return;
      }

      const { data: p } = await supabase
        .from('profiles')
        .select('is_admin, blocked')
        .eq('user_id', user.id)
        .maybeSingle();

      setOk(!!p?.is_admin && !p?.blocked);
    })();
  }, []);

  if (ok === null) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        <p className="mt-2 text-gray-600">Checking permissions…</p>
      </div>
    );
  }

  if (!ok) {
    return (
      <div className="px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You do not have access to this area.</p>
        <a href="/" className="ec-btn ec-btn-primary">Return Home</a>
      </div>
    );
  }

  return <>{children}</>;
}
