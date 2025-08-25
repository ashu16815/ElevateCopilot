-- Function to get existing referral code for a user
-- Run this in your Supabase SQL Editor

-- Function to get user's existing referral code
create or replace function public.get_user_referral_code(p_email text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare 
  v_code text;
begin
  -- Get the user's active referral code
  select r.code into v_code
  from public.users u
  join public.referral_codes r on r.owner_id = u.id
  where lower(u.email) = lower(p_email) and r.active = true
  limit 1;
  
  return v_code;
end $$;

-- Grant execute permission
grant execute on function public.get_user_referral_code(text) to anon;

-- Test the function
-- Test 1: Get code for existing user
select public.get_user_referral_code('test@example.com') as existing_code;

-- Test 2: Get code for non-existent user (should return null)
select public.get_user_referral_code('nonexistent@example.com') as non_existent_code;

-- Test 3: Get code for user without code (should return null)
select public.get_user_referral_code('newuser@example.com') as new_user_code;
