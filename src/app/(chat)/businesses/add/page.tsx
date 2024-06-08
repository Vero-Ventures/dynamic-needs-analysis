import AddBusinessesForm from "./add-businesses-form";
import AddShareholderDialog from "./add-shareholder-dialog";
import { ShareholderTable } from "./shareholder-table";

export default function AddBusinessesPage() {
  return (
    <div className="space-y-6 p-4">
      <AddBusinessesForm />
      <section>
        <h2 className="text-2xl font-bold">Shareholders</h2>
        <AddShareholderDialog />
        <div className="mt-4">
          <ShareholderTable />
        </div>
      </section>
    </div>
  );
}
