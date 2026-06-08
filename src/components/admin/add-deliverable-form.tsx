"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { addDeliverable } from "@/lib/actions";

const input = "rounded-lg border border-line bg-inset px-3 py-2 text-sm text-tx placeholder:text-tx3 focus:border-signal focus:outline-none";
const CATEGORIES = ["strategy", "brand", "content", "system_docs", "training", "reports", "contracts"];
const STATUSES = ["draft", "in_review", "delivered", "archived"];

export function AddDeliverableForm({ projects }: { projects: { id: string; name: string }[] }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      title: String(fd.get("title") || ""),
      category: String(fd.get("category") || "content"),
      status: String(fd.get("status") || "draft"),
      projectId: String(fd.get("projectId") || ""),
    };
    if (!payload.title || !payload.projectId) return;
    start(async () => {
      const r = await addDeliverable(payload);
      setMsg(r.ok ? (r.persisted ? "Added" : "Saved (demo — set Supabase service key to persist)") : r.error || "Failed");
      if (r.ok) { form.reset(); router.refresh(); }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-card border border-line bg-surface p-4">
      <div className="font-display font-semibold text-tx">Add a deliverable</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="title" placeholder="Title" required className={input} />
        <select name="projectId" required className={input} defaultValue="">
          <option value="" disabled>Project…</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select name="category" className={input} defaultValue="content">
          {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
        </select>
        <select name="status" className={input} defaultValue="draft">
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <button disabled={pending} className="rounded-pill bg-signal px-4 py-1.5 text-xs font-semibold text-signal-ink disabled:opacity-50">
          {pending ? "Adding…" : "Add deliverable"}
        </button>
        {msg && <span className="text-xs text-tx3">{msg}</span>}
      </div>
    </form>
  );
}
