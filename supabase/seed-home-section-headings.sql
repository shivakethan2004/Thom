create table if not exists public.site_content (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_home_headings_required
    check (
      section not in ('home_stories', 'home_films', 'home_instagram')
      or (
        jsonb_typeof(content) = 'object'
        and coalesce(length(btrim(content ->> 'kicker')), 0) > 0
        and coalesce(length(btrim(content ->> 'title')), 0) > 0
        and coalesce(length(btrim(content ->> 'description')), 0) > 0
      )
    )
);

alter table public.site_content
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'site_content_home_headings_required'
      and conrelid = 'public.site_content'::regclass
  ) then
    alter table public.site_content
      add constraint site_content_home_headings_required
      check (
        section not in ('home_stories', 'home_films', 'home_instagram')
        or (
          jsonb_typeof(content) = 'object'
          and coalesce(length(btrim(content ->> 'kicker')), 0) > 0
          and coalesce(length(btrim(content ->> 'title')), 0) > 0
          and coalesce(length(btrim(content ->> 'description')), 0) > 0
        )
      );
  end if;
end
$$;

alter table public.site_content enable row level security;

drop policy if exists public_read_home_section_headings on public.site_content;
create policy public_read_home_section_headings
  on public.site_content
  for select
  to anon, authenticated
  using (section in ('home_stories', 'home_films', 'home_instagram'));

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
values
  (
    'home_stories',
    '{"kicker":"STORIES","title":"Our Latest Stories","description":"Real moments, honest emotions, timeless memories."}'::jsonb,
    now()
  ),
  (
    'home_films',
    '{"kicker":"FILMS","title":"Our Films","description":"Cinematic tales of love, emotion and moments that move."}'::jsonb,
    now()
  ),
  (
    'home_instagram',
    '{"kicker":"@thehouseofmaya.in","title":"From Our Instagram","description":"A little more of our world, one frame at a time."}'::jsonb,
    now()
  )
on conflict (section) do nothing;
