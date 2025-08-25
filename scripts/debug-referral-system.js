// Debug script for referral system
// Run this with: node scripts/debug-referral-system.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugReferralSystem() {
  console.log('🔍 Debugging ElevateCopilot Referral System...\n');

  try {
    // 1. Check connection
    console.log('1️⃣ Testing connection...');
    const { data: testData, error: testError } = await supabase
      .from('referral_codes')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.log('❌ Connection error:', testError.message);
      return;
    }
    console.log('✅ Connection successful\n');

    // 2. Check if tables exist and have data
    console.log('2️⃣ Checking database tables...');
    
    // Check users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5);
    
    if (usersError) {
      console.log('❌ Users table error:', usersError.message);
    } else {
      console.log(`✅ Users table: ${users?.length || 0} users found`);
      if (users && users.length > 0) {
        console.log('   Sample users:', users.map(u => ({ email: u.email, name: u.full_name })));
      }
    }

    // Check referral_codes table
    const { data: codes, error: codesError } = await supabase
      .from('referral_codes')
      .select('*')
      .limit(5);
    
    if (codesError) {
      console.log('❌ Referral codes table error:', codesError.message);
    } else {
      console.log(`✅ Referral codes table: ${codes?.length || 0} codes found`);
      if (codes && codes.length > 0) {
        console.log('   Sample codes:', codes.map(c => ({ code: c.code, active: c.active })));
      }
    }

    // 3. Test RPC functions
    console.log('\n3️⃣ Testing RPC functions...');
    
    // Test gen_referral_code
    const { data: genCode, error: genError } = await supabase.rpc('gen_referral_code');
    if (genError) {
      console.log('❌ gen_referral_code error:', genError.message);
    } else {
      console.log('✅ gen_referral_code working:', genCode);
    }

    // Test upsert_user_by_email
    const { data: userId, error: upsertError } = await supabase.rpc('upsert_user_by_email', {
      p_email: 'debug@example.com',
      p_full_name: 'Debug User'
    });
    if (upsertError) {
      console.log('❌ upsert_user_by_email error:', upsertError.message);
    } else {
      console.log('✅ upsert_user_by_email working:', userId);
    }

    // Test create_referral_code_by_email
    const { data: newCode, error: createError } = await supabase.rpc('create_referral_code_by_email', {
      p_email: 'debug@example.com',
      p_full_name: 'Debug User'
    });
    if (createError) {
      console.log('❌ create_referral_code_by_email error:', createError.message);
    } else {
      console.log('✅ create_referral_code_by_email working:', newCode);
    }

    // Test get_user_referral_code
    const { data: existingCode, error: getError } = await supabase.rpc('get_user_referral_code', {
      p_email: 'debug@example.com'
    });
    if (getError) {
      console.log('❌ get_user_referral_code error:', getError.message);
    } else {
      console.log('✅ get_user_referral_code working:', existingCode);
    }

    // Test validate_referral_code with the code we just created
    if (newCode) {
      const { data: validation, error: validateError } = await supabase.rpc('validate_referral_code', {
        p_code: newCode
      });
      if (validateError) {
        console.log('❌ validate_referral_code error:', validateError.message);
      } else {
        console.log('✅ validate_referral_code working:', validation);
      }
    }

    // 4. Check API endpoints
    console.log('\n4️⃣ Testing API endpoints...');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', 'http://localhost:3000/api/referrals/validate')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referral_code: newCode || 'EC-TEST123' })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ /api/referrals/validate working:', data);
      } else {
        console.log('❌ /api/referrals/validate error:', response.status, response.statusText);
      }
    } catch (apiError) {
      console.log('❌ API test failed:', apiError.message);
    }

    console.log('\n🎯 Debug complete!');

  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugReferralSystem();
