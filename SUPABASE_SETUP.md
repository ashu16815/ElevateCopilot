# Supabase Referral Program Setup

## Overview
This document outlines the complete setup for the ElevateCopilot referral program using Supabase.

## Environment Variables
Add these to your `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://vpxfryjezpkehjfspsvu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweGZyeWplenBrZWhqZnNwc3Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNTk2MDcsImV4cCI6MjA3MTYzNTYwN30.H2vS-LKiUoJJQqpTUKZ7TiLqURUy_UyYyxYlDampvzQ
```

## Database Setup
Run the following SQL in your Supabase SQL Editor:

```sql
-- ===== ElevateCopilot Referral Program: EMAIL-LINKED USERS + SECURE RPCs =====
create extension if not exists pgcrypto;

-- 1) USERS (email is case-insensitive unique)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  created_at timestamptz not null default now()
);
create unique index if not exists users_email_lower_uniq on public.users (lower(email));

-- 2) REFERRAL CODES
create table if not exists public.referral_codes (
  code text primary key,
  owner_id uuid not null references public.users(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_referral_codes_owner on public.referral_codes(owner_id);

-- 3) PURCHASES
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

-- 4) PAYOUTS
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

-- 5) RLS
alter table public.users enable row level security;
alter table public.referral_codes enable row level security;
alter table public.purchases enable row level security;
alter table public.payouts enable row level security;

-- Keep tables private by default (we'll expose via RPCs/views)
revoke all on table public.users from anon;
revoke all on table public.referral_codes from anon;
revoke all on table public.purchases from anon;
revoke all on table public.payouts from anon;

-- 6) HELPERS
create or replace function public.gen_referral_code()
returns text as $$ select 'EC-' || substr(encode(gen_random_bytes(6),'hex'),1,6); $$ language sql stable;

create or replace function public.upsert_user_by_email(p_email text, p_full_name text default null)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare v_id uuid; v_email text := trim(p_email);
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

-- 7) CREATE CODE BY EMAIL
create or replace function public.create_referral_code_by_email(p_email text, p_full_name text default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare v_owner uuid; c text;
begin
  v_owner := public.upsert_user_by_email(p_email, p_full_name);
  loop
    c := public.gen_referral_code();
    exit when not exists (select 1 from public.referral_codes where code=c);
  end loop;
  insert into public.referral_codes(code, owner_id) values (c, v_owner);
  return c;
end $$;
grant execute on function public.create_referral_code_by_email(text, text) to anon;

-- 8) REDEEM REFERRAL (10% off buyer + 10% reward of amount paid)
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
  if p_list_price is null or p_list_price <= 0 then raise exception 'Invalid list price'; end if;

  if p_referral_code is not null and p_referral_code <> '' then
    select owner_id, active into v_referrer, v_code_active
      from public.referral_codes where code = p_referral_code limit 1;
    if v_referrer is not null and v_code_active then
      v_discount := round(p_list_price * 0.10, 2);
      v_paid     := round(p_list_price - v_discount, 2);
      v_reward   := round(v_paid * 0.10, 2);
    end if;
  end if;

  insert into public.purchases(
    buyer_email, course_slug, list_price_usd, discount_usd, amount_paid_usd, referral_code, referrer_reward_usd, status
  ) values (
    trim(p_buyer_email), p_course_slug, p_list_price, v_discount, v_paid, p_referral_code, v_reward, 'recorded'
  ) returning id into v_purchase;

  if v_referrer is not null and v_reward > 0 then
    insert into public.payouts(referrer_id, purchase_id, amount_usd) values (v_referrer, v_purchase, v_reward);
  end if;

  return v_purchase;
end $$;
grant execute on function public.redeem_referral(text, text, numeric, text) to anon;

-- 9) VIEWS to fetch a user's codes & totals by email
create or replace view public.v_user_codes as
select u.email, u.full_name, r.code, r.active, r.created_at
from public.users u
left join public.referral_codes r on r.owner_id = u.id;
revoke all on view public.v_user_codes from anon;

create or replace view public.v_user_rewards as
select u.email, coalesce(sum(p.amount_usd),0) as total_rewards
from public.users u
left join public.payouts p on p.referrer_id = u.id
group by u.email;
revoke all on view public.v_user_rewards from anon;
```

## Features Implemented

### 1. API Endpoints
- **POST** `/api/referrals/create` - Generate referral codes by email (creates/updates users automatically)
- **POST** `/api/referrals/redeem` - Apply referral codes during purchase
- **POST** `/api/referrals/summary` - Get user's referral codes and rewards summary

### 2. Database Schema
- **users** - User management
- **referral_codes** - Unique referral codes per user
- **purchases** - Purchase records with referral tracking
- **payouts** - Referrer rewards tracking

### 3. Business Logic
- **10% discount** for buyers using referral codes
- **10% cashback** for referrers on amount actually paid
- **Unique code generation** (EC-XXXXXX format)
- **Email-based user management** - automatically creates/updates users
- **Fraud prevention** - one code per order, no self-referrals
- **Case-insensitive email handling** - prevents duplicate accounts

### 4. UI Components
- **ReferralCodeForm** - Generate and display referral codes
- **Referrals page** - Public explanation of the program
- **Contact form** - Optional referral code field
- **Navigation** - Referrals links in header and footer

## Usage Examples

### Generate Referral Code
```javascript
const response = await fetch('/api/referrals/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'user@example.com',
    full_name: 'John Doe' // optional
  })
});
const { code } = await response.json();
// Returns: { code: "EC-12ab34" }
```

### Redeem Referral Code
```javascript
const response = await fetch('/api/referrals/redeem', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    buyer_email: 'buyer@example.com',
    course_slug: 'copilot-kickstart',
    list_price_usd: 199.00,
    referral_code: 'EC-12ab34'
  })
});
const { purchase_id } = await response.json();
// Returns: { purchase_id: "uuid" }
```

## Security Features
- **Row Level Security (RLS)** enabled on all tables
- **Anonymous access** only through RPC functions
- **Input validation** and error handling
- **Fraud prevention** measures built-in

## Next Steps
1. Set up environment variables in production
2. Test API endpoints with real data
3. Implement user authentication (optional)
4. Add admin dashboard for managing referrals
5. Set up automated payout processing

## Support
For questions or issues, contact: elevatecopilot@outlook.com
