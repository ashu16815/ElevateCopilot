-- Update permissions for referral code validation
-- Run this in your Supabase SQL Editor

-- Grant select access to referral_codes for validation (anon users can check if codes exist)
grant select on table public.referral_codes to anon;

-- Create a view for public referral code validation (only shows active codes)
create or replace view public.v_public_referral_codes as
select 
  r.code,
  r.active,
  u.email as referrer_email,
  u.full_name as referrer_name
from public.referral_codes r
join public.users u on r.owner_id = u.id
where r.active = true;

-- Grant access to the public view
grant select on view public.v_public_referral_codes to anon;

-- Update the validation function to use the view for better security
create or replace function public.validate_referral_code(p_code text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_result json;
begin
  if p_code is null or p_code = '' then
    return json_build_object(
      'valid', false,
      'message', 'Referral code is required'
    );
  end if;

  select json_build_object(
    'valid', true,
    'message', 'Valid referral code',
    'code', code,
    'referrer_email', referrer_email,
    'referrer_name', referrer_name
  ) into v_result
  from public.v_public_referral_codes
  where code = p_code
  limit 1;

  if v_result is null then
    return json_build_object(
      'valid', false,
      'message', 'Invalid or inactive referral code'
    );
  end if;

  return v_result;
end $$;

-- Grant execute permission
grant execute on function public.validate_referral_code(text) to anon;

-- Test the validation function
select public.validate_referral_code('EC-123456') as test_invalid;
select public.validate_referral_code('') as test_empty;
