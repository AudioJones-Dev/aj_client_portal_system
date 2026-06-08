import { Badge } from "@/components/ui/badge";
import { integrationStatusLabel, integrationStatusTone } from "@/lib/labels";
import type { Integration } from "@/lib/types";

/** Connected-systems status. Calm visibility into what's live vs. needs you. */
export function SystemHealth({ integrations }: { integrations: Integration[] }) {
  return (
    <ul className="divide-y divide-line">
      {integrations.map((int) => (
        <li key={int.id} className="flex items-center justify-between gap-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-tx">{int.name}</p>
            <p className="text-xs text-tx3">{int.category}</p>
          </div>
          <Badge tone={integrationStatusTone[int.status]} dot>
            {integrationStatusLabel[int.status]}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
