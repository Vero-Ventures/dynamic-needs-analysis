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

import { createBusinessSchema, type CreateBusiness } from "./schema";
import { createBusiness } from "./actions";
import { useServerAction } from "zsa-react";
import { useParams } from "next/navigation";

export function AddBusinessForm({
  onCloseDialog,
}: {
  onCloseDialog: () => void;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(createBusiness);
  const form = useForm<CreateBusiness>({
    resolver: zodResolver(createBusinessSchema),
    defaultValues: {
      name: "",
      valuation: 0,
      ebitda: 0,
      term: 0,
      appreciation_rate: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: CreateBusiness) {
    await execute({ ...values, client_id: clientId });
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
              name="valuation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market Value</FormLabel>
                  <FormControl>
                    <Input placeholder="$0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ebitda"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Corporation&apos;s Ebitda</FormLabel>
                  <FormControl>
                    <Input placeholder="$0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <FormField
              control={form.control}
              name="appreciation_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Growth Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="0.0%" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time horizon</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
