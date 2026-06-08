import { cn } from "@/lib/utils";
import { phaseLabel } from "@/lib/labels";
import type { Phase } from "@/lib/types";

const ORDER: Phase[] = ["diagnose", "design", "build", "operate"];

/**
 * The Diagnose → Design → Build → Operate engagement model, rendered as a
 * compact stepper. The active phase is signal-filled; completed phases are
 * solid; upcoming phases are muted.
 */
export function PhaseTrack({ current, className }: { current: Phase; className?: string }) {
  const activeIndex = ORDER.indexOf(current);
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {ORDER.map((phase, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <div key={phase} className="flex items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  active && "bg-signal ring-2 ring-signal/30",
                  done && "bg-tx",
                  !active && !done && "bg-line",
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  active ? "text-tx" : "text-tx3",
                )}
              >
                {phaseLabel[phase]}
              </span>
            </div>
            {i < ORDER.length - 1 && <span className="h-px w-4 bg-line" />}
          </div>
        );
      })}
    </div>
  );
}
