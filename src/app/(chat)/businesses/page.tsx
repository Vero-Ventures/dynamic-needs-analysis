import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Businesses() {
  return (
    <div className="p-4">
      <Link href="/businesses/add">
        <Button>Add New Business</Button>
      </Link>
    </div>
  );
}
