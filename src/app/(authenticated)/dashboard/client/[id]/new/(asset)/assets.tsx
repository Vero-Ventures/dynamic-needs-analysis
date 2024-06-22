import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AssetsTable from "./assets-table";
import AddAssetDialog from "./add-asset-dialog";

export default function Assets({ clientId }: { clientId: number }) {
  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Assets
        </CardTitle>
        <AddAssetDialog />
      </CardHeader>
      <CardContent>
        <AssetsTable clientId={clientId} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
