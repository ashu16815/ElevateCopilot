import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const { email, full_name } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'email required' }, { status: 400 });
    }

    const { data, error } = await supabase.rpc('create_referral_code_by_email', { 
      p_email: email, 
      p_full_name: full_name || null 
    });
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ code: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
