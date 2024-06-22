import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DebtsTable from "./debts-table";
import AddDebtDialog from "./add-debt-dialog";

export default function Debts({ clientId }: { clientId: number }) {
  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Debts
        </CardTitle>
        <AddDebtDialog />
      </CardHeader>
      <CardContent>
        <DebtsTable clientId={clientId} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
