"use client";

import { BirthDatePicker } from "@/components/date-picker";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const clientInfoSchema = z.object({
  name: z.string(),
  birth_date: z.date(),
  annual_income: z.coerce.number(),
  income_multiplier: z.coerce.number(),
});

type ClientInfoSchema = z.infer<typeof clientInfoSchema>;

export function ClientInfoForm() {
  const form = useForm<ClientInfoSchema>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: {
      name: "",
      annual_income: 0,
      birth_date: new Date(),
      income_multiplier: 0,
    },
  });
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Client Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter the client's name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <BirthDatePicker
                        date={new Date(field.value)}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="annual_income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income ($)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="income_multiplier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Income replacement multiplier</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
