"use client";

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

const keyPersonSchema = z.object({
  name: z.string().trim(),
  ebita_credited: z.coerce.number(),
  rate: z.coerce.number(),
  years_contributed: z.coerce.number(),
});

type KeyPersonSchema = z.infer<typeof keyPersonSchema>;

export function KeyPersonForm() {
  const form = useForm<KeyPersonSchema>({
    resolver: zodResolver(keyPersonSchema),
    defaultValues: {
      name: "",
      ebita_credited: 0,
      rate: 0,
      years_contributed: 0,
    },
  });
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Key Person
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Corporation&apos;s EBITA</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ebita_credited"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    % of EBITA that the key person is given credit for creating
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appreciation rate of corporation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="years_contributed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Number of years key-person is expected to contribute
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
