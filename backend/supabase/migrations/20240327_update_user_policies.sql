-- Drop the existing restrictive policy
drop policy if exists "Users can view their own data" on users;

-- Create a new policy that allows viewing basic user info for all authenticated users
create policy "Users can view basic info of all users"
  on users for select
  using (auth.role() = 'authenticated');

-- Create a policy for viewing sensitive data (if needed in the future)
create policy "Users can view sensitive data of their own record"
  on users for select
  using (auth.uid() = id);

-- Ensure RLS is still enabled
alter table users enable row level security; 