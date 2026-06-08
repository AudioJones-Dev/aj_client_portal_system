import { ProjectCard } from "@/components/projects/project-card";
import { Card, CardBody } from "@/components/ui/card";
import { objectiveLabel, projectStatusLabel } from "@/lib/labels";
import { getProjects } from "@/lib/data";
import type { ProjectStatus } from "@/lib/types";

export const metadata = { title: "Projects — AJ Digital Portal" };

const STATUS_ORDER: ProjectStatus[] = ["blocked", "waiting", "on_track", "complete"];

export default async function ProjectsPage() {
  const projects = await getProjects();

  const counts = STATUS_ORDER.map((s) => ({
    status: s,
    count: projects.filter((p) => p.status === s).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-tx">Projects</h1>
        <p className="mt-1 text-sm text-tx2">
          Every system we&apos;re building for you, tied to a business objective.
        </p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {counts.map(({ status, count }) => (
          <Card key={status} className="p-4">
            <p className="font-display text-2xl font-semibold text-tx">{count}</p>
            <p className="text-xs text-tx2">{projectStatusLabel[status]}</p>
          </Card>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Objective legend */}
      <Card>
        <CardBody>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-tx3">
            Every project serves one lever
          </p>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-tx2">
            {Object.values(objectiveLabel).map((o) => (
              <span key={o}>{o}</span>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
