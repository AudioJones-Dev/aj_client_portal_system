import {
  CheckCircle2,
  FileBox,
  Flag,
  Plug,
  RefreshCw,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { timeAgo } from "@/lib/utils";
import type { ActivityKind, ActivityLog } from "@/lib/types";

const iconFor: Record<ActivityKind, LucideIcon> = {
  deliverable_added: FileBox,
  approval_requested: CheckCircle2,
  approval_decided: CheckCircle2,
  milestone_reached: Flag,
  project_updated: RefreshCw,
  integration_changed: Plug,
  report_published: BarChart3,
};

/** Recent activity timeline. Outcomes and decisions — never raw system noise. */
export function ActivityFeed({ items, now }: { items: ActivityLog[]; now: string }) {
  return (
    <ol className="space-y-1">
      {items.map((item) => {
        const Icon = iconFor[item.kind];
        return (
          <li key={item.id} className="flex gap-3 py-2">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-pill bg-inset text-tx2">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-tx">{item.message}</p>
              <p className="text-xs text-tx3">{timeAgo(item.at, now)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
