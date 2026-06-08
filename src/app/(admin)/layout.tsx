import Link from "next/link";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { AdminSidebar } from "@/components/shell/admin-sidebar";
import { isAdmin, getCurrentUser } from "@/lib/data";
import { authEnabled } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/home");
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen bg-bg">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-bg/80 px-4 backdrop-blur-md sm:px-6">
          <div className="min-w-0">
            <div className="font-display text-sm font-semibold text-tx">AJ Digital — Admin</div>
            <div className="text-xs text-tx3">Back-office · operator</div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/home" className="text-xs font-medium text-tx2 hover:text-tx">← Client view</Link>
            {authEnabled ? <UserButton afterSignOutUrl="/login" /> : <span className="text-xs text-tx3">{user.name}</span>}
          </div>
        </header>
        <main className="portal-scroll flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
