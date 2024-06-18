import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import type { Tables } from "../../../types/supabase";
import { calculateAgeFromDate } from "@/lib/client/utils";
import { ArrowRight } from "lucide-react";
import { formatMoney } from "@/lib/utils";

export default function ClientCard({ client }: { client: Tables<"clients"> }) {
  const age = calculateAgeFromDate(client.birth_date);
  return (
    <Link href={`/dashboard/client/${client.id}`}>
      <Card className="group relative rounded-3xl bg-secondary transition-colors hover:bg-primary hover:text-primary-foreground">
        <span className="absolute rounded-br-2xl rounded-tl-2xl bg-primary px-4 py-2 font-bold text-primary-foreground">
          Premium Life
        </span>
        <CardHeader className="pt-16">
          <CardTitle>
            {client.name}, {age}
          </CardTitle>
          <CardDescription>{client.province}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {formatMoney(client.annual_income)}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-end">
            <div>
              <ArrowRight />
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
