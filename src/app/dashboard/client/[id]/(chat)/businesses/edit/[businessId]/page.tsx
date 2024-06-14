import EditBusinessStepper from "./edit-business-stepper";
import { notFound } from "next/navigation";
import { getSingleBusinessWithShareholder } from "@/data/businesses";

export default async function EditBusinessPage({
  params,
}: {
  params: { businessId: string };
}) {
  const business = await getSingleBusinessWithShareholder(+params.businessId);
  if (!business) {
    notFound();
  }
  return (
    <div className="space-y-6 p-4">
      <EditBusinessStepper business={business} />
    </div>
  );
}
