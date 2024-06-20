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

const keyPersonSchema = z.object({
  id: z.number(),
  name: z.string(),
  insurance_coverage: z.number(),
  ebitda_contribution_percentage: z.number(),
});

export type KeyPersonSchema = z.infer<typeof keyPersonSchema>;

export default function KeyPeople({
  keyPeople,
  onAddKeyPerson,
  onChangeKeyPerson,
  onDeleteKeyPerson,
}: {
  keyPeople: KeyPersonSchema[];
  onAddKeyPerson: (keyPerson: KeyPersonSchema) => void;
  onChangeKeyPerson: (keyPerson: KeyPersonSchema) => void;
  onDeleteKeyPerson: (id: number) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key People</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="mx-auto max-w-3xl">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>% EBITDA Contribution</TableHead>
              <TableHead>Insurance coverage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keyPeople.map((s) => (
              <KeyPersonTableRow
                onChangeKeyPerson={onChangeKeyPerson}
                onDeleteKeyPerson={onDeleteKeyPerson}
                key={s.id}
                keyPerson={s}
              />
            ))}
            <Button
              onClick={() =>
                onAddKeyPerson({
                  id: keyPeople.length,
                  name: "",
                  insurance_coverage: 0,
                  ebitda_contribution_percentage: 0,
                })
              }
              type="button"
              className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
              variant="outline"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Key Person</span>
            </Button>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function KeyPersonTableRow({
  keyPerson,
  onChangeKeyPerson,
  onDeleteKeyPerson,
}: {
  keyPerson: KeyPersonSchema;
  onChangeKeyPerson: (keyPerson: KeyPersonSchema) => void;
  onDeleteKeyPerson: (id: number) => void;
}) {
  return (
    <TableRow>
      <TableCell>
        <Input
          placeholder="Enter name"
          value={keyPerson.name}
          onChange={(e) =>
            onChangeKeyPerson({ ...keyPerson, name: e.target.value })
          }
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="0"
          value={keyPerson.ebitda_contribution_percentage}
          onChange={(e) =>
            onChangeKeyPerson({
              ...keyPerson,
              ebitda_contribution_percentage: +e.target.value,
            })
          }
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="0"
          value={keyPerson.insurance_coverage}
          onChange={(e) =>
            onChangeKeyPerson({
              ...keyPerson,
              insurance_coverage: +e.target.value,
            })
          }
        />
      </TableCell>
      <TableCell>
        <DeleteItemButton onClick={() => onDeleteKeyPerson(keyPerson.id)} />
      </TableCell>
    </TableRow>
  );
}
