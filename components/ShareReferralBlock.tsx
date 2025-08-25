import React, { useMemo } from 'react';

export default function ShareReferralBlock({ code }: { code: string | null }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.elevatecopilot.com';
  const referralLink = useMemo(() => code ? `${baseUrl}/?ref=${encodeURIComponent(code)}` : baseUrl, [baseUrl, code]);
  const message = `Get 10% off ElevateCopilot courses with my code ${code}. You learn more, I earn 10% back. Win–win! ${referralLink}`;

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: 'ElevateCopilot — 10% off', 
          text: message, 
          url: referralLink 
        });
      } catch (e) { 
        /* user cancelled */ 
      }
    } else {
      await navigator.clipboard.writeText(message);
      alert('Share not supported — we copied your message to the clipboard. Paste it into any app.');
    }
  };

  const waHref = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent('10% off ElevateCopilot courses')}&body=${encodeURIComponent(message)}`;

  const copyAll = async () => {
    await navigator.clipboard.writeText(message);
    alert('Copied! Paste into Messenger, Slack, Teams, etc.');
  };

  return (
    <div className='rounded-2xl border p-4 mt-6'>
      <h3 className='text-lg font-semibold'>Share your code</h3>
      <p className='text-sm text-muted-foreground'>
        Friends get <strong>10% off</strong>. You receive <strong>10% cash</strong> on what they pay. 
        We transfer rewards to your bank account monthly.
      </p>
      <div className='mt-4 flex flex-wrap gap-3'>
        <a 
          href={waHref} 
          target='_blank' 
          rel='noopener noreferrer' 
          className='px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors'
        >
          Share on WhatsApp
        </a>
        <a 
          href={mailHref} 
          className='px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition-colors'
        >
          Share via Email
        </a>
        <button 
          onClick={shareNative} 
          className='px-3 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors'
        >
          Share (Device)
        </button>
        <button 
          onClick={copyAll} 
          className='px-3 py-2 rounded-md bg-neutral-800 text-white hover:bg-black transition-colors'
        >
          Copy Message
        </button>
      </div>
      <div className='mt-4 text-sm'>
        <div>
          <span className='font-medium'>Your referral link:</span> 
          <span className='font-mono bg-gray-100 px-2 py-1 rounded ml-2'>{referralLink}</span>
        </div>
        <div className='mt-2 text-muted-foreground'>
          Messenger tip: click <em>Copy Message</em> and paste it into a Messenger chat.
        </div>
      </div>
    </div>
  );
}
