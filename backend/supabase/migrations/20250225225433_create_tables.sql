-- init_schema.sql
-- Database initialization for Project Management & Check-In Application
-- All identifiers are in lowercase

-- Create the users table
create table users (
  id serial primary key,
  email text unique not null,
  is_member boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Create the projects table
create table projects (
  id serial primary key,
  project_name text not null,
  project_description text,
  project_status text, -- e.g., 'on_track', 'at_risk', 'delayed'
  created_at timestamp with time zone default timezone('utc', now())
);

-- Create the goals table
create table goals (
  id serial primary key,
  goal_description text not null,
  user_id integer not null references users(id) on delete cascade,
  project_id integer not null references projects(id) on delete cascade,
  measurement text,
  goal_status text,  -- e.g., 'completed', 'in_progress', 'not_started'
  goal_notes text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Create the week_plan table
create table week_plan (
  id serial primary key,
  user_id integer not null references users(id) on delete cascade,
  plan_notes text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Create the project_members join table for many-to-many relationship between users and projects
create table project_members (
  user_id integer not null references users(id) on delete cascade,
  project_id integer not null references projects(id) on delete cascade,
  primary key (user_id, project_id)
);

-- Create the project_owners join table for tracking project ownership
create table project_owners (
  user_id integer not null references users(id) on delete cascade,
  project_id integer not null references projects(id) on delete cascade,
  primary key (user_id, project_id)
);

-- Create the week_plan_goals join table for associating week_plan entries with goals
create table week_plan_goals (
  week_plan_id integer not null references week_plan(id) on delete cascade,
  goal_id integer not null references goals(id) on delete cascade,
  primary key (week_plan_id, goal_id)
);
