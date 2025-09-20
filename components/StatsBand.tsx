export default function StatsBand() {
  return (
    <section className="bg-[var(--ec-neutral)] py-10">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8 text-center px-6">
        {/* Removed static trained count per request */}
        <div>
          <p className="ec-stat-num">98%</p>
          <p className="text-sm text-gray-600">Satisfaction Rate</p>
        </div>
        <div>
          <p className="ec-stat-num">26 min</p>
          <p className="text-sm text-gray-600">Daily Productivity Gain</p>
        </div>
      </div>
    </section>
  );
}

