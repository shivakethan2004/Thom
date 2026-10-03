create table if not exists public.entry_screen_settings (
  id boolean primary key default true check (id),
  layout text not null default 'classic'
    check (layout in ('classic', 'masonry', 'sidePanels', 'editorial')),
  image_library jsonb not null default '[]'::jsonb
    check (jsonb_typeof(image_library) = 'array' and jsonb_array_length(image_library) > 0),
  image_slots jsonb not null default '[]'::jsonb
    check (jsonb_typeof(image_slots) = 'array'),
  updated_at timestamptz not null default now(),
  constraint entry_screen_slot_count_matches_layout check (
    case layout
      when 'classic' then jsonb_array_length(image_slots) = 4
      when 'masonry' then jsonb_array_length(image_slots) = 5
      when 'sidePanels' then jsonb_array_length(image_slots) = 2
      when 'editorial' then jsonb_array_length(image_slots) = 6
      else false
    end
  )
);

alter table public.entry_screen_settings enable row level security;

drop policy if exists public_read_entry_screen on public.entry_screen_settings;
create policy public_read_entry_screen
  on public.entry_screen_settings
  for select
  to anon, authenticated
  using (true);

drop policy if exists authenticated_manage_entry_screen on public.entry_screen_settings;
create policy authenticated_manage_entry_screen
  on public.entry_screen_settings
  for all
  to authenticated
  using (true)
  with check (true);

grant select on public.entry_screen_settings to anon, authenticated;
grant insert, update, delete on public.entry_screen_settings to authenticated;

insert into public.entry_screen_settings (
  id,
  layout,
  image_library,
  image_slots,
  updated_at
)
values (
  true,
  'classic',
  '[
    "https://images-pw.pixieset.com/elementfield/1zMol09/DS-Sneakpeek-229-7b44ddca-1500.jpg",
    "https://images-pw.pixieset.com/elementfield/380505433/Cover-1-c106cdc0.jpg",
    "https://images-pw.pixieset.com/elementfield/867380704/Ujjvala__Amit-337-1c8eff6a-1500.jpg",
    "https://images-pw.pixieset.com/elementfield/695639383/VV_Sneakpeek-14-d4fe2060-1500.jpg",
    "https://images-pw.pixieset.com/elementfield/e4lAXoZ/DN_Sneakpeek_20-03d33fdc-1500.jpg",
    "https://images-pw.pixieset.com/elementfield/DGmMYxm/Cover-203-fd94ecc9-2500.jpg",
    "https://images-pw.pixieset.com/elementfield/890505433/DC_Sneakpeek-131-f41e27ba.jpg",
    "https://images-pw.pixieset.com/elementfield/YvbPYzl/DS-Sneakpeek-30-de603f32-1500.jpg"
  ]'::jsonb,
  '[0, 1, 4, 6]'::jsonb,
  now()
)
on conflict (id) do nothing;
