import { Card, CardBody, CardTitle, CardEyebrow } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { Progress } from "@/components/ui/progress";
import { PhaseTrack } from "@/components/ui/phase-track";
import { FocalCard, FocalEyebrow } from "@/components/ui/focal-card";
import { ProjectCard } from "@/components/projects/project-card";
import { ApprovalCard } from "@/components/approvals/approval-card";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { projects, approvals } from "@/lib/seed";

export const metadata = { title: "Design System — AJ Digital Portal" };

const SWATCHES: { cls: string; token: string; label: string }[] = [
  { cls: "bg-bg", token: "bg", label: "Background" },
  { cls: "bg-canvas", token: "canvas", label: "Canvas" },
  { cls: "bg-surface", token: "surface", label: "Surface" },
  { cls: "bg-elevated", token: "elevated", label: "Elevated" },
  { cls: "bg-inset", token: "inset", label: "Inset" },
  { cls: "bg-recessed", token: "recessed", label: "Recessed" },
  { cls: "bg-signal", token: "signal", label: "Signal" },
  { cls: "bg-ok", token: "ok", label: "Success" },
  { cls: "bg-warn", token: "warn", label: "Warning" },
  { cls: "bg-bad", token: "bad", label: "Danger" },
  { cls: "bg-info", token: "info", label: "Info" },
];

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-bg px-6 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-12">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-tx3">
              AJ Digital
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tightest text-tx">
              Dark Signal Cockpit
            </h1>
            <p className="mt-1 text-sm text-tx2">
              80% dark neutral · 10% elevated · 7% muted · 3% signal.
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Colors */}
        <Section title="Color">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {SWATCHES.map(({ cls, token, label }) => (
              <div key={token} className="overflow-hidden rounded-md border border-line-soft">
                <div className={`h-16 ${cls}`} />
                <div className="bg-surface px-2 py-1.5">
                  <p className="text-xs font-medium text-tx">{label}</p>
                  <p className="font-mono text-[10px] text-tx3">{token}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <Card>
            <CardBody className="space-y-3">
              <p className="font-display text-5xl font-bold tracking-tightest text-tx">Syne Display</p>
              <p className="font-display text-2xl font-bold text-tx">Heading — Syne</p>
              <p className="font-body text-base text-tx2">
                Body — Inter. The interface should expose control, confidence, and outcomes.
              </p>
              <p className="font-mono text-xs text-tx3">mono — JetBrains Mono · ID a0000000-0001</p>
            </CardBody>
          </Card>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="signal">Primary action</Button>
            <Button variant="primary">Solid</Button>
            <Button variant="outline">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Destructive</Button>
          </div>
        </Section>

        {/* Chips & badges */}
        <Section title="Chips & status">
          <div className="flex flex-wrap items-center gap-2">
            <Chip signal>Action required</Chip>
            <Chip>Label</Chip>
            <Badge tone="ok" dot>On track</Badge>
            <Badge tone="warn" dot>Waiting</Badge>
            <Badge tone="bad" dot>Blocked</Badge>
            <Badge tone="info" dot>Complete</Badge>
            <Badge tone="signal" dot>Awaiting you</Badge>
          </div>
        </Section>

        {/* Focal card */}
        <Section title="Focal signal card — one per screen">
          <div className="grid gap-4 sm:grid-cols-2">
            <FocalCard>
              <FocalEyebrow>Estimated time saved</FocalEyebrow>
              <p className="mt-1 font-display text-4xl font-bold tracking-tightest">14.5 hrs</p>
              <p className="mt-1 text-sm text-[#0d1117]/70">This month · across active systems</p>
            </FocalCard>
            <Card>
              <CardBody>
                <CardEyebrow>Supporting card</CardEyebrow>
                <CardTitle className="mt-1">Quiet by design</CardTitle>
                <p className="mt-2 text-sm text-tx2">
                  Everything else stays dark and calm so the focal card carries the signal.
                </p>
                <div className="mt-4 space-y-1.5">
                  <PhaseTrack current="build" />
                  <Progress value={72} />
                </div>
              </CardBody>
            </Card>
          </div>
        </Section>

        {/* Project + approval */}
        <Section title="Project card">
          <div className="grid gap-4 md:grid-cols-2">
            <ProjectCard project={projects[1]} />
            <ProjectCard project={projects[3]} />
          </div>
        </Section>

        <Section title="Approval card">
          <ApprovalCard approval={approvals[0]} />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-tx3">
        {title}
      </h2>
      {children}
    </section>
  );
}
