import DeleteItemButton from "@/components/delete-item-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import { z } from "zod";

const shareholderSchema = z.object({
  id: z.number(),
  name: z.string(),
  insurance_coverage: z.number(),
  share_percentage: z.number(),
});

export type ShareholderSchema = z.infer<typeof shareholderSchema>;

export default function Shareholders({
  shareholders,
  onAddShareholder,
  onChangeShareholder,
  onDeleteShareholder,
}: {
  shareholders: ShareholderSchema[];
  onAddShareholder: (shareholder: ShareholderSchema) => void;
  onChangeShareholder: (shareholder: ShareholderSchema) => void;
  onDeleteShareholder: (id: number) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shareholders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="mx-auto max-w-3xl">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>% of business owned</TableHead>
              <TableHead>Insurance coverage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shareholders.map((s) => (
              <ShareholderTableRow
                onChangeShareholder={onChangeShareholder}
                onDeleteShareholder={onDeleteShareholder}
                key={s.id}
                shareholder={s}
              />
            ))}
            <Button
              onClick={() =>
                onAddShareholder({
                  id: shareholders.length,
                  name: "",
                  insurance_coverage: 0,
                  share_percentage: 0,
                })
              }
              type="button"
              className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
              variant="outline"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Shareholder</span>
            </Button>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
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
      <TableCell>
        <Input
          placeholder="Enter name"
          value={shareholder.name}
          onChange={(e) =>
            onChangeShareholder({ ...shareholder, name: e.target.value })
          }
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="0"
          value={shareholder.share_percentage}
          onChange={(e) =>
            onChangeShareholder({
              ...shareholder,
              share_percentage: +e.target.value,
            })
          }
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="0"
          value={shareholder.insurance_coverage}
          onChange={(e) =>
            onChangeShareholder({
              ...shareholder,
              insurance_coverage: +e.target.value,
            })
          }
        />
      </TableCell>
      <TableCell>
        <DeleteItemButton onClick={() => onDeleteShareholder(shareholder.id)} />
      </TableCell>
    </TableRow>
  );
}
