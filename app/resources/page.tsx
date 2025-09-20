import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Resource Library - ElevateCopilot',
  description: 'Download and share freely with attribution. Free AI literacy resources, prompts, and templates.',
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto max-w-4xl py-10 px-4">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-6">Open Resource Library</h1>
        <p className="text-lg mb-6">Download and share freely with attribution.</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Starter Pack</h3>
            <p className="text-gray-600 mb-4">Copilot prompts for professionals (PDF)</p>
            <a 
              href="/elevatecopilot_resources_detailed/prompt-cards.pdf" 
              className="inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              download
            >
              Download PDF
            </a>
          </div>
          
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Meeting Notes → Actions</h3>
            <p className="text-gray-600 mb-4">Checklist for converting meetings to actionable items (PDF)</p>
            <a 
              href="/elevatecopilot_resources_detailed/meeting-to-deck-cheatsheet.pdf" 
              className="inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              download
            >
              Download PDF
            </a>
          </div>
          
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Excel Analysis Prompts</h3>
            <p className="text-gray-600 mb-4">Ready-to-use prompts for data analysis (PDF)</p>
            <a 
              href="/elevatecopilot_resources_detailed/excel-recipes.pdf" 
              className="inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              download
            >
              Download PDF
            </a>
          </div>
          
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3">PowerPoint Templates</h3>
            <p className="text-gray-600 mb-4">Story templates for presentations (PPTX)</p>
            <a 
              href="/elevatecopilot_resources_detailed/ppt-templates.pptx" 
              className="inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              download
            >
              Download PPTX
            </a>
          </div>
          
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Responsible AI Guide</h3>
            <p className="text-gray-600 mb-4">Quick guide to ethical AI use (PDF)</p>
            <a 
              href="/elevatecopilot_resources_detailed/governance-checklist.pdf" 
              className="inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              download
            >
              Download PDF
            </a>
          </div>
          
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Executive Brief</h3>
            <p className="text-gray-600 mb-4">ROI calculator and adoption guide (PDF)</p>
            <a 
              href="/elevatecopilot_resources_detailed/executive-brief.pdf" 
              className="inline-block px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              download
            >
              Download PDF
            </a>
          </div>
        </div>
        
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <p className="text-amber-800">
            Don't see a template you need? Email <a href="mailto:elevatecopilot@outlook.com" className="font-semibold underline">elevatecopilot@outlook.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}