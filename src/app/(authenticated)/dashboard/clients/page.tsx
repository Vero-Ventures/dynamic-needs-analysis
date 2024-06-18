import { createClient } from "@/lib/supabase/server";
import ClientCard from "./client-card";
import UserProfile from "@/components/user-profile";
import CreateClientDialog from "./create-client-dialog";

export default async function Dashboard() {
  const sb = await createClient();
  const { data: clients, error } = await sb.from("clients").select();
  if (error) {
    console.error(error);
  }
  return (
    <div className="mx-auto h-screen max-h-screen">
      <header className="mb-8 border-b bg-primary p-4 text-primary-foreground">
        <div className="mx-auto flex items-center justify-between md:max-w-screen-xl lg:max-w-screen-2xl">
          <div className="text-4xl font-bold">DNA</div>
          <UserProfile />
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4">
        <div className="flex justify-between gap-4">
          <h1 className="text-4xl font-bold">Clients</h1>
          <div className="flex items-center gap-4">
            <CreateClientDialog />
          </div>
        </div>
        <div className="mt-10 grid gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
          {clients && clients.map((c) => <ClientCard key={c.id} client={c} />)}
        </div>
      </section>
    </div>
  );
}