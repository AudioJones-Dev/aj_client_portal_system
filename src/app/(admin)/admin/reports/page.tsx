import { getReports } from "@/lib/data";
import { AddReportForm } from "@/components/admin/add-report-form";

export const dynamic = "force-dynamic";

export default async function AdminReports() {
  const reports = await getReports();
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-tx">Reports</h1>
      <AddReportForm />
      {reports.length === 0 ? (
        <p className="text-sm text-tx3">No reports published.</p>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.id} className="rounded-card border border-line bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium text-tx">{r.title}</div>
                <span className="text-xs text-tx3">{r.period}</span>
              </div>
              <p className="mt-1 text-sm text-tx2">{r.summary}</p>
              <div className="mt-1 text-xs text-tx3">Published {r.publishedAt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
