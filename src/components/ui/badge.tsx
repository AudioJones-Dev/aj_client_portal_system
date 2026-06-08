import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/labels";

const toneStyles: Record<Tone, string> = {
  ok: "bg-ok/12 text-ok ring-ok/25",
  warn: "bg-warn/12 text-warn ring-warn/25",
  bad: "bg-bad/12 text-bad ring-bad/25",
  info: "bg-info/12 text-info ring-info/25",
  signal: "bg-signal/25 text-tx ring-signal/50",
  neutral: "bg-inset text-tx2 ring-line",
};

/** Status pill with a tone-driven color. Supports an optional leading dot. */
export function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
}: {
  tone?: Tone;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        toneStyles[tone],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[tone])} />}
      {children}
    </span>
  );
}

const dotColor: Record<Tone, string> = {
  ok: "bg-ok",
  warn: "bg-warn",
  bad: "bg-bad",
  info: "bg-info",
  signal: "bg-signal",
  neutral: "bg-tx3",
};
