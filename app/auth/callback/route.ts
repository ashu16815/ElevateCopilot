import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Redirect to resources page after successful auth
      return NextResponse.redirect(new URL('/resources', request.url));
    }
  }

  // If there's an error or no code, redirect to auth page
  return NextResponse.redirect(new URL('/auth', request.url));
}
