import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import { authEnabled } from "@/lib/auth";
import type { Client, User } from "@/lib/types";

/** Sticky top bar: company context, search affordance, theme toggle, user. */
export function Topbar({
  user,
  client,
  pendingCount,
}: {
  user: User;
  client: Client;
  pendingCount: number;
}) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-bg/80 px-4 backdrop-blur-md sm:px-6">
      <div className="min-w-0">
        <div className="truncate font-display text-sm font-semibold text-tx">
          {client.companyName}
        </div>
        <div className="truncate text-xs text-tx3">{client.industry}</div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          className="hidden h-9 w-9 items-center justify-center rounded-pill border border-line bg-surface text-tx2 transition-colors hover:bg-inset hover:text-tx sm:inline-flex"
        >
          <Search className="h-4 w-4" />
        </button>

        <Link
          href="/approvals"
          aria-label="Approvals"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-pill border border-line bg-surface text-tx2 transition-colors hover:bg-inset hover:text-tx"
        >
          <Bell className="h-4 w-4" />
          {pendingCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-pill bg-signal px-1 text-[10px] font-bold text-signal-ink">
              {pendingCount}
            </span>
          )}
        </Link>

        <ThemeToggle />

        <div className="flex items-center gap-2 pl-1">
          {authEnabled ? (
            <UserButton afterSignOutUrl="/login" />
          ) : (
            <div
              className="flex h-9 w-9 items-center justify-center rounded-pill text-xs font-semibold text-white"
              style={{ backgroundColor: user.avatarColor }}
            >
              {initials}
            </div>
          )}
          <div className="hidden leading-tight sm:block">
            <div className="text-xs font-semibold text-tx">{user.name}</div>
            <div className="text-[11px] text-tx3 capitalize">{user.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
