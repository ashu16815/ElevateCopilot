'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function DebugAuth() {
  const [status, setStatus] = useState('Testing...');
  const [user, setUser] = useState<any>(null);

  const testConnection = async () => {
    try {
      setStatus('Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      
      if (error) {
        setStatus(`Connection error: ${error.message}`);
        return;
      }
      
      setStatus('Connection successful!');
      
      // Test auth
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      
      if (currentUser) {
        setStatus(`User is signed in: ${currentUser.email}`);
      } else {
        setStatus('No user signed in');
      }
      
    } catch (err) {
      setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const testMagicLink = async () => {
    try {
      setStatus('Sending test magic link...');
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email: 'test@example.com',
        options: {
          emailRedirectTo: window.location.origin + '/auth/callback'
        }
      });
      
      if (error) {
        setStatus(`Magic link error: ${error.message}`);
      } else {
        setStatus('Magic link sent successfully!');
      }
      
    } catch (err) {
      setStatus(`Magic link error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Auth Debug Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Status:</h2>
          <p className="text-gray-600">{status}</p>
        </div>
        
        {user && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Current User:</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="space-x-4">
          <button 
            onClick={testConnection}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Test Connection
          </button>
          
          <button 
            onClick={testMagicLink}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Test Magic Link
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2">Environment Check:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</li>
            <li>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</li>
            <li>Current Origin: {typeof window !== 'undefined' ? window.location.origin : 'Server-side'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
