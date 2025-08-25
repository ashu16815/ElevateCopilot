import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const { referral_code } = await req.json();
    
    if (!referral_code || referral_code.trim() === '') {
      return NextResponse.json({ 
        valid: false, 
        message: 'Referral code is required' 
      });
    }

    // Use the validation function for better security
    const { data, error } = await supabase.rpc('validate_referral_code', {
      p_code: referral_code.trim()
    });

    if (error) {
      return NextResponse.json({ 
        valid: false, 
        message: 'Error validating referral code' 
      });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json({ 
      valid: false, 
      message: 'Error validating referral code' 
    });
  }
}
