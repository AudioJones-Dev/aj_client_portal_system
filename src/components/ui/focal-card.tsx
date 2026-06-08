import { cn } from "@/lib/utils";

/**
 * The focal signal card — bright signal-yellow gradient with dark ink. Use at
 * most ONCE per screen, for the primary KPI / action / value proof. Overusing
 * it kills the premium feel (the 3% signal rule).
 */
export function FocalCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("focal rounded-card p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function FocalEyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0d1117]/70",
        className,
      )}
      {...props}
    />
  );
}
