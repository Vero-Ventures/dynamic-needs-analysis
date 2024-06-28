import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import FormSubmitButton from "@/components/form-submit-button";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useServerAction } from "zsa-react";
import { useParams } from "next/navigation";

import type { BusinessesWithShareholders } from "@/data/businesses";
import type { EditShareholder } from "./schema";
import { editShareholderSchema } from "./schema";
import { editShareholder } from "./actions";
import { AutoComplete } from "@/components/ui/autocomplete";
import { Shareholder } from "@/types/db";

export function EditShareholderForm({
  businesses,
  shareholder,
  onCloseDialog,
}: {
  shareholder: Shareholder;
  businesses: BusinessesWithShareholders;
  onCloseDialog: () => void;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(editShareholder);
  const form = useForm<EditShareholder>({
    resolver: zodResolver(editShareholderSchema),
    defaultValues: {
      name: shareholder.name,
      insurance_coverage: shareholder.insurance_coverage,
      share_percentage: shareholder.share_percentage,
      business: {
        value: shareholder.business_id.toString(),
        label:
          businesses.find((b) => b.id === shareholder.business_id)?.name || "",
      },
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: EditShareholder) {
    await execute({
      ...values,
      business_id: Number.parseInt(values.business.value),
      shareholder_id: shareholder.id,
      client_id: clientId,
    });
    onCloseDialog();
  }
  return (
    <DialogContent className="max-h-[calc(100dvh-100px)] overflow-y-auto p-0 sm:max-w-[700px]">
      <DialogHeader className="rounded-t-xl border-b bg-muted p-4">
        <DialogTitle className="font-bold text-secondary">
          Edit Shareholder
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 pt-0"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 items-center gap-4">
            <FormField
              control={form.control}
              name="share_percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Share Percentage</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insurance_coverage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Coverage</FormLabel>
                  <FormControl>
                    <Input placeholder="$0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business</FormLabel>
                <FormControl>
                  <AutoComplete
                    value={field.value}
                    options={businesses.map((b) => ({
                      value: `${b.id}`,
                      label: b.name,
                    }))}
                    onValueChange={field.onChange}
                    placeholder="Select a business..."
                    emptyMessage="No business found."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <FormSubmitButton
              disabled={!form.formState.isValid}
              isPending={isPending || form.formState.isSubmitting}
              loadingValue="Saving..."
              value="Save Changes"
            />
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
