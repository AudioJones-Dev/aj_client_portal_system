"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, FolderKanban, CheckSquare, FileBox, BarChart3, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Building2 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/admin/deliverables", label: "Deliverables", icon: FileBox },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-surface/50 lg:flex">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal font-display text-sm font-bold text-signal-ink">AJ</div>
        <div className="leading-tight">
          <div className="font-display text-sm font-semibold text-tx">AJ Digital</div>
          <div className="text-[11px] text-tx3">Admin · Back-office</div>
        </div>
      </div>
      <nav className="portal-scroll flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}
              className={cn("group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-inset text-tx" : "text-tx2 hover:bg-inset/60 hover:text-tx")}>
              <Icon className={cn("h-4 w-4", active ? "text-tx" : "text-tx3")} />
              <span className="flex-1">{item.label}</span>
              {active && <span className="h-4 w-1 rounded-pill bg-signal" />}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-line p-3">
        <Link href="/home" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-tx2 hover:bg-inset hover:text-tx">
          <ArrowLeft className="h-4 w-4" /> Client view
        </Link>
      </div>
    </aside>
  );
}
