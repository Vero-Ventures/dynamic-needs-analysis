import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import ClientCard from "./client-card";

export default async function Dashboard() {
  const sb = createClient();
  const { data: clients } = await sb.from("clients").select();
  if (!clients) {
    notFound();
  }
  return (
    <div className="mx-auto h-screen max-h-screen">
      <header className="mb-8 border-b bg-primary p-4 text-primary-foreground">
        <div className="mx-auto flex items-center justify-between md:max-w-screen-xl lg:max-w-screen-2xl">
          <div className="text-4xl font-bold">DNA</div>
          <div className="flex items-center gap-4">
            <span>Scott Chen</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full text-primary"
                >
                  SC
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl">
        <div className="flex justify-between gap-4">
          <h1 className="text-4xl font-bold">Clients</h1>
          <div className="flex items-center gap-4">
            <Button>Create New Client</Button>
          </div>
        </div>
        <div className="mt-10 grid gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
          {clients.map((c) => (
            <ClientCard key={c.id} client={c} />
          ))}
          <ClientCard
            client={{
              annual_income: 1000,
              expected_retirement_age: 10,
              birth_date: "1985-4-23",
              income_mutiplier: 2,
              province: "BC",
              name: "John Doe",
              id: 1,
              created_at: Date.now().toString(),
            }}
          />
          <ClientCard
            client={{
              annual_income: 1000,
              expected_retirement_age: 10,
              birth_date: "1985-4-23",
              income_mutiplier: 2,
              province: "BC",
              name: "John Doe",
              id: 1,
              created_at: Date.now().toString(),
            }}
          />
          <ClientCard
            client={{
              annual_income: 1000,
              expected_retirement_age: 10,
              birth_date: "1985-4-23",
              income_mutiplier: 2,
              province: "BC",
              name: "John Doe",
              id: 1,
              created_at: Date.now().toString(),
            }}
          />
        </div>
      </section>
    </div>
  );
}
