import { GiftIcon, InboxIcon, LandmarkIcon, PenBoxIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Income Replacement</h1>
      <div className="mt-10 flex gap-20">
        <div>
          <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-semibold text-primary">
            Analysis
          </h2>
          <div className="space-y-4">
            <StatCard
              value="$300k"
              description="annual salary"
              icon={<LandmarkIcon className="h-20 w-20 opacity-15" />}
            />
            <StatCard
              value="$0 - $700k"
              description="discretionary bonus"
              icon={<GiftIcon className="h-20 w-20 opacity-15" />}
            />
            <StatCard
              value="$300k - $3MM"
              description="discretionary dividend"
              icon={<PenBoxIcon className="h-20 w-20 opacity-15" />}
            />
            <StatCard
              value="$2.5MM"
              description="an average total income over the last 3 years, factoring in inflation and increases in earnings"
              icon={<InboxIcon className="h-20 w-20 opacity-15" />}
            />
          </div>
        </div>
        <div className="h-fit rounded-3xl bg-secondary p-10 text-secondary-foreground">
          <div className="mb-2 text-5xl font-bold">$30MM</div>
          <div className="text-sm">10-year term policy is most appropriate</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  value,
  description,
  icon,
}: {
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between rounded-2xl bg-muted p-2">
        <div className="p-4">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm">{description}</div>
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
}
