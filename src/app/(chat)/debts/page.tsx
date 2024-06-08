import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DebtsPage() {
  return (
    <div className="m-3">
      <Link href="/debts/add">
        <Button>Add New Debt</Button>
      </Link>
    </div>
  );
}
