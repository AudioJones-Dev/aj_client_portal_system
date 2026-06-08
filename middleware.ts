import { NextResponse, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Auth gate. When NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set, Clerk protects the
 * portal routes and redirects signed-out users to /login. With no key, the
 * portal runs open on seed data (local/preview) and middleware is a no-op.
 *
 * Importing clerkMiddleware/createRouteMatcher is side-effect free; Clerk only
 * needs keys when the handler actually runs per-request, which we gate on.
 */
const authEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const isProtected = createRouteMatcher([
  "/home(.*)",
  "/projects(.*)",
  "/approvals(.*)",
  "/deliverables(.*)",
  "/reports(.*)",
  "/support(.*)",
  "/settings(.*)",
  "/diagnostics(.*)",
  "/memory(.*)",
  "/systems(.*)",
  "/outcomes(.*)",
]);

const clerkGate = clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

const passthrough = (_req: NextRequest) => NextResponse.next();

export default authEnabled ? clerkGate : passthrough;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
