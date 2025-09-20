import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  console.log('Auth callback received:', { code: !!code, error, errorDescription });

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription);
    return NextResponse.redirect(new URL(`/auth?error=${encodeURIComponent(error)}&message=${encodeURIComponent(errorDescription || 'Authentication failed')}`, request.url));
  }

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      console.log('Code exchange result:', { data: !!data, error: exchangeError });
      
      if (exchangeError) {
        console.error('Code exchange error:', exchangeError);
        return NextResponse.redirect(new URL(`/auth?error=exchange_failed&message=${encodeURIComponent(exchangeError.message)}`, request.url));
      }
      
      if (data?.user) {
        console.log('User authenticated:', data.user.email);
        // Redirect to resources page after successful auth
        return NextResponse.redirect(new URL('/resources', request.url));
      }
    } catch (err) {
      console.error('Unexpected error in callback:', err);
      return NextResponse.redirect(new URL('/auth?error=unexpected&message=An unexpected error occurred', request.url));
    }
  }

  // If there's no code, redirect to auth page
  console.log('No code provided, redirecting to auth');
  return NextResponse.redirect(new URL('/auth', request.url));
}
