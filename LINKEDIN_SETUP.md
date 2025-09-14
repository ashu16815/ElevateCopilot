# LinkedIn Insight Tag Setup

## Environment Configuration

Add the following environment variable to your `.env.local` file:

```bash
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=7932452
```

## Implementation Details

### Components Created
- `LinkedInInsight` - Loads LinkedIn tracking script on all pages
- `useLinkedInTrack` - Hook for firing custom conversion events

### Thank You Pages
- `/thank-you-kickstart` - Copilot Kickstart conversion tracking
- `/thank-you-bundle` - All 4 Courses + Badge conversion tracking  
- `/thank-you-contact` - Contact form lead tracking

### LinkedIn Campaign Manager Setup

1. **Verify Partner ID**: In LinkedIn Campaign Manager → Account Assets → Insight Tag, verify Partner ID 7932452 fires on your domain.

2. **Create Website Conversions** with URL contains rules:
   - **Copilot Kickstart Purchase** → `/thank-you-kickstart` → value $99
   - **All 4 Courses Bundle Purchase** → `/thank-you-bundle` → value $499
   - **Lead (Contact)** → `/thank-you-contact` → value $0 (or estimated lead value)

3. **Redirect checkout flows** to these thank-you URLs after successful payment or form submit.

4. **LinkedIn will show tag as 'Active'** once verified.

## Usage Example

```tsx
import { useLinkedInTrack } from '@/lib/useLinkedInTrack';

export default function BundleCTA() {
  const track = useLinkedInTrack();
  
  return (
    <a
      href="/checkout/bundle"
      onClick={() => track('bundle_cta_click')}
      className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700"
    >
      Get the Bundle — $499
    </a>
  );
}
```

## Acceptance Criteria ✅

- [x] LinkedIn Insight Tag loads on every page with Partner ID 7932452
- [x] Three thank-you pages exist and are noindexed
- [x] Conversion setup in Campaign Manager can map those URLs to specific course actions
- [x] Optional useLinkedInTrack helper can be used to fire custom events
