-- ===== ElevateCopilot Referral System: Apply All Fixes =====
-- Run this complete SQL in your Supabase SQL Editor (project: vpxfryjezpkehjfspsvu)
-- This will fix the referral code generation to ensure one unique code per email

-- 1) EXTENSIONS (if not already created)
create extension if not exists pgcrypto;

-- 2) USERS TABLE (if not already created)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  created_at timestamptz not null default now()
);
create unique index if not exists users_email_lower_uniq on public.users (lower(email));

-- 3) REFERRAL CODES TABLE (if not already created)
create table if not exists public.referral_codes (
  code text primary key,
  owner_id uuid not null references public.users(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_referral_codes_owner on public.referral_codes(owner_id);

-- 4) PURCHASES TABLE (if not already created)
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  buyer_email text not null,
  course_slug text not null,
  list_price_usd numeric(10,2) not null,
  discount_usd numeric(10,2) not null default 0,
  amount_paid_usd numeric(10,2) not null,
  referral_code text references public.referral_codes(code),
  referrer_reward_usd numeric(10,2) not null default 0,
  status text not null default 'recorded',
  meta jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_purchases_refcode on public.purchases(referral_code);

-- 5) PAYOUTS TABLE (if not already created)
create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.users(id) on delete cascade,
  purchase_id uuid not null references public.purchases(id) on delete cascade,
  amount_usd numeric(10,2) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index if not exists idx_payouts_referrer on public.payouts(referrer_id);

-- 6) ROW LEVEL SECURITY (RLS)
alter table public.users enable row level security;
alter table public.referral_codes enable row level security;
alter table public.purchases enable row level security;
alter table public.payouts enable row level security;

-- Keep tables private by default (we'll expose via RPCs/views)
revoke all on table public.users from anon;
revoke all on table public.referral_codes from anon;
revoke all on table public.purchases from anon;
revoke all on table public.payouts from anon;

-- 7) HELPER FUNCTIONS

-- Generate unique referral codes (EC-XXXXXX format)
create or replace function public.gen_referral_code()
returns text as $$ 
  select 'EC-' || substr(encode(sha256(gen_random_uuid()::text::bytea), 'hex'),1,6); 
$$ language sql stable;

-- Upsert user by email (create if new, update if exists)
create or replace function public.upsert_user_by_email(p_email text, p_full_name text default null)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare 
  v_id uuid; 
  v_email text := trim(p_email);
begin
  if v_email is null or v_email = '' then
    raise exception 'Email required';
  end if;
  
  select id into v_id from public.users where lower(email)=lower(v_email) limit 1;
  
  if v_id is null then
    insert into public.users(email, full_name) values (v_email, p_full_name) returning id into v_id;
  elsif p_full_name is not null then
    update public.users set full_name = coalesce(full_name, p_full_name) where id = v_id;
  end if;
  
  return v_id;
end $$;
grant execute on function public.upsert_user_by_email(text, text) to anon;

-- 8) CORE REFERRAL FUNCTIONS

-- Create referral code by email (FIXED: checks for existing codes first)
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
grant execute on function public.create_referral_code_by_email(text, text) to anon;

-- Get existing referral code for a user (NEW FUNCTION)
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
grant execute on function public.get_user_referral_code(text) to anon;

-- Redeem referral code during purchase (10% off buyer + 10% reward of amount paid)
create or replace function public.redeem_referral(
  p_buyer_email text,
  p_course_slug text,
  p_list_price numeric,
  p_referral_code text
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_discount numeric := 0;
  v_paid     numeric := p_list_price;
  v_referrer uuid;
  v_reward   numeric := 0;
  v_purchase uuid;
  v_code_active boolean := false;
begin
  -- Validate input
  if p_list_price is null or p_list_price <= 0 then 
    raise exception 'Invalid list price'; 
  end if;

  -- Check referral code if provided
  if p_referral_code is not null and p_referral_code <> '' then
    select owner_id, active into v_referrer, v_code_active
      from public.referral_codes where code = p_referral_code limit 1;
      
    if v_referrer is not null and v_code_active then
      -- Calculate 10% discount and reward
      v_discount := round(p_list_price * 0.10, 2);
      v_paid     := round(p_list_price - v_discount, 2);
      v_reward   := round(v_paid * 0.10, 2);
    end if;
  end if;

  -- Record the purchase
  insert into public.purchases(
    buyer_email, course_slug, list_price_usd, discount_usd, amount_paid_usd, 
    referral_code, referrer_reward_usd, status
  ) values (
    trim(p_buyer_email), p_course_slug, p_list_price, v_discount, v_paid, 
    p_referral_code, v_reward, 'recorded'
  ) returning id into v_purchase;

  -- Create payout record if referral was used
  if v_referrer is not null and v_reward > 0 then
    insert into public.payouts(referrer_id, purchase_id, amount_usd) 
    values (v_referrer, v_purchase, v_reward);
  end if;

  return v_purchase;
end $$;
grant execute on function public.redeem_referral(text, text, numeric, text) to anon;

-- 9) VIEWS for user dashboards

-- View to fetch a user's referral codes
create or replace view public.v_user_codes as
select 
  u.email, 
  u.full_name, 
  r.code, 
  r.active, 
  r.created_at
from public.users u
left join public.referral_codes r on r.owner_id = u.id;

-- View to fetch a user's total rewards earned
create or replace view public.v_user_rewards as
select 
  u.email, 
  coalesce(sum(p.amount_usd),0) as total_rewards
from public.users u
left join public.payouts p on p.referrer_id = u.id
group by u.email;

-- 10) TEST THE SYSTEM

-- Test 1: Create first code for an email
select 'Test 1: Create first code' as test_description;
select public.create_referral_code_by_email('test@example.com', 'Test User') as first_code;

-- Test 2: Try to create another code for the same email (should return existing code)
select 'Test 2: Try to create another code for same email' as test_description;
select public.create_referral_code_by_email('test@example.com', 'Test User') as second_code;

-- Test 3: Create code for different email
select 'Test 3: Create code for different email' as test_description;
select public.create_referral_code_by_email('different@example.com', 'Different User') as different_code;

-- Test 4: Get existing code for user
select 'Test 4: Get existing code for user' as test_description;
select public.get_user_referral_code('test@example.com') as existing_code;

-- Test 5: Get code for user without code (should return null)
select 'Test 5: Get code for user without code' as test_description;
select public.get_user_referral_code('newuser@example.com') as new_user_code;

-- 11) VERIFY THE RESULTS

select 'Final Results:' as verification;
select 
  u.email,
  u.full_name,
  r.code,
  r.active,
  r.created_at
from public.users u
left join public.referral_codes r on r.owner_id = u.id
where u.email in ('test@example.com', 'different@example.com', 'newuser@example.com')
order by u.email, r.created_at;

-- ===== END OF SETUP =====
-- 
-- After running this SQL:
-- 1. Your referral program database is ready with unique codes per email
-- 2. API endpoints will work properly
-- 3. Users can generate referral codes at /referrals
-- 4. Same email always returns the same code
-- 5. System will track purchases and rewards automatically
--
-- Business Logic:
-- - Buyers get 10% discount using referral codes
-- - Referrers earn 10% cashback on amount actually paid
-- - Example: $199 course → Friend pays $179.10, you earn $17.91
-- - Each email gets exactly one persistent referral code
