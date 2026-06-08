import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { getClient, getCurrentUser } from "@/lib/data";

export const metadata = { title: "Settings — AJ Digital Portal" };

export default async function SettingsPage() {
  const [user, client] = await Promise.all([getCurrentUser(), getClient()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-tx">Settings</h1>
        <p className="mt-1 text-sm text-tx2">Your profile, workspace, and appearance.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody className="space-y-4">
            <CardTitle>Profile</CardTitle>
            <Row label="Name" value={user.name} />
            <Row label="Email" value={user.email} />
            <Row label="Role" value={<span className="capitalize">{user.role}</span>} />
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <CardTitle>Workspace</CardTitle>
            <Row label="Company" value={client.companyName} />
            <Row label="Industry" value={client.industry} />
            <Row
              label="Locations"
              value={
                <div className="flex flex-wrap justify-end gap-1.5">
                  {client.locations.map((l) => (
                    <Badge key={l} tone="neutral">
                      {l}
                    </Badge>
                  ))}
                </div>
              }
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <CardTitle>Appearance</CardTitle>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-tx">Theme</p>
                <p className="text-xs text-tx3">Switch between light and dark.</p>
              </div>
              <ThemeToggle />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="space-y-4">
            <CardTitle>Notifications</CardTitle>
            <ToggleRow label="Approval requests" hint="Email me when a decision is needed" on />
            <ToggleRow label="Weekly recap" hint="A digest every Monday" on />
            <ToggleRow label="New deliverables" hint="When something is added" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-tx3">{label}</span>
      <span className="text-right text-sm font-medium text-tx">{value}</span>
    </div>
  );
}

function ToggleRow({ label, hint, on = false }: { label: string; hint: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-tx">{label}</p>
        <p className="text-xs text-tx3">{hint}</p>
      </div>
      <span
        className={
          on
            ? "flex h-5 w-9 items-center rounded-pill bg-signal px-0.5"
            : "flex h-5 w-9 items-center rounded-pill bg-line px-0.5"
        }
      >
        <span
          className={
            on
              ? "h-4 w-4 translate-x-4 rounded-full bg-signal-ink transition-transform"
              : "h-4 w-4 rounded-full bg-surface transition-transform"
          }
        />
      </span>
    </div>
  );
}
