import { businesses } from "@/app/data/db";
import EditBusinessStepper from "./edit-business-stepper";
import { notFound } from "next/navigation";

export default function EditBusinessPage({
  businessId,
}: {
  businessId: string;
}) {
  const business = businesses.at(+businessId);
  if (!business) {
    notFound();
  }
  return (
    <div className="space-y-6 p-4">
      <EditBusinessStepper business={business} />
    </div>
  );
}
