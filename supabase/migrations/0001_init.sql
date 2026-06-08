-- AJ Digital Client Portal — initial schema
-- Multi-tenant by tenant_id with Row-Level Security. A signed-in auth user is
-- mapped to exactly one tenant via app_users; every row is readable only by
-- members of its tenant. This file is the source of truth that src/lib/types.ts
-- mirrors. Apply via the Supabase MCP (apply_migration) or `supabase db push`.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type phase as enum ('diagnose', 'design', 'build', 'operate');
create type project_status as enum ('on_track', 'waiting', 'blocked', 'complete');
create type owner_kind as enum ('aj_digital', 'client', 'third_party');
create type business_objective as enum ('reduce_spend', 'increase_profit', 'reduce_risk', 'increase_signal');
create type risk_level as enum ('low', 'medium', 'high');
create type approval_type as enum ('content', 'workflow', 'access', 'strategy', 'spend', 'data', 'public_claim');
create type approval_status as enum ('pending', 'approved', 'changes_requested', 'rejected');
create type deliverable_category as enum ('strategy', 'brand', 'content', 'system_docs', 'training', 'reports', 'contracts');
create type deliverable_status as enum ('draft', 'in_review', 'delivered', 'archived');
create type support_type as enum ('question', 'issue', 'request', 'access', 'billing');
create type priority as enum ('low', 'normal', 'high', 'urgent');
create type support_status as enum ('open', 'in_progress', 'waiting_on_client', 'resolved');
create type integration_status as enum ('connected', 'needs_setup', 'pending_approval', 'paused', 'not_connected');
create type user_role as enum ('owner', 'admin', 'viewer');

-- ---------------------------------------------------------------------------
-- Core tables
-- ---------------------------------------------------------------------------
create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- Maps a Clerk user (id = Clerk user id, e.g. "user_2ab…") to a tenant + role.
create table app_users (
  id text primary key,
  tenant_id uuid not null references tenants (id) on delete cascade,
  name text not null,
  email text not null,
  role user_role not null default 'viewer',
  avatar_color text not null default '#2563eb',
  created_at timestamptz not null default now()
);
create index on app_users (tenant_id);

create table clients (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  company_name text not null,
  primary_contact text not null,
  industry text not null,
  engine_phase phase not null default 'diagnose',
  locations text[] not null default '{}',
  created_at timestamptz not null default now()
);
create index on clients (tenant_id);

create table projects (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  client_id uuid not null references clients (id) on delete cascade,
  name text not null,
  phase phase not null default 'diagnose',
  status project_status not null default 'on_track',
  owner owner_kind not null default 'aj_digital',
  objective business_objective not null,
  start_date date,
  target_date date,
  current_milestone text,
  next_action text,
  summary text,
  progress int not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now()
);
create index on projects (tenant_id);

create table milestones (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  project_id uuid not null references projects (id) on delete cascade,
  title text not null,
  due_date date,
  done boolean not null default false
);
create index on milestones (project_id);

create table approval_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  project_id uuid references projects (id) on delete set null,
  type approval_type not null,
  title text not null,
  decision_required text not null,
  recommended_choice text not null,
  why_it_matters text not null,
  risk_level risk_level not null default 'low',
  business_impact text,
  status approval_status not null default 'pending',
  requested_at timestamptz not null default now(),
  due_by timestamptz,
  decided_at timestamptz,
  decided_by text references app_users (id)
);
create index on approval_requests (tenant_id, status);

create table deliverables (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  project_id uuid references projects (id) on delete set null,
  title text not null,
  category deliverable_category not null,
  status deliverable_status not null default 'draft',
  added_at timestamptz not null default now(),
  href text,
  notes text,
  approval_status approval_status
);
create index on deliverables (tenant_id);

create table reports (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  title text not null,
  period text not null,
  published_at timestamptz not null default now(),
  summary text,
  href text
);
create index on reports (tenant_id);

create table support_requests (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  project_id uuid references projects (id) on delete set null,
  type support_type not null,
  priority priority not null default 'normal',
  subject text not null,
  description text,
  status support_status not null default 'open',
  created_by text references app_users (id),
  created_at timestamptz not null default now()
);
create index on support_requests (tenant_id, status);

create table integrations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  name text not null,
  category text not null,
  status integration_status not null default 'not_connected'
);
create index on integrations (tenant_id);

create table attribution_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  label text not null,
  value numeric not null,
  unit text not null,
  period text not null,
  created_at timestamptz not null default now()
);
create index on attribution_events (tenant_id);

create table business_memory_records (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  category text not null,
  key text not null,
  value text not null,
  updated_at timestamptz not null default now()
);
create index on business_memory_records (tenant_id);

create table activity_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references tenants (id) on delete cascade,
  kind text not null,
  message text not null,
  project_id uuid references projects (id) on delete set null,
  at timestamptz not null default now()
);
create index on activity_logs (tenant_id, at desc);

-- ---------------------------------------------------------------------------
-- Tenant resolution + RLS
-- ---------------------------------------------------------------------------

-- Returns the tenant_id for the currently authenticated user. Reads the Clerk
-- user id from the JWT `sub` claim (works once Clerk is configured as a Supabase
-- third-party auth provider). Server-side access uses the service-role key,
-- which bypasses RLS — these policies are defense-in-depth for any anon/client
-- access path.
create or replace function current_tenant_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select tenant_id from app_users where id = (auth.jwt() ->> 'sub')
$$;

-- Enable RLS on every tenant-scoped table.
do $$
declare t text;
begin
  foreach t in array array[
    'tenants','app_users','clients','projects','milestones','approval_requests',
    'deliverables','reports','support_requests','integrations','attribution_events',
    'business_memory_records','activity_logs'
  ]
  loop
    execute format('alter table %I enable row level security;', t);
  end loop;
end $$;

-- app_users: a user can read rows within their own tenant.
create policy app_users_select on app_users
  for select using (tenant_id = current_tenant_id());

-- tenants: a user can read their own tenant.
create policy tenants_select on tenants
  for select using (id = current_tenant_id());

-- Generic tenant-scoped read policy for the data tables.
do $$
declare t text;
begin
  foreach t in array array[
    'clients','projects','milestones','approval_requests','deliverables','reports',
    'support_requests','integrations','attribution_events','business_memory_records','activity_logs'
  ]
  loop
    execute format(
      'create policy %1$s_select on %1$s for select using (tenant_id = current_tenant_id());', t
    );
  end loop;
end $$;

-- Client-writable surfaces: approvals (decide), support (create).
create policy approval_requests_update on approval_requests
  for update using (tenant_id = current_tenant_id())
  with check (tenant_id = current_tenant_id());

create policy support_requests_insert on support_requests
  for insert with check (tenant_id = current_tenant_id());

create policy support_requests_update on support_requests
  for update using (tenant_id = current_tenant_id())
  with check (tenant_id = current_tenant_id());

-- NOTE: AJ Digital operators write all other content via the service-role key
-- (which bypasses RLS) from the internal control plane, not the client portal.
