import { ExternalLink, FileText } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  approvalStatusLabel,
  approvalStatusTone,
  deliverableCategoryLabel,
  deliverableStatusLabel,
} from "@/lib/labels";
import { getDeliverables, getProjects } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Deliverables — AJ Digital Portal" };

export default async function DeliverablesPage() {
  const [deliverables, projects] = await Promise.all([getDeliverables(), getProjects()]);
  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? "—";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-tx">Deliverables</h1>
        <p className="mt-1 text-sm text-tx2">
          Your operating archive — strategy, brand, content, and system docs in one place.
        </p>
      </div>

      <Card>
        <CardBody className="p-0">
          <ul className="divide-y divide-line">
            {deliverables.map((d) => (
              <li
                key={d.id}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-inset/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-inset text-tx2">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-tx">{d.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-tx3">
                    <span>{projectName(d.projectId)}</span>
                    <span>·</span>
                    <span>{formatDate(d.addedAt)}</span>
                    {d.notes && (
                      <>
                        <span>·</span>
                        <span className="truncate">{d.notes}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <Badge tone="neutral">{deliverableCategoryLabel[d.category]}</Badge>
                  {d.approvalStatus ? (
                    <Badge tone={approvalStatusTone[d.approvalStatus]} dot>
                      {approvalStatusLabel[d.approvalStatus]}
                    </Badge>
                  ) : (
                    <Badge tone="neutral">{deliverableStatusLabel[d.status]}</Badge>
                  )}
                </div>
                <a
                  href={d.href}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-pill border border-line text-tx2 transition-colors hover:bg-surface hover:text-tx"
                  aria-label="Open deliverable"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
