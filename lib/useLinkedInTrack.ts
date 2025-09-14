import { useCallback } from 'react';

export function useLinkedInTrack() {
  return useCallback((conversionName?: string) => {
    if (typeof window !== 'undefined' && typeof (window as any).lintrk === 'function') {
      try {
        (window as any).lintrk('track', { conversion_id: conversionName || 'generic_click' });
      } catch {}
    }
  }, []);
}
