-- Guest comments with moderation (approved flag).
-- Run in Supabase SQL editor or via supabase db push.

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null,
  author_name text not null,
  body text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  constraint comments_author_name_len check (
    char_length(trim(author_name)) between 2 and 80
  ),
  constraint comments_body_len check (
    char_length(trim(body)) between 1 and 2000
  ),
  constraint comments_post_slug_len check (
    char_length(trim(post_slug)) between 1 and 200
  )
);

create index if not exists comments_approved_by_post_idx
  on public.comments (post_slug, created_at)
  where approved = true;

alter table public.comments enable row level security;

-- Public can only read approved comments.
create policy "Public read approved comments"
  on public.comments
  for select
  to anon, authenticated
  using (approved = true);

-- Guests may insert; approved must stay false (moderation).
create policy "Public insert pending comments"
  on public.comments
  for insert
  to anon, authenticated
  with check (
    approved = false
    and char_length(trim(post_slug)) between 1 and 200
    and char_length(trim(author_name)) between 2 and 80
    and char_length(trim(body)) between 1 and 2000
  );

-- No public update/delete — moderate via service role / dashboard.
