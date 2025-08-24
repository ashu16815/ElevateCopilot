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
-- === ElevateCopilot Referral Program: Schema + RLS + RPCs ===
-- Safe to run in Supabase SQL Editor (project: vpxfryjezpkehjfspsvu)

create extension if not exists pgcrypto;

-- 1) Core tables
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.referral_codes (
  code text primary key,               -- e.g., EC-12ab34
  owner_id uuid not null references public.users(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_referral_codes_owner on public.referral_codes(owner_id);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  buyer_email text not null,
  course_slug text not null,
  list_price_usd numeric(10,2) not null,
  discount_usd numeric(10,2) not null default 0,
  amount_paid_usd numeric(10,2) not null,
  referral_code text references public.referral_codes(code),
  referrer_reward_usd numeric(10,2) not null default 0,
  status text not null default 'recorded',  -- recorded|paid|refunded (expand as needed)
  meta jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_purchases_refcode on public.purchases(referral_code);

create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.users(id) on delete cascade,
  purchase_id uuid not null references public.purchases(id) on delete cascade,
  amount_usd numeric(10,2) not null,
  status text not null default 'pending',   -- pending|paid|cancelled
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
create index if not exists idx_payouts_referrer on public.payouts(referrer_id);

-- 2) RLS (Row Level Security)
alter table public.users enable row level security;
alter table public.referral_codes enable row level security;
alter table public.purchases enable row level security;
alter table public.payouts enable row level security;

-- Basic viewer policies (adjust if you add auth). For now: allow anonymous SELECT on non-sensitive tables you want to show in a dashboard.
-- If you will later use Supabase Auth, replace with auth.uid()-based policies.

-- Users: no open select by default (contains emails).
revoke all on table public.users from anon;

-- Referral codes: allow select by anyone only for code lookup (code + active + owner initials via view).
-- We'll expose only via RPCs; keep table itself private.
revoke all on table public.referral_codes from anon;
revoke all on table public.purchases from anon;
revoke all on table public.payouts from anon;

-- 3) Helper: unique code generator
create or replace function public.gen_referral_code()
returns text as $$
  select 'EC-' || substr(encode(gen_random_bytes(6), 'hex'),1,6);
$$ language sql stable;

-- 4) Create a referral code for a given user
create or replace function public.create_referral_code(p_owner uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare c text;
begin
  if not exists (select 1 from public.users where id = p_owner) then
    raise exception 'Owner % does not exist', p_owner;
  end if;
  loop
    c := public.gen_referral_code();
    exit when not exists (select 1 from public.referral_codes where code = c);
  end loop;
  insert into public.referral_codes(code, owner_id) values (c, p_owner);
  return c;
end $$;

grant execute on function public.create_referral_code(uuid) to anon;

-- 5) Redeem referral at purchase time (applies 10% off to buyer and 10% reward to referrer on actual paid)
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
begin
  if p_list_price is null or p_list_price <= 0 then
    raise exception 'Invalid list price';
  end if;

  if p_referral_code is not null then
    select owner_id into v_referrer
      from public.referral_codes
     where code = p_referral_code and active = true;

    if v_referrer is not null then
      v_discount := round(p_list_price * 0.10, 2);
      v_paid     := round(p_list_price - v_discount, 2);
      v_reward   := round(v_paid * 0.10, 2); -- 10% of amount actually paid
    end if;
  end if;

  insert into public.purchases(
    buyer_email, course_slug, list_price_usd, discount_usd, amount_paid_usd,
    referral_code, referrer_reward_usd, status
  ) values (
    p_buyer_email, p_course_slug, p_list_price, v_discount, v_paid,
    p_referral_code, v_reward, 'recorded'
  ) returning id into v_purchase;

  if v_referrer is not null and v_reward > 0 then
    insert into public.payouts(referrer_id, purchase_id, amount_usd)
    values (v_referrer, v_purchase, v_reward);
  end if;

  return v_purchase;
end $$;

grant execute on function public.redeem_referral(text, text, numeric, text) to anon;

-- Optional helper views for dashboards (hide emails if needed later)
create or replace view public.v_referrals_summary as
select r.owner_id, u.full_name, r.code, r.active, r.created_at
from public.referral_codes r
join public.users u on u.id = r.owner_id;

create or replace view public.v_payouts_summary as
select p.id payout_id, p.referrer_id, u.full_name, p.amount_usd, p.status, p.created_at
from public.payouts p
left join public.users u on u.id = p.referrer_id;

-- Views can be selectable by anon if you wish to show public lists; keep off by default.
revoke all on view public.v_referrals_summary from anon;
revoke all on view public.v_payouts_summary from anon;
```

## Features Implemented

### 1. API Endpoints
- **POST** `/api/referrals/create` - Generate referral codes for users
- **POST** `/api/referrals/redeem` - Apply referral codes during purchase

### 2. Database Schema
- **users** - User management
- **referral_codes** - Unique referral codes per user
- **purchases** - Purchase records with referral tracking
- **payouts** - Referrer rewards tracking

### 3. Business Logic
- **10% discount** for buyers using referral codes
- **10% cashback** for referrers on amount actually paid
- **Unique code generation** (EC-XXXXXX format)
- **Fraud prevention** - one code per order, no self-referrals

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
  body: JSON.stringify({ user_id: 'user-uuid' })
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
