'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== 'undefined' 
          ? window.location.origin + '/onboard' 
          : undefined
      }
    });
    setLoading(false);
    setMsg(error ? error.message : 'Check your email for a magic link.');
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="ec-hero">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Sign In</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Access your profile and resources.
          </p>
        </div>
      </section>

      {/* Auth Form */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-6">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign in / Sign up</h2>
            <p className="text-gray-600 mb-6 text-center">
              Use your email — we'll send a magic link.
            </p>
            
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email *
                </label>
                <input 
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                  placeholder="your.email@company.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full ec-btn ec-btn-primary disabled:opacity-50" 
                disabled={!email || loading}
              >
                {loading ? 'Sending…' : 'Send magic link'}
              </button>
              
              {msg && (
                <div className={`p-4 rounded-lg text-sm ${
                  msg.includes('Check your email') 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {msg}
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold">1</span>
                  <span>Check your email for a magic link</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold">2</span>
                  <span>Click the link to complete your profile</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold">3</span>
                  <span>Access resources and register for sessions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}