import Link from "next/link";
import { ArrowRight, CheckSquare, FileBox, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhaseTrack } from "@/components/ui/phase-track";
import { phaseLabel } from "@/lib/labels";
import type { Client, Phase } from "@/lib/types";

/**
 * The first thing a client sees. A calm glass hero that answers: what phase
 * are we in, what needs you, what changed — and the primary actions.
 */
export function GreetingHero({
  greeting,
  firstName,
  client,
  phase,
  pendingApprovals,
  newDeliverables,
  timeSaved,
}: {
  greeting: string;
  firstName: string;
  client: Client;
  phase: Phase;
  pendingApprovals: number;
  newDeliverables: number;
  timeSaved: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-card bg-hero-glow glass p-6 sm:p-8">
      <div className="relative">
        <p className="text-sm text-tx2">{greeting},</p>
        <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-tx sm:text-3xl">
          {firstName}
        </h1>

        <p className="mt-3 max-w-xl text-sm text-tx2 sm:text-base">
          Your business system is in{" "}
          <span className="font-semibold text-tx">{phaseLabel[phase]} phase</span>.{" "}
          {pendingApprovals > 0 && (
            <>
              <span className="font-semibold text-tx">{pendingApprovals}</span>{" "}
              {pendingApprovals === 1 ? "approval needs" : "approvals need"} your attention.{" "}
            </>
          )}
          {newDeliverables > 0 && (
            <>
              <span className="font-semibold text-tx">{newDeliverables}</span>{" "}
              {newDeliverables === 1 ? "deliverable was" : "deliverables were"} added this week.
            </>
          )}
        </p>

        <div className="mt-5">
          <PhaseTrack current={phase} />
        </div>

        {/* Headline outcome */}
        <div className="mt-6 inline-flex items-baseline gap-2 rounded-card bg-surface/70 px-4 py-2.5 ring-1 ring-inset ring-line">
          <span className="font-display text-2xl font-semibold text-tx">{timeSaved}</span>
          <span className="text-sm text-tx2">hours saved this month (estimated)</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link href="/approvals">
            <Button variant="signal">
              <CheckSquare className="h-4 w-4" /> Review approvals
              {pendingApprovals > 0 && (
                <span className="ml-1 rounded-pill bg-signal-ink/10 px-1.5 text-xs font-bold">
                  {pendingApprovals}
                </span>
              )}
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="outline">
              <FolderKanban className="h-4 w-4" /> View projects
            </Button>
          </Link>
          <Link href="/deliverables">
            <Button variant="ghost">
              <FileBox className="h-4 w-4" /> Latest deliverables
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
