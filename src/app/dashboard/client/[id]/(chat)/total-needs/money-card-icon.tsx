import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";

interface MoneyCardWithIconProps {
  title: string;
  icon: React.ReactNode;
  amount: number;
}

export default function MoneyCardWithIcon({
  title,
  icon,
  amount,
}: MoneyCardWithIconProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium md:text-base">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold md:text-3xl">
          {formatMoney(amount)}
        </div>
      </CardContent>
    </Card>
  );
}
