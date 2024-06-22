import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getBusinessWithShareholders } from "@/data/businesses";
import ShareholdersTable from "./shareholders-table";
import AddShareholderDialog from "./add-shareholder-dialog";

export default async function Shareholders({ clientId }: { clientId: number }) {
  const businesses = await getBusinessWithShareholders(clientId);

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Shareholders
        </CardTitle>
      </CardHeader>
      <CardContent>
        {businesses &&
          businesses.map((b) =>
            b.shareholders.length > 0 ? (
              <div key={b.id}>
                <h2 className="text-lg font-bold">{b.name}</h2>
                <ShareholdersTable shareholders={b.shareholders} />
              </div>
            ) : null
          )}
      </CardContent>
      <CardFooter>
        <AddShareholderDialog businesses={businesses} />
      </CardFooter>
    </Card>
  );
}
