/**
 * AJ Digital Client Portal — domain types.
 *
 * These mirror the Supabase schema in supabase/migrations/0001_init.sql.
 * The seed layer (seed.ts) and the data-access layer (data.ts) are typed
 * against these so swapping seed → Supabase later is type-safe.
 *
 * Client-facing language only: "systems", "diagnostics", "approvals",
 * "deliverables", "outcomes", "business memory" — never bots/agents/prompts.
 */

export type Phase = "diagnose" | "design" | "build" | "operate";

export type ProjectStatus = "on_track" | "waiting" | "blocked" | "complete";

export type Owner = "aj_digital" | "client" | "third_party";

/** Every project ties to one of the four OS value levers. */
export type BusinessObjective =
  | "reduce_spend"
  | "increase_profit"
  | "reduce_risk"
  | "increase_signal";

export type RiskLevel = "low" | "medium" | "high";

export type ApprovalType =
  | "content"
  | "workflow"
  | "access"
  | "strategy"
  | "spend"
  | "data"
  | "public_claim";

export type ApprovalStatus = "pending" | "approved" | "changes_requested" | "rejected";

export type DeliverableCategory =
  | "strategy"
  | "brand"
  | "content"
  | "system_docs"
  | "training"
  | "reports"
  | "contracts";

export type DeliverableStatus = "draft" | "in_review" | "delivered" | "archived";

export type SupportType = "question" | "issue" | "request" | "access" | "billing";

export type Priority = "low" | "normal" | "high" | "urgent";

export type SupportStatus = "open" | "in_progress" | "waiting_on_client" | "resolved";

export type IntegrationStatus =
  | "connected"
  | "needs_setup"
  | "pending_approval"
  | "paused"
  | "not_connected";

export type AttributionLabel =
  | "estimated_time_saved"
  | "revenue_influenced"
  | "confirmed_revenue"
  | "operational_risk_reduced"
  | "manual_work_reduced";

export type ActivityKind =
  | "deliverable_added"
  | "approval_requested"
  | "approval_decided"
  | "milestone_reached"
  | "project_updated"
  | "integration_changed"
  | "report_published";

// ---------------------------------------------------------------------------

export interface Tenant {
  id: string;
  name: string;
  /** subdomain or slug, e.g. "florida-ramp-lift" */
  slug: string;
}

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "viewer";
  avatarColor: string;
}

export interface Client {
  id: string;
  tenantId: string;
  companyName: string;
  primaryContact: string;
  industry: string;
  /** The phase the overall engagement is in. */
  enginePhase: Phase;
  locations: string[];
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  dueDate: string;
  done: boolean;
}

export interface Project {
  id: string;
  tenantId: string;
  clientId: string;
  name: string;
  phase: Phase;
  status: ProjectStatus;
  owner: Owner;
  objective: BusinessObjective;
  startDate: string;
  targetDate: string;
  currentMilestone: string;
  nextAction: string;
  summary: string;
  progress: number; // 0-100
}

export interface ApprovalRequest {
  id: string;
  tenantId: string;
  projectId: string;
  type: ApprovalType;
  title: string;
  decisionRequired: string;
  recommendedChoice: string;
  whyItMatters: string;
  riskLevel: RiskLevel;
  businessImpact: string;
  status: ApprovalStatus;
  requestedAt: string;
  dueBy?: string;
}

export interface Deliverable {
  id: string;
  tenantId: string;
  projectId: string;
  title: string;
  category: DeliverableCategory;
  status: DeliverableStatus;
  addedAt: string;
  href: string;
  notes?: string;
  approvalStatus?: ApprovalStatus;
}

export interface Report {
  id: string;
  tenantId: string;
  title: string;
  period: string;
  publishedAt: string;
  summary: string;
  href: string;
}

export interface SupportRequest {
  id: string;
  tenantId: string;
  projectId?: string;
  type: SupportType;
  priority: Priority;
  subject: string;
  description: string;
  status: SupportStatus;
  createdBy: string;
  createdAt: string;
}

export interface Integration {
  id: string;
  tenantId: string;
  name: string;
  category: string;
  status: IntegrationStatus;
}

export interface AttributionEvent {
  id: string;
  tenantId: string;
  label: AttributionLabel;
  value: number;
  unit: string; // "hours", "USD", "steps", "%"
  period: string;
}

export interface BusinessMemoryRecord {
  id: string;
  tenantId: string;
  category: string;
  key: string;
  value: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  tenantId: string;
  kind: ActivityKind;
  message: string;
  at: string;
  projectId?: string;
}
