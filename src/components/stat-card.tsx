export default function StatCard({
  value,
  description,
  icon,
}: {
  value: string | number;
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex h-full items-center justify-between rounded-2xl bg-muted p-2">
      <div className="p-4">
        <div className="mb-4 text-sm">{description}</div>
        <div className="text-3xl font-bold text-secondary dark:text-secondary-foreground">
          {value}
        </div>
      </div>
      {icon && <div>{icon}</div>}
    </div>
  );
}
