import { cn } from "@/lib/utils";

type Variant = "signal" | "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  // Reserved for the single most important action on a surface.
  signal: "bg-signal text-signal-ink hover:bg-signal-hover shadow-card",
  primary: "bg-tx text-bg hover:opacity-90",
  outline: "border border-line bg-surface text-tx hover:bg-inset",
  ghost: "text-tx2 hover:bg-inset hover:text-tx",
  danger: "border border-bad/30 bg-bad/10 text-bad hover:bg-bad/15",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

export function Button({
  variant = "outline",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
