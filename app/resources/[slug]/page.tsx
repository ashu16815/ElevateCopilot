import RequireAuth from '@/components/RequireAuth';
import { useParams } from 'next/navigation';

export default function Resource() {
  const { slug } = useParams();

  const meta: Record<string, { title: string; href: string; desc: string }> = {
    'starter-pack': {
      title: 'Starter Pack',
      href: '/docs/starter-pack.zip',
      desc: 'A curated ZIP with templates and checklists to begin using AI at work.'
    },
    'prompts': {
      title: 'Copilot Prompts',
      href: '/docs/prompts.pdf',
      desc: 'Prompts for Excel, Word, PowerPoint and Teams.'
    },
    'meetings': {
      title: 'Meeting → Actions',
      href: '/docs/meetings.pdf',
      desc: 'Turn meetings into clean summaries and action lists.'
    },
    'rai': {
      title: 'Responsible AI Guide',
      href: '/docs/rai.pdf',
      desc: 'Practical do & don\'t for safe AI at work.'
    }
  };

  const r = meta[String(slug)] || { title: String(slug), href: '#', desc: '' };

  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold">{r.title}</h1>
        <p className="text-gray-600 mt-2">{r.desc}</p>
        <a className="mt-6 inline-block ec-btn ec-btn-primary" href={r.href}>Download</a>
      </div>
    </RequireAuth>
  );
}
