-- About page content is stored in site_content as one JSONB section.
create table if not exists public.site_content (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content
  add column if not exists updated_at timestamptz not null default now();

alter table public.site_content enable row level security;

drop policy if exists public_read_about_section on public.site_content;
create policy public_read_about_section
  on public.site_content
  for select
  to anon, authenticated
  using (section = 'about');

drop policy if exists authenticated_manage_site_content on public.site_content;
create policy authenticated_manage_site_content
  on public.site_content
  for all
  to authenticated
  using (true)
  with check (true);

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

insert into public.site_content (section, content, updated_at)
values (
  'about',
  '{
    "heading": "The mind\nbehind the stories.",
    "bio": "Sandeep is a passionate photographer and storyteller, dedicated to capturing the essence of every moment. With a keen eye for detail and a love for creativity, he brings stories to life through his lens.",
    "image": "https://images-pw.pixieset.com/elementfield/bOGl9zb/Sandeep-998b8475-2500.jpg"
  }'::jsonb,
  now()
)
on conflict (section) do update
set content = public.site_content.content || jsonb_build_object(
  'heading',
  coalesce(
    nullif(btrim(public.site_content.content ->> 'heading'), ''),
    excluded.content ->> 'heading'
  )
);
