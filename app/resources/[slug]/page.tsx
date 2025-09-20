'use client';

import RequireAuth from '@/components/RequireAuth';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Resource() {
  const { slug } = useParams();
  const [downloading, setDownloading] = useState(false);

  const meta: Record<string, { title: string; href: string; desc: string; type: string; size: string }> = {
    'starter-pack': {
      title: 'Starter Pack (Templates + Checklists)',
      href: '/public/elevatecopilot_resources_detailed/starter-pack.zip',
      desc: 'A curated ZIP with templates and checklists to begin using AI at work.',
      type: 'ZIP',
      size: '2.3 MB'
    },
    'prompts': {
      title: 'Copilot Prompts for Professionals',
      href: '/public/elevatecopilot_resources_detailed/prompts.pdf',
      desc: 'Ready-to-use prompts for Excel, Word, PowerPoint and Teams.',
      type: 'PDF',
      size: '1.8 MB'
    },
    'meetings': {
      title: 'Meeting → Actions Checklist',
      href: '/public/elevatecopilot_resources_detailed/meetings.pdf',
      desc: 'Turn meetings into clean summaries and action lists.',
      type: 'PDF',
      size: '0.9 MB'
    },
    'rai': {
      title: 'Responsible AI Quick Guide',
      href: '/public/elevatecopilot_resources_detailed/rai.pdf',
      desc: 'Practical do & don\'t for safe AI at work.',
      type: 'PDF',
      size: '1.2 MB'
    },
    'excel-recipes': {
      title: 'Excel AI Recipes',
      href: '/public/elevatecopilot_resources_detailed/excel-recipes.pdf',
      desc: 'Advanced Excel formulas and automation with AI assistance.',
      type: 'PDF',
      size: '2.1 MB'
    },
    'powerpoint-prompts': {
      title: 'PowerPoint Super Prompts',
      href: '/public/elevatecopilot_resources_detailed/powerpoint-prompts.pdf',
      desc: 'Create compelling presentations faster with AI prompts.',
      type: 'PDF',
      size: '1.5 MB'
    }
  };

  const r = meta[String(slug)] || { 
    title: String(slug), 
    href: '#', 
    desc: 'Resource not found.',
    type: 'Unknown',
    size: 'Unknown'
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = r.href;
      link.download = `${r.title}.${r.type.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <RequireAuth>
      <main>
        {/* Hero Section */}
        <section className="ec-hero">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-extrabold">{r.title}</h1>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl">{r.desc}</p>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-6">
            <div className="ec-card p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Ready to Download</h2>
                <p className="text-gray-600 mb-4">{r.desc}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <span>Type: {r.type}</span>
                  <span>•</span>
                  <span>Size: {r.size}</span>
                </div>
              </div>
              
              <button 
                onClick={handleDownload}
                disabled={downloading}
                className="ec-btn ec-btn-primary text-lg px-8 py-4 disabled:opacity-50"
              >
                {downloading ? 'Downloading...' : 'Download Now'}
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                Your download will start automatically. If it doesn't, check your browser's download folder.
              </p>
            </div>
          </div>
        </section>
      </main>
    </RequireAuth>
  );
}
