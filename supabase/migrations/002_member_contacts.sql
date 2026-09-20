begin;

create table public.member_contacts (
  user_id uuid primary key
    references auth.users(id) on delete cascade,

  phone text not null
    check (phone ~ '^\+923[0-9]{9}$'),

  updated_at timestamptz not null default now()
);

alter table public.member_contacts enable row level security;

revoke all on table public.member_contacts
  from anon, authenticated;

grant select on table public.member_contacts
  to authenticated;

grant insert (user_id, phone)
  on table public.member_contacts to authenticated;

grant update (phone)
  on table public.member_contacts to authenticated;

create policy "Members can read their own contact"
on public.member_contacts
for select to authenticated
using ((select auth.uid()) = user_id);

create policy "Members can add their own contact"
on public.member_contacts
for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Members can update their own contact"
on public.member_contacts
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create trigger member_contacts_updated_at
before update on public.member_contacts
for each row
execute function public.set_profile_updated_at();

commit;