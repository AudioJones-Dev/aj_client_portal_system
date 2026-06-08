import { NextResponse, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Auth gate. When NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set, Clerk protects the
 * portal routes and redirects signed-out users to /login. With no key, the
 * portal runs open on seed data (local/preview) and middleware is a no-op.
 */
const authEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const isProtected = createRouteMatcher([
  "/admin(.*)",
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
  if (!isProtected(req)) return NextResponse.next();
  const { userId } = await auth();
  if (!userId) {
    const signIn = new URL("/login", req.url);
    signIn.searchParams.set("redirect_url", req.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }
  return NextResponse.next();
});

const passthrough = (_req: NextRequest) => NextResponse.next();

export default authEnabled ? clerkGate : passthrough;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
