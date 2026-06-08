import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, CircleDot, Target, User2 } from "lucide-react";
import { Card, CardBody, CardEyebrow } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PhaseTrack } from "@/components/ui/phase-track";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApprovalCard } from "@/components/approvals/approval-card";
import { ActivityFeed } from "@/components/shared/activity-feed";
import {
  deliverableCategoryLabel,
  deliverableStatusLabel,
  objectiveLabel,
  ownerLabel,
  projectStatusLabel,
  projectStatusTone,
} from "@/lib/labels";
import {
  NOW,
  getActivityForProject,
  getApprovalsForProject,
  getDeliverablesForProject,
  getMilestones,
  getProject,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  if (!project) notFound();

  const [milestones, deliverables, approvals, activity] = await Promise.all([
    getMilestones(project.id),
    getDeliverablesForProject(project.id),
    getApprovalsForProject(project.id),
    getActivityForProject(project.id),
  ]);

  const pendingApprovals = approvals.filter((a) => a.status === "pending");

  return (
    <div className="space-y-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-tx2 hover:text-tx"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-tx">
            {project.name}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-tx2">{project.summary}</p>
        </div>
        <Badge tone={projectStatusTone[project.status]} dot>
          {projectStatusLabel[project.status]}
        </Badge>
      </div>

      {/* Facts grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody className="space-y-5">
            <div>
              <CardEyebrow>Engagement phase</CardEyebrow>
              <div className="mt-2">
                <PhaseTrack current={project.phase} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-tx3">Progress</span>
                <span className="font-medium text-tx2">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Fact icon={<Target className="h-4 w-4" />} label="Business objective">
                {objectiveLabel[project.objective]}
              </Fact>
              <Fact icon={<User2 className="h-4 w-4" />} label="Owner">
                {ownerLabel[project.owner]}
              </Fact>
              <Fact icon={<Calendar className="h-4 w-4" />} label="Timeline">
                {formatDate(project.startDate)} → {formatDate(project.targetDate)}
              </Fact>
              <Fact icon={<CircleDot className="h-4 w-4" />} label="Current milestone">
                {project.currentMilestone}
              </Fact>
            </div>
          </CardBody>
        </Card>

        {/* Next action callout */}
        <Card className="bg-signal/12 ring-1 ring-inset ring-signal/30">
          <CardBody>
            <CardEyebrow>Next action</CardEyebrow>
            <p className="mt-2 font-display text-lg font-semibold tracking-tight text-tx">
              {project.nextAction}
            </p>
            {pendingApprovals.length > 0 && (
              <p className="mt-3 text-sm text-tx2">
                {pendingApprovals.length} approval{pendingApprovals.length > 1 ? "s" : ""} below
                {" "}need your decision.
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Milestones */}
      {milestones.length > 0 && (
        <section>
          <SectionHeading title="Milestones" />
          <Card>
            <CardBody>
              <ol className="space-y-2.5">
                {milestones.map((m) => (
                  <li key={m.id} className="flex items-center gap-3">
                    <span
                      className={
                        m.done
                          ? "flex h-5 w-5 items-center justify-center rounded-pill bg-ok/15 text-ok"
                          : "flex h-5 w-5 items-center justify-center rounded-pill border border-line text-tx3"
                      }
                    >
                      {m.done ? "✓" : ""}
                    </span>
                    <span className={m.done ? "text-sm text-tx2 line-through" : "text-sm text-tx"}>
                      {m.title}
                    </span>
                    <span className="ml-auto text-xs text-tx3">{formatDate(m.dueDate)}</span>
                  </li>
                ))}
              </ol>
            </CardBody>
          </Card>
        </section>
      )}

      {/* Related approvals */}
      {pendingApprovals.length > 0 && (
        <section>
          <SectionHeading title="Approvals on this project" />
          <div className="space-y-4">
            {pendingApprovals.map((a) => (
              <ApprovalCard key={a.id} approval={a} />
            ))}
          </div>
        </section>
      )}

      {/* Related deliverables + activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionHeading title="Deliverables" href="/deliverables" />
          <Card>
            <CardBody className="space-y-2">
              {deliverables.length === 0 && (
                <p className="py-4 text-sm text-tx3">No deliverables yet.</p>
              )}
              {deliverables.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-3 rounded-lg p-2 hover:bg-inset"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-tx">{d.title}</p>
                    <p className="text-xs text-tx3">{deliverableCategoryLabel[d.category]}</p>
                  </div>
                  <Badge tone="neutral">{deliverableStatusLabel[d.status]}</Badge>
                </div>
              ))}
            </CardBody>
          </Card>
        </section>

        <section>
          <SectionHeading title="Activity" />
          <Card>
            <CardBody className="py-2">
              {activity.length === 0 ? (
                <p className="py-4 text-sm text-tx3">No recent activity.</p>
              ) : (
                <ActivityFeed items={activity} now={NOW} />
              )}
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  );
}

function Fact({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-tx3">
        {icon}
        <p className="text-[11px] font-semibold uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-1 text-sm font-medium text-tx">{children}</p>
    </div>
  );
}
