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

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import Shareholders from "./shareholders";

const createBusinessSchema = z.object({
  name: z.string().trim().min(3, "Your name must be greater than 3 characters"),
  valuation: z.coerce.number(),
  ebitda: z.coerce.number(),
  term: z.coerce.number(),
  appreciation_rate: z.coerce.number(),
});

type CreateBusinessSchema = z.infer<typeof createBusinessSchema>;

export function AddBusinessForm({
  onCloseDialog,
}: {
  onCloseDialog: () => void;
}) {
  const form = useForm<CreateBusinessSchema>({
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
  async function onSubmit(values: CreateBusinessSchema) {
    console.log(values);
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
          <Shareholders />
          <DialogFooter>
            <FormSubmitButton
              disabled={!form.formState.isValid}
              isPending={form.formState.isSubmitting}
              loadingValue="Saving..."
              value="Save Changes"
            />
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
