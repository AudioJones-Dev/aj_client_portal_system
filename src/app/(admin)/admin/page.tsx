import { getProjects, getPendingApprovals, getDeliverables, getReports, getClient } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [projects, pending, deliverables, reports, client] = await Promise.all([
    getProjects(), getPendingApprovals(), getDeliverables(), getReports(), getClient(),
  ]);
  const kpis = [
    { l: "Active projects", v: projects.length },
    { l: "Pending approvals", v: pending.length },
    { l: "Deliverables", v: deliverables.length },
    { l: "Reports", v: reports.length },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-tx">Admin overview</h1>
        <p className="text-sm text-tx2">Operator back-office for {client.companyName}.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-card border border-line bg-surface p-5">
            <div className="text-xs uppercase tracking-wide text-tx3">{k.l}</div>
            <div className="mt-1 font-display text-3xl font-bold text-tx">{k.v}</div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-card border border-line bg-surface p-5">
          <h2 className="mb-3 font-display font-semibold text-tx">Pending approvals</h2>
          {pending.length === 0 ? (
            <p className="text-sm text-tx3">Nothing awaiting a decision.</p>
          ) : (
            <ul className="space-y-2">
              {pending.slice(0, 6).map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-tx">{a.title}</span>
                  <span className="shrink-0 rounded-pill bg-inset px-2 py-0.5 text-xs text-tx2">{a.riskLevel}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="rounded-card border border-line bg-surface p-5">
          <h2 className="mb-3 font-display font-semibold text-tx">Projects</h2>
          <ul className="space-y-2">
            {projects.slice(0, 6).map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-tx">{p.name}</span>
                <span className="shrink-0 text-xs text-tx3">{p.progress}% · {p.status}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="text-xs text-tx3">
        Data is scoped to the signed-in tenant. Cross-client management activates once the Supabase
        service-role key is set (see <code>.env.local</code>).
      </p>
    </div>
  );
}
