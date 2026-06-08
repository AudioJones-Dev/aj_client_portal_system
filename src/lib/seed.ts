import type {
  ActivityLog,
  ApprovalRequest,
  AttributionEvent,
  BusinessMemoryRecord,
  Client,
  Deliverable,
  Integration,
  Milestone,
  Project,
  Report,
  SupportRequest,
  Tenant,
  User,
} from "./types";

/**
 * Demo seed for "Florida Ramp & Lift" — a founder-led mobility access
 * service business. Used to drive the portal UI before Supabase is wired.
 * "Now" is anchored so relative timestamps render deterministically.
 */
export const NOW = "2026-06-07T14:00:00Z";

export const tenant: Tenant = {
  id: "tnt_frl",
  name: "Florida Ramp & Lift",
  slug: "florida-ramp-lift",
};

export const currentUser: User = {
  id: "usr_michael",
  tenantId: tenant.id,
  name: "Michael Alvarez",
  email: "michael@floridaramplift.com",
  role: "owner",
  avatarColor: "#2563eb",
};

export const client: Client = {
  id: "cli_frl",
  tenantId: tenant.id,
  companyName: "Florida Ramp & Lift",
  primaryContact: "Michael Alvarez",
  industry: "Mobility Access & Home Modification",
  enginePhase: "build",
  locations: ["Tampa, FL", "St. Petersburg, FL", "Sarasota, FL"],
};

export const projects: Project[] = [
  {
    id: "prj_diag",
    tenantId: tenant.id,
    clientId: client.id,
    name: "AI Readiness Diagnostic",
    phase: "diagnose",
    status: "complete",
    owner: "aj_digital",
    objective: "increase_signal",
    startDate: "2026-04-10",
    targetDate: "2026-04-28",
    currentMilestone: "Findings delivered",
    nextAction: "Review priority fixes with Michael",
    summary:
      "Baseline assessment of systems, data quality, and revenue leaks to sequence the build.",
    progress: 100,
  },
  {
    id: "prj_speed",
    tenantId: tenant.id,
    clientId: client.id,
    name: "Speed-to-Lead System",
    phase: "build",
    status: "on_track",
    owner: "aj_digital",
    objective: "increase_profit",
    startDate: "2026-05-05",
    targetDate: "2026-06-20",
    currentMilestone: "Routing & instant-response live in staging",
    nextAction: "Approve the new inbound response message",
    summary:
      "Capture every inbound lead and respond within 60 seconds across calls, forms, and messages.",
    progress: 72,
  },
  {
    id: "prj_crm",
    tenantId: tenant.id,
    clientId: client.id,
    name: "Client CRM Setup",
    phase: "build",
    status: "waiting",
    owner: "client",
    objective: "increase_signal",
    startDate: "2026-05-12",
    targetDate: "2026-06-25",
    currentMilestone: "Pipeline stages configured",
    nextAction: "Confirm CRM access so we can import contacts",
    summary:
      "A single source of truth for leads, jobs, and follow-ups with clean pipeline stages.",
    progress: 45,
  },
  {
    id: "prj_voice",
    tenantId: tenant.id,
    clientId: client.id,
    name: "Voice Agent / Receptionist",
    phase: "design",
    status: "blocked",
    owner: "aj_digital",
    objective: "reduce_spend",
    startDate: "2026-05-20",
    targetDate: "2026-07-10",
    currentMilestone: "Call-flow script drafted",
    nextAction: "Approve call-handling script & after-hours policy",
    summary:
      "Never miss a call — answer, qualify, and book after-hours and overflow inquiries automatically.",
    progress: 30,
  },
  {
    id: "prj_content",
    tenantId: tenant.id,
    clientId: client.id,
    name: "Content Engine",
    phase: "operate",
    status: "on_track",
    owner: "aj_digital",
    objective: "increase_signal",
    startDate: "2026-03-15",
    targetDate: "2026-12-31",
    currentMilestone: "Weekly publishing cadence running",
    nextAction: "Approve June content calendar",
    summary:
      "Consistent, on-brand authority content that compounds local search visibility.",
    progress: 88,
  },
  {
    id: "prj_attr",
    tenantId: tenant.id,
    clientId: client.id,
    name: "Attribution Dashboard",
    phase: "design",
    status: "on_track",
    owner: "aj_digital",
    objective: "increase_profit",
    startDate: "2026-06-01",
    targetDate: "2026-07-20",
    currentMilestone: "Metric definitions agreed",
    nextAction: "Connect Google Analytics property",
    summary:
      "Trace outcomes back to the actions that produced them — leads, revenue, and time saved.",
    progress: 18,
  },
];

export const milestones: Milestone[] = [
  { id: "ms_1", projectId: "prj_speed", title: "Lead capture wired across channels", dueDate: "2026-05-18", done: true },
  { id: "ms_2", projectId: "prj_speed", title: "Instant-response live in staging", dueDate: "2026-06-02", done: true },
  { id: "ms_3", projectId: "prj_speed", title: "Inbound message approved & shipped", dueDate: "2026-06-12", done: false },
  { id: "ms_4", projectId: "prj_speed", title: "Production rollout + monitoring", dueDate: "2026-06-20", done: false },
  { id: "ms_5", projectId: "prj_crm", title: "Pipeline stages configured", dueDate: "2026-05-28", done: true },
  { id: "ms_6", projectId: "prj_crm", title: "CRM access granted", dueDate: "2026-06-10", done: false },
  { id: "ms_7", projectId: "prj_crm", title: "Contacts imported & deduped", dueDate: "2026-06-25", done: false },
  { id: "ms_8", projectId: "prj_voice", title: "Call-flow script approved", dueDate: "2026-06-14", done: false },
];

export const approvals: ApprovalRequest[] = [
  {
    id: "apr_msg",
    tenantId: tenant.id,
    projectId: "prj_speed",
    type: "content",
    title: "Inbound instant-response message",
    decisionRequired: "Approve the auto-response sent to every new lead within 60 seconds.",
    recommendedChoice: "Approve as written",
    whyItMatters:
      "This is the first thing every prospect sees. Faster, on-brand responses are the single biggest driver of booked estimates.",
    riskLevel: "low",
    businessImpact: "Estimated +15–25% lead-to-estimate conversion",
    status: "pending",
    requestedAt: "2026-06-06T15:30:00Z",
    dueBy: "2026-06-10T23:59:00Z",
  },
  {
    id: "apr_voice",
    tenantId: tenant.id,
    projectId: "prj_voice",
    type: "strategy",
    title: "Call-handling script & after-hours policy",
    decisionRequired:
      "Approve how after-hours and overflow calls are answered, qualified, and booked.",
    recommendedChoice: "Approve with the recommended after-hours booking window",
    whyItMatters:
      "Missed calls are missed revenue. This unblocks the receptionist build and protects your reputation for responsiveness.",
    riskLevel: "medium",
    businessImpact: "Recover an estimated 8–12 missed calls / week",
    status: "pending",
    requestedAt: "2026-06-05T18:10:00Z",
    dueBy: "2026-06-14T23:59:00Z",
  },
  {
    id: "apr_content",
    tenantId: tenant.id,
    projectId: "prj_content",
    type: "content",
    title: "June content calendar",
    decisionRequired: "Approve the 8-piece June publishing plan across blog and social.",
    recommendedChoice: "Approve all 8 pieces",
    whyItMatters:
      "Keeps your authority content compounding without a gap in cadence heading into peak season.",
    riskLevel: "low",
    businessImpact: "Sustains local search momentum",
    status: "pending",
    requestedAt: "2026-06-04T12:00:00Z",
    dueBy: "2026-06-09T23:59:00Z",
  },
  {
    id: "apr_crm",
    tenantId: tenant.id,
    projectId: "prj_crm",
    type: "access",
    title: "CRM access for contact import",
    decisionRequired: "Grant import access so we can migrate and dedupe your existing contacts.",
    recommendedChoice: "Approve read/write for the migration window",
    whyItMatters:
      "We can't populate your new pipeline until contacts are imported. This is the current blocker.",
    riskLevel: "medium",
    businessImpact: "Unblocks CRM go-live by ~2 weeks",
    status: "pending",
    requestedAt: "2026-06-03T09:45:00Z",
  },
  {
    id: "apr_diag",
    tenantId: tenant.id,
    projectId: "prj_diag",
    type: "strategy",
    title: "Diagnostic priority fixes",
    decisionRequired: "Approve the recommended build sequence from the readiness diagnostic.",
    recommendedChoice: "Approve recommended sequence",
    whyItMatters: "Sets the order of the whole engagement around the highest-impact fixes first.",
    riskLevel: "low",
    businessImpact: "Focuses spend on highest-ROI systems",
    status: "approved",
    requestedAt: "2026-04-26T16:00:00Z",
  },
];

export const deliverables: Deliverable[] = [
  {
    id: "del_diag",
    tenantId: tenant.id,
    projectId: "prj_diag",
    title: "AI Readiness Diagnostic — Findings & Roadmap",
    category: "strategy",
    status: "delivered",
    addedAt: "2026-04-28T10:00:00Z",
    href: "#",
    notes: "Score, risks, and prioritized build sequence.",
    approvalStatus: "approved",
  },
  {
    id: "del_brand",
    tenantId: tenant.id,
    projectId: "prj_content",
    title: "Brand Voice & Messaging Guide",
    category: "brand",
    status: "delivered",
    addedAt: "2026-05-02T10:00:00Z",
    href: "#",
  },
  {
    id: "del_flow",
    tenantId: tenant.id,
    projectId: "prj_speed",
    title: "Speed-to-Lead — Workflow Map",
    category: "system_docs",
    status: "delivered",
    addedAt: "2026-06-02T10:00:00Z",
    href: "#",
  },
  {
    id: "del_msg",
    tenantId: tenant.id,
    projectId: "prj_speed",
    title: "Inbound Response Message — Draft v2",
    category: "content",
    status: "in_review",
    addedAt: "2026-06-06T10:00:00Z",
    href: "#",
    approvalStatus: "pending",
  },
  {
    id: "del_cal",
    tenantId: tenant.id,
    projectId: "prj_content",
    title: "June Content Calendar",
    category: "content",
    status: "in_review",
    addedAt: "2026-06-04T10:00:00Z",
    href: "#",
    approvalStatus: "pending",
  },
];

export const reports: Report[] = [
  {
    id: "rep_may",
    tenantId: tenant.id,
    title: "May Operating Recap",
    period: "May 2026",
    publishedAt: "2026-06-01T09:00:00Z",
    summary: "Speed-to-Lead build progress, content performance, and time-saved breakdown.",
    href: "#",
  },
  {
    id: "rep_apr",
    tenantId: tenant.id,
    title: "April Operating Recap",
    period: "April 2026",
    publishedAt: "2026-05-01T09:00:00Z",
    summary: "Diagnostic findings and the agreed build roadmap.",
    href: "#",
  },
];

export const supportRequests: SupportRequest[] = [
  {
    id: "sup_1",
    tenantId: tenant.id,
    projectId: "prj_crm",
    type: "access",
    priority: "high",
    subject: "Where do I grant CRM access?",
    description: "Not sure which permission level to give for the contact import.",
    status: "in_progress",
    createdBy: "Michael Alvarez",
    createdAt: "2026-06-05T11:00:00Z",
  },
  {
    id: "sup_2",
    type: "question",
    tenantId: tenant.id,
    priority: "normal",
    subject: "Can we add Sarasota to the service area pages?",
    description: "We just started taking jobs in Sarasota — want it reflected in content.",
    status: "open",
    createdBy: "Michael Alvarez",
    createdAt: "2026-06-06T19:30:00Z",
  },
];

export const integrations: Integration[] = [
  { id: "int_web", tenantId: tenant.id, name: "Website", category: "Web", status: "connected" },
  { id: "int_gbp", tenantId: tenant.id, name: "Google Business Profile", category: "Local", status: "connected" },
  { id: "int_email", tenantId: tenant.id, name: "Email", category: "Comms", status: "connected" },
  { id: "int_call", tenantId: tenant.id, name: "Call System", category: "Comms", status: "connected" },
  { id: "int_cal", tenantId: tenant.id, name: "Calendar", category: "Scheduling", status: "pending_approval" },
  { id: "int_crm", tenantId: tenant.id, name: "CRM", category: "Sales", status: "needs_setup" },
  { id: "int_social", tenantId: tenant.id, name: "Social Scheduler", category: "Content", status: "paused" },
  { id: "int_ga", tenantId: tenant.id, name: "Analytics", category: "Measurement", status: "needs_setup" },
  { id: "int_pay", tenantId: tenant.id, name: "Payment System", category: "Finance", status: "not_connected" },
];

export const attribution: AttributionEvent[] = [
  { id: "att_time", tenantId: tenant.id, label: "estimated_time_saved", value: 14.5, unit: "hours", period: "June 2026" },
  { id: "att_rev", tenantId: tenant.id, label: "revenue_influenced", value: 9200, unit: "USD", period: "June 2026" },
  { id: "att_manual", tenantId: tenant.id, label: "manual_work_reduced", value: 63, unit: "steps", period: "June 2026" },
  { id: "att_risk", tenantId: tenant.id, label: "operational_risk_reduced", value: 2, unit: "leaks closed", period: "June 2026" },
];

export const businessMemory: BusinessMemoryRecord[] = [
  { id: "bm_1", tenantId: tenant.id, category: "Company profile", key: "Services", value: "Wheelchair ramps, stair lifts, vehicle lifts, home access modifications", updatedAt: "2026-05-02T10:00:00Z" },
  { id: "bm_2", tenantId: tenant.id, category: "Customer memory", key: "ICP", value: "Adult children arranging access for aging parents; occupational therapists referring patients", updatedAt: "2026-05-02T10:00:00Z" },
  { id: "bm_3", tenantId: tenant.id, category: "Sales memory", key: "Top revenue leak", value: "After-hours calls going to voicemail and never returned", updatedAt: "2026-04-28T10:00:00Z" },
  { id: "bm_4", tenantId: tenant.id, category: "Brand memory", key: "Tone", value: "Warm, reassuring, expert — dignity-first language, never clinical", updatedAt: "2026-05-02T10:00:00Z" },
];

export const activity: ActivityLog[] = [
  { id: "act_1", tenantId: tenant.id, kind: "approval_requested", message: "Approval requested: Inbound instant-response message", at: "2026-06-06T15:30:00Z", projectId: "prj_speed" },
  { id: "act_2", tenantId: tenant.id, kind: "deliverable_added", message: "Deliverable added: Inbound Response Message — Draft v2", at: "2026-06-06T10:00:00Z", projectId: "prj_speed" },
  { id: "act_3", tenantId: tenant.id, kind: "milestone_reached", message: "Milestone reached: Instant-response live in staging", at: "2026-06-02T16:20:00Z", projectId: "prj_speed" },
  { id: "act_4", tenantId: tenant.id, kind: "report_published", message: "Report published: May Operating Recap", at: "2026-06-01T09:00:00Z" },
  { id: "act_5", tenantId: tenant.id, kind: "approval_requested", message: "Approval requested: June content calendar", at: "2026-06-04T12:00:00Z", projectId: "prj_content" },
  { id: "act_6", tenantId: tenant.id, kind: "integration_changed", message: "Calendar integration is pending your approval", at: "2026-06-03T14:00:00Z" },
];
