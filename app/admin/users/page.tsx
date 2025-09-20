'use client';

import RequireAdmin from '@/components/RequireAdmin';
import AdminNav from '@/components/admin/AdminNav';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Users() {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.rpc('admin_list_users', { q: query || null });
    if (!error) {
      setRows(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function setFlag(user_id: string, field: 'blocked' | 'is_admin', value: boolean) {
    const { error } = await supabase
      .from('profiles')
      .update({ [field]: value })
      .eq('user_id', user_id);
    
    if (!error) {
      load();
    }
  }

  return (
    <RequireAdmin>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Users</h1>
        <AdminNav />
        
        <div className="mt-4 flex gap-2">
          <input 
            className="border rounded px-3 py-2 w-full" 
            placeholder="Search name or email" 
            value={query} 
            onChange={e => setQuery(e.target.value)}
          />
          <button className="ec-btn ec-btn-secondary" onClick={load}>
            Search
          </button>
        </div>
        
        <div className="mt-6 overflow-auto">
          <table className="min-w-full border rounded">
            <thead className="bg-neutral-50">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Job Function</th>
                <th className="p-2 text-left">Industry</th>
                <th className="p-2">Admin</th>
                <th className="p-2">Blocked</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                rows.map(r => (
                  <tr key={r.user_id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{r.full_name || '—'}</td>
                    <td className="p-2">{r.email}</td>
                    <td className="p-2">{r.job_function || '—'}</td>
                    <td className="p-2">{r.industry || '—'}</td>
                    <td className="p-2 text-center">
                      {r.is_admin ? '✓' : '—'}
                    </td>
                    <td className="p-2 text-center">
                      {r.blocked ? '✓' : '—'}
                    </td>
                    <td className="p-2 flex gap-2 justify-center">
                      <button 
                        className="ec-btn ec-btn-secondary text-xs" 
                        onClick={() => setFlag(r.user_id, 'is_admin', !r.is_admin)}
                      >
                        {r.is_admin ? 'Remove admin' : 'Make admin'}
                      </button>
                      <button 
                        className="ec-btn ec-btn-secondary text-xs" 
                        onClick={() => setFlag(r.user_id, 'blocked', !r.blocked)}
                      >
                        {r.blocked ? 'Unblock' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </RequireAdmin>
  );
}