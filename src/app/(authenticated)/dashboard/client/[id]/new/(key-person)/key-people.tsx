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
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Key People
        </CardTitle>
      </CardHeader>
      <CardContent>
        {businesses &&
          businesses.map((b) => (
            <div key={b.id}>
              <h2 className="text-lg font-bold">{b.name}</h2>
              <KeyPeopleTable keyPeople={b.key_people} />
            </div>
          ))}
      </CardContent>
      <CardFooter>
        <AddKeyPeopleDialog businesses={businesses} />
      </CardFooter>
    </Card>
  );
}
