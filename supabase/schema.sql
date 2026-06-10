-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  handle text unique not null,
  full_name text,
  avatar_url text,

  constraint handle_length check (char_length(handle) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for bookmarks
create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  url text not null,
  tag text default 'inbox',
  notes text default '',
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  constraint title_length check (char_length(trim(title)) > 0 and char_length(title) <= 100),
  constraint url_not_empty check (char_length(trim(url)) > 0),
  constraint url_protocol check (url like 'http://%' or url like 'https://%')
);

-- Set up Row Level Security (RLS) for bookmarks
alter table bookmarks enable row level security;

create policy "Public bookmarks are viewable by everyone." on bookmarks
  for select using (is_public = true);

create policy "Users can view their own bookmarks." on bookmarks
  for select using (auth.uid() = user_id);

create policy "Users can insert their own bookmarks." on bookmarks
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own bookmarks." on bookmarks
  for update using (auth.uid() = user_id);

create policy "Users can delete their own bookmarks." on bookmarks
  for delete using (auth.uid() = user_id);

-- Create a trigger to automatically create a profile for a new user
create function public.handle_new_user()
returns trigger as $$
declare
  base_handle text;
  new_handle text;
  counter integer := 1;
begin
  -- Generate a base handle from the user's name or email (e.g., removing spaces and special chars)
  base_handle := lower(regexp_replace(coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), '[^a-zA-Z0-9]', '', 'g'));
  
  -- If empty after cleanup, just use 'user'
  if base_handle = '' then
    base_handle := 'user';
  end if;

  new_handle := base_handle;

  -- Ensure handle is unique
  while exists (select 1 from public.profiles where handle = new_handle) loop
    new_handle := base_handle || counter;
    counter := counter + 1;
  end loop;

  insert into public.profiles (id, full_name, handle)
  values (new.id, new.raw_user_meta_data->>'full_name', new_handle);
  
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
