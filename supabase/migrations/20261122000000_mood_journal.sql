begin;
create table public.mood_entries (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  mood text not null check (mood in ('calm','happy','stressed','anxious','low')),
  note text not null default '' check (char_length(note) <= 4000),
  next_step text not null default '' check (char_length(next_step) <= 500)
);
create index mood_entries_owner_date on public.mood_entries (owner_id, created_at desc, id desc);
alter table public.mood_entries enable row level security;
alter table public.mood_entries force row level security;
revoke all on public.mood_entries from public, anon, authenticated;
grant select, delete on public.mood_entries to authenticated;
grant insert (mood, note, next_step), update (mood, note, next_step)
  on public.mood_entries to authenticated;
create policy "Owners manage their entries" on public.mood_entries
  for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);
commit;
