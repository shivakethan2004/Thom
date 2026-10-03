create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  text text not null,
  url text not null,
  background_color text not null default '#F7EFE7'
    check (background_color ~ '^#[0-9A-Fa-f]{6}$'),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

drop policy if exists public_read_published_testimonials on public.testimonials;
create policy public_read_published_testimonials
  on public.testimonials
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists authenticated_manage_testimonials on public.testimonials;
create policy authenticated_manage_testimonials
  on public.testimonials
  for all
  to authenticated
  using (true)
  with check (true);

grant select on public.testimonials to anon, authenticated;
grant insert, update, delete on public.testimonials to authenticated;

insert into public.testimonials (
  id,
  name,
  text,
  url,
  background_color,
  sort_order,
  is_active
)
values
  (
    'b3612f8a-3144-49bf-a405-7fba505da101',
    'Anvitha & Thrinesh',
    'I first came across Mayas Pixels on Instagram through a friend’s suggestion and chose them for my engagement. The photos were amazing, which led me to book them for all my wedding ceremonies as well. Sandeep and his team beautifully captured every precious moment in a fresh and intimate storytelling style.My family and I will cherish these memories for a lifetime. Thank you, Mayas Pixels, for the beautiful work – your passion truly reflects in the final output. Wishing the team all the best!',
    'https://images-pw.pixieset.com/elementfield/Ww11ymb/AT-26-7fc146ed-2500.jpg',
    '#F7EFE7',
    0,
    true
  ),
  (
    'b3612f8a-3144-49bf-a405-7fba505da102',
    'Divya & Narasimha',
    'I couldn''t be happier choosing Mayas pixels! From start to finish, they made the entire process seamless and enjoyable. They took the time to understand my vision and the style I wanted, which truly showed in the final photos. They were not only professional but also warm and easy to work with. Each one captures the emotion and beauty of the day perfectly. Every special moment, from the quiet glances to the big celebrations, was captured with such care & artistry ♥️',
    'https://images-pw.pixieset.com/elementfield/OWQQdjw/DN_Engagement-201-974421fb-2500.JPG',
    '#EAF1EA',
    1,
    true
  ),
  (
    'b3612f8a-3144-49bf-a405-7fba505da103',
    'Teja & Harika',
    'We are extremely happy with the work from Mayas Pixels. Sandeep and his team are talented photographers who beautifully captured the important moments and emotions throughout our wedding ceremonies. We especially loved the candid shots that truly reflect the joy of the day.Their professionalism and communication were excellent, and the team was always punctual. We are grateful to have chosen Mayas Pixels to capture our special moments and would highly recommend them for wedding photography.',
    'https://images-pw.pixieset.com/elementfield/VM99vlm/TH-withlogo-8-5c5e938a-2500.jpg',
    '#F3E9EC',
    2,
    true
  )
on conflict (id) do update set
  name = excluded.name,
  text = excluded.text,
  url = excluded.url,
  background_color = excluded.background_color,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;
