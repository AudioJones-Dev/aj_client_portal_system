import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata = { title: "Diagnostics — AJ Digital Portal" };

export default function DiagnosticsPage() {
  return (
    <ComingSoon
      title="Diagnostics"
      description="Productized assessments that score your business and prioritize the highest-impact fixes."
      bullets={[
        "AI Readiness Diagnostic",
        "Revenue Leak Audit",
        "Communication Fragmentation Audit",
        "Tool Stack & Workflow Bottleneck Audits",
      ]}
    />
  );
}
