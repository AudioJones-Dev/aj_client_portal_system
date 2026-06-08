/**
 * Data-access layer.
 *
 * Two backends behind one async API:
 *  - Supabase (when NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are
 *    set): reads via the service-role client, scoped in code to the current
 *    tenant. The tenant is resolved from the Clerk user when auth is on, else
 *    the demo tenant.
 *  - Seed (default for local/preview): reads from src/lib/seed.ts.
 *
 * Components never change between modes.
 */
import * as seed from "./seed";
import { supabaseEnabled, createAdminClient } from "./supabase/admin";
import { authEnabled, getClerkUserId } from "./auth";
import type {
  ActivityLog,
  ApprovalRequest,
  AttributionEvent,
  Client,
  Deliverable,
  Integration,
  Milestone,
  Project,
  Report,
  SupportRequest,
  User,
} from "./types";

export const NOW = seed.NOW;
const DEMO_SLUG = "florida-ramp-lift";

// --- tenant resolution -----------------------------------------------------

type DB = ReturnType<typeof createAdminClient>;

/** Resolve the active tenant id (Clerk user → tenant, else the demo tenant). */
export async function resolveTenantId(db: DB): Promise<string | null> {
  if (authEnabled) {
    const uid = await getClerkUserId();
    if (uid) {
      const { data } = await db.from("app_users").select("tenant_id").eq("id", uid).maybeSingle();
      if (data?.tenant_id) return data.tenant_id as string;
    }
  }
  const { data } = await db.from("tenants").select("id").eq("slug", DEMO_SLUG).maybeSingle();
  return (data?.id as string) ?? null;
}

// --- row mappers (snake_case → domain) -------------------------------------

const mapProject = (r: any): Project => ({
  id: r.id,
  tenantId: r.tenant_id,
  clientId: r.client_id,
  name: r.name,
  phase: r.phase,
  status: r.status,
  owner: r.owner,
  objective: r.objective,
  startDate: r.start_date,
  targetDate: r.target_date,
  currentMilestone: r.current_milestone,
  nextAction: r.next_action,
  summary: r.summary,
  progress: r.progress,
});

const mapApproval = (r: any): ApprovalRequest => ({
  id: r.id,
  tenantId: r.tenant_id,
  projectId: r.project_id,
  type: r.type,
  title: r.title,
  decisionRequired: r.decision_required,
  recommendedChoice: r.recommended_choice,
  whyItMatters: r.why_it_matters,
  riskLevel: r.risk_level,
  businessImpact: r.business_impact,
  status: r.status,
  requestedAt: r.requested_at,
  dueBy: r.due_by ?? undefined,
});

const mapDeliverable = (r: any): Deliverable => ({
  id: r.id,
  tenantId: r.tenant_id,
  projectId: r.project_id,
  title: r.title,
  category: r.category,
  status: r.status,
  addedAt: r.added_at,
  href: r.href,
  notes: r.notes ?? undefined,
  approvalStatus: r.approval_status ?? undefined,
});

const mapMilestone = (r: any): Milestone => ({
  id: r.id,
  projectId: r.project_id,
  title: r.title,
  dueDate: r.due_date,
  done: r.done,
});

const mapSupport = (r: any): SupportRequest => ({
  id: r.id,
  tenantId: r.tenant_id,
  projectId: r.project_id ?? undefined,
  type: r.type,
  priority: r.priority,
  subject: r.subject,
  description: r.description,
  status: r.status,
  createdBy: r.created_by ?? "Client",
  createdAt: r.created_at,
});

const mapIntegration = (r: any): Integration => ({
  id: r.id,
  tenantId: r.tenant_id,
  name: r.name,
  category: r.category,
  status: r.status,
});

const mapAttribution = (r: any): AttributionEvent => ({
  id: r.id,
  tenantId: r.tenant_id,
  label: r.label,
  value: Number(r.value),
  unit: r.unit,
  period: r.period,
});

const mapActivity = (r: any): ActivityLog => ({
  id: r.id,
  tenantId: r.tenant_id,
  kind: r.kind,
  message: r.message,
  at: r.at,
  projectId: r.project_id ?? undefined,
});

// --- helper to run a scoped query or fall back to seed ----------------------

async function scoped<T>(fn: (db: DB, tenantId: string) => Promise<T>, fallback: T): Promise<T> {
  if (!supabaseEnabled) return fallback;
  const db = createAdminClient();
  const tenantId = await resolveTenantId(db);
  if (!tenantId) return fallback;
  return fn(db, tenantId);
}

// --- reads ------------------------------------------------------------------

export async function getCurrentUser(): Promise<User> {
  return scoped(async (db, tenantId) => {
    let row: any = null;
    if (authEnabled) {
      const uid = await getClerkUserId();
      if (uid) {
        const { data } = await db.from("app_users").select("*").eq("id", uid).maybeSingle();
        row = data;
      }
    }
    if (!row) {
      const { data } = await db
        .from("app_users")
        .select("*")
        .eq("tenant_id", tenantId)
        .order("created_at")
        .limit(1)
        .maybeSingle();
      row = data;
    }
    if (!row) return seed.currentUser;
    return {
      id: row.id,
      tenantId: row.tenant_id,
      name: row.name,
      email: row.email,
      role: row.role,
      avatarColor: row.avatar_color,
    } as User;
  }, seed.currentUser);
}

export async function getClient(): Promise<Client> {
  return scoped(async (db, tenantId) => {
    const { data } = await db.from("clients").select("*").eq("tenant_id", tenantId).maybeSingle();
    if (!data) return seed.client;
    return {
      id: data.id,
      tenantId: data.tenant_id,
      companyName: data.company_name,
      primaryContact: data.primary_contact,
      industry: data.industry,
      enginePhase: data.engine_phase,
      locations: data.locations ?? [],
    } as Client;
  }, seed.client);
}

export async function getProjects(): Promise<Project[]> {
  return scoped(async (db, tenantId) => {
    const { data } = await db
      .from("projects")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at");
    return (data ?? []).map(mapProject);
  }, seed.projects);
}

export async function getProject(id: string): Promise<Project | undefined> {
  return scoped(async (db, tenantId) => {
    const { data } = await db
      .from("projects")
      .select("*")
      .eq("tenant_id", tenantId)
      .eq("id", id)
      .maybeSingle();
    return data ? mapProject(data) : undefined;
  }, seed.projects.find((p) => p.id === id));
}

export async function getMilestones(projectId: string): Promise<Milestone[]> {
  return scoped(async (db, tenantId) => {
    const { data } = await db
      .from("milestones")
      .select("*")
      .eq("tenant_id", tenantId)
      .eq("project_id", projectId)
      .order("due_date");
    return (data ?? []).map(mapMilestone);
  }, seed.milestones.filter((m) => m.projectId === projectId));
}

export async function getApprovals(): Promise<ApprovalRequest[]> {
  return scoped(async (db, tenantId) => {
    const { data } = await db
      .from("approval_requests")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("requested_at", { ascending: false });
    return (data ?? []).map(mapApproval);
  }, seed.approvals);
}

export async function getPendingApprovals(): Promise<ApprovalRequest[]> {
  return (await getApprovals()).filter((a) => a.status === "pending");
}

export async function getApprovalsForProject(projectId: string): Promise<ApprovalRequest[]> {
  return (await getApprovals()).filter((a) => a.projectId === projectId);
}

export async function getDeliverables(): Promise<Deliverable[]> {
  return scoped(async (db, tenantId) => {
    const { data } = await db
      .from("deliverables")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("added_at", { ascending: false });
    return (data ?? []).map(mapDeliverable);
  }, [...seed.deliverables].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()));
}

export async function getDeliverablesForProject(projectId: string): Promise<Deliverable[]> {
  return (await getDeliverables()).filter((d) => d.projectId === projectId);
}

export async function getReports(): Promise<Report[]> {
  return scoped(async (db, tenantId) => {
    const { data } = await db
      .from("reports")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("published_at", { ascending: false });
    return (data ?? []).map((r: any) => ({
      id: r.id,
      tenantId: r.tenant_id,
      title: r.title,
      period: r.period,
      publishedAt: r.published_at,
      summary: r.summary,
      href: r.href,
    }));
  }, seed.reports);
}

export async function getSupportRequests(): Promise<SupportRequest[]> {
  return scoped(async (db, tenantId) => {
    const { data } = await db
      .from("support_requests")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("created_at", { ascending: false });
    return (data ?? []).map(mapSupport);
  }, seed.supportRequests);
}

export async function getIntegrations(): Promise<Integration[]> {
  return scoped(async (db, tenantId) => {
    const { data } = await db.from("integrations").select("*").eq("tenant_id", tenantId);
    return (data ?? []).map(mapIntegration);
  }, seed.integrations);
}

export async function getAttribution(): Promise<AttributionEvent[]> {
  return scoped(async (db, tenantId) => {
    const { data } = await db.from("attribution_events").select("*").eq("tenant_id", tenantId);
    return (data ?? []).map(mapAttribution);
  }, seed.attribution);
}

export async function getActivity(): Promise<ActivityLog[]> {
  return scoped(async (db, tenantId) => {
    const { data } = await db
      .from("activity_logs")
      .select("*")
      .eq("tenant_id", tenantId)
      .order("at", { ascending: false });
    return (data ?? []).map(mapActivity);
  }, [...seed.activity].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()));
}

export async function getActivityForProject(projectId: string): Promise<ActivityLog[]> {
  return (await getActivity()).filter((a) => a.projectId === projectId);
}
