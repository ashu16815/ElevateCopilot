-- Download tracking table
create table if not exists public.download_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  slug text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.download_events enable row level security;

-- RLS policies
create policy download_events_owner_select on public.download_events for select 
  using (auth.uid() = user_id);

create policy download_events_owner_insert on public.download_events for insert 
  with check (auth.uid() = user_id);

-- Admin can see all downloads
create policy download_events_admin_select on public.download_events for select 
  using (public.is_admin(auth.uid()));
