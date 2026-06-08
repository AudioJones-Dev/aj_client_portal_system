/**
 * Browser Supabase client (anon key). Use in client components for realtime
 * or user-initiated writes; RLS enforces tenant isolation server-side.
 * Not yet wired into the UI — the seed data-layer (lib/data.ts) drives the
 * portal today. Swap data.ts function bodies to use these clients to go live.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
