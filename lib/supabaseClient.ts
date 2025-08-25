import { createClient } from '@supabase/supabase-js';

let supabase: any = null;

try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
} catch (error) {
  // Fail silently in production UI; avoid scary banner
  console.warn('Supabase env not found.');
}

export { supabase };
