import getClient from "@/app/data/client";
import AddBusinessStepper from "./add-business-stepper";
import { notFound } from "next/navigation";

export default async function AddBusinessesPage() {
  const client = await getClient(0);
  if (!client) {
    notFound();
  }
  return (
    <div className="space-y-6 p-4">
      <AddBusinessStepper clientName={client.name} />
    </div>
  );
}
