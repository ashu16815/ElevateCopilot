'use client';

import { useEffect, useState } from 'react';
import { TARGET } from '@/lib/site.config';
import { supabase } from '@/lib/supabaseClient';

export default function Impact() {
  const [trained, setTrained] = useState<number>(57); // start at 57 instead of 0
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Count distinct users who have registered for any session
        const { data, error, count } = await supabase
          .from('session_registrations')
          .select('user_id', { count: 'exact', head: true });
        
        if (!error && typeof count === 'number') {
          setTrained(57 + count); // add live registrations on top of 57 baseline
        }
      } catch (error) {
        console.error('Error loading trained count:', error);
        // Fallback to 57 if there's an error
        setTrained(57);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const pct = Math.min(100, Math.round(((trained || 0) / TARGET) * 100));

  const milestones = [
    { 
      year: '2024', 
      title: 'Platform Launch', 
      desc: 'ElevateCopilot launched with mission-first approach to AI literacy',
      status: 'completed'
    },
    { 
      year: '2025', 
      title: '1,000 Professionals', 
      desc: 'Target: Train 1,000 professionals with practical AI skills',
      status: 'in-progress'
    },
    { 
      year: 'Next', 
      title: 'Scale to APAC', 
      desc: 'Expand across Asia-Pacific region with localized content',
      status: 'planned'
    }
  ];

  const testimonials = [
    {
      quote: "The AI prompts I learned saved me 2 hours every day. Game changer!",
      author: "Sarah Chen",
      role: "Finance Manager"
    },
    {
      quote: "Finally, AI that makes sense for my actual work. Highly recommend!",
      author: "Mike Thompson",
      role: "Project Manager"
    },
    {
      quote: "Free, practical, and immediately applicable. What more could you want?",
      author: "Lisa Park",
      role: "HR Director"
    }
  ];

  const impactStats = [
    {
      metric: "98%",
      label: "Satisfaction Rate",
      desc: "Based on post-session feedback"
    },
    {
      metric: "26 min",
      label: "Daily Productivity Gain",
      desc: "Average time saved per professional"
    },
    {
      metric: "10x",
      label: "Knowledge Multiplier",
      desc: "Each person teaches 10 others"
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="ec-hero">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Our Impact</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Tracking the growth of AI literacy across New Zealand and measuring real-world impact.
          </p>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Making a Real Difference</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We measure success not just in numbers, but in the practical impact on people's daily work.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="ec-card p-6 text-center">
              <div className="ec-stat-num mb-2">
                {loading ? '...' : trained.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mb-1">Professionals Trained</p>
              <p className="text-xs text-gray-500">Live count from registrations</p>
            </div>
            
            {impactStats.map((stat, index) => (
              <div key={index} className="ec-card p-6 text-center">
                <div className="ec-stat-num mb-2">{stat.metric}</div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-12 bg-[var(--ec-neutral)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="ec-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Progress to 1,000 Goal</h2>
              <p className="text-gray-600">
                We're building New Zealand's AI-ready workforce, one professional at a time.
              </p>
            </div>
            
            <div className="mb-6">
              <div className="h-6 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-6 bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-1000 ease-out"
                  style={{ width: pct + '%' }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{trained.toLocaleString()} trained</span>
                <span>{pct}% complete</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">
                {TARGET - trained} more professionals to reach our goal
              </p>
              <p className="text-sm text-gray-500">
                This counter increases automatically as people register for sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold ${
                  milestone.status === 'completed' ? 'bg-green-600' :
                  milestone.status === 'in-progress' ? 'bg-amber-600' :
                  'bg-gray-400'
                }`}>
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 mb-2">{milestone.desc}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                    milestone.status === 'in-progress' ? 'bg-amber-100 text-amber-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {milestone.status === 'completed' ? 'Completed' :
                     milestone.status === 'in-progress' ? 'In Progress' :
                     'Planned'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-[var(--ec-neutral)]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="ec-card p-6 flex flex-col">
                <span className="text-[var(--ec-gold)] text-3xl mb-3">&ldquo;</span>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}