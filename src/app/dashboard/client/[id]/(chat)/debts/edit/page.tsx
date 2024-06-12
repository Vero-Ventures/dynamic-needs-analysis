import getDebt from "@/app/data/debt";
import EditDebtForm from "./edit-debt-form";
import { notFound } from "next/navigation";

export default async function EditDebtPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id: debtId } = searchParams;

  const debt = await getDebt(+debtId);
  if (!debt) notFound();

  return (
    <div>
      <EditDebtForm defaultFormValues={debt} />
    </div>
  );
}
