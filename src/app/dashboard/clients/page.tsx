export default async function Dashboard() {
  const sb = createClient();
  const { data: clients } = await sb.from("clients").select();
  if (!clients) {
    notFound();
  }
  return (
    <div className="mx-auto h-screen max-h-screen bg-secondary">
      <header className="mb-8 border-b bg-primary-foreground p-4">
        <div className="text-4xl font-bold">DNA</div>
      </header>
      <section className="mx-auto grid max-w-7xl gap-2 px-4 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((c) => (
          <ClientCard key={c.id} client={c} />
        ))}
      </section>
    </div>
  );
}

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type { Tables } from "../../../../types/supabase";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

function ClientCard({ client }: { client: Tables<"clients"> }) {
  return (
    <Link href={`/dashboard/client/${client.id}`}>
      <Card className="p-4 transition-all hover:-translate-y-1 hover:shadow-md">
        <CardHeader>
          <CardTitle>{client.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
