'use client'

import React, { useState } from 'react';
import ShareReferral from './ShareReferral';

interface ReferralCodeFormProps {
  onCreated?: (code: string) => void;
}

export default function ReferralCodeForm({ onCreated }: ReferralCodeFormProps) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExistingCode, setIsExistingCode] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function createCode() {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setError(null);
    setLoading(true);
    
    try {
      const res = await fetch('/api/referrals/create', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          full_name: fullName.trim() || null 
        }) 
      });
      
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      setCode(data.code);
      setIsExistingCode(data.isExisting || false);
      setMessage(data.message || null);
      
      // Notify parent component that a code was created
      if (onCreated) {
        onCreated(data.code);
      }
    } catch (err) {
      setError('Failed to generate code. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Generate your referral code
      </h3>
      <p className="text-sm text-muted mb-6">
        Share this code to give 10% off and earn 10% back.
      </p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
            Your email (required)
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-primary mb-2">
            Your full name (optional)
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>
      </div>
      
      <button 
        onClick={createCode} 
        disabled={loading || !email.trim()} 
        className="w-full px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {loading ? 'Generating…' : 'Generate Code'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      
      {code && (
        <>
          <div className={`mt-6 p-4 rounded-lg border-2 text-center ${
            isExistingCode 
              ? 'bg-blue-50 border-blue-200' 
              : 'bg-green-50 border-green-200'
          }`}>
            <p className={`text-sm mb-3 ${
              isExistingCode ? 'text-blue-800' : 'text-green-800'
            }`}>
              {isExistingCode ? 'Your existing referral code:' : 'Your new referral code:'}
            </p>
            <div className={`font-mono text-xl font-bold text-primary bg-white px-4 py-3 rounded-lg border-2 text-center ${
              isExistingCode ? 'border-blue-300' : 'border-green-300'
            }`}>
              {code}
            </div>
            {message && (
              <p className={`text-xs mt-3 ${
                isExistingCode ? 'text-blue-700' : 'text-green-700'
              }`}>
                {message}
              </p>
            )}
            <p className={`text-xs mt-2 ${
              isExistingCode ? 'text-blue-600' : 'text-green-700'
            }`}>
              Share this code with friends and colleagues to earn rewards!
            </p>
          </div>
          
          {/* Share Referral Section */}
          <ShareReferral code={code} />
        </>
      )}
    </div>
  );
}
