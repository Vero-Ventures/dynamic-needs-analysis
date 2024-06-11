import getClient from "../actions";
import EditClientForm from "./edit-client.form";
import { notFound } from "next/navigation";

export default async function EditClientPage() {
  const client = await getClient(0);
  if (!client) {
    notFound();
  }
  return (
    <div className="p-4">
      <EditClientForm defaultFormValues={client} />
    </div>
  );
}
