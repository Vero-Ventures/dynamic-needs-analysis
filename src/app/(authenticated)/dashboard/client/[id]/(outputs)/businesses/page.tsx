import EBITDAContributionChart from "./ebitda-contribution-chart";
import ShareValueChart from "./share-value-chart";
import { notFound } from "next/navigation";
import { getBusinessesWithShareholdersAndKeyPeople } from "@/data/businesses";
import BusinessTable from "./business-table";
import ShareholdersTable from "./shareholders-table";
import KeyPeopleTable from "./key-people-table";
import Heading from "@/components/heading";

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
    <section className="space-y-6 p-6">
      <Heading variant="h1">Businesses</Heading>
      <BusinessTable businesses={businesses} />
      <section>
        <Heading variant="h2">Shareholders & Key People</Heading>
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
      <Heading variant="h2">EBITDA Contribution Per Year</Heading>
      <EBITDAContributionChart businesses={businesses} />
      <Heading variant="h2">Share Value Per Year</Heading>
      <ShareValueChart businesses={businesses} />
    </section>
  );
}
