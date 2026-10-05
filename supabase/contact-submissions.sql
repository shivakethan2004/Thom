create table if not exists public.contact_submissions (
  submission_id uuid primary key,
  groom_name text not null check (char_length(groom_name) between 1 and 200),
  bride_name text not null check (char_length(bride_name) between 1 and 200),
  contact_number text not null check (char_length(contact_number) between 1 and 100),
  email text not null default '' check (char_length(email) <= 320),
  event_details text not null check (char_length(event_details) between 1 and 5000),
  hear_about_us text not null default '' check (char_length(hear_about_us) <= 200),
  created_at timestamptz not null default now(),
  notification_sent_at timestamptz
);

alter table public.contact_submissions enable row level security;
grant select, insert, update on public.contact_submissions to service_role;
grant select on public.contact_submissions to authenticated;

drop policy if exists authenticated_read_contact_submissions
  on public.contact_submissions;
create policy authenticated_read_contact_submissions
  on public.contact_submissions
  for select
  to authenticated
  using (true);
