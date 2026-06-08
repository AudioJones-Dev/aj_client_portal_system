"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { submitSupportRequest } from "@/lib/actions";
import type { Priority, Project, SupportType } from "@/lib/types";

/** Centralized support intake. Local-only in the seed build; posts to Supabase later. */
export function NewRequestForm({ projects }: { projects: Project[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (submitted) {
    return (
      <Card>
        <CardBody className="flex flex-col items-center py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-pill bg-ok/12 text-ok">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="mt-3 font-display text-lg font-semibold text-tx">Request received</p>
          <p className="mt-1 text-sm text-tx2">We&apos;ll follow up shortly, right here in your portal.</p>
          <Button variant="outline" className="mt-5" onClick={() => setSubmitted(false)}>
            Submit another
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <CardTitle>New request</CardTitle>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const payload = {
              type: (fd.get("type") as SupportType) ?? "question",
              priority: (fd.get("priority") as Priority) ?? "normal",
              projectId: (fd.get("projectId") as string) || undefined,
              subject: (fd.get("subject") as string) ?? "",
              description: (fd.get("description") as string) ?? "",
            };
            startTransition(async () => {
              await submitSupportRequest(payload);
              setSubmitted(true);
            });
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type">
              <select name="type" className={selectCls} defaultValue="question">
                <option value="question">Question</option>
                <option value="issue">Issue</option>
                <option value="request">Request</option>
                <option value="access">Access</option>
                <option value="billing">Billing</option>
              </select>
            </Field>
            <Field label="Priority">
              <select name="priority" className={selectCls} defaultValue="normal">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </Field>
          </div>

          <Field label="Related project (optional)">
            <select name="projectId" className={selectCls} defaultValue="">
              <option value="">— None —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Subject">
            <input name="subject" className={inputCls} placeholder="Short summary" required />
          </Field>

          <Field label="Description">
            <textarea
              name="description"
              className={`${inputCls} min-h-28 resize-y`}
              placeholder="What do you need?"
              required
            />
          </Field>

          <Button type="submit" variant="signal" disabled={isPending}>
            <Send className="h-4 w-4" /> {isPending ? "Submitting…" : "Submit request"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

const inputCls =
  "w-full rounded-card border border-line bg-surface-2 px-3 py-2 text-sm text-tx placeholder:text-tx3 focus:outline-none focus:ring-2 focus:ring-signal";
const selectCls = inputCls;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-tx2">{label}</span>
      {children}
    </label>
  );
}
