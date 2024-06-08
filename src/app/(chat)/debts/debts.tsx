import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Debts() {
  return (
    <Link href="/debts/add">
      <Button>Add New Debt</Button>
    </Link>
  );
}
