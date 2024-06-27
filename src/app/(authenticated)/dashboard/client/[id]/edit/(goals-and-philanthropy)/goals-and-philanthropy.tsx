import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoalsAndPhilanthropyTable from "./goals-and-philanthropy-table";
import AddGoalsAndPhilanthropyDialog from "./add-goals-and-philanthropy-dialog";
import LiquidityAllocatedTowardsGoalsEdit from "./liquidity-allocated-towards-goals-edit";

export default function GoalsAndPhilanthropy({
  clientId,
}: {
  clientId: number;
}) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-4xl font-bold">
          Goals & Philanthropy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-9">
        <LiquidityAllocatedTowardsGoalsEdit clientId={clientId} />
        <AddGoalsAndPhilanthropyDialog />
        <GoalsAndPhilanthropyTable clientId={clientId} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
