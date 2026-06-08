import { cn } from "@/lib/utils";

/**
 * Chip — neutral by default. Use the `signal` variant ONLY for action-worthy
 * states (needs approval, ready, action required), never generic labels.
 */
export function Chip({
  signal = false,
  className,
  children,
}: {
  signal?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        signal
          ? "bg-signal-soft text-tx ring-signal-border"
          : "bg-inset/60 text-tx2 ring-line-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
