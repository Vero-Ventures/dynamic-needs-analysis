import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { calculateAgeFromDate } from "@/lib/client/utils";
import { ArrowRight } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import type { Client } from "@/types/db";

export default function ClientCard({ client }: { client: Client }) {
  const age = calculateAgeFromDate(new Date(client.birth_date));
  return (
    <Link href={`/dashboard/client/${client.id}/income-replacement`}>
      <Card className="group relative rounded-3xl transition-colors hover:bg-gray-200 dark:hover:bg-zinc-900">
        <span className="absolute rounded-br-2xl rounded-tl-2xl bg-secondary px-4 py-2 font-bold text-secondary-foreground">
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
