import { ComingSoon } from "@/components/shared/coming-soon";

export const metadata = { title: "Business Memory — AJ Digital Portal" };

export default function MemoryPage() {
  return (
    <ComingSoon
      title="Business Memory"
      description="Structured context about your business — the layer that turns this portal into a real Founder Intelligence System."
      bullets={[
        "Company, brand, and offer memory",
        "Customer & sales memory (ICP, objections, leaks)",
        "Process & SOP memory",
        "Decision and attribution history",
      ]}
    />
  );
}
