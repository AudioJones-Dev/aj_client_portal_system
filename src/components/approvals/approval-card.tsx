"use client";

import { useState, useTransition } from "react";
import { Check, MessageSquare, X, Sparkles, ShieldAlert, TrendingUp } from "lucide-react";
import { decideApproval } from "@/lib/actions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  approvalStatusLabel,
  approvalStatusTone,
  approvalTypeLabel,
  riskLabel,
  riskTone,
} from "@/lib/labels";
import { formatDate } from "@/lib/utils";
import type { ApprovalRequest } from "@/lib/types";

type Decision = "approved" | "changes_requested" | "rejected" | null;

/**
 * A single approval, presented as a clear decision: what's being asked, the
 * recommended choice, why it matters, risk, and business impact — then three
 * unambiguous actions. Decisions are optimistic/local in this seed build;
 * wiring to Supabase + activity log comes later.
 */
export function ApprovalCard({ approval }: { approval: ApprovalRequest }) {
  const [decision, setDecision] = useState<Decision>(
    approval.status === "pending" ? null : (approval.status as Decision),
  );
  const [isPending, startTransition] = useTransition();

  const decided = decision !== null;

  function decide(next: Exclude<NonNullable<Decision>, never>) {
    setDecision(next); // optimistic
    startTransition(async () => {
      await decideApproval(approval.id, next as "approved" | "changes_requested" | "rejected");
    });
  }

  return (
    <Card className="overflow-hidden">
      {/* Decision header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-inset/40 px-5 py-3">
        <Badge tone="neutral">{approvalTypeLabel[approval.type]}</Badge>
        <Badge tone={riskTone[approval.riskLevel]} dot>
          {riskLabel[approval.riskLevel]}
        </Badge>
        {approval.dueBy && !decided && (
          <span className="text-xs text-tx3">Due {formatDate(approval.dueBy)}</span>
        )}
        <div className="ml-auto">
          {decided ? (
            <Badge tone={approvalStatusTone[decision as keyof typeof approvalStatusTone]}>
              {approvalStatusLabel[decision as keyof typeof approvalStatusLabel]}
            </Badge>
          ) : (
            <Badge tone="signal" dot>
              Awaiting you
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-base font-semibold tracking-tight text-tx">
          {approval.title}
        </h3>

        {/* Decision required */}
        <p className="mt-2 text-sm text-tx2">{approval.decisionRequired}</p>

        {/* Recommended choice */}
        <div className="mt-4 flex items-start gap-2.5 rounded-card bg-signal/12 px-3.5 py-3 ring-1 ring-inset ring-signal/30">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-tx" />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-tx3">
              Recommended
            </p>
            <p className="text-sm font-medium text-tx">{approval.recommendedChoice}</p>
          </div>
        </div>

        {/* Why it matters + business impact */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Detail icon={<TrendingUp className="h-4 w-4" />} label="Why it matters">
            {approval.whyItMatters}
          </Detail>
          <Detail icon={<ShieldAlert className="h-4 w-4" />} label="Business impact">
            {approval.businessImpact}
          </Detail>
        </div>

        {/* Actions */}
        {decided ? (
          <div className="mt-5 flex items-center gap-2 border-t border-line pt-4">
            <p className="text-sm text-tx2">
              You {decisionVerb(decision)} this on {formatDate(new Date().toISOString())}.
            </p>
            <button
              type="button"
              onClick={() => setDecision(null)}
              className="ml-auto text-xs font-medium text-tx3 underline-offset-2 hover:text-tx hover:underline"
            >
              Undo
            </button>
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
            <Button variant="signal" disabled={isPending} onClick={() => decide("approved")}>
              <Check className="h-4 w-4" /> Approve
            </Button>
            <Button variant="outline" disabled={isPending} onClick={() => decide("changes_requested")}>
              <MessageSquare className="h-4 w-4" /> Request changes
            </Button>
            <Button variant="ghost" disabled={isPending} onClick={() => decide("rejected")}>
              <X className="h-4 w-4" /> Reject
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

function Detail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-line bg-surface-2 p-3.5">
      <div className="flex items-center gap-1.5 text-tx3">
        {icon}
        <p className="text-[11px] font-semibold uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-1.5 text-sm text-tx2">{children}</p>
    </div>
  );
}

function decisionVerb(d: Decision): string {
  if (d === "approved") return "approved";
  if (d === "changes_requested") return "requested changes on";
  if (d === "rejected") return "rejected";
  return "reviewed";
}
