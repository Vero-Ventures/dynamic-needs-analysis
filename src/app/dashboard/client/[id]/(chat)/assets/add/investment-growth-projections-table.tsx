import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InvestmentGrowthProjectionsTable({
  data,
}: {
  data: {
    label: string;
    value: string;
  }[];
}) {
  return (
    <Table className="mx-auto">
      <TableHeader />
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.label}>
            <TableCell>{item.label}:</TableCell>
            <TableCell className="text-right text-xl font-medium">
              {item.value}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
