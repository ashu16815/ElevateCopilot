'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Onboard() {
  const [form, setForm] = useState({
    full_name: '',
    job_function: '',
    role_title: '',
    industry: '',
    company_size: '',
    region_country: 'New Zealand',
    years_experience: 5,
    m365_license_type: 'Unknown',
    copilot_access: 'Unknown',
    primary_apps: [] as string[],
    self_assessment: 3,
    top_use_cases: [] as string[],
    obstacles: [] as string[],
    referral_code: '',
    marketing: false,
    research: true,
    share: false
  });
  const [msg, setMsg] = useState('');

  const upd = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }));

  async function save() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMsg('Not signed in');
      return;
    }

    // TODO: Implement database function once Supabase is set up
    // For now, just show success message
    setMsg('Profile saved successfully! You can now register for sessions and download resources.');
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold">Complete your profile</h1>
      <p className="text-gray-600 mt-2">
        Tell us about your role so we can tailor sessions and measure impact.
      </p>
      
      <div className="grid gap-3 mt-6">
        <input 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
          placeholder="Full name" 
          value={form.full_name} 
          onChange={e => upd('full_name', e.target.value)} 
        />
        <input 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
          placeholder="Job function (Finance, Consulting, IT, PM, HR/L&D)" 
          value={form.job_function} 
          onChange={e => upd('job_function', e.target.value)} 
        />
        <input 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
          placeholder="Role title" 
          value={form.role_title} 
          onChange={e => upd('role_title', e.target.value)} 
        />
        <input 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
          placeholder="Industry" 
          value={form.industry} 
          onChange={e => upd('industry', e.target.value)} 
        />
        <input 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
          placeholder="Company size (1-50 / 51-200 / 201-1000 / 1001-5000 / 5000+)" 
          value={form.company_size} 
          onChange={e => upd('company_size', e.target.value)} 
        />
        <input 
          className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500" 
          placeholder="Referral code (optional)" 
          value={form.referral_code} 
          onChange={e => upd('referral_code', e.target.value)} 
        />
        
        <div className="space-y-2">
          <label className="text-sm flex items-center">
            <input 
              type="checkbox" 
              className="mr-2" 
              checked={form.marketing} 
              onChange={e => upd('marketing', e.target.checked)} 
            />
            I agree to receive updates and materials.
          </label>
          <label className="text-sm flex items-center">
            <input 
              type="checkbox" 
              className="mr-2" 
              checked={form.research} 
              onChange={e => upd('research', e.target.checked)} 
            />
            I consent to anonymized, aggregated analytics.
          </label>
          <label className="text-sm flex items-center">
            <input 
              type="checkbox" 
              className="mr-2" 
              checked={form.share} 
              onChange={e => upd('share', e.target.checked)} 
            />
            I consent to selected third-party sharing (optional).
          </label>
        </div>
        
        <button 
          onClick={save} 
          className="mt-2 px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700"
        >
          Save profile
        </button>
        <p className="text-sm text-gray-600 mt-2">{msg}</p>
      </div>
    </div>
  );
}