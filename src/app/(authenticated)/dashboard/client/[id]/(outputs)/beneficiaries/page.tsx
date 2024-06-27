import Heading from "@/components/heading";
import Beneficiaries from "./beneficiaries";

export default function BeneficiariesPage({
  params,
}: {
  params: { id: string };
}) {
  const clientId = parseInt(params.id);
  return (
    <div className="space-y-3 p-4">
      <Heading variant="h1">Beneficiaries</Heading>
      <Beneficiaries clientId={clientId} />
    </div>
  );
}
