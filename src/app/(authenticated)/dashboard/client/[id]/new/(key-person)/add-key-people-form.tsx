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

import { AutoComplete } from "@/components/ui/autocomplete";
import type { BusinessesWithKeyPeople } from "@/data/businesses";
import { createKeyPerson } from "./actions";
import { createKeyPersonSchema, type CreateKeyPerson } from "./schema";

export function AddKeyPersonForm({
  businesses,
  onCloseDialog,
}: {
  businesses: BusinessesWithKeyPeople;
  onCloseDialog: () => void;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(createKeyPerson);
  const form = useForm<CreateKeyPerson>({
    resolver: zodResolver(createKeyPersonSchema),
    defaultValues: {
      name: "",
      insurance_coverage: 0,
      ebitda_contribution_percentage: 0,
      business: {
        value: "",
        label: "",
      },
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: CreateKeyPerson) {
    await execute({
      ...values,
      business_id: Number.parseInt(values.business.value),
      client_id: clientId,
    });
    form.reset();
    onCloseDialog();
  }
  return (
    <DialogContent className="max-h-[calc(100dvh-100px)] overflow-y-auto p-0 sm:max-w-[700px]">
      <DialogHeader className="rounded-t-xl border-b bg-muted p-4">
        <DialogTitle className="font-bold text-secondary">
          Add Key Person
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
              name="ebitda_contribution_percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>% of EBITDA Contributed</FormLabel>
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
