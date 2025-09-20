import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Mission - ElevateCopilot',
  description: 'ElevateCopilot: An open mission for AI literacy in New Zealand. Train 1,000 professionals and inspire each to pass skills to 10 more people.',
}

export default function MissionPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-6">Our Mission</h1>
        
        <h2 className="text-2xl font-semibold mb-4">ElevateCopilot: An Open Mission for AI Literacy in New Zealand</h2>
        
        <p className="text-lg mb-4">
          <strong>Vision:</strong> A workforce confident with AI — practical, safe, and high-impact.
        </p>
        
        <p className="text-lg mb-4">
          <strong>2025 Goal:</strong> Train <strong>1,000 professionals</strong> in New Zealand and inspire each to pass skills to <strong>10 more people</strong>.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">What we do (free):</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Fortnightly live sessions (Q&A, demos, real workflows)</li>
          <li>Open resource library (prompts, checklists, templates)</li>
          <li>Community office hours</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-3">Why this matters:</h3>
        <p className="mb-4">
          Productivity growth and skills equity require literacy, not hype. We teach responsible, business-ready AI.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">How you can help:</h3>
        <p className="mb-6">
          Join a session, share the resources with your team, and become an <strong>AI Literacy Ambassador</strong>.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-amber-800">
            📧 Contact: <a href="mailto:elevatecopilot@outlook.com" className="font-semibold underline">elevatecopilot@outlook.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
