import Beneficiaries from "./beneficiaries";

export default function BeneficiariesPage({
  params,
}: {
  params: { id: string };
}) {
  const clientId = parseInt(params.id);
  return (
    <div className="space-y-3 p-4">
      <h1 className="text-3xl font-bold">Beneficiaries</h1>
      <Beneficiaries clientId={clientId} />
    </div>
  );
}
