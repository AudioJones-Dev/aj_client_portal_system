"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { publishReport } from "@/lib/actions";

const input = "rounded-lg border border-line bg-inset px-3 py-2 text-sm text-tx placeholder:text-tx3 focus:border-signal focus:outline-none";

export function AddReportForm() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      title: String(fd.get("title") || ""),
      period: String(fd.get("period") || ""),
      summary: String(fd.get("summary") || ""),
    };
    if (!payload.title) return;
    start(async () => {
      const r = await publishReport(payload);
      setMsg(r.ok ? (r.persisted ? "Published" : "Saved (demo — set Supabase service key to persist)") : r.error || "Failed");
      if (r.ok) { form.reset(); router.refresh(); }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-card border border-line bg-surface p-4">
      <div className="font-display font-semibold text-tx">Publish a report</div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="title" placeholder="Title" required className={input} />
        <input name="period" placeholder="Period (e.g. May 2026)" className={input} />
      </div>
      <textarea name="summary" placeholder="Summary" rows={2} className={`${input} w-full`} />
      <div className="flex items-center gap-3">
        <button disabled={pending} className="rounded-pill bg-signal px-4 py-1.5 text-xs font-semibold text-signal-ink disabled:opacity-50">
          {pending ? "Publishing…" : "Publish"}
        </button>
        {msg && <span className="text-xs text-tx3">{msg}</span>}
      </div>
    </form>
  );
}
