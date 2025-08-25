-- Fix: Ensure one unique referral code per email address
-- Run this in your Supabase SQL Editor

-- Update the create_referral_code_by_email function to check for existing codes
create or replace function public.create_referral_code_by_email(p_email text, p_full_name text default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare 
  v_owner uuid; 
  v_existing_code text;
  c text;
begin
  -- Get or create user
  v_owner := public.upsert_user_by_email(p_email, p_full_name);
  
  -- Check if user already has an active referral code
  select code into v_existing_code 
  from public.referral_codes 
  where owner_id = v_owner and active = true 
  limit 1;
  
  -- If user already has a code, return it
  if v_existing_code is not null then
    return v_existing_code;
  end if;
  
  -- Generate new unique code only if user doesn't have one
  loop
    c := public.gen_referral_code();
    exit when not exists (select 1 from public.referral_codes where code=c);
  end loop;
  
  -- Insert the new referral code
  insert into public.referral_codes(code, owner_id) values (c, v_owner);
  
  return c;
end $$;

-- Test the updated function
-- Test 1: Create first code for an email
select public.create_referral_code_by_email('test@example.com', 'Test User') as first_code;

-- Test 2: Try to create another code for the same email (should return existing code)
select public.create_referral_code_by_email('test@example.com', 'Test User') as second_code;

-- Test 3: Create code for different email
select public.create_referral_code_by_email('different@example.com', 'Different User') as different_code;

-- Verify the results
select 
  u.email,
  u.full_name,
  r.code,
  r.active,
  r.created_at
from public.users u
left join public.referral_codes r on r.owner_id = u.id
where u.email in ('test@example.com', 'different@example.com')
order by u.email, r.created_at;
