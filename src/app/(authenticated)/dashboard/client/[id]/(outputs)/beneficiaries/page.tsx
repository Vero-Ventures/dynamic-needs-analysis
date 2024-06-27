import Heading from "@/components/heading";
import Beneficiaries from "./beneficiaries";

export default function BeneficiariesPage({
  params,
}: {
  params: { id: string };
}) {
  const clientId = parseInt(params.id);
  return (
    <section className="space-y-4 p-6">
      <Heading variant="h1">Beneficiaries</Heading>
      <Beneficiaries clientId={clientId} />
    </section>
  );
}
