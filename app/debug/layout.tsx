import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Debug Tools - ElevateCopilot',
  description: 'Debug tools for LinkedIn Insight Tag and conversion tracking',
};

export default function DebugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
