'use client'

import Link from 'next/link'
import { ArrowLeft, ExternalLink, Clock, TrendingUp, Users, Search, Tag, Calendar, User } from 'lucide-react'
import { useState, useMemo } from 'react'

const blogPosts = [
  {
    slug: 'top-10-copilot-prompts-for-consultants',
    title: 'Top 10 Copilot Prompts for Consultants',
    summary: 'Ten field-tested Copilot prompts consultants use to win time, sharpen client deliverables, and increase impact—spanning email, analysis, and executive-ready decks.',
    bullets: [
      'Outlook email triage and stakeholder heatmap prompts for efficient communication.',
      'Word document drafting and options memo creation for client deliverables.',
      'Excel variance analysis and KPI snapshot generation for data insights.',
      'PowerPoint executive deck creation and alternative storyline development.'
    ],
    sources: [
      {
        url: 'https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report',
        title: 'UK Cross-Government Copilot Trial (Time Saved)'
      },
      {
        url: 'https://www.microsoft.com/en-us/worklab',
        title: 'Microsoft Work Trend Index (AI at Work)'
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview',
        title: 'Microsoft Learn for Copilot in M365'
      }
    ],
    icon: TrendingUp,
    color: 'bg-blue-100 text-blue-800',
    tags: ['Consulting', 'Prompts', 'Productivity', 'Microsoft 365'],
    date: '2024-12-15',
    author: 'ElevateCopilot Editorial Team'
  },
  {
    slug: 'roi-of-microsoft-copilot-for-finance-teams',
    title: 'ROI of Microsoft Copilot for Finance Teams',
    summary: 'A practical ROI framework for controllers, FP&A, and finance leaders—covering time savings, quality uplift, and throughput gains with Copilot.',
    bullets: [
      'Month-end close automation: draft reconciliations, narrative notes, and variance commentary.',
      'Management reporting: first-pass narratives for KPIs, risks, and drivers.',
      'Board packs: summary pages, risk/mitigation tables, and talking points.',
      'Ad-hoc analysis: explain drivers behind unusual movements with AI assistance.'
    ],
    sources: [
      {
        url: 'https://tei.forrester.com/go/Microsoft/365Copilot/',
        title: 'Forrester TEI (Directional ROI)'
      },
      {
        url: 'https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report',
        title: 'UK Cross-Government Copilot Trial'
      },
      {
        url: 'https://www.microsoft.com/en-us/worklab',
        title: 'Microsoft WorkLab (AI at Work Insights)'
      }
    ],
    icon: TrendingUp,
    color: 'bg-green-100 text-green-800',
    tags: ['Finance', 'ROI', 'Microsoft 365', 'Productivity'],
    date: '2024-12-10',
    author: 'ElevateCopilot Editorial Team'
  },
  {
    slug: 'copilot-vs-chatgpt-which-is-better-for-professionals',
    title: 'Copilot vs. ChatGPT: Which Is Better for Professionals?',
    summary: 'Side-by-side comparison: where Copilot shines inside Microsoft 365 workflows, where ChatGPT excels, and how to choose (or combine) them for daily work.',
    bullets: [
      'Copilot excels in Microsoft 365 integration with enterprise controls and in-app context.',
      'ChatGPT shines in open-ended ideation, multilingual drafting, and general research.',
      'Many professionals benefit from using both tools strategically for different use cases.',
      'Choose based on data sensitivity, workflow integration needs, and creative requirements.'
    ],
    sources: [
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview',
        title: 'Microsoft 365 Copilot Overview'
      },
      {
        url: 'https://www.microsoft.com/en-us/worklab',
        title: 'Microsoft WorkLab (AI at Work)'
      },
      {
        url: 'https://platform.openai.com/docs',
        title: 'OpenAI Product Updates & Documentation'
      }
    ],
    icon: Users,
    color: 'bg-purple-100 text-purple-800',
    tags: ['Comparison', 'Microsoft 365', 'ChatGPT', 'Productivity'],
    date: '2024-12-05',
    author: 'ElevateCopilot Editorial Team'
  },
  {
    slug: 'ai-career-earnings',
    title: 'AI at Work: How Employees Are Earning More by Using It Effectively',
    summary: 'Employees who adopt AI tools like Copilot are saving time, boosting their productivity, and increasing their earning potential. Studies show AI users advance faster and earn more.',
    bullets: [
      'LinkedIn Work Trend Index (2024): Employees who use AI daily are twice as likely to report career advancement and improved earning potential.',
      'Harvard Business Review (2024): Early adopters of AI enjoy a productivity and promotion premium.',
      'World Economic Forum (2023): By 2027, 44% of workers\' skills will be disrupted; those leveraging AI will benefit financially.',
      'Employees using AI shift time from repetitive tasks to higher-value, revenue-driving work.'
    ],
    sources: [
      {
        url: 'https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work',
        title: 'Microsoft Work Trend Index: Copilot\'s Earliest Users'
      },
      {
        url: 'https://hbr.org/2024/02/research-the-potential-productivity-gains-from-generative-ai',
        title: 'Harvard Business Review: Research on Generative AI Productivity Gains'
      },
      {
        url: 'https://www.weforum.org/reports/future-of-jobs-report-2023',
        title: 'World Economic Forum: Future of Jobs Report 2023'
      }
    ],
    icon: TrendingUp,
    color: 'bg-green-100 text-green-800',
    tags: ['AI Adoption', 'Career Growth', 'Productivity', 'Microsoft Copilot'],
    date: '2024-11-28',
    author: 'ElevateCopilot Editorial Team'
  },
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
    color: 'bg-blue-100 text-blue-800',
    tags: ['Time Savings', 'Productivity', 'Research', 'Microsoft Copilot'],
    date: '2024-11-20',
    author: 'ElevateCopilot Editorial Team'
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
    color: 'bg-green-100 text-green-800',
    tags: ['ROI', 'Leadership', 'Business Case', 'Microsoft Copilot'],
    date: '2024-11-15',
    author: 'ElevateCopilot Editorial Team'
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
    color: 'bg-purple-100 text-purple-800',
    tags: ['User Experience', 'Adoption', 'Productivity', 'Microsoft Copilot'],
    date: '2024-11-08',
    author: 'ElevateCopilot Editorial Team'
  }
]

// Get all unique tags
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesTag = selectedTag === '' || post.tags.includes(selectedTag)
      
      return matchesSearch && matchesTag
    })
  }, [searchTerm, selectedTag])

  // Get latest posts for sidebar
  const latestPosts = blogPosts.slice(0, 6)
  
  // Get popular posts (showing different posts than latest)
  const popularPosts = blogPosts.slice(1, 7)

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? '' : tag)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTag('')
  }

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

      {/* Blog Content - Two Column Layout */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2">
              {/* Search and Filter Results */}
              {(searchTerm || selectedTag) && (
                <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-primary">
                      Search Results
                      {searchTerm && (
                        <span className="text-muted font-normal ml-2">
                          for "{searchTerm}"
                        </span>
                      )}
                      {selectedTag && (
                        <span className="text-muted font-normal ml-2">
                          in "{selectedTag}"
                        </span>
                      )}
                    </h3>
                    <button
                      onClick={clearFilters}
                      className="text-accent hover:text-accent/80 text-sm font-medium"
                    >
                      Clear Filters
                    </button>
                  </div>
                  <p className="text-muted">
                    Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}

              <div className="space-y-12">
                {filteredPosts.map((post, index) => (
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

                    {/* Post Meta */}
                    <div className="flex items-center space-x-4 text-sm text-muted mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {post.date}
                      </div>
                    </div>

                    {/* Post Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 font-playfair">
                      {post.title}
                    </h2>

                    {/* Post Summary */}
                    <p className="text-lg text-muted mb-6 leading-relaxed">
                      {post.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

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

                {filteredPosts.length === 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-primary mb-2">No articles found</h3>
                    <p className="text-muted mb-6">
                      Try adjusting your search terms or clearing the filters
                    </p>
                    <button
                      onClick={clearFilters}
                      className="btn-primary px-6 py-2"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Search */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search Articles
                  </h3>
                  <input
                    type="text"
                    placeholder="Search insights..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                {/* Tags */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 12).map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-colors ${
                          selectedTag === tag 
                            ? 'bg-accent text-white' 
                            : 'bg-accent/10 text-accent hover:bg-accent/20'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Latest Posts */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Latest</h3>
                  <div className="space-y-4">
                    {latestPosts.map((post, index) => (
                      <div key={post.slug} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <h4 className="font-medium text-primary text-sm mb-2 line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-muted">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Posts */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">Popular</h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <div key={post.slug} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <h4 className="font-medium text-primary text-sm mb-2 line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-muted">
                          <Tag className="h-3 w-3 mr-1" />
                          {post.tags[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
      </section>
    </div>
  )
}
