-- Admin Portal Database Setup
-- Add admin and blocking functionality to profiles
alter table if exists public.profiles add column if not exists is_admin boolean default false;
alter table if exists public.profiles add column if not exists blocked boolean default false;

-- Add capacity to sessions
alter table if exists public.sessions add column if not exists capacity int;

-- Ensure unique session registrations
create unique index if not exists uniq_session_user on public.session_registrations(session_id,user_id);

-- RLS: allow owner OR admin to read/update profiles
create or replace function public.is_admin(uid uuid) returns boolean language sql stable as $$ 
  select coalesce((select is_admin from public.profiles where user_id=uid), false) 
$$;

drop policy if exists profiles_self on public.profiles;
create policy profiles_owner_or_admin_select on public.profiles for select 
  using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy profiles_owner_or_admin_update on public.profiles for update 
  using (auth.uid() = user_id or public.is_admin(auth.uid())) 
  with check (auth.uid() = user_id or public.is_admin(auth.uid()));

-- registrations: owner can select/insert; admin can read all and update status
drop policy if exists regs_self on public.session_registrations;
create policy regs_owner_select on public.session_registrations for select 
  using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy regs_owner_insert on public.session_registrations for insert 
  with check (auth.uid() = user_id);

create policy regs_admin_update on public.session_registrations for update 
  using (public.is_admin(auth.uid()));

-- sessions: everyone can read, only admin can write
alter table public.sessions enable row level security;
drop policy if exists sessions_read on public.sessions;
create policy sessions_read on public.sessions for select using (true);
create policy sessions_admin_write on public.sessions for all 
  using (public.is_admin(auth.uid())) 
  with check (public.is_admin(auth.uid()));

-- handy RPCs for admin portal
create or replace function public.admin_list_users(q text default null) 
returns table(
  user_id uuid, 
  email text, 
  full_name text, 
  job_function text, 
  industry text, 
  is_admin boolean, 
  blocked boolean, 
  created_at timestamptz
) language sql security definer set search_path=public as $$ 
  select p.user_id, p.email, p.full_name, p.job_function, p.industry, p.is_admin, p.blocked, p.created_at 
  from public.profiles p 
  where (q is null or (p.email ilike '%'||q||'%' or p.full_name ilike '%'||q||'%')) 
  order by p.created_at desc 
$$;

grant execute on function public.admin_list_users(text) to authenticated;

create or replace function public.admin_counts() 
returns table(
  total_users bigint, 
  total_sessions bigint, 
  total_regs bigint, 
  trained bigint
) language sql security definer set search_path=public as $$ 
  select 
    (select count(*) from public.profiles), 
    (select count(*) from public.sessions), 
    (select count(*) from public.session_registrations), 
    (select count(distinct user_id) from public.session_registrations) 
$$;

grant execute on function public.admin_counts() to authenticated;

create or replace function public.session_seat_summary() 
returns table(
  id uuid, 
  title text, 
  starts_at timestamptz, 
  capacity int, 
  registered int, 
  pending int, 
  seats_left int
) language sql security definer set search_path=public as $$ 
  select 
    s.id, 
    coalesce(s.title,'AI Literacy Live Session') as title, 
    s.starts_at, 
    s.capacity, 
    coalesce(sum(case when r.status='registered' then 1 else 0 end),0) as registered, 
    coalesce(sum(case when r.status='pending' then 1 else 0 end),0) as pending, 
    greatest(coalesce(s.capacity,0) - coalesce(sum(case when r.status='registered' then 1 else 0 end),0), 0) as seats_left 
  from public.sessions s 
  left join public.session_registrations r on r.session_id=s.id 
  group by s.id 
$$;

grant execute on function public.session_seat_summary() to authenticated;
