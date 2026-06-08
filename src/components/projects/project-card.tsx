import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PhaseTrack } from "@/components/ui/phase-track";
import {
  objectiveLabel,
  ownerLabel,
  projectStatusLabel,
  projectStatusTone,
} from "@/lib/labels";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="block focus:outline-none">
      <Card hover className="group h-full p-5 focus-within:ring-2 focus-within:ring-signal">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-semibold tracking-tight text-tx">
            {project.name}
          </h3>
          <Badge tone={projectStatusTone[project.status]} dot>
            {projectStatusLabel[project.status]}
          </Badge>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-tx2">{project.summary}</p>

        <div className="mt-4">
          <PhaseTrack current={project.phase} />
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-tx3">Progress</span>
            <span className="font-medium text-tx2">{project.progress}%</span>
          </div>
          <Progress value={project.progress} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-tx3">
          <span>
            Owner: <span className="text-tx2">{ownerLabel[project.owner]}</span>
          </span>
          <span>
            Objective: <span className="text-tx2">{objectiveLabel[project.objective]}</span>
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-tx3">Next action</p>
            <p className="truncate text-sm text-tx">{project.nextAction}</p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-tx3 transition-transform group-hover:translate-x-0.5 group-hover:text-tx" />
        </div>
      </Card>
    </Link>
  );
}
