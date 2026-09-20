begin;

-- Private profile drafts: one profile per account for now.
create table public.profiles (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null unique
    references auth.users(id) on delete cascade,

  display_name text not null
    check (char_length(trim(display_name)) between 2 and 60),

  city text not null default 'Attock'
    check (city = 'Attock'),

  introduction text not null default ''
    check (char_length(introduction) <= 2000),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enforce access rules for each profile.
alter table public.profiles enable row level security;

-- Remove automatic access and grant only required operations.
revoke all on table public.profiles from anon, authenticated;

grant select, delete
  on table public.profiles to authenticated;

grant insert (user_id, display_name, city, introduction)
  on table public.profiles to authenticated;

grant update (display_name, city, introduction)
  on table public.profiles to authenticated;

create policy "Members can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Members can create their own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Members can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Members can delete their own profile"
on public.profiles
for delete
to authenticated
using ((select auth.uid()) = user_id);

-- Update timestamps automatically.
create function public.set_profile_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.set_profile_updated_at();

commit;