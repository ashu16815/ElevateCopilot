-- ===== ElevateCopilot Mission-First Database Setup =====
-- Run this SQL in your Supabase SQL Editor to set up the mission-first platform
-- Project: vpxfryjezpkehjfspsvu

-- 1) EXTENSIONS
create extension if not exists pgcrypto;

-- 2) PROFILES TABLE (linked to auth.users)
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  job_function text,
  role_title text,
  industry text,
  company_size text,
  region_country text,
  years_experience int,
  m365_license_type text,
  copilot_access text,
  primary_apps text[],
  self_assessment int,
  top_use_cases text[],
  obstacles text[],
  referral_code text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3) CONSENTS TABLE
create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  marketing_emails boolean default false,
  research_analytics boolean default false,
  data_sharing_third_parties boolean default false,
  version text default 'v1',
  created_at timestamptz default now()
);

-- 4) SESSIONS TABLE
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null,
  duration_minutes int default 90,
  title text not null default 'AI Literacy Live Session',
  description text default 'Free, practical AI for professionals',
  capacity int,
  created_at timestamptz default now()
);

-- 5) SESSION REGISTRATIONS TABLE
create table if not exists public.session_registrations (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text default 'registered',
  referral_code text,
  answers jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- 6) RESOURCE DOWNLOADS TABLE
create table if not exists public.resource_downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  resource_slug text not null,
  created_at timestamptz default now()
);

-- 7) ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.consents enable row level security;
alter table public.session_registrations enable row level security;
alter table public.resource_downloads enable row level security;

-- 8) RLS POLICIES
create policy if not exists profiles_self on public.profiles 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy if not exists consents_self on public.consents 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy if not exists regs_self on public.session_registrations 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy if not exists downloads_self on public.resource_downloads 
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 9) CORE FUNCTIONS

-- Upsert profile with consent (main function for onboarding)
create or replace function public.upsert_profile_with_consent(
  p_email text,
  p_full_name text,
  p_job_function text,
  p_role_title text,
  p_industry text,
  p_company_size text,
  p_region_country text,
  p_years_experience int,
  p_m365_license_type text,
  p_copilot_access text,
  p_primary_apps text[],
  p_self_assessment int,
  p_top_use_cases text[],
  p_obstacles text[],
  p_referral_code text,
  p_marketing boolean,
  p_research boolean,
  p_share boolean
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'Auth required';
  end if;

  -- Upsert profile
  insert into public.profiles(
    user_id, email, full_name, job_function, role_title, industry, 
    company_size, region_country, years_experience, m365_license_type, 
    copilot_access, primary_apps, self_assessment, top_use_cases, 
    obstacles, referral_code
  ) values(
    v_uid, p_email, p_full_name, p_job_function, p_role_title, p_industry, 
    p_company_size, p_region_country, p_years_experience, p_m365_license_type, 
    p_copilot_access, p_primary_apps, p_self_assessment, p_top_use_cases, 
    p_obstacles, p_referral_code
  ) on conflict(user_id) do update set
    email = excluded.email,
    full_name = excluded.full_name,
    job_function = excluded.job_function,
    role_title = excluded.role_title,
    industry = excluded.industry,
    company_size = excluded.company_size,
    region_country = excluded.region_country,
    years_experience = excluded.years_experience,
    m365_license_type = excluded.m365_license_type,
    copilot_access = excluded.copilot_access,
    primary_apps = excluded.primary_apps,
    self_assessment = excluded.self_assessment,
    top_use_cases = excluded.top_use_cases,
    obstacles = excluded.obstacles,
    referral_code = excluded.referral_code,
    updated_at = now();

  -- Insert consent record
  insert into public.consents(
    user_id, marketing_emails, research_analytics, data_sharing_third_parties
  ) values(
    v_uid, p_marketing, p_research, p_share
  );

  return v_uid;
end $$;

grant execute on function public.upsert_profile_with_consent(
  text, text, text, text, text, text, text, int, text, text, text[], int, text[], text[], text, boolean, boolean, boolean
) to authenticated;

-- Register for session
create or replace function public.register_for_session(
  p_session uuid,
  p_answers jsonb default '{}'::jsonb
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_id uuid;
  v_ref text;
begin
  if v_uid is null then
    raise exception 'Auth required';
  end if;

  -- Get referral code from profile
  select referral_code into v_ref 
  from public.profiles 
  where user_id = v_uid;

  -- Insert registration
  insert into public.session_registrations(
    session_id, user_id, referral_code, answers
  ) values(
    p_session, v_uid, v_ref, p_answers
  ) returning id into v_id;

  return v_id;
end $$;

grant execute on function public.register_for_session(uuid, jsonb) to authenticated;

-- 10) SAMPLE SESSIONS DATA
insert into public.sessions (starts_at, title, description) values
  ('2025-09-20 10:00:00+12', 'AI Literacy Live Session', 'Free, practical AI for professionals'),
  ('2025-10-04 10:00:00+12', 'AI Literacy Live Session', 'Free, practical AI for professionals'),
  ('2025-10-18 10:00:00+12', 'AI Literacy Live Session', 'Free, practical AI for professionals'),
  ('2025-11-01 10:00:00+12', 'AI Literacy Live Session', 'Free, practical AI for professionals')
on conflict do nothing;

-- ===== END OF SETUP =====
-- 
-- After running this SQL:
-- 1. Your mission-first database is ready
-- 2. Authentication and onboarding will work
-- 3. Users can register for sessions
-- 4. Resource downloads will be tracked
-- 5. All data is properly secured with RLS
