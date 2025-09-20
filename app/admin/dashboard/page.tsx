'use client';

import RequireAdmin from '@/components/RequireAdmin';
import AdminNav from '@/components/admin/AdminNav';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { TARGET } from '@/lib/site.config';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    total_users: 0,
    total_sessions: 0,
    total_regs: 0,
    trained: 0
  });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc('admin_counts');
      if (!error && data && data.length) {
        const [row] = data;
        setMetrics({
          total_users: Number(row.total_users),
          total_sessions: Number(row.total_sessions),
          total_regs: Number(row.total_regs),
          trained: Number(row.trained)
        });
      }
    })();
  }, []);

  const pct = Math.min(100, Math.round((metrics.trained / TARGET) * 100));

  const statCards = [
    { key: 'Total users', value: metrics.total_users },
    { key: 'Sessions', value: metrics.total_sessions },
    { key: 'Registrations', value: metrics.total_regs },
    { key: 'Trained (distinct)', value: metrics.trained }
  ];

  return (
    <RequireAdmin>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <AdminNav />
        
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {statCards.map((stat, i) => (
            <div key={i} className="ec-card p-4">
              <p className="text-sm text-gray-500">{stat.key}</p>
              <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        <div className="ec-card p-6 mt-6">
          <p className="font-medium mb-2">Mission progress</p>
          <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-3 bg-[var(--ec-gold)] transition-all duration-1000" 
              style={{ width: pct + '%' }}
            />
          </div>
          <p className="text-sm mt-2">
            {metrics.trained.toLocaleString()} / {TARGET.toLocaleString()} trained
          </p>
        </div>
      </div>
    </RequireAdmin>
  );
}
