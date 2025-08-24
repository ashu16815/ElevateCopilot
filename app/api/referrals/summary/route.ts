import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'email required' }, { status: 400 });
    }

    const { data: codes, error: e1 } = await supabase
      .from('v_user_codes')
      .select('*')
      .eq('email', email);
    
    const { data: rewards, error: e2 } = await supabase
      .from('v_user_rewards')
      .select('*')
      .eq('email', email)
      .single();

    if (e1) {
      return NextResponse.json({ error: e1.message }, { status: 400 });
    }
    
    if (e2) {
      return NextResponse.json({ error: e2.message }, { status: 400 });
    }

    return NextResponse.json({ 
      codes, 
      total_rewards: rewards?.total_rewards || 0 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
