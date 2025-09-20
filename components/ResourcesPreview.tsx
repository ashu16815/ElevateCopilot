export default function ResourcesPreview() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-2xl font-bold">Start with Resources</h2>
        <p className="text-gray-600 mt-2">
          Download templates, checklists, and case studies to try AI at work.
        </p>
        <a 
          href="/resources" 
          className="mt-4 inline-block ec-btn ec-btn-primary"
        >
          Open Resource Library
        </a>
      </div>
    </section>
  );
}

