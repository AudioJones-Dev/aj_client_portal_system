import { getDeliverables, getProjects } from "@/lib/data";
import { AddDeliverableForm } from "@/components/admin/add-deliverable-form";

export const dynamic = "force-dynamic";

export default async function AdminDeliverables() {
  const [deliverables, projects] = await Promise.all([getDeliverables(), getProjects()]);
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-tx">Deliverables</h1>
      <AddDeliverableForm projects={projects.map((p) => ({ id: p.id, name: p.name }))} />
      <div className="overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-tx3">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Added</th>
            </tr>
          </thead>
          <tbody>
            {deliverables.map((d) => (
              <tr key={d.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-tx">{d.title}</td>
                <td className="px-4 py-3 text-tx2">{d.category}</td>
                <td className="px-4 py-3 text-tx2">{d.status}</td>
                <td className="px-4 py-3 text-tx3">{d.addedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
