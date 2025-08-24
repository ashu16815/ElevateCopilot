import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Download, FileText, FileSpreadsheet, FileImage, FileCode, ExternalLink, Lock, Unlock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resource Library - ElevateCopilot',
  description: 'Download free resources, templates, and tools to accelerate your Microsoft Copilot adoption and productivity gains.',
  keywords: ['Copilot resources', 'templates', 'playbooks', 'ROI calculator', 'downloads', 'productivity tools'],
}

const resources = [
  {
    slug: 'day1-playbook',
    title: 'Day-1 Copilot Playbook',
    format: 'PDF',
    download_path: '/resources/day1-copilot-playbook.pdf',
    teaser: 'Get your team productive with Copilot in just one day. Step-by-step setup, first tasks, and quick wins.',
    category: 'Getting Started',
    isGated: false,
    icon: FileText,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    slug: 'meeting-deck-cheatsheet',
    title: 'Meeting-to-Deck Workflow',
    format: 'PDF',
    download_path: '/resources/meeting-to-deck-cheatsheet.pdf',
    teaser: 'Transform meeting notes into polished presentations in minutes. Proven prompts and workflow templates.',
    category: 'Productivity',
    isGated: false,
    icon: FileImage,
    color: 'bg-green-100 text-green-800'
  },
  {
    slug: 'roi-calculator',
    title: 'Copilot ROI Calculator',
    format: 'XLSX',
    download_path: '/resources/copilot-roi-calculator.xlsx',
    teaser: 'Calculate potential savings and ROI for your organization. Includes time savings, cost analysis, and business case templates.',
    category: 'Business Case',
    isGated: true,
    icon: FileSpreadsheet,
    color: 'bg-purple-100 text-purple-800'
  },
  {
    slug: 'outlook-superprompts',
    title: 'Outlook Email Triage Superprompts',
    format: 'DOCX',
    download_path: '/resources/outlook-superprompts.docx',
    teaser: 'Master email management with AI. 25 proven prompts for drafting, summarizing, and organizing your inbox.',
    category: 'Email Productivity',
    isGated: false,
    icon: FileText,
    color: 'bg-orange-100 text-orange-800'
  },
  {
    slug: 'exec-brief',
    title: 'Executive Brief: AI at Work Evidence',
    format: 'PDF',
    download_path: '/resources/executive-brief.pdf',
    teaser: 'Data-driven insights for leadership. ROI evidence, productivity gains, and competitive advantages of AI adoption.',
    category: 'Leadership',
    isGated: true,
    icon: FileText,
    color: 'bg-red-100 text-red-800'
  },
  {
    slug: 'governance-checklist',
    title: 'Governance Starter Checklist',
    format: 'PDF',
    download_path: '/resources/governance-checklist.pdf',
    teaser: 'Essential security, compliance, and usage guidelines. Ensure safe and effective AI implementation.',
    category: 'Governance',
    isGated: false,
    icon: FileText,
    color: 'bg-gray-100 text-gray-800'
  },
  {
    slug: 'prompt-cards',
    title: 'Prompt Patterns Card Set',
    format: 'PDF',
    download_path: '/resources/prompt-cards.pdf',
    teaser: '50+ proven prompt patterns for common work tasks. Print, laminate, and keep at your desk for quick reference.',
    category: 'Skills',
    isGated: false,
    icon: FileCode,
    color: 'bg-indigo-100 text-indigo-800'
  },
  {
    slug: 'excel-recipes',
    title: 'Excel with Copilot: 5 Recipes',
    format: 'PDF',
    download_path: '/resources/excel-recipes.pdf',
    teaser: 'Master data analysis with AI assistance. Formulas, charts, and insights generation made simple.',
    category: 'Data Analysis',
    isGated: false,
    icon: FileSpreadsheet,
    color: 'bg-emerald-100 text-emerald-800'
  },
  {
    slug: 'ppt-templates',
    title: 'PowerPoint Accelerator Templates',
    format: 'PPTX',
    download_path: '/resources/ppt-templates.pptx',
    teaser: 'Professional presentation templates optimized for Copilot. Includes AI-friendly layouts and design elements.',
    category: 'Presentations',
    isGated: true,
    icon: FileImage,
    color: 'bg-pink-100 text-pink-800'
  },
  {
    slug: 'adoption-sprint',
    title: '30-Day Adoption Sprint Plan',
    format: 'PDF',
    download_path: '/resources/adoption-sprint.pdf',
    teaser: 'Accelerate team adoption with this structured 30-day plan. Daily activities, milestones, and success metrics.',
    category: 'Adoption',
    isGated: true,
    icon: FileText,
    color: 'bg-yellow-100 text-yellow-800'
  }
]

const categories = ['All', 'Getting Started', 'Productivity', 'Business Case', 'Email Productivity', 'Leadership', 'Governance', 'Skills', 'Data Analysis', 'Presentations', 'Adoption']

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Link
              href="/"
              className="flex items-center text-gray-200 hover:text-white transition-colors mr-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Resource Library
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Download free resources, templates, and tools to accelerate your Microsoft Copilot adoption and productivity gains
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700 hover:text-primary"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <div key={resource.slug} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                {/* Resource Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${resource.color}`}>
                      <resource.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-muted uppercase tracking-wide">{resource.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {resource.isGated ? (
                      <Lock className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Unlock className="h-4 w-4 text-green-500" />
                    )}
                    <span className="text-xs text-muted">{resource.format}</span>
                  </div>
                </div>

                {/* Resource Title */}
                <h3 className="text-lg font-bold text-primary mb-3 font-playfair">
                  {resource.title}
                </h3>

                {/* Resource Teaser */}
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {resource.teaser}
                </p>

                {/* Download Button */}
                <div className="flex items-center justify-between">
                  {resource.isGated ? (
                    <button className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium">
                      <Lock className="h-4 w-4 mr-2" />
                      Get Access
                    </button>
                  ) : (
                    <a
                      href={resource.download_path}
                      download
                      className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </a>
                  )}
                  
                  <div className="text-xs text-muted">
                    {resource.isGated ? 'Form required' : 'Instant download'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Ready to Take Your Skills to the Next Level?
              </h2>
              <p className="text-muted mb-6 max-w-2xl mx-auto">
                These resources are just the beginning. Our comprehensive training programs help teams achieve measurable productivity gains and ROI with Microsoft Copilot.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/courses"
                  className="btn-primary px-8 py-3"
                >
                  Explore Training Programs
                </Link>
                <Link
                  href="/corporate-training"
                  className="btn-secondary px-8 py-3"
                >
                  Corporate Training
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
