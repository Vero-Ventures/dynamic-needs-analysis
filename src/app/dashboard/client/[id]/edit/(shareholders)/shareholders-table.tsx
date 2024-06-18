import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteShareholderButton from "@/components/delete-item-button";
import { Input } from "@/components/ui/input";
import type { ShareholderSchema } from "./shareholders";

export default function ShareholdersTable({
  shareholders,
  onChangeShareholder,
  onDeleteShareholder,
}: {
  shareholders: ShareholderSchema[];
  onChangeShareholder: (shareholder: ShareholderSchema) => void;
  onDeleteShareholder: (id: number) => void;
}) {
  return (
    <div>
      <h1 className="mb-5 text-xl font-semibold">Shareholders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Shareholder name</TableHead>
            <TableHead>Shareholder insurance coverage</TableHead>
            <TableHead>% of business owned</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shareholders.map((s) => (
            <ShareholderTableRow
              key={s.id}
              shareholder={s}
              onChangeShareholder={onChangeShareholder}
              onDeleteShareholder={onDeleteShareholder}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ShareholderTableRow({
  shareholder,
  onChangeShareholder,
  onDeleteShareholder,
}: {
  shareholder: ShareholderSchema;
  onChangeShareholder: (shareholder: ShareholderSchema) => void;
  onDeleteShareholder: (id: number) => void;
}) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        <Input
          placeholder="Name"
          value={shareholder.name}
          onChange={(e) =>
            onChangeShareholder({ ...shareholder, name: e.target.value })
          }
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        <Input
          value={shareholder.insurance_coverage}
          onChange={(e) =>
            onChangeShareholder({
              ...shareholder,
              insurance_coverage: e.target.value ? +e.target.value : 0,
            })
          }
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        <Input
          value={shareholder.business_owned}
          onChange={(e) =>
            onChangeShareholder({
              ...shareholder,
              business_owned: e.target.value ? +e.target.value : 0,
            })
          }
        />
      </TableCell>
      <TableCell className="text-right">
        <DeleteShareholderButton
          size="icon"
          onClick={() => onDeleteShareholder(shareholder.id)}
        />
      </TableCell>
    </TableRow>
  );
}
