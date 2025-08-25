// Test Supabase Connection
// Run this script to verify your Supabase setup is working

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase Connection...\n');
  
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('📋 Environment Variables:');
  console.log(`   URL: ${supabaseUrl ? '✅ Found' : '❌ Missing'}`);
  console.log(`   Key: ${supabaseKey ? '✅ Found' : '❌ Missing'}`);
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('\n❌ Missing environment variables. Please check your .env.local file.');
    return;
  }
  
  try {
    // Create Supabase client
    console.log('\n🔌 Creating Supabase client...');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test basic connection
    console.log('🌐 Testing basic connection...');
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('✅ Connection successful! (Table access denied - expected for secure setup)');
      } else {
        console.log(`❌ Connection error: ${error.message}`);
        return;
      }
    } else {
      console.log('✅ Connection successful!');
    }
    
    // Test RPC function access
    console.log('\n🧪 Testing RPC function access...');
    try {
      const { data: funcTest, error: funcError } = await supabase.rpc('gen_referral_code');
      
      if (funcError) {
        if (funcError.message.includes('function "gen_referral_code" does not exist')) {
          console.log('⚠️  RPC functions not yet created. Run the SQL setup first.');
        } else {
          console.log(`❌ RPC test error: ${funcError.message}`);
        }
      } else {
        console.log(`✅ RPC test successful! Generated code: ${funcTest}`);
      }
    } catch (rpcError) {
      console.log(`❌ RPC test failed: ${rpcError.message}`);
    }
    
    // Test table structure
    console.log('\n📊 Testing table structure...');
    try {
      const { data: tables, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .in('table_name', ['users', 'referral_codes', 'purchases', 'payouts']);
      
      if (tableError) {
        console.log(`❌ Table check error: ${tableError.message}`);
      } else if (tables && tables.length > 0) {
        console.log('✅ Required tables found:');
        tables.forEach(table => console.log(`   - ${table.table_name}`));
      } else {
        console.log('⚠️  Required tables not found. Run the SQL setup first.');
      }
    } catch (tableError) {
      console.log(`❌ Table check failed: ${tableError.message}`);
    }
    
  } catch (error) {
    console.log(`❌ Connection failed: ${error.message}`);
  }
  
  console.log('\n🏁 Test completed!');
}

// Run the test
testSupabaseConnection().catch(console.error);
