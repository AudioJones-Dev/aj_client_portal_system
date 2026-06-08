import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** A single outcome metric. Outcomes, not machinery. */
export function OutcomeStat({
  label,
  value,
  unit,
  hint,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <Card className={cn("p-4", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-tx3">{label}</p>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="font-display text-2xl font-semibold tracking-tight text-tx">{value}</span>
        {unit && <span className="text-sm text-tx2">{unit}</span>}
      </div>
      {hint && <p className="mt-1 text-xs text-tx3">{hint}</p>}
    </Card>
  );
}
