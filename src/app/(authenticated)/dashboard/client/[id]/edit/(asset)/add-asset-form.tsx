import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import FormSubmitButton from "@/components/form-submit-button";

import { Checkbox } from "@/components/ui/checkbox";
import { ASSET_TYPES } from "@/constants/assetTypes";
import type { AssetBeneficiary } from "./beneficiary-allocation";
import BeneficiaryAllocation from "./beneficiary-allocation";
import { useState } from "react";
import type { BeneficiarySchema } from "../(beneficiaries)/beneficiaries";

const addAssetSchema = z.object({
  name: z.string().trim().min(3, "Your name must be greater than 3 characters"),
  year_acquired: z.number(),
  purchase_price: z.coerce.number(),
  current_value: z.coerce.number(),
  growth_rate: z.coerce.number(),
  asset_type: z.union([
    z.literal("Cash"),
    z.literal("Stocks"),
    z.literal("Bonds"),
    z.literal("Real Estate"),
    z.literal("Mutual Funds"),
    z.literal("Retirement Account"),
    z.literal("Crypto"),
    z.literal("Life Insurance"),
  ]),
  is_taxable: z.boolean(),
  to_be_sold: z.boolean(),
  is_liquid: z.boolean(),
});

export type AddAssetFormSchema = z.infer<typeof addAssetSchema>;

export function AddAssetForm({
  beneficiaries,
  onCloseDialog,
  onAddAssetWithBeneficiaries,
}: {
  beneficiaries: BeneficiarySchema[];
  onCloseDialog: () => void;
  onAddAssetWithBeneficiaries: (
    asset: AddAssetFormSchema,
    beneficiaries: AssetBeneficiary[]
  ) => void;
}) {
  const form = useForm<AddAssetFormSchema>({
    resolver: zodResolver(addAssetSchema),
    defaultValues: {
      name: "",
      year_acquired: new Date().getFullYear(),
      purchase_price: 0,
      current_value: 0,
      growth_rate: 0,
      asset_type: "Cash",
      is_taxable: false,
      is_liquid: false,
      to_be_sold: false,
    },
  });
  const [assetBeneficiaries, setAssetBeneficiaries] = useState<
    AssetBeneficiary[]
  >(() =>
    beneficiaries.map((beneficiary) => ({
      ...beneficiary,
      already_assigned: true,
    }))
  );

  function onEditBeneficiary(id: number, allocation: number) {
    setAssetBeneficiaries(
      assetBeneficiaries.map((beneficiary) =>
        beneficiary.id === id
          ? {
              ...beneficiary,
              allocation,
            }
          : beneficiary
      )
    );
  }

  function onToggleBeneficiary(id: number, already_assigned: boolean) {
    setAssetBeneficiaries(
      assetBeneficiaries.map((beneficiary) =>
        beneficiary.id === id
          ? {
              ...beneficiary,
              already_assigned,
            }
          : beneficiary
      )
    );
  }

  // 2. Define a submit handler.
  async function onSubmit(values: AddAssetFormSchema) {
    onAddAssetWithBeneficiaries(values, assetBeneficiaries);
    form.reset();
    setAssetBeneficiaries(
      beneficiaries.map((beneficiary) => ({
        ...beneficiary,
        already_assigned: true,
      }))
    );
    onCloseDialog();
  }
  return (
    <DialogContent className="p-0 sm:max-w-[700px]">
      <DialogHeader className="rounded-t-xl border-b bg-muted p-4">
        <DialogTitle className="font-bold text-secondary">
          Add Asset
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 pt-0"
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
              name="year_acquired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Acquired</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purchase_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price</FormLabel>
                  <FormControl>
                    <Input placeholder="$0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <FormField
              control={form.control}
              name="current_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Value</FormLabel>
                  <FormControl>
                    <Input placeholder="$0.00" {...field} />
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
                  <FormLabel>Growth Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="asset_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Type</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ASSET_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
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
          <div className="grid grid-cols-3 items-center gap-4">
            <FormField
              control={form.control}
              name="is_taxable"
              render={({ field }) => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Is Taxable</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="to_be_sold"
              render={({ field }) => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>To be Sold</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_liquid"
              render={({ field }) => (
                <FormItem className="flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Is Liquid</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <BeneficiaryAllocation
            assetBeneficiaries={assetBeneficiaries}
            onEditBeneficiary={onEditBeneficiary}
            onToggleBeneficiary={onToggleBeneficiary}
          />
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
