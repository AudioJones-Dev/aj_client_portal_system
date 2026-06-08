import { ArrowUpRight, BarChart3 } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { OutcomeStat } from "@/components/home/outcome-stat";
import { getAttribution, getReports } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Reports — AJ Digital Portal" };

export default async function ReportsPage() {
  const [reports, attribution] = await Promise.all([getReports(), getAttribution()]);
  const timeSaved = attribution.find((a) => a.label === "estimated_time_saved")?.value ?? 0;
  const revenue = attribution.find((a) => a.label === "revenue_influenced")?.value ?? 0;
  const manual = attribution.find((a) => a.label === "manual_work_reduced")?.value ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-tx">Reports</h1>
        <p className="mt-1 text-sm text-tx2">
          Periodic recaps and the outcomes behind them — value you can point to.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <OutcomeStat label="Time saved (June)" value={String(timeSaved)} unit="hrs" hint="Estimated" />
        <OutcomeStat label="Revenue influenced" value={`$${revenue.toLocaleString()}`} hint="Estimated" />
        <OutcomeStat label="Manual steps removed" value={String(manual)} hint="This month" />
      </div>

      <div className="space-y-3">
        {reports.map((r) => (
          <Card key={r.id} hover>
            <CardBody className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-inset text-tx2">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-semibold text-tx">{r.title}</p>
                <p className="mt-0.5 text-sm text-tx2">{r.summary}</p>
                <p className="mt-1 text-xs text-tx3">
                  {r.period} · Published {formatDate(r.publishedAt)}
                </p>
              </div>
              <a
                href={r.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-tx2 hover:text-tx"
              >
                Open <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
