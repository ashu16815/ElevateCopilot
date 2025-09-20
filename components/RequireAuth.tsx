'use client';

import { useAuth } from '@/components/AuthProvider';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="rounded-2xl border p-6 bg-white shadow-sm">
          <h3 className="text-xl font-semibold">Sign in required</h3>
          <p className="mt-2 text-gray-600">
            Please sign in to continue. This helps us track impact and provide personalized content.
          </p>
          <a 
            href="/auth" 
            className="mt-3 inline-block ec-btn ec-btn-primary"
          >
            Sign in
          </a>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}