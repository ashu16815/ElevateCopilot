import { createClient } from '@supabase/supabase-js';

let supabase: any = null;

try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  } else {
    console.warn('Supabase environment variables not found.');
  }
} catch (error) {
  console.warn('Failed to initialize Supabase client:', error);
}

export { supabase };
