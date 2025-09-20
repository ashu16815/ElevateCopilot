import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Literacy Ambassadors - ElevateCopilot',
  description: 'Become an AI Literacy Ambassador and help your team and community adopt AI responsibly.',
}

export default function AmbassadorsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-6">Become an AI Literacy Ambassador</h1>
        <p className="text-lg mb-6">Help your team and community adopt AI responsibly.</p>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">What you do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Share the free sessions internally</li>
              <li>Host a watch-party at your workplace</li>
              <li>Share 3 resources after each session</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">What you get</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Recognition on our site (optional)</li>
              <li>Early access to new resources</li>
              <li>Ambassador certificate</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-amber-800">
            Email <a href="mailto:elevatecopilot@outlook.com" className="font-semibold underline">elevatecopilot@outlook.com</a> to join.
          </p>
        </div>
      </div>
    </div>
  )
}
