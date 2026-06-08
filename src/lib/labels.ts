/**
 * Presentation maps — client-friendly labels and tone for enum values.
 * Keeps domain enums (snake_case) decoupled from how they read in the UI.
 */
import type {
  ApprovalStatus,
  ApprovalType,
  BusinessObjective,
  DeliverableCategory,
  IntegrationStatus,
  Owner,
  Phase,
  Priority,
  ProjectStatus,
  RiskLevel,
  SupportStatus,
} from "./types";

export type Tone = "ok" | "warn" | "bad" | "info" | "neutral" | "signal";

export const phaseLabel: Record<Phase, string> = {
  diagnose: "Diagnose",
  design: "Design",
  build: "Build",
  operate: "Operate",
};

export const projectStatusLabel: Record<ProjectStatus, string> = {
  on_track: "On track",
  waiting: "Waiting",
  blocked: "Blocked",
  complete: "Complete",
};

export const projectStatusTone: Record<ProjectStatus, Tone> = {
  on_track: "ok",
  waiting: "warn",
  blocked: "bad",
  complete: "info",
};

export const ownerLabel: Record<Owner, string> = {
  aj_digital: "AJ Digital",
  client: "You",
  third_party: "Third party",
};

export const objectiveLabel: Record<BusinessObjective, string> = {
  reduce_spend: "Reduce spend",
  increase_profit: "Increase profit",
  reduce_risk: "Reduce risk",
  increase_signal: "Increase signal",
};

export const riskLabel: Record<RiskLevel, string> = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
};

export const riskTone: Record<RiskLevel, Tone> = {
  low: "ok",
  medium: "warn",
  high: "bad",
};

export const approvalTypeLabel: Record<ApprovalType, string> = {
  content: "Content",
  workflow: "Workflow",
  access: "Access",
  strategy: "Strategy",
  spend: "Spend",
  data: "Data",
  public_claim: "Public claim",
};

export const approvalStatusLabel: Record<ApprovalStatus, string> = {
  pending: "Awaiting you",
  approved: "Approved",
  changes_requested: "Changes requested",
  rejected: "Rejected",
};

export const approvalStatusTone: Record<ApprovalStatus, Tone> = {
  pending: "signal",
  approved: "ok",
  changes_requested: "warn",
  rejected: "bad",
};

export const deliverableCategoryLabel: Record<DeliverableCategory, string> = {
  strategy: "Strategy",
  brand: "Brand",
  content: "Content",
  system_docs: "System docs",
  training: "Training",
  reports: "Reports",
  contracts: "Contracts",
};

export const deliverableStatusLabel: Record<string, string> = {
  draft: "Draft",
  in_review: "In review",
  delivered: "Delivered",
  archived: "Archived",
};

export const supportStatusLabel: Record<SupportStatus, string> = {
  open: "Open",
  in_progress: "In progress",
  waiting_on_client: "Waiting on you",
  resolved: "Resolved",
};

export const supportStatusTone: Record<SupportStatus, Tone> = {
  open: "info",
  in_progress: "warn",
  waiting_on_client: "signal",
  resolved: "ok",
};

export const priorityLabel: Record<Priority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

export const priorityTone: Record<Priority, Tone> = {
  low: "neutral",
  normal: "info",
  high: "warn",
  urgent: "bad",
};

export const integrationStatusLabel: Record<IntegrationStatus, string> = {
  connected: "Connected",
  needs_setup: "Needs setup",
  pending_approval: "Pending approval",
  paused: "Paused",
  not_connected: "Not connected",
};

export const integrationStatusTone: Record<IntegrationStatus, Tone> = {
  connected: "ok",
  needs_setup: "warn",
  pending_approval: "signal",
  paused: "neutral",
  not_connected: "neutral",
};
