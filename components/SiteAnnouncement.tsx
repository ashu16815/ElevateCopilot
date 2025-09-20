import { IS_MISSION } from '@/lib/mode';

export default function SiteAnnouncement() {
  if (!IS_MISSION) return null;
  
  return (
    <div className="w-full bg-amber-50 text-amber-900 text-sm py-2 text-center px-3">
      ElevateCopilot is now an open mission for AI literacy in New Zealand. Fortnightly sessions are free for everyone. 
      <a href="/events" className="underline font-medium"> Join the next one</a>.
    </div>
  );
}
