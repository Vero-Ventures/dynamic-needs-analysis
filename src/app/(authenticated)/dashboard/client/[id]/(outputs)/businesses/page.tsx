import EBITDAContributionChart from "./ebitda-contribution-chart";
import ShareValueChart from "./share-value-chart";
import { notFound } from "next/navigation";
import { getBusinessesWithShareholdersAndKeyPeople } from "@/data/businesses";
import BusinessTable from "./business-table";
import ShareholdersTable from "./shareholders-table";
import KeyPeopleTable from "./key-people-table";

export default async function Businesses({
  params,
}: {
  params: { id: string };
}) {
  const clientId = parseInt(params.id);
  const businesses = await getBusinessesWithShareholdersAndKeyPeople(clientId);
  if (!businesses) {
    return notFound();
  }
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Businesses</h1>
      <BusinessTable businesses={businesses} />
      <section>
        <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
          Shareholders & Key People
        </h2>
        {businesses &&
          businesses.map((b) => (
            <div key={b.id}>
              <h2 className="mb-4 text-xl font-bold">{b.name}</h2>
              <div className="space-y-6">
                <ShareholdersTable shareholders={b.shareholders} />
                <KeyPeopleTable keyPeople={b.key_people} />
              </div>
            </div>
          ))}
      </section>
      <EBITDAContributionChart businesses={businesses} />
      <ShareValueChart businesses={businesses} />
    </div>
  );
}
