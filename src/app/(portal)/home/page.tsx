import Link from "next/link";
import { Card, CardBody } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { GreetingHero } from "@/components/home/greeting-hero";
import { OutcomeStat } from "@/components/home/outcome-stat";
import { ProjectCard } from "@/components/projects/project-card";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { SystemHealth } from "@/components/shared/system-health";
import {
  NOW,
  getActivity,
  getAttribution,
  getClient,
  getCurrentUser,
  getDeliverables,
  getIntegrations,
  getPendingApprovals,
  getProjects,
} from "@/lib/data";
import { deliverableCategoryLabel } from "@/lib/labels";
import { formatDate } from "@/lib/utils";

function greetingFor(iso: string): string {
  // Demo client is on US Eastern (UTC-4). Map the anchored UTC hour to local.
  const localHour = (new Date(iso).getUTCHours() + 24 - 4) % 24;
  if (localHour < 12) return "Good morning";
  if (localHour < 18) return "Good afternoon";
  return "Good evening";
}

export default async function HomePage() {
  const [user, client, projects, pending, deliverables, attribution, activity, integrations] =
    await Promise.all([
      getCurrentUser(),
      getClient(),
      getProjects(),
      getPendingApprovals(),
      getDeliverables(),
      getAttribution(),
      getActivity(),
      getIntegrations(),
    ]);

  const firstName = user.name.split(" ")[0];
  const activeProjects = projects.filter((p) => p.status !== "complete");
  const recentDeliverables = deliverables.slice(0, 3);
  const timeSaved = attribution.find((a) => a.label === "estimated_time_saved")?.value ?? 0;
  const revenue = attribution.find((a) => a.label === "revenue_influenced")?.value ?? 0;
  const manual = attribution.find((a) => a.label === "manual_work_reduced")?.value ?? 0;
  const risk = attribution.find((a) => a.label === "operational_risk_reduced")?.value ?? 0;

  return (
    <div className="space-y-8">
      <GreetingHero
        greeting={greetingFor(NOW)}
        firstName={firstName}
        client={client}
        phase={client.enginePhase}
        pendingApprovals={pending.length}
        newDeliverables={recentDeliverables.length}
        timeSaved={timeSaved}
      />

      {/* Business outcomes */}
      <section>
        <SectionHeading
          title="Business outcomes"
          subtitle="This month, estimated — defensible labels, never overstated."
          href="/outcomes"
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <OutcomeStat label="Time saved" value={String(timeSaved)} unit="hrs" hint="Estimated" />
          <OutcomeStat
            label="Revenue influenced"
            value={`$${revenue.toLocaleString()}`}
            hint="Estimated"
          />
          <OutcomeStat label="Manual steps removed" value={String(manual)} hint="This month" />
          <OutcomeStat label="Risk reduced" value={String(risk)} unit="leaks" hint="Closed" />
        </div>
      </section>

      {/* Active projects */}
      <section>
        <SectionHeading
          title="Active projects"
          subtitle={`${activeProjects.length} in progress`}
          href="/projects"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {activeProjects.slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Two-column: activity + side rail */}
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <SectionHeading title="Recent activity" subtitle="What changed since last time" />
          <Card>
            <CardBody className="py-2">
              <ActivityFeed items={activity.slice(0, 6)} now={NOW} />
            </CardBody>
          </Card>
        </section>

        <div className="space-y-6">
          <section>
            <SectionHeading title="Latest deliverables" href="/deliverables" />
            <Card>
              <CardBody className="space-y-3">
                {recentDeliverables.map((d) => (
                  <Link
                    key={d.id}
                    href="/deliverables"
                    className="block rounded-lg p-2 transition-colors hover:bg-inset"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-tx">{d.title}</p>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge tone="neutral">{deliverableCategoryLabel[d.category]}</Badge>
                      <span className="text-xs text-tx3">{formatDate(d.addedAt)}</span>
                    </div>
                  </Link>
                ))}
              </CardBody>
            </Card>
          </section>

          <section>
            <SectionHeading title="System health" href="/systems" />
            <Card>
              <CardBody className="py-2">
                <SystemHealth integrations={integrations.slice(0, 5)} />
              </CardBody>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
