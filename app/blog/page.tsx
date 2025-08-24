import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Clock, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - ElevateCopilot',
  description: 'Evidence-based insights on Microsoft Copilot ROI, productivity gains, and adoption strategies. Research-backed articles for leaders and practitioners.',
  keywords: ['Copilot ROI', 'productivity gains', 'AI adoption', 'Microsoft 365', 'workplace AI'],
}

const blogPosts = [
  {
    slug: 'copilot-saves-time-how-much',
    title: 'Does Copilot Really Save Time? What the Evidence Says',
    summary: 'Independent trials show 11–26 minutes saved per day, depending on role and workflow maturity.',
    bullets: [
      'UK cross-government trial: average ~26 minutes/day saved; quality improvements reported.',
      'Expect variance: early adoption studies show ~11 minutes/day; mature workflows trend higher.'
    ],
    sources: [
      {
        url: 'https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report',
        title: 'UK Government Copilot Experiment Report'
      },
      {
        url: 'https://news.microsoft.com/en-cee/2024/04/29/11-minutes-a-day-adds-up-to-10-hours-saved-in-11-weeks-results-of-a-study-on-the-impact-of-ai/',
        title: 'Microsoft Study: 11 Minutes Daily Adds Up to 10 Hours Saved'
      }
    ],
    icon: Clock,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    slug: 'roi-for-leaders',
    title: 'ROI for Leaders: How to Frame Copilot\'s Value',
    summary: 'Use directional TEI ranges and measure in your context: time back, quality uplift, throughput.',
    bullets: [
      'Forrester TEI composite models show triple-digit ROI ranges when adoption sticks.',
      'Tie ROI to specific workflows and telemetry: email triage, meeting follow-ups, deck/report drafting.'
    ],
    sources: [
      {
        url: 'https://tei.forrester.com/go/microsoft/365Copilot/?lang=en-us',
        title: 'Forrester TEI: Microsoft 365 Copilot'
      },
      {
        url: 'https://www.microsoft.com/en-us/microsoft-365/blog/2024/10/17/microsoft-365-copilot-drove-up-to-353-roi-for-small-and-medium-businesses-new-study/',
        title: 'Microsoft: Up to 353% ROI for SMBs'
      }
    ],
    icon: TrendingUp,
    color: 'bg-green-100 text-green-800'
  },
  {
    slug: 'what-users-say',
    title: 'What Early Users Say About AI at Work',
    summary: 'Most early users prefer working with AI assistance; perceived productivity and creativity gains are strong.',
    bullets: [
      'Work Trend Index: employees report sustained time savings and fewer \'blank-page\' starts.',
      'Teams & Outlook often lead adoption; Excel/PowerPoint ramp with practice and templates.'
    ],
    sources: [
      {
        url: 'https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work',
        title: 'Microsoft Work Trend Index: Copilot\'s Earliest Users'
      },
      {
        url: 'https://news.microsoft.com/source/2024/05/08/microsoft-and-linkedin-release-the-2024-work-trend-index-on-the-state-of-ai-at-work/',
        title: '2024 Work Trend Index: State of AI at Work'
      }
    ],
    icon: Users,
    color: 'bg-purple-100 text-purple-800'
  }
]

export default function BlogPage() {
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
              Evidence-Based Insights
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Research-backed articles on Copilot ROI, productivity gains, and adoption strategies for leaders and practitioners
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {blogPosts.map((post, index) => (
              <article key={post.slug} className="bg-white rounded-2xl shadow-lg p-8">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${post.color}`}>
                      <post.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm text-muted">Research & Insights</span>
                  </div>
                  {index === 0 && (
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      Latest
                    </span>
                  )}
                </div>

                {/* Post Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-playfair">
                  {post.title}
                </h2>

                {/* Post Summary */}
                <p className="text-lg text-muted mb-6 leading-relaxed">
                  {post.summary}
                </p>

                {/* Key Points */}
                <div className="mb-8">
                  <h3 className="font-semibold text-primary mb-3">Key Findings:</h3>
                  <ul className="space-y-2">
                    {post.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start text-muted">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sources */}
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-semibold text-primary mb-3">Sources & Research:</h4>
                  <div className="space-y-2">
                    {post.sources.map((source, sourceIndex) => (
                      <a
                        key={sourceIndex}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-accent hover:text-accent/80 transition-colors group"
                      >
                        <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm">{source.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Ready to See These Results in Your Organization?
              </h2>
              <p className="text-muted mb-6 max-w-2xl mx-auto">
                Our evidence-based training programs help teams achieve measurable productivity gains and ROI with Microsoft Copilot.
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
