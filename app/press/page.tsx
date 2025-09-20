import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media & Speaking - ElevateCopilot',
  description: 'ElevateCopilot founder is available for panels, keynotes, and interviews on AI literacy and Copilot adoption.',
}

export default function PressPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-6">Media & Speaking</h1>
        <p className="text-lg mb-6">
          ElevateCopilot founder is available for panels, keynotes, and interviews on AI literacy and Copilot adoption.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Topics</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>AI literacy at scale</li>
              <li>Responsible adoption</li>
              <li>Copilot in the enterprise</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Region</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>New Zealand</li>
              <li>Australia (global virtual)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-amber-800">
            Contact: <a href="mailto:elevatecopilot@outlook.com" className="font-semibold underline">elevatecopilot@outlook.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
