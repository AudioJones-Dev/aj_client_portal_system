import { cn } from "@/lib/utils";

/** Slim progress meter. Signal-colored fill on a subtle inset track. */
export function Progress({ value, className }: { value: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-pill bg-inset", className)}>
      <div
        className="h-full rounded-pill bg-signal transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
