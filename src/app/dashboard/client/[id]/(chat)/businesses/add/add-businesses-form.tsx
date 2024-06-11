"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StepperFormActions } from "./stepper-form-actions";
import { useStepper } from "@/components/ui/stepper";

const addBusinessSchema = z.object({
  name: z.string().trim(),
  valuation: z.coerce.number(),
  ebitda: z.coerce.number(),
  appreciationRate: z.coerce.number(),
  term: z.coerce.number(),
});

export type AddBusinessesFormSchema = z.infer<typeof addBusinessSchema>;

export default function AddBusinessesForm({
  business,
  onAddBusiness,
}: {
  business: AddBusinessesFormSchema;
  onAddBusiness: (values: AddBusinessesFormSchema) => void;
}) {
  const { nextStep } = useStepper();
  const form = useForm<AddBusinessesFormSchema>({
    resolver: zodResolver(addBusinessSchema),
    defaultValues: business,
  });

  async function onSubmit(values: AddBusinessesFormSchema) {
    onAddBusiness(values);
    nextStep();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2 px-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Widgets Co." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="valuation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valuation ($)</FormLabel>
              <FormControl>
                <Input id="valuation" {...field} />
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
              <FormLabel>EBITDA ($)</FormLabel>
              <FormControl>
                <Input id="EBITDA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appreciationRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appreciation Rate (%)</FormLabel>
              <FormControl>
                <Input id="appreciationRate" {...field} />
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
              <FormLabel>Term (years)</FormLabel>
              <FormControl>
                <Input id="term" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}
