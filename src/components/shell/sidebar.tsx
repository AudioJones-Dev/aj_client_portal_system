"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderKanban,
  CheckSquare,
  FileBox,
  BarChart3,
  LifeBuoy,
  Settings,
  Activity,
  Brain,
  Stethoscope,
  Plug,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  soon?: boolean;
};

const MVP: NavItem[] = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/deliverables", label: "Deliverables", icon: FileBox },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/support", label: "Support", icon: LifeBuoy },
  { href: "/settings", label: "Settings", icon: Settings },
];

const NEXT: NavItem[] = [
  { href: "/diagnostics", label: "Diagnostics", icon: Stethoscope, soon: true },
  { href: "/memory", label: "Business Memory", icon: Brain, soon: true },
  { href: "/systems", label: "Systems", icon: Plug, soon: true },
  { href: "/outcomes", label: "Outcomes", icon: Activity, soon: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface/50 lg:flex">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal font-display text-sm font-bold text-signal-ink">
          AJ
        </div>
        <div className="leading-tight">
          <div className="font-display text-sm font-semibold text-tx">AJ Digital</div>
          <div className="text-[11px] text-tx3">Client Portal</div>
        </div>
      </div>

      <nav className="portal-scroll flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <NavGroup items={MVP} pathname={pathname} />
        <div>
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-tx3">
            Coming soon
          </p>
          <NavGroup items={NEXT} pathname={pathname} />
        </div>
      </nav>

      <div className="border-t border-line p-3">
        <div className="rounded-card bg-inset p-3">
          <p className="text-xs font-medium text-tx">Need a hand?</p>
          <p className="mt-0.5 text-xs text-tx2">Open a support request and we&apos;ll jump on it.</p>
          <Link
            href="/support"
            className="mt-2 inline-block text-xs font-semibold text-tx underline-offset-2 hover:underline"
          >
            Get support →
          </Link>
        </div>
      </div>
    </aside>
  );
}

function NavGroup({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <div className="space-y-0.5">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active ? "bg-inset text-tx" : "text-tx2 hover:bg-inset/60 hover:text-tx",
            )}
          >
            <Icon className={cn("h-4 w-4", active ? "text-tx" : "text-tx3")} />
            <span className="flex-1">{item.label}</span>
            {active && <span className="h-4 w-1 rounded-pill bg-signal" />}
            {item.soon && (
              <span className="rounded-pill bg-line px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-tx3">
                Soon
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
