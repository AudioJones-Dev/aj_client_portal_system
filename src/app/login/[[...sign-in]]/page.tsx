import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { authEnabled } from "@/lib/auth";

export const metadata = { title: "Sign in — AJ Digital Portal" };

export default function LoginPage() {
  // Seed-mode (no Clerk): there is nothing to sign into — go straight in.
  if (!authEnabled) redirect("/home");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-signal font-display text-sm font-extrabold text-signal-ink">
            AJ
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-tx">AJ Digital</div>
            <div className="text-xs text-tx3">Client Portal</div>
          </div>
        </div>
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/home"
        />
      </div>
    </div>
  );
}
