import { TARGET, MARKET } from '@/lib/site.config';
import StatsBand from '@/components/StatsBand';
import SessionExplainer from '@/components/SessionExplainer';
import ResourcesPreview from '@/components/ResourcesPreview';

export default function Home() {
  return (
    <main>
      <section className="ec-hero">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            AI Literacy for {MARKET} — Free & Practical
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Our mission: train {TARGET.toLocaleString()} professionals with practical, responsible AI skills — and help each pass it on to ten more.
          </p>
          <div className="mt-8">
            <a 
              className="ec-btn ec-btn-primary" 
              href="/events"
            >
              Join the next free session
            </a>
          </div>
        </div>
      </section>
      
      <StatsBand />
      <SessionExplainer />
      <ResourcesPreview />
    </main>
  );
}
