import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerAction } from "zsa-react";

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
import type { AssetBeneficiaryAllocationFormProps } from "./beneficiary-allocation";
import BeneficiaryAllocation from "./beneficiary-allocation";
import { useEffect, useState } from "react";
import type { CreateAsset } from "./schema";
import { createAssetSchema } from "./schema";
import { createAsset } from "./actions";
import { useParams } from "next/navigation";

export function AddAssetForm({
  beneficiaries,
  onCloseDialog,
}: {
  beneficiaries: AssetBeneficiaryAllocationFormProps[];
  onCloseDialog: () => void;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending: isCreatingAsset, execute } = useServerAction(createAsset);
  const form = useForm<CreateAsset>({
    resolver: zodResolver(createAssetSchema),
    defaultValues: {
      name: "",
      year_acquired: new Date().getFullYear(),
      initial_value: 0,
      current_value: 0,
      rate: 0,
      term: 0,
      type: "Cash",
      is_taxable: false,
      is_liquid: false,
      to_be_sold: false,
    },
  });
  const [assetBeneficiaries, setAssetBeneficiaries] = useState<
    AssetBeneficiaryAllocationFormProps[]
  >([]);

  useEffect(() => {
    setAssetBeneficiaries(
      beneficiaries.map((beneficiary) => ({
        ...beneficiary,
        already_assigned: true,
      }))
    );
  }, [beneficiaries]);

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
  async function onSubmit(values: CreateAsset) {
    await execute({
      client_id: clientId,
      ...values,
      asset_beneficiaries: assetBeneficiaries
        .filter((b) => b.already_assigned)
        .map((b) => {
          return {
            beneficiary_id: b.id,
            allocation: b.allocation,
          };
        }),
    });
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
              name="initial_value"
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
              name="rate"
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
              name="type"
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
          <div className="grid grid-cols-4 items-center gap-4">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Horizon</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              isPending={isCreatingAsset || form.formState.isSubmitting}
              loadingValue="Saving..."
              value="Save Changes"
            />
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
