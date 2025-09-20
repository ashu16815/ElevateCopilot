'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Blog() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const posts = [
    {
      title: "5 Excel AI Prompts That Save 2 Hours Daily",
      excerpt: "Transform your spreadsheet work with these proven AI prompts that automate repetitive tasks and generate insights.",
      date: "2024-12-15",
      readTime: "5 min read",
      category: "Excel",
      slug: "excel-ai-prompts-save-time"
    },
    {
      title: "Building AI-Safe Workflows in Teams",
      excerpt: "How to use Microsoft Copilot responsibly while protecting sensitive company data and maintaining productivity.",
      date: "2024-12-10",
      readTime: "7 min read",
      category: "Teams",
      slug: "ai-safe-workflows-teams"
    },
    {
      title: "From Meeting Notes to Action Items in 3 Steps",
      excerpt: "A practical guide to using AI for meeting transcription, summarization, and follow-up task generation.",
      date: "2024-12-05",
      readTime: "4 min read",
      category: "Productivity",
      slug: "meeting-notes-action-items-ai"
    },
    {
      title: "New Zealand's AI Readiness: A 2024 Report",
      excerpt: "Insights from our community survey on AI adoption, challenges, and opportunities across NZ industries.",
      date: "2024-11-28",
      readTime: "10 min read",
      category: "Research",
      slug: "nz-ai-readiness-2024-report"
    },
    {
      title: "PowerPoint Super Prompts for Business Presentations",
      excerpt: "Create compelling presentations faster with AI. Templates and prompts for executive summaries, charts, and storytelling.",
      date: "2024-11-20",
      readTime: "6 min read",
      category: "PowerPoint",
      slug: "powerpoint-super-prompts-business"
    },
    {
      title: "The ROI of AI Training: A Case Study",
      excerpt: "How one Auckland company saved 40 hours per week after implementing AI literacy training across their team.",
      date: "2024-11-15",
      readTime: "8 min read",
      category: "Case Study",
      slug: "roi-ai-training-case-study"
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        console.error('Subscription error:', error);
        alert('Subscription failed. Please try again.');
      } else {
        setSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="ec-hero">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Insights & Blog</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Practical AI, productivity hacks, and stories from the community.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article key={index} className="ec-card p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-semibold mb-3 hover:text-amber-600 transition-colors">
                  <a href={`/blog/${post.slug}`} className="ec-link">
                    {post.title}
                  </a>
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-NZ', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </time>
                  <a 
                    href={`/blog/${post.slug}`} 
                    className="ec-link font-medium hover:text-amber-700"
                  >
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-[var(--ec-neutral)]">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Get the latest AI insights, productivity tips, and community stories delivered to your inbox.
          </p>
          
          {subscribed ? (
            <div className="ec-card p-6 max-w-md mx-auto">
              <div className="text-green-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">You're subscribed!</h3>
              <p className="text-sm text-gray-600">Thanks for joining our community. Check your email for confirmation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
              <button 
                type="submit"
                disabled={loading}
                className="ec-btn ec-btn-primary disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
          
          <p className="text-xs text-gray-500 mt-3">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>
    </main>
  );
}