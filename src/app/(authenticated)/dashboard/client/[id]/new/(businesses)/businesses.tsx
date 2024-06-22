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
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Businesses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BusinessesTable clientId={clientId} />
      </CardContent>
      <CardFooter>
        <AddBusinessDialog />
      </CardFooter>
    </Card>
  );
}