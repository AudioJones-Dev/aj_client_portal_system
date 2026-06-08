import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { getClient, getCurrentUser, getPendingApprovals, isAdmin } from "@/lib/data";

// Live data + per-request auth → render the portal dynamically.
export const dynamic = "force-dynamic";

/**
 * Authenticated portal shell. Everything under (portal) renders inside the
 * sidebar + topbar chrome. When Supabase auth lands, this is where the session
 * is resolved and the tenant is pinned for the request.
 */
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const [user, client, pending, admin] = await Promise.all([
    getCurrentUser(),
    getClient(),
    getPendingApprovals(),
    isAdmin(),
  ]);

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} client={client} pendingCount={pending.length} isAdmin={admin} />
        <main className="portal-scroll flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
