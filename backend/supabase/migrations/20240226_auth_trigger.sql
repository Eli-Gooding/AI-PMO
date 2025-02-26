-- Enable the pgcrypto extension for UUID support
create extension if not exists "pgcrypto";

-- First, drop all foreign key constraints that reference users.id
alter table goals drop constraint goals_user_id_fkey;
alter table week_plan drop constraint week_plan_user_id_fkey;
alter table project_members drop constraint project_members_user_id_fkey;
alter table project_owners drop constraint project_owners_user_id_fkey;

-- Now we can safely modify the users table
alter table users drop constraint users_pkey;
alter table users drop column id;
alter table users add column id uuid primary key references auth.users(id);

-- Create a function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, user_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to automatically create a user record when a new auth user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Now update the foreign key references to use UUID
alter table goals
  alter column user_id type uuid using (gen_random_uuid()),
  add constraint goals_user_id_fkey foreign key (user_id) references users(id);

alter table week_plan
  alter column user_id type uuid using (gen_random_uuid()),
  add constraint week_plan_user_id_fkey foreign key (user_id) references users(id);

alter table project_members
  alter column user_id type uuid using (gen_random_uuid()),
  add constraint project_members_user_id_fkey foreign key (user_id) references users(id);

alter table project_owners
  alter column user_id type uuid using (gen_random_uuid()),
  add constraint project_owners_user_id_fkey foreign key (user_id) references users(id);

-- Enable Row Level Security
alter table users enable row level security;

-- Create policies
create policy "Users can view their own data"
  on users for select
  using (auth.uid() = id);

create policy "Users can update their own data"
  on users for update
  using (auth.uid() = id);

-- Grant necessary permissions
grant usage on schema public to authenticated;
grant all on public.users to authenticated;