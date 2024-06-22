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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BusinessesWithShareholders } from "@/data/businesses";
import type { CreateShareholder } from "./schema";
import { createShareholderSchema } from "./schema";
import { createShareholder } from "./actions";

export function AddShareholderForm({
  businesses,
  onCloseDialog,
}: {
  businesses: BusinessesWithShareholders;
  onCloseDialog: () => void;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(createShareholder);
  const form = useForm<CreateShareholder>({
    resolver: zodResolver(createShareholderSchema),
    defaultValues: {
      name: "",
      insurance_coverage: 0,
      share_percentage: 0,
      business: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: CreateShareholder) {
    await execute({
      ...values,
      business_id: Number.parseInt(values.business),
      client_id: clientId,
    });
    onCloseDialog();
  }
  return (
    <DialogContent className="max-h-[calc(100dvh-100px)] overflow-y-auto p-0 sm:max-w-[700px]">
      <DialogHeader className="rounded-t-xl border-b bg-muted p-4">
        <DialogTitle className="font-bold text-secondary">
          Add Business
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
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business" />
                    </SelectTrigger>
                    <SelectContent>
                      {businesses.map((b) => (
                        <SelectItem key={b.id} value={b.id.toString()}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
