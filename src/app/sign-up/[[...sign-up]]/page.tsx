import { redirect } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { authEnabled } from "@/lib/auth";

export const metadata = { title: "Create account — AJ Digital Portal" };

export default function SignUpPage() {
  if (!authEnabled) redirect("/home");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="relative w-full max-w-md">
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/login"
          fallbackRedirectUrl="/home"
        />
      </div>
    </div>
  );
}
