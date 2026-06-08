import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Heading row for a content section, with an optional "view all" link. */
export function SectionHeading({
  title,
  subtitle,
  href,
  hrefLabel = "View all",
  className,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-end justify-between gap-4", className)}>
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight text-tx">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-tx2">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium text-tx2 transition-colors hover:text-tx"
        >
          {hrefLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
