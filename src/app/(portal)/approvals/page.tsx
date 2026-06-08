import { CheckCircle2 } from "lucide-react";
import { ApprovalCard } from "@/components/approvals/approval-card";
import { Card, CardBody } from "@/components/ui/card";
import { getApprovals } from "@/lib/data";

export const metadata = { title: "Approvals — AJ Digital Portal" };

export default async function ApprovalsPage() {
  const approvals = await getApprovals();
  const pending = approvals.filter((a) => a.status === "pending");
  const decided = approvals.filter((a) => a.status !== "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-tx">Approvals</h1>
        <p className="mt-1 text-sm text-tx2">
          One place for every decision we need from you — with a clear recommendation each time.
        </p>
      </div>

      {pending.length === 0 ? (
        <Card>
          <CardBody className="flex flex-col items-center py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-pill bg-ok/12 text-ok">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="mt-3 font-display text-lg font-semibold text-tx">You&apos;re all caught up</p>
            <p className="mt-1 text-sm text-tx2">No approvals are waiting on you right now.</p>
          </CardBody>
        </Card>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-tx3">
              Awaiting you
            </h2>
            <span className="rounded-pill bg-signal px-2 py-0.5 text-xs font-bold text-signal-ink">
              {pending.length}
            </span>
          </div>
          {pending.map((a) => (
            <ApprovalCard key={a.id} approval={a} />
          ))}
        </section>
      )}

      {decided.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-tx3">
            Recently decided
          </h2>
          {decided.map((a) => (
            <ApprovalCard key={a.id} approval={a} />
          ))}
        </section>
      )}
    </div>
  );
}
