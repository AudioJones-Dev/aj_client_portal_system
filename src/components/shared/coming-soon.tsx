import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/** Placeholder for Phase 2 sections, kept in-shell so navigation stays whole. */
export function ComingSoon({
  title,
  description,
  bullets,
}: {
  title: string;
  description: string;
  bullets?: string[];
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-tx">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-tx2">{description}</p>
      </div>
      <Card>
        <CardBody className="py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-pill bg-signal/20 text-tx">
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="mt-3 font-display text-lg font-semibold text-tx">Coming in the next phase</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-tx2">
            This becomes part of your Founder Intelligence System as the engagement matures.
          </p>
          {bullets && bullets.length > 0 && (
            <ul className="mx-auto mt-4 max-w-sm space-y-1.5 text-left text-sm text-tx2">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6">
            <Link href="/home">
              <Button variant="outline">Back to home</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
