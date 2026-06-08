"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { decideApproval } from "@/lib/actions";

export function ApprovalDecide({ approvalId }: { approvalId: string }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  function decide(d: "approved" | "changes_requested" | "rejected") {
    start(async () => {
      const r = await decideApproval(approvalId, d);
      setMsg(r.ok ? (r.persisted ? "Saved" : "Saved (demo)") : r.error || "Failed");
      if (r.ok) router.refresh();
    });
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <button onClick={() => decide("approved")} disabled={pending}
        className="rounded-pill bg-signal px-3 py-1 text-xs font-semibold text-signal-ink disabled:opacity-50">Approve</button>
      <button onClick={() => decide("changes_requested")} disabled={pending}
        className="rounded-pill border border-line px-3 py-1 text-xs font-medium text-tx2 hover:text-tx disabled:opacity-50">Request changes</button>
      <button onClick={() => decide("rejected")} disabled={pending}
        className="rounded-pill border border-line px-3 py-1 text-xs font-medium text-tx2 hover:text-tx disabled:opacity-50">Reject</button>
      {msg && <span className="text-xs text-tx3">{msg}</span>}
    </div>
  );
}
