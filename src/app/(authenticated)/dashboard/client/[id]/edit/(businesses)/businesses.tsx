import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BusinessesTable from "./businesses-table";
import AddBusinessDialog from "./add-business-dialog";

export default function Businesses({ clientId }: { clientId: number }) {
  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Businesses
        </CardTitle>
        <AddBusinessDialog />
      </CardHeader>
      <CardContent>
        <BusinessesTable clientId={clientId} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
