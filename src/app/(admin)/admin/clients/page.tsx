import { getClient } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminClients() {
  const client = await getClient();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-tx">Clients</h1>
      <div className="rounded-card border border-line bg-surface p-5">
        <div className="font-display text-lg font-semibold text-tx">{client.companyName}</div>
        <div className="mt-1 text-sm text-tx2">{client.industry} · {client.primaryContact}</div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-pill bg-inset px-2 py-1 text-tx2">Phase: {client.enginePhase}</span>
          {client.locations.map((l) => (
            <span key={l} className="rounded-pill bg-inset px-2 py-1 text-tx2">{l}</span>
          ))}
        </div>
      </div>
      <p className="text-xs text-tx3">
        Multi-client management (all tenants) activates with the Supabase service-role key. Currently
        scoped to the signed-in tenant.
      </p>
    </div>
  );
}
