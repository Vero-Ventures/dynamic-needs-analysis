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

const createClientSchema = z.object({
  name: z
    .string({
      required_error: "Please enter your name",
    })
    .trim()
    .min(3, "Your name must be greater than 3 characters"),
  yearAcquired: z.string({
    required_error: "Please enter your birth date",
  }),
  purchasePrice: z.coerce.number({
    required_error: "Please enter an expected retirement age",
  }),
  currentValue: z.coerce.number(),
  assetType: z.union([
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
  annual_income: z.coerce.number({
    required_error: "Please enter your annual income",
  }),
  income_multiplier: z.coerce.number({
    required_error: "Please enter an income multiplier",
  }),
});

type CreateClientSchema = z.infer<typeof createClientSchema>;

export function AddAssetForm({ onCloseDialog }: { onCloseDialog: () => void }) {
  const form = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: "",
      annual_income: 0,
      birth_date: new Date().toString(),
      expected_retirement_age: 65,
      income_multiplier: 0,
      province: "BC",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: CreateClientSchema) {
    console.log(values);
    onCloseDialog();
  }
  return (
    <DialogContent className="p-0 sm:max-w-[700px]">
      <DialogHeader className="rounded-t-xl border-b bg-secondary p-4">
        <DialogTitle className="font-bold text-primary">Add Asset</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-6 pt-0"
        >
          <div className="grid grid-cols-3 items-center gap-4">
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
          <div className="grid grid-cols-3 items-center gap-4">
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
          <div className="grid grid-cols-4 items-center gap-4">
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
