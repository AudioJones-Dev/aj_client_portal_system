import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key. Bypasses RLS, so it
 * MUST never be imported into client components. All access through it is
 * tenant-scoped in code (see lib/data.ts). This is the portal's data path until
 * Clerk is configured as a Supabase third-party auth provider (then RLS becomes
 * the primary guard and the anon client can be used with the user's JWT).
 */
export const supabaseEnabled = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
