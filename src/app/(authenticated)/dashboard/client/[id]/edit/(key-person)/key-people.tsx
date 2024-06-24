import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBusinessWithKeyPeople } from "@/data/businesses";
import KeyPeopleTable from "./key-people-table";
import AddKeyPeopleDialog from "./add-key-people-dialog";

export default async function KeyPeople({ clientId }: { clientId: number }) {
  const businesses = await getBusinessWithKeyPeople(clientId);

  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Key People
        </CardTitle>
        <AddKeyPeopleDialog businesses={businesses} />
      </CardHeader>
      <CardContent>
        {businesses &&
          businesses.map((b) =>
            b.key_people.length > 0 ? (
              <div key={b.id}>
                <h2 className="text-lg font-bold">{b.name}</h2>
                <KeyPeopleTable keyPeople={b.key_people} />
              </div>
            ) : null
          )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
