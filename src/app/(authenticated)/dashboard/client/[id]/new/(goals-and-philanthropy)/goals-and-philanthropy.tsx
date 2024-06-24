import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoalsAndPhilanthropyTable from "./goals-and-philanthropy-table";
import AddGoalsAndPhilanthropyDialog from "./add-goals-and-philanthropy-dialog";

export default function GoalsAndPhilanthropy({
  clientId,
}: {
  clientId: number;
}) {
  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Goals & Philanthropy
        </CardTitle>
        <AddGoalsAndPhilanthropyDialog />
      </CardHeader>
      <CardContent className="space-y-9">
        <GoalsAndPhilanthropyTable clientId={clientId} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
