import {
  calculateAgeFromDate,
  calculateYearsOfActiveIncome,
  findSelectedBracket,
} from "@/lib/client/utils";
import type { ProvinceInitials } from "@/constants/provinces";
import { CANADIAN_PROVINCES } from "@/constants/provinces";

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BirthDatePicker } from "@/components/date-picker";
import FormSubmitButton from "@/components/form-submit-button";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { addClient } from "./actions";

const createClientSchema = z.object({
  name: z.string().trim().min(3, "Your name must be greater than 3 characters"),
  birth_date: z.date(),
  expected_retirement_age: z.coerce
    .number({
      required_error: "Please enter an expected retirement age",
    })
    .min(1, "Expected Retirement Age should be greater than one")
    .max(100, "Expected Retirement Age should be less than 100"),
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
  annual_income: z.coerce.number(),
  income_multiplier: z.coerce.number(),
});

type CreateClientSchema = z.infer<typeof createClientSchema>;

export function CreateClientForm({
  onCloseDialog,
}: {
  onCloseDialog: () => void;
}) {
  const form = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: "",
      annual_income: 0,
      birth_date: new Date(),
      expected_retirement_age: 65,
      income_multiplier: 0,
      province: "BC",
    },
  });

  const age = calculateAgeFromDate(form.watch("birth_date"));
  const taxBracket = findSelectedBracket(
    form.watch("province"),
    form.watch("annual_income")
  );

  async function onSubmit(values: CreateClientSchema) {
    const result = await addClient({
      ...values,
      birth_date: values.birth_date.toISOString(),
    });
    if (result.error) {
      console.error(result.error);
    }
    onCloseDialog();
  }
  return (
    <DialogContent className="p-0 sm:max-w-[500px]">
      <DialogHeader className="rounded-t-xl border-b bg-secondary p-4">
        <DialogTitle className="font-bold text-primary">
          Create Client
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-6 pt-0"
        >
          <div className="grid grid-cols-2 items-center gap-4">
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
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthdate</FormLabel>
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
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-2">
              <h2 className="text-sm font-medium leading-none">Age</h2>
              <div className="font-bold">{age}</div>
            </div>
            <FormField
              control={form.control}
              name="expected_retirement_age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Retirement Age</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-2">
              <h2 className="text-sm font-medium leading-none">
                Years of Active Income
              </h2>
              <p className="font-bold">
                {calculateYearsOfActiveIncome(
                  age,
                  form.watch("expected_retirement_age")
                )}
              </p>
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
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
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
                  <FormLabel>Income Replacement Multiplier</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">Tax Bracket</h2>
            <div className="font-bold">
              ${taxBracket.minIncome} and up - {taxBracket.taxRate}%
            </div>
          </div>
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