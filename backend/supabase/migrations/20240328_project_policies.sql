-- Drop existing policies
drop policy if exists "Users can view projects they are members of" on projects;
drop policy if exists "Users can view project members of their projects" on project_members;
drop policy if exists "Users can view project owners of their projects" on project_owners;

-- Projects policies - this is the only one we really need
create policy "Users can view projects they are members of"
  on projects for select
  using (
    id in (
      select project_id from project_members where user_id = auth.uid()
      union
      select project_id from project_owners where user_id = auth.uid()
    )
  );

-- Project members policies - allow all authenticated users to view
create policy "Users can view all project members"
  on project_members for select
  using (true);

-- Project owners policies - allow all authenticated users to view
create policy "Users can view all project owners"
  on project_owners for select
  using (true);