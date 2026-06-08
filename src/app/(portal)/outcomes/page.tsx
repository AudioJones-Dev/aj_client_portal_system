import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata = { title: "Outcomes — AJ Digital Portal" };

export default function OutcomesPage() {
  return (
    <ComingSoon
      title="Outcomes & Attribution"
      description="The moat: trace measurable business outcomes back to the actions that produced them."
      bullets={[
        "Leads captured & follow-ups completed",
        "Estimated time saved & manual work removed",
        "Revenue influenced vs. confirmed revenue",
        "Operational risk reduced",
      ]}
    />
  );
}
