export default function Dashboard() {
  return (
    <div className="mx-auto h-screen max-h-screen bg-secondary">
      <header className="mb-8 border-b bg-primary-foreground p-4">
        <div className="text-4xl font-bold">DNA</div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-2 px-4 md:grid-cols-2 xl:grid-cols-3">
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
        <ClientCard />
      </section>
    </div>
  );
}

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function ClientCard() {
  return (
    <Link href="/dashboard/clients/1">
      <Card className="p-4 transition-all hover:-translate-y-1 hover:shadow-md">
        <CardHeader>
          <CardTitle>Client Name</CardTitle>
          <CardDescription>Short description of the client</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
