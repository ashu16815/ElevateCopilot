'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const PID = '7932452'; // LinkedIn Partner ID

function Pill({ ok, label }:{ ok:boolean; label:string }){
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${ok? 'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>{label}</span>;
}

export default function ConversionsDebug(){
  const [liLoaded, setLiLoaded] = useState(false);
  const [liHasFn, setLiHasFn] = useState(false);
  const [lastEvent, setLastEvent] = useState<string>('–');
  const [log, setLog] = useState<string[]>([]);
  const mounted = useRef(false);

  // Patch lintrk to capture calls for logging (without breaking it)
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const w = window as any;
    const original = w.lintrk;
    if (typeof original === 'function') {
      setLiHasFn(true);
      w.lintrk = function(a: any, b: any){
        setLastEvent(JSON.stringify({ a, b }));
        setLog(prev => [`${new Date().toISOString()} lintrk(${JSON.stringify(a)}, ${JSON.stringify(b)})`, ...prev].slice(0,100));
        return original.apply(this, arguments as any);
      }
    }

    // Detect script presence by checking snap.licdn.com script tag
    const check = () => {
      const scripts = Array.from(document.getElementsByTagName('script'));
      const found = scripts.some(s => (s.src||'').includes('snap.licdn.com/li.lms-analytics/insight.min.js'));
      setLiLoaded(found);
      setLiHasFn(typeof (window as any).lintrk === 'function');
    };
    check();
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, []);

  const urlBase = useMemo(() => (typeof window !== 'undefined' ? window.location.origin : ''), []);
  const thankYouLinks = [
    { label: 'Kickstart TY', href: '/thank-you-kickstart' },
    { label: 'Bundle TY', href: '/thank-you-bundle' },
    { label: 'Contact TY', href: '/thank-you-contact' }
  ];

  const fireTestEvent = () => {
    const w = window as any;
    if (typeof w.lintrk === 'function'){
      try{
        w.lintrk('track', { conversion_id: 'debug_test' });
        setLastEvent(JSON.stringify({ a:'track', b:{ conversion_id: 'debug_test' } }));
        setLog(prev => [`${new Date().toISOString()} lintrk('track', { conversion_id: 'debug_test' })`, ...prev].slice(0,100));
      } catch (e){ setLog(prev => [`${new Date().toISOString()} ERROR firing test: ${String(e)}`, ...prev]); }
    }
  };

  return (
    <div className='container mx-auto max-w-3xl py-10'>
      <h1 className='text-2xl font-bold'>Conversion Pixel Debugger</h1>
      <p className='text-sm text-gray-600 mt-1'>Verify LinkedIn Insight Tag (PID {PID}) loads and fires events. This page is noindex.</p>

      <div className='mt-6 grid gap-4 sm:grid-cols-2'>
        <div className='rounded-2xl border p-4 bg-white shadow-sm'>
          <h2 className='font-semibold'>LinkedIn Insight Tag</h2>
          <div className='mt-2 space-x-2'>
            <Pill ok={liLoaded} label={liLoaded ? 'Script loaded' : 'Script not found'} />
            <Pill ok={liHasFn} label={liHasFn ? 'lintrk available' : 'lintrk missing'} />
          </div>
          <button onClick={fireTestEvent} className='mt-3 px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50' disabled={!liHasFn}>Fire test event</button>
          <p className='mt-2 text-xs text-gray-500'>Last event: {lastEvent}</p>
          <p className='mt-3 text-sm'>No conversions? Confirm Campaign Manager → Conversions uses "URL contains" rules for the thank-you paths below.</p>
        </div>

        <div className='rounded-2xl border p-4 bg-white shadow-sm'>
          <h2 className='font-semibold'>Quick links (open in new tab)</h2>
          <ul className='mt-2 space-y-2'>
            {thankYouLinks.map(l => (
              <li key={l.href}><a className='text-blue-600 underline' target='_blank' rel='noreferrer' href={l.href}>{urlBase}{l.href}</a></li>
            ))}
          </ul>
          <p className='mt-3 text-sm text-gray-600'>Visit each thank-you URL after a test purchase to validate conversion tracking.</p>
        </div>
      </div>

      <div className='rounded-2xl border p-4 bg-white shadow-sm mt-6'>
        <h2 className='font-semibold'>Event log (client-side)</h2>
        <p className='text-xs text-gray-500'>Shows intercepted lintrk() calls on this page.</p>
        <pre className='mt-3 max-h-64 overflow-auto bg-neutral-50 p-3 text-xs whitespace-pre-wrap'>{log.join('\n') || '– no events yet –'}</pre>
      </div>

      <div className='rounded-2xl border p-4 bg-white shadow-sm mt-6'>
        <h2 className='font-semibold'>Troubleshooting</h2>
        <ol className='list-decimal pl-5 text-sm space-y-1 mt-2'>
          <li>Ensure the Insight Tag component is injected site-wide (layout includes LinkedInInsight).</li>
          <li>In Campaign Manager → Insight Tag, verify domain is listed as Active.</li>
          <li>Create Website Conversions with URL contains: /thank-you-kickstart, /thank-you-bundle, /thank-you-contact.</li>
          <li>Redirect users to the matching thank-you URL after successful checkout or form submit.</li>
          <li>Allow up to 24h for LinkedIn to attribute conversions in the UI.</li>
        </ol>
      </div>
    </div>
  );
}
