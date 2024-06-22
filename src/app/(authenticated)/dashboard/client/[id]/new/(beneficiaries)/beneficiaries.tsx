import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BeneficiariesTable from "./beneficiaries-table";
import AddBeneficiaryDialog from "./add-beneficiary-dialog";

export default function Beneficiaries({ clientId }: { clientId: number }) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Beneficiaries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BeneficiariesTable clientId={clientId} />
      </CardContent>
      <CardFooter>
        <AddBeneficiaryDialog />
      </CardFooter>
    </Card>
  );
}
