'use client';

import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    referral_code: ''
  });
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    setMsg('Thank you for your message! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', message: '', referral_code: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="ec-hero">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold">Contact Us</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            We'd love to hear from you. Get in touch today.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6 text-[var(--ec-text)]">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--ec-text)] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--ec-gold)]"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--ec-text)] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--ec-gold)]"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--ec-text)] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--ec-gold)]"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <div>
                  <label htmlFor="referral_code" className="block text-sm font-medium text-[var(--ec-text)] mb-2">
                    Referral Code (optional)
                  </label>
                  <input
                    type="text"
                    id="referral_code"
                    name="referral_code"
                    value={form.referral_code}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--ec-gold)]"
                    placeholder="If someone referred you, enter their code here"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full ec-btn ec-btn-primary"
                >
                  Send Message
                </button>

                {msg && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">{msg}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-[var(--ec-text)]">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[var(--ec-gold)] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      📧
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--ec-text)]">Email</h3>
                      <p className="text-gray-700">
                        <a href="mailto:elevatecopilot@outlook.com" className="text-[var(--ec-text)] hover:text-[var(--ec-gold)]">
                          elevatecopilot@outlook.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[var(--ec-gold)] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--ec-text)]">Headquarters</h3>
                      <p className="text-[var(--ec-text)]">Headquartered in New Zealand</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[var(--ec-gold)] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      ⏰
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--ec-text)]">Response Time</h3>
                      <p className="text-[var(--ec-text)]">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--ec-text)]">Partnership Opportunities</h3>
                <p className="text-gray-700 mb-4">
                  Interested in bringing AI literacy training to your organization? We offer custom programs for teams and companies.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Corporate training programs</li>
                  <li>• Custom workshop development</li>
                  <li>• Executive AI strategy sessions</li>
                  <li>• Community partnership opportunities</li>
                </ul>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4 text-[var(--ec-text)]">Media & Press</h3>
                <p className="text-gray-700 mb-4">
                  For media inquiries, please contact us with "Media Inquiry" in the subject line.
                </p>
                <p className="text-sm text-gray-600">
                  We're happy to discuss our mission, impact, and vision for AI literacy in New Zealand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}