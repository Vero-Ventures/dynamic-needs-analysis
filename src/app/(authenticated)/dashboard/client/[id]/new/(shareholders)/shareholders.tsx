import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddBusinessDialog from "./add-shareholder-dialog";
import ShareholdersTable from "./shareholders-table";
import { createClient } from "@/lib/supabase/server";

export default async function Shareholders({ clientId }: { clientId: number }) {
  const sb = await createClient();
  const { data: businesses, error } = await sb
    .from("businesses")
    .select("*, shareholders (*)")
    .eq("client_id", clientId);

  if (error) {
    // handle error
  }
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Shareholders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {businesses?.map((b) => (
          <div key={b.id}>
            <h2 className="text-lg font-bold">{b.name}</h2>
            <ShareholdersTable shareholders={b.shareholders} />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <AddBusinessDialog />
      </CardFooter>
    </Card>
  );
}
