'use client'

import { useState } from 'react';

export default function ShareReferral({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const siteUrl = 'https://www.elevatecopilot.com';
  const message = `🚀 Elevate your career with AI! I just joined ElevateCopilot's Microsoft Copilot courses — practical, hands-on, and designed for professionals.

💡 Use my referral code *${code}* to get **10% off** any course.
👉 Sign up here: ${siteUrl}/courses`;

  function copyToClipboard() {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}&mini=true&summary=${encodeURIComponent(message)}`;
  const mailUrl = `mailto:?subject=Check out ElevateCopilot AI courses&body=${encodeURIComponent(message)}`;

  return (
    <div className='mt-10 rounded-2xl border p-6'>
      <h3 className='text-xl font-semibold'>📢 Share your referral code</h3>
      <p className='mt-2 text-sm text-muted-foreground'>
        Help your network upskill with AI, and you both win: they get 10% off, you earn 10% back.
      </p>
      <textarea 
        readOnly 
        value={message} 
        className='mt-4 w-full rounded-md border p-3 font-mono text-sm bg-neutral-50 h-32' 
      />
      <div className='mt-4 flex gap-3 flex-wrap'>
        <button 
          onClick={copyToClipboard} 
          className='px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors'
        >
          {copied ? 'Copied!' : 'Copy Message'}
        </button>
        <a 
          href={linkedinUrl} 
          target='_blank' 
          rel='noopener noreferrer' 
          className='px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors'
        >
          Share on LinkedIn
        </a>
        <a 
          href={mailUrl} 
          className='px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors'
        >
          Share via Email
        </a>
      </div>
    </div>
  );
}
