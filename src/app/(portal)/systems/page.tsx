import { Card, CardBody } from "@/components/ui/card";
import { SystemHealth } from "@/components/shared/system-health";
import { getIntegrations } from "@/lib/data";

export const metadata = { title: "Systems — AJ Digital Portal" };

/**
 * A light, functional preview of integration health (full controls land in
 * Phase 2). Clients see what's connected and what needs them — calm visibility.
 */
export default async function SystemsPage() {
  const integrations = await getIntegrations();
  const connected = integrations.filter((i) => i.status === "connected").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-tx">Systems</h1>
        <p className="mt-1 text-sm text-tx2">
          {connected} of {integrations.length} systems connected. Full controls arrive next phase.
        </p>
      </div>
      <Card>
        <CardBody className="py-2">
          <SystemHealth integrations={integrations} />
        </CardBody>
      </Card>
    </div>
  );
}
