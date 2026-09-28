-- Run this after creating public.stories with the schema from the project.
-- The read policies take effect when RLS is enabled. Keep the Admin's
-- authenticated write policies in place before enabling RLS on these tables.

drop policy if exists public_read_published_stories on public.stories;
create policy public_read_published_stories
  on public.stories
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists public_read_published_films on public.films;
create policy public_read_published_films
  on public.films
  for select
  to anon, authenticated
  using (is_active = true);

insert into public.stories (
  slug,
  title,
  subtitle,
  date,
  image,
  object_position,
  blog_link,
  slideshow_id,
  script_src,
  preview_src,
  sort_order,
  is_active
)
values
  (
    'divya-narasimha',
    'Divya + Narasimha',
    'Wedding',
    'APR 19, 2024',
    'https://pictime7eus1public-pub-hdf3hecqdpaqeuev.a02.azurefd.net/pictures/53/786/53786715/slideshows/6ab4d4f9c3019c989e0ba534/images/d_n_thumbnail-1_pt(12490968944).jpg',
    '62% 52%',
    null,
    '6ab39e0ae07a0bac7b58d435',
    'https://galleries.thehouseofmaya.in/-2025-divya-narasimha/slideswebcomponentembed.js/6ab39e0ae07a0bac7b58d435?features=lightbox,pinterest&filtertags=',
    null,
    0,
    true
  ),
  (
    'om-kriti-sneakpeek',
    'Om + Kriti',
    'Wedding',
    '2026',
    'https://pictime7eus1public-pub-hdf3hecqdpaqeuev.a02.azurefd.net/pictures/53/786/53786715/slideshows/6ab4d4f9c3019c989e0ba534/images/cover-2_pt(12490659552).jpg',
    '50% 50%',
    null,
    '6aae0329413bbfbfc18848d4',
    'https://galleries.thehouseofmaya.in/-om-kriti-sneakpeek/slideswebcomponentembed.js/6aae0329413bbfbfc18848d4?features=lightbox,pinterest&filtertags=',
    null,
    1,
    true
  ),
  (
    'hema-bindu-sridhar',
    'Hema Bindu + Sridhar',
    'Wedding',
    '2026',
    'https://pictime7eus1public-pub-hdf3hecqdpaqeuev.a02.azurefd.net/pictures/53/786/53786715/slideshows/6ab4d4f9c3019c989e0ba534/images/h_s-thumbnail-1_pt(12490694997).jpg',
    '50% 50%',
    null,
    '6aa28bc07f6fe2f83029a870',
    'https://galleries.thehouseofmaya.in/-hema-bindu-sridhar/slideswebcomponentembed.js/6aa28bc07f6fe2f83029a870?features=lightbox,pinterest&filtertags=',
    null,
    2,
    true
  ),
  (
    'chitra-suraj-sneak-peek',
    'Chitra + Suraj',
    'Wedding',
    '2026',
    'https://pictime7eus1public-pub-hdf3hecqdpaqeuev.a02.azurefd.net/pictures/53/786/53786715/slideshows/6ab4d4f9c3019c989e0ba534/images/c_s_thumbnail-1_pt(12491378125).jpg',
    '50% 50%',
    null,
    '6aae755819390fb6e134ad9e',
    'https://galleries.thehouseofmaya.in/-chitra-suraj-sneak-peek/slideswebcomponentembed.js/6aae755819390fb6e134ad9e?features=lightbox,pinterest&filtertags=',
    null,
    3,
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  date = excluded.date,
  image = excluded.image,
  object_position = excluded.object_position,
  blog_link = excluded.blog_link,
  slideshow_id = excluded.slideshow_id,
  script_src = excluded.script_src,
  preview_src = excluded.preview_src,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;
