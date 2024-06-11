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
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { StepperFormActions } from "./stepper-form-actions";
import { useStepper } from "@/components/ui/stepper";
import { AddBusinessSchema } from "@/app/data/db";

type FormSchema = z.infer<typeof AddBusinessSchema>;

export default function AddBusinessesForm() {
  const { nextStep } = useStepper();
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(AddBusinessSchema),
    defaultValues: {
      name: "",
      valuation: 0,
      ebitda: 0,
      appreciationRate: 0,
      term: 0,
    },
  });

  async function onSubmit() {
    if (!formRef.current) return;
    // const formData = new FormData(formRef.current);
    nextStep();
    // await addGoal(formData);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
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
          name="EBITDA"
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
