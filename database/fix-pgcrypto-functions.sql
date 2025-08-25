-- Fix for pgcrypto functions using gen_random_uuid instead of gen_random_bytes
-- Run this in your Supabase SQL Editor

-- Fix 1: Update gen_referral_code function to use gen_random_uuid
create or replace function public.gen_referral_code()
returns text as $$ 
  select 'EC-' || substr(encode(sha256(gen_random_uuid()::text::bytea), 'hex'),1,6); 
$$ language sql stable;

-- Fix 2: Update create_referral_code_by_email function
create or replace function public.create_referral_code_by_email(p_email text, p_full_name text default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare 
  v_owner uuid; 
  c text;
begin
  -- Get or create user
  v_owner := public.upsert_user_by_email(p_email, p_full_name);
  
  -- Generate unique code
  loop
    c := public.gen_referral_code();
    exit when not exists (select 1 from public.referral_codes where code=c);
  end loop;
  
  -- Insert the referral code
  insert into public.referral_codes(code, owner_id) values (c, v_owner);
  
  return c;
end $$;

-- Fix 3: Test the functions
-- Test gen_referral_code
select public.gen_referral_code() as test_code;

-- Test create_referral_code_by_email
select public.create_referral_code_by_email('test@example.com', 'Test User') as test_referral_code;
