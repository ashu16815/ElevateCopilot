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

    // First, check if user already has a referral code
    const { data: existingCode, error: checkError } = await supabase.rpc('get_user_referral_code', { 
      p_email: email 
    });
    
    if (checkError) {
      console.error('Check existing code error:', checkError);
      return NextResponse.json({ error: checkError.message }, { status: 400 });
    }

    // If user already has a code, return it
    if (existingCode) {
      return NextResponse.json({ 
        code: existingCode, 
        message: 'Existing referral code retrieved',
        isExisting: true 
      });
    }

    // If no existing code, create a new one
    const { data, error } = await supabase.rpc('create_referral_code_by_email', { 
      p_email: email, 
      p_full_name: full_name || null 
    });
    
    if (error) {
      console.error('Create code error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      code: data, 
      message: 'New referral code created',
      isExisting: false 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
