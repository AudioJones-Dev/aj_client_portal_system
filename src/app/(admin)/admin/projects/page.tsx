import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  const projects = await getProjects();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-tx">Projects</h1>
      <div className="overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-tx3">
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Phase</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Next action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium text-tx">{p.name}</td>
                <td className="px-4 py-3 text-tx2">{p.phase}</td>
                <td className="px-4 py-3 text-tx2">{p.status}</td>
                <td className="px-4 py-3 text-tx2">{p.owner}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-pill bg-inset">
                      <div className="h-full bg-signal" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs text-tx3">{p.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-tx2">{p.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
