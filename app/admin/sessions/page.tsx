'use client';

import RequireAdmin from '@/components/RequireAdmin';
import AdminNav from '@/components/admin/AdminNav';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

function formatNZ(d: string) {
  return new Date(d).toLocaleString('en-NZ', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function Sessions() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: 'AI Literacy Live Session',
    starts_at: '',
    capacity: 100
  });
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.rpc('session_seat_summary');
    if (!error) {
      setList(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {
    if (!form.starts_at) {
      alert('Please select a start time');
      return;
    }

    const { error } = await supabase
      .from('sessions')
      .insert([{
        title: form.title,
        starts_at: new Date(form.starts_at).toISOString(),
        capacity: form.capacity
      }]);

    if (!error) {
      setForm({
        title: 'AI Literacy Live Session',
        starts_at: '',
        capacity: 100
      });
      load();
    }
  }

  async function updateCapacity(id: string, cap: number) {
    const { error } = await supabase
      .from('sessions')
      .update({ capacity: cap })
      .eq('id', id);
    
    if (!error) {
      load();
    }
  }

  return (
    <RequireAdmin>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Sessions</h1>
        <AdminNav />
        
        <div className="ec-card p-4 mt-4 grid md:grid-cols-4 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Starts at</label>
            <input 
              type="datetime-local" 
              className="border rounded px-3 py-2 w-full" 
              value={form.starts_at} 
              onChange={e => setForm({ ...form, starts_at: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Capacity</label>
            <input 
              type="number" 
              className="border rounded px-3 py-2 w-full" 
              value={form.capacity} 
              onChange={e => setForm({ ...form, capacity: Number(e.target.value) })}
            />
          </div>
          <div>
            <button className="ec-btn ec-btn-primary w-full" onClick={create}>
              Create session
            </button>
          </div>
        </div>
        
        <div className="mt-6 grid gap-3">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading sessions...</div>
          ) : list.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No sessions found</div>
          ) : (
            list.map(s => (
              <div key={s.id} className="ec-card p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm text-gray-600">{formatNZ(s.starts_at)}</p>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-sm">
                    <span className="font-medium">Registered:</span> {s.registered}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Pending:</span> {s.pending}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Seats left:</span> {s.seats_left}
                  </div>
                </div>
                
                <div className="flex gap-2 items-center">
                  <input 
                    type="number" 
                    className="border rounded px-2 py-1 w-24" 
                    value={s.capacity || 0} 
                    onChange={e => updateCapacity(s.id, Number(e.target.value))}
                  />
                  <span className="text-sm text-gray-600">Capacity</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </RequireAdmin>
  );
}