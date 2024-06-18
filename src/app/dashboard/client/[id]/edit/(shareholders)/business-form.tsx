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

const businessSchema = z.object({
  name: z.string().trim(),
  market_value: z.coerce.number(),
  growth_rate: z.coerce.number(),
  time_horizon: z.coerce.number(),
});

type BusinessSchema = z.infer<typeof businessSchema>;

export function BusinessForm() {
  const form = useForm<BusinessSchema>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: "",
      market_value: 0,
      growth_rate: 0,
      time_horizon: 0,
    },
  });
  return (
    <div>
      <h1 className="mb-5 text-xl font-semibold">Business</h1>
      <Form {...form}>
        <form className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="market_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fair market value</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="growth_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Growth rate</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time_horizon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time horizon</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
