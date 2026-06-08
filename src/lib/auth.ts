/**
 * Auth seam. Clerk is OPTIONAL: when no publishable key is configured the
 * portal runs in open "seed-mode" (local/preview) and these helpers return the
 * demo identity. When Clerk + Supabase are configured, the current Clerk user
 * maps to an app_users row → tenant.
 */
export const authEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

/** Resolve the signed-in Clerk user id on the server, or null in seed-mode. */
export async function getClerkUserId(): Promise<string | null> {
  if (!authEnabled) return null;
  // Lazy import so @clerk/nextjs/server is never pulled into seed-mode bundles.
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  return userId ?? null;
}
