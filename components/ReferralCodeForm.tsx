'use client'

import React, { useState } from 'react';

export default function ReferralCodeForm({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function createCode() {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/referrals/create', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }) 
      });
      
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setCode(data.code);
    } catch (err) {
      setError('Failed to generate code. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-primary mb-2">
        Generate your referral code
      </h3>
      <p className="text-sm text-muted mb-4">
        Share this code to give 10% off and earn 10% back.
      </p>
      
      <button 
        onClick={createCode} 
        disabled={loading} 
        className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Generating…' : 'Generate Code'}
      </button>
      
      {error && (
        <p className="mt-3 text-red-600 text-sm">{error}</p>
      )}
      
      {code && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-muted mb-2">Your referral code:</p>
          <div className="font-mono text-lg font-semibold text-primary bg-white px-3 py-2 rounded border">
            {code}
          </div>
          <p className="text-xs text-muted mt-2">
            Share this code with friends and colleagues to earn rewards!
          </p>
        </div>
      )}
    </div>
  );
}
