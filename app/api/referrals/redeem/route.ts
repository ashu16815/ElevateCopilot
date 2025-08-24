import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const { buyer_email, course_slug, list_price_usd, referral_code } = await req.json();
    
    if (!buyer_email || !course_slug || !list_price_usd) {
      return NextResponse.json({ 
        error: 'buyer_email, course_slug, list_price_usd required' 
      }, { status: 400 });
    }

    const { data, error } = await supabase.rpc('redeem_referral', {
      p_buyer_email: buyer_email,
      p_course_slug: course_slug,
      p_list_price: list_price_usd,
      p_referral_code: referral_code || null
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ purchase_id: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
