begin;

create table public.mood_reminders (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  frequency text not null check (frequency in ('off', 'daily', 'weekdays')),
  reminder_time time not null,
  zone text not null,
  language text not null check (language in ('zh', 'en')),
  last_attempt_at timestamptz,
  last_sent_on date
);
alter table public.mood_reminders enable row level security;
revoke all on public.mood_reminders from public, anon, authenticated;

create function public.mood_reminder_settings(p_zone text, p_frequency text default null,
  p_time time default null, p_language text default null)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  viewer uuid := auth.uid();
  day_start timestamp := date_trunc('day', now() at time zone p_zone);
  prefs public.mood_reminders%rowtype;
begin
  if viewer is null or not exists (select 1 from pg_timezone_names where name = p_zone) then
    raise exception 'Invalid reminder settings' using errcode = '22023';
  end if;
  if p_frequency is not null then
    insert into public.mood_reminders (owner_id, frequency, reminder_time, zone, language)
    values (viewer, p_frequency, p_time, p_zone, p_language)
    on conflict (owner_id) do update set frequency = excluded.frequency,
      reminder_time = excluded.reminder_time, zone = excluded.zone, language = excluded.language;
  end if;
  select * into prefs from public.mood_reminders where owner_id = viewer;
  return jsonb_build_object(
    'frequency', coalesce(prefs.frequency, 'off'),
    'time', coalesce(to_char(prefs.reminder_time, 'HH24:MI'), '20:00'),
    'zone', coalesce(prefs.zone, p_zone),
    'writtenToday', exists (
      select 1 from public.mood_entries where owner_id = viewer
        and created_at >= day_start at time zone p_zone
        and created_at < (day_start + interval '1 day') at time zone p_zone
    )
  );
end;
$$;

create function public.claim_mood_reminders(p_secret text)
returns table (owner_id uuid, email text, language text, local_day date)
language plpgsql security definer set search_path = ''
as $$
begin
  if p_secret is null or not exists (
    select 1 from vault.decrypted_secrets where name = 'deepcalm_journal_cron'
      and decrypted_secret = p_secret
  ) then
    raise exception 'Invalid scheduler credential' using errcode = '42501';
  end if;
  return query
  with due as (
    select r.owner_id, u.email::text as email, r.language, local_clock.stamp::date as local_day
    from public.mood_reminders r
    join auth.users u on u.id = r.owner_id
    cross join lateral (select now() at time zone r.zone as stamp) local_clock
    where r.frequency <> 'off' and u.email_confirmed_at is not null and u.email is not null
      and (r.frequency = 'daily' or extract(isodow from local_clock.stamp) <= 5)
      and local_clock.stamp::time >= r.reminder_time
      and local_clock.stamp < local_clock.stamp::date + r.reminder_time + interval '2 hours'
      and r.last_sent_on is distinct from local_clock.stamp::date
      and (r.last_attempt_at is null or r.last_attempt_at < now() - interval '20 minutes')
      and not exists (
        select 1 from public.mood_entries e where e.owner_id = r.owner_id
          and e.created_at >= local_clock.stamp::date::timestamp at time zone r.zone
          and e.created_at < (local_clock.stamp::date + 1)::timestamp at time zone r.zone
      )
    order by r.last_attempt_at nulls first, r.reminder_time
    limit 10 for update of r skip locked
  ), claimed as (
    update public.mood_reminders r set last_attempt_at = now()
    from due where r.owner_id = due.owner_id returning due.*
  )
  select c.owner_id, c.email, c.language, c.local_day from claimed c;
end;
$$;

create function public.complete_mood_reminder(p_secret text, p_owner uuid, p_day date)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if p_secret is null or not exists (
    select 1 from vault.decrypted_secrets where name = 'deepcalm_journal_cron'
      and decrypted_secret = p_secret
  ) then
    raise exception 'Invalid scheduler credential' using errcode = '42501';
  end if;
  update public.mood_reminders set last_sent_on = p_day
    where owner_id = p_owner and (last_sent_on is null or last_sent_on <= p_day);
end;
$$;

revoke all on function public.mood_reminder_settings(text,text,time,text) from public, anon, authenticated;
grant execute on function public.mood_reminder_settings(text,text,time,text) to authenticated;
revoke all on function public.claim_mood_reminders(text) from public, anon, authenticated;
revoke all on function public.complete_mood_reminder(text,uuid,date) from public, anon, authenticated;
grant execute on function public.claim_mood_reminders(text) to anon;
grant execute on function public.complete_mood_reminder(text,uuid,date) to anon;

commit;
