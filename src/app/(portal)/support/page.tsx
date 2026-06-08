import { Card, CardBody } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewRequestForm } from "@/components/support/new-request-form";
import {
  priorityLabel,
  priorityTone,
  supportStatusLabel,
  supportStatusTone,
} from "@/lib/labels";
import { getProjects, getSupportRequests } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Support — AJ Digital Portal" };

export default async function SupportPage() {
  const [requests, projects] = await Promise.all([getSupportRequests(), getProjects()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-tx">Support</h1>
        <p className="mt-1 text-sm text-tx2">
          One channel for everything you need — no scattered emails or texts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <NewRequestForm projects={projects} />
        </div>

        <div className="lg:col-span-3">
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-tx3">
            Your requests
          </h2>
          <Card>
            <CardBody className="p-0">
              <ul className="divide-y divide-line">
                {requests.map((r) => (
                  <li key={r.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-tx">{r.subject}</p>
                      <Badge tone={supportStatusTone[r.status]} dot>
                        {supportStatusLabel[r.status]}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-tx2">{r.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-tx3">
                      <Badge tone={priorityTone[r.priority]}>{priorityLabel[r.priority]}</Badge>
                      <span>{r.createdBy}</span>
                      <span>·</span>
                      <span>{formatDate(r.createdAt)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
