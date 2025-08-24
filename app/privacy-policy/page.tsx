import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, Building } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy — ElevateCopilot',
  description: 'Learn how ElevateCopilot collects, uses, and protects your data. Read about cookies, rights, retention, and security for our training and certification services.',
  keywords: ['privacy policy', 'data protection', 'cookies', 'GDPR', 'data rights', 'ElevateCopilot'],
}

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              How we collect, use, and protect your data
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Privacy Policy
                </h2>
                <p className="text-muted italic">
                  Last updated: August 25, 2025
                </p>
              </div>

              <p className="text-muted mb-8">
                ElevateCopilot ("ElevateCopilot," "we," "us," or "our") respects your privacy. This Privacy Policy explains what personal information we collect, how we use and share it, and the choices you have. It applies to www.elevatecopilot.com and any pages, forms, or services that link to this policy (collectively, the "Services").
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">1. Information We Collect</h3>
              <p className="text-muted mb-4">
                <strong>Information you provide:</strong> name, email, company, job title, registration details, survey responses, support messages.
              </p>
              <p className="text-muted mb-4">
                <strong>Automatically collected:</strong> pages visited, clicks, IP address, browser, device/OS, session duration, language, cookies.
              </p>
              <p className="text-muted mb-6">
                <strong>Third-party sources:</strong> payment processors (transaction metadata), email providers (delivery status), analytics providers (aggregated usage).
              </p>
              <p className="text-muted mb-8">
                We do <strong>not</strong> intentionally collect sensitive categories of data. Please avoid submitting them.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">2. How We Use Your Information</h3>
              <ul className="list-disc list-inside text-muted mb-4 space-y-2">
                <li>Provide training, certifications, and downloadable resources.</li>
                <li>Respond to inquiries and support requests.</li>
                <li>Send confirmations, reminders, and (if opted-in) newsletters and promotions.</li>
                <li>Improve site experience, measure engagement, and secure our Services.</li>
                <li>Fulfill legal and compliance obligations.</li>
              </ul>
              <p className="text-muted mb-8">
                <strong>Legal bases:</strong> consent, performance of contract, legitimate interests (e.g., training quality, security), and legal obligation.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">3. Sharing Information</h3>
              <p className="text-muted mb-4">
                We <strong>do not sell</strong> your personal data. We may share with:
              </p>
              <ul className="list-disc list-inside text-muted mb-4 space-y-2">
                <li><strong>Service providers:</strong> hosting, analytics, payment, and email delivery platforms.</li>
                <li><strong>Legal authorities:</strong> if required by law or to protect rights and safety.</li>
                <li><strong>Business transfers:</strong> in case of a merger, acquisition, or reorganization.</li>
              </ul>
              <p className="text-muted mb-8">
                All processors are contractually bound to handle data securely.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">4. Data Retention</h3>
              <p className="text-muted mb-4">
                We keep information only as long as necessary or legally required:
              </p>
              <ul className="list-disc list-inside text-muted mb-4 space-y-2">
                <li><strong>Training & course records:</strong> ~24 months from last activity.</li>
                <li><strong>Transaction records:</strong> up to 7 years for accounting.</li>
                <li><strong>Support requests:</strong> 12–24 months.</li>
              </ul>
              <p className="text-muted mb-8">
                We may anonymize data for analytics.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">5. Your Rights</h3>
              <p className="text-muted mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-muted mb-4 space-y-2">
                <li>Access, correct, or delete personal data.</li>
                <li>Restrict or object to processing.</li>
                <li>Port your data in a structured format.</li>
                <li>Withdraw consent to marketing.</li>
                <li>File a complaint with a regulator.</li>
              </ul>
              <p className="text-muted mb-8">
                To exercise rights, contact <strong>elevatecopilot@outlook.com</strong>. We will verify and respond in accordance with applicable law.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">6. Security</h3>
              <p className="text-muted mb-8">
                We apply technical and organizational measures such as encryption in transit, access controls, and regular monitoring. No system is 100% secure—users should also exercise care online.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">7. Cookies & Tracking</h3>
              <p className="text-muted mb-4">
                We may use cookies and local storage to:
              </p>
              <ul className="list-disc list-inside text-muted mb-4 space-y-2">
                <li><strong>Essential:</strong> site functionality and session integrity.</li>
                <li><strong>Analytics:</strong> usage insights to improve content.</li>
                <li><strong>Preferences:</strong> remember settings.</li>
              </ul>
              <p className="text-muted mb-8">
                You can disable cookies in your browser. Where required, we show a consent banner.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">8. International Transfers</h3>
              <p className="text-muted mb-8">
                As a New Zealand–based company, your data may be processed outside your country. Safeguards such as Standard Contractual Clauses and DPA agreements are applied.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">9. Children's Privacy</h3>
              <p className="text-muted mb-8">
                Our Services are not designed for children under 16. If you believe we have collected information from a child, contact us for deletion.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">10. External Links</h3>
              <p className="text-muted mb-8">
                We may link to external sites. We are not responsible for their privacy practices. Review their policies separately.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">11. Updates</h3>
              <p className="text-muted mb-8">
                We may update this Privacy Policy. A new "Last updated" date will appear at the top. Material changes will be highlighted.
              </p>

              <hr className="my-8 border-gray-200" />

              <h3 className="text-xl font-bold text-primary mb-4">12. Contact Us</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex items-center mb-3">
                  <Mail className="h-5 w-5 text-accent mr-3" />
                  <span className="font-semibold text-primary">Email:</span>
                  <span className="ml-2 text-accent">elevatecopilot@outlook.com</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-accent mr-3" />
                  <span className="font-semibold text-primary">Mailing:</span>
                  <span className="ml-2 text-muted">ElevateCopilot, Headquarters in New Zealand</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-800 text-sm italic">
                  This policy is for transparency and general information. It is not legal advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
