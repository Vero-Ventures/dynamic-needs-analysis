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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProvinceInitials } from "@/constants/provinces";
import { CANADIAN_PROVINCES } from "@/constants/provinces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const clientInfoSchema = z.object({
  name: z.string(),
  birth_date: z.date(),
  annual_income: z.coerce.number(),
  income_multiplier: z.coerce.number(),
  province: z.union([
    z.literal("AB"),
    z.literal("BC"),
    z.literal("MB"),
    z.literal("NB"),
    z.literal("NL"),
    z.literal("NS"),
    z.literal("NT"),
    z.literal("NU"),
    z.literal("ON"),
    z.literal("PE"),
    z.literal("QC"),
    z.literal("SK"),
    z.literal("YT"),
  ]),
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
      province: "BC",
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
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="province">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {(
                          Object.keys(CANADIAN_PROVINCES) as ProvinceInitials[]
                        ).map((provinceInitial) => (
                          <SelectItem
                            key={provinceInitial}
                            value={provinceInitial}
                          >
                            {CANADIAN_PROVINCES[provinceInitial]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
