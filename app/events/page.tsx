import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Sessions (Free, Fortnightly) - ElevateCopilot',
  description: 'Join our free 90-minute live session every second week. Learn practical AI, see M365 Copilot demos, ask questions, and take away templates.',
}

export default function EventsPage() {
  const copy = `Join our free 90-minute live session (every second week, NZT). Learn practical AI, see M365 Copilot demos, ask questions, and take away templates. No sales pitch.`;
  const upcoming = ['2025-09-20', '2025-10-04', '2025-10-18', '2025-11-01'];

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Live Sessions (Free, Fortnightly)</h1>
      <p className="mt-2 text-gray-600 mb-6">{copy}</p>
      
      <div className="mt-6 rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Upcoming dates (NZT)</h2>
        <ul className="mt-3 space-y-2">
          {upcoming.map((date) => (
            <li key={date} className="flex items-center justify-between">
              <span className="font-medium">
                {new Date(date).toLocaleDateString('en-NZ', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <a 
                className="px-3 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                href={`/events/register?date=${date}`}
              >
                Register Free
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          Can't see your date? <a className="text-blue-600 underline" href="/contact">Contact us</a> and we'll notify you for the next cohort.
        </p>
      </div>
      
      <div className="mt-8 rounded-2xl border p-6 bg-white">
        <h2 className="text-xl font-semibold mb-3">What you'll learn</h2>
        <ul className="mt-3 list-disc pl-5 space-y-1">
          <li>AI fundamentals: what it is, where it helps, where it doesn't</li>
          <li>Copilot in Word, Excel, PowerPoint, Teams — live demos</li>
          <li>Prompting patterns for business-ready outcomes</li>
          <li>Risk, privacy, and governance basics</li>
          <li>Templates and checklists to take back to your team</li>
        </ul>
      </div>
    </div>
  )
}
