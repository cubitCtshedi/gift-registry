-- Gift Registry Schema
-- Paste this into: Supabase Dashboard > SQL Editor > New Query

create table if not exists registry_lists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  occasion text,
  location text,
  direction text,
  created_at timestamptz default now()
);

create table if not exists gifts (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references registry_lists(id) on delete cascade,
  name text not null,
  description text,
  category text default 'Other',
  link text,
  claimed boolean default false,
  created_at timestamptz default now()
);

-- Allow public read/write (no auth — open registry)
alter table registry_lists enable row level security;
alter table gifts enable row level security;

create policy "Public read lists" on registry_lists for select using (true);
create policy "Public insert lists" on registry_lists for insert with check (true);
create policy "Public update lists" on registry_lists for update using (true);
create policy "Public delete lists" on registry_lists for delete using (true);

create policy "Public read gifts" on gifts for select using (true);
create policy "Public insert gifts" on gifts for insert with check (true);
create policy "Public update gifts" on gifts for update using (true);
create policy "Public delete gifts" on gifts for delete using (true);
