"use server";

import { revalidatePath } from "next/cache";
import { supabaseEnabled, createAdminClient } from "./supabase/admin";
import { resolveTenantId } from "./data";
import type { ApprovalStatus, Priority, SupportType } from "./types";

type ActionResult = { ok: boolean; persisted: boolean; error?: string };

const decisionMessage: Record<Exclude<ApprovalStatus, "pending">, string> = {
  approved: "Approval granted",
  changes_requested: "Changes requested on approval",
  rejected: "Approval rejected",
};

/**
 * Persist an approval decision and write an activity-log entry.
 * In seed-mode (no Supabase) this is a soft no-op — the UI keeps its optimistic
 * state — so the same call works locally and in production.
 */
export async function decideApproval(
  approvalId: string,
  decision: Exclude<ApprovalStatus, "pending">,
): Promise<ActionResult> {
  if (!supabaseEnabled) return { ok: true, persisted: false };

  try {
    const db = createAdminClient();
    const tenantId = await resolveTenantId(db);
    if (!tenantId) return { ok: false, persisted: false, error: "No tenant" };

    const { data: approval, error } = await db
      .from("approval_requests")
      .update({ status: decision, decided_at: new Date().toISOString() })
      .eq("id", approvalId)
      .eq("tenant_id", tenantId)
      .select("title, project_id")
      .maybeSingle();

    if (error) return { ok: false, persisted: false, error: error.message };

    await db.from("activity_logs").insert({
      tenant_id: tenantId,
      kind: "approval_decided",
      message: `${decisionMessage[decision]}: ${approval?.title ?? "request"}`,
      project_id: approval?.project_id ?? null,
    });

    revalidatePath("/approvals");
    revalidatePath("/home");
    if (approval?.project_id) revalidatePath(`/projects/${approval.project_id}`);

    return { ok: true, persisted: true };
  } catch (e) {
    return { ok: false, persisted: false, error: (e as Error).message };
  }
}

export async function submitSupportRequest(input: {
  type: SupportType;
  priority: Priority;
  projectId?: string;
  subject: string;
  description: string;
}): Promise<ActionResult> {
  if (!supabaseEnabled) return { ok: true, persisted: false };

  try {
    const db = createAdminClient();
    const tenantId = await resolveTenantId(db);
    if (!tenantId) return { ok: false, persisted: false, error: "No tenant" };

    const { error } = await db.from("support_requests").insert({
      tenant_id: tenantId,
      type: input.type,
      priority: input.priority,
      project_id: input.projectId || null,
      subject: input.subject,
      description: input.description,
      status: "open",
    });

    if (error) return { ok: false, persisted: false, error: error.message };

    revalidatePath("/support");
    return { ok: true, persisted: true };
  } catch (e) {
    return { ok: false, persisted: false, error: (e as Error).message };
  }
}

/** Admin: publish a report to the client. */
export async function publishReport(input: {
  title: string;
  period: string;
  summary: string;
  href?: string;
}): Promise<ActionResult> {
  if (!supabaseEnabled) return { ok: true, persisted: false };
  try {
    const db = createAdminClient();
    const tenantId = await resolveTenantId(db);
    if (!tenantId) return { ok: false, persisted: false, error: "No tenant" };
    const { error } = await db.from("reports").insert({
      tenant_id: tenantId,
      title: input.title,
      period: input.period,
      summary: input.summary,
      href: input.href || "#",
      published_at: new Date().toISOString(),
    });
    if (error) return { ok: false, persisted: false, error: error.message };
    revalidatePath("/reports");
    revalidatePath("/admin/reports");
    revalidatePath("/home");
    return { ok: true, persisted: true };
  } catch (e) {
    return { ok: false, persisted: false, error: (e as Error).message };
  }
}

/** Admin: add a deliverable to a project. */
export async function addDeliverable(input: {
  title: string;
  category: string;
  status: string;
  projectId: string;
  href?: string;
}): Promise<ActionResult> {
  if (!supabaseEnabled) return { ok: true, persisted: false };
  try {
    const db = createAdminClient();
    const tenantId = await resolveTenantId(db);
    if (!tenantId) return { ok: false, persisted: false, error: "No tenant" };
    const { error } = await db.from("deliverables").insert({
      tenant_id: tenantId,
      project_id: input.projectId,
      title: input.title,
      category: input.category,
      status: input.status,
      href: input.href || "#",
      added_at: new Date().toISOString(),
    });
    if (error) return { ok: false, persisted: false, error: error.message };
    revalidatePath("/deliverables");
    revalidatePath("/admin/deliverables");
    return { ok: true, persisted: true };
  } catch (e) {
    return { ok: false, persisted: false, error: (e as Error).message };
  }
}
