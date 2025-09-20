'use client';

import { useEffect, useState } from 'react';
import { TARGET } from '@/lib/site.config';
import { supabase } from '@/lib/supabaseClient';

export default function Impact() {
  const [trained, setTrained] = useState<number>(0);

  useEffect(() => {
    async function load() {
      // Count distinct users who have registered for any session
      const { data, error, count } = await supabase
        .from('session_registrations')
        .select('user_id', { count: 'exact', head: true });
      
      if (!error && typeof count === 'number') {
        setTrained(count);
      }
    }
    load();
  }, []);

  const pct = Math.min(100, Math.round(((trained || 0) / TARGET) * 100));

  const milestones = [
    { year: '2024', title: 'Launch', desc: 'ElevateCopilot platform launched' },
    { year: '2025', title: '1,000 professionals', desc: 'Target: Train 1,000 professionals' },
    { year: 'Next', title: 'Scale to APAC', desc: 'Expand across Asia-Pacific region' }
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

  return (
    <main>
      {/* Hero Section */}
      <section className="ec-hero">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Our Impact</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Tracking the growth of AI literacy across New Zealand.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="ec-stat-num">{trained.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Professionals Trained</p>
            </div>
            <div>
              <p className="ec-stat-num">98%</p>
              <p className="text-sm text-gray-600">Satisfaction Rate</p>
            </div>
            <div>
              <p className="ec-stat-num">26 min</p>
              <p className="text-sm text-gray-600">Daily Productivity Gain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-12 bg-[var(--ec-neutral)]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-6">Progress to 1,000 Goal</h2>
          <div className="card p-6">
            <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-4 bg-amber-600 transition-all duration-1000"
                style={{ width: pct + '%' }}
              />
            </div>
            <p className="text-center mt-4 text-lg font-semibold">
              {trained.toLocaleString()} / {TARGET.toLocaleString()} professionals trained
            </p>
            <p className="text-center text-gray-600 mt-2">
              {pct}% complete
            </p>
            <p className="text-xs text-gray-500 mt-1 text-center">
              This counter increases automatically as people register for a session.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12">Milestones</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  {milestone.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-[var(--ec-neutral)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12">What learners say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}