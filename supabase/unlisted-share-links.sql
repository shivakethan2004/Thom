drop policy if exists public_read_published_stories on public.stories;
create policy public_read_published_stories
  on public.stories
  for select
  to anon, authenticated
  using (true);

drop policy if exists public_read_published_films on public.films;
create policy public_read_published_films
  on public.films
  for select
  to anon, authenticated
  using (true);
