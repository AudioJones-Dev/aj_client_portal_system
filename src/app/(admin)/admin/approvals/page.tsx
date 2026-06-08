import { getApprovals } from "@/lib/data";
import { ApprovalDecide } from "@/components/admin/approval-decide";

export const dynamic = "force-dynamic";

export default async function AdminApprovals() {
  const approvals = await getApprovals();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-tx">Approvals</h1>
      {approvals.length === 0 ? (
        <p className="text-sm text-tx3">No approval requests.</p>
      ) : (
        <div className="space-y-3">
          {approvals.map((a) => (
            <div key={a.id} className="rounded-card border border-line bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-tx">{a.title}</div>
                  <div className="text-xs text-tx3">{a.type} · risk {a.riskLevel}</div>
                </div>
                <span className="shrink-0 rounded-pill border border-line px-2 py-0.5 text-xs text-tx2">{a.status}</span>
              </div>
              <p className="mt-2 text-sm text-tx2">{a.decisionRequired}</p>
              <p className="mt-1 text-xs text-tx3">Recommended: {a.recommendedChoice}</p>
              {a.status === "pending" && <ApprovalDecide approvalId={a.id} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
