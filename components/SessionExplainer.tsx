export default function SessionExplainer() {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-center px-6">
        <div>
          <h2 className="text-2xl font-bold">What you'll get in our free sessions</h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
            <li>90 minutes · hands-on demos in Word, Excel, PowerPoint & Teams</li>
            <li>Practical prompts and checklists you can use the next day</li>
            <li>Open Q&A · no sales pitch</li>
            <li>Calendar invite + materials via email</li>
          </ul>
          <a href="/events" className="inline-block mt-5 ec-btn ec-btn-primary">
            Join the next free session
          </a>
        </div>
        <div className="rounded-xl border p-6 bg-white shadow-sm">
          <h3 className="font-semibold">Why we do this</h3>
          <p className="text-gray-700 mt-2">
            We're building AI literacy in New Zealand by making learning free, practical, and accessible. 
            The goal: train 1,000 professionals and help each pass skills to ten more.
          </p>
        </div>
      </div>
    </section>
  );
}
