// Debug Supabase Setup
// This script will help identify what's working and what's not

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function debugSupabase() {
  console.log('🔍 Debugging Supabase Setup...\n');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Environment variables missing');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  console.log('1️⃣ Testing RPC Functions...');
  
  // Test gen_referral_code function
  try {
    const { data: code, error } = await supabase.rpc('gen_referral_code');
    if (error) {
      console.log(`   ❌ gen_referral_code: ${error.message}`);
    } else {
      console.log(`   ✅ gen_referral_code: ${code}`);
    }
  } catch (e) {
    console.log(`   ❌ gen_referral_code: ${e.message}`);
  }
  
  // Test upsert_user_by_email function
  try {
    const { data: userId, error } = await supabase.rpc('upsert_user_by_email', {
      p_email: 'test@example.com',
      p_full_name: 'Test User'
    });
    if (error) {
      console.log(`   ❌ upsert_user_by_email: ${error.message}`);
    } else {
      console.log(`   ✅ upsert_user_by_email: ${userId}`);
    }
  } catch (e) {
    console.log(`   ❌ upsert_user_by_email: ${e.message}`);
  }
  
  // Test create_referral_code_by_email function
  try {
    const { data: refCode, error } = await supabase.rpc('create_referral_code_by_email', {
      p_email: 'test2@example.com',
      p_full_name: 'Test User 2'
    });
    if (error) {
      console.log(`   ❌ create_referral_code_by_email: ${error.message}`);
    } else {
      console.log(`   ✅ create_referral_code_by_email: ${refCode}`);
    }
  } catch (e) {
    console.log(`   ❌ create_referral_code_by_email: ${e.message}`);
  }
  
  console.log('\n2️⃣ Testing Table Access...');
  
  // Test direct table access (should fail due to RLS)
  try {
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('   ✅ users table: Access denied (RLS working correctly)');
      } else {
        console.log(`   ❌ users table: ${error.message}`);
      }
    } else {
      console.log('   ⚠️  users table: Access allowed (RLS might not be working)');
    }
  } catch (e) {
    console.log(`   ❌ users table: ${e.message}`);
  }
  
  // Test views
  try {
    const { data, error } = await supabase.from('v_user_codes').select('*').limit(1);
    if (error) {
      console.log(`   ❌ v_user_codes view: ${error.message}`);
    } else {
      console.log('   ✅ v_user_codes view: Access allowed');
    }
  } catch (e) {
    console.log(`   ❌ v_user_codes view: ${e.message}`);
  }
  
  console.log('\n3️⃣ Testing API Endpoints...');
  
  // Test the create referral API endpoint
  try {
    const response = await fetch('http://localhost:3000/api/referrals/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'apitest@example.com',
        full_name: 'API Test User'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ /api/referrals/create: ${data.code}`);
    } else {
      const error = await response.json();
      console.log(`   ❌ /api/referrals/create: ${error.error}`);
    }
  } catch (e) {
    console.log(`   ❌ /api/referrals/create: ${e.message}`);
  }
  
  console.log('\n4️⃣ Checking Database Schema...');
  
  // Check if tables exist
  try {
    const { data: tables, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['users', 'referral_codes', 'purchases', 'payouts']);
    
    if (error) {
      console.log(`   ❌ Schema check: ${error.message}`);
    } else if (tables && tables.length > 0) {
      console.log('   ✅ Tables found:');
      tables.forEach(table => console.log(`      - ${table.table_name}`));
    } else {
      console.log('   ❌ No tables found');
    }
  } catch (e) {
    console.log(`   ❌ Schema check: ${e.message}`);
  }
  
  // Check if functions exist
  try {
    const { data: functions, error } = await supabase
      .from('information_schema.routines')
      .select('routine_name')
      .eq('routine_schema', 'public')
      .in('routine_name', ['gen_referral_code', 'upsert_user_by_email', 'create_referral_code_by_email', 'redeem_referral']);
    
    if (error) {
      console.log(`   ❌ Function check: ${error.message}`);
    } else if (functions && functions.length > 0) {
      console.log('   ✅ Functions found:');
      functions.forEach(func => console.log(`      - ${func.routine_name}`));
    } else {
      console.log('   ❌ No functions found');
    }
  } catch (e) {
    console.log(`   ❌ Function check: ${e.message}`);
  }
  
  console.log('\n🏁 Debug completed!');
}

debugSupabase().catch(console.error);
