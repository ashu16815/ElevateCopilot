import { IS_MISSION } from '@/lib/mode';

export default function PaidGuard({ children }: { children: React.ReactNode }) {
  if (IS_MISSION) return null;
  return <>{children}</>;
}
