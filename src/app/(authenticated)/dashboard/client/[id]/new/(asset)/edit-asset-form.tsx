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

import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ASSET_TYPES } from "@/constants/assetTypes";
import BeneficiaryAllocation from "./beneficiary-allocation";
import type { CreateAsset } from "./schema";
import { createAssetSchema } from "./schema";
import { editAsset } from "./actions";
import { useParams } from "next/navigation";
import type { AssetBeneficiary } from "@/data/assets";
import type { Asset, Beneficiary } from "@/types/db";
import type { AssetBeneficiaryAllocationFormProps } from "./beneficiary-allocation";

export function EditAssetForm({
  asset,
  beneficiaries,
  editAssetBeneficiaries,
  onCloseDialog,
}: {
  asset: Asset;
  beneficiaries: Omit<Beneficiary, "created_at" | "client_id">[];
  editAssetBeneficiaries: AssetBeneficiary[];
  onCloseDialog: () => void;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending: isDeletingAsset, execute } = useServerAction(editAsset);
  const form = useForm<CreateAsset>({
    resolver: zodResolver(createAssetSchema),
    defaultValues: {
      name: asset.name,
      year_acquired: asset.year_acquired,
      initial_value: asset.initial_value,
      current_value: asset.current_value,
      rate: asset.rate,
      term: asset.term,
      type: asset.type,
      is_taxable: asset.is_taxable,
      is_liquid: asset.is_liquid,
      to_be_sold: asset.to_be_sold,
    },
  });
  const [assetBeneficiaries, setAssetBeneficiaries] = useState<
    AssetBeneficiaryAllocationFormProps[]
  >([]);
  const initialAssetBeneficiaries =
    useRef<AssetBeneficiaryAllocationFormProps[]>();

  useEffect(() => {
    function consolidateAndMarkBeneficiaryAllocations(
      originalBeneficiaries: Omit<Beneficiary, "created_at" | "client_id">[],
      assetBeneficiaries: AssetBeneficiary[]
    ) {
      const beneficiaries = originalBeneficiaries.map((b) => ({
        ...b,
        already_assigned: false,
        allocation: 0,
      }));
      const assetBeneficiariesMap = new Map(
        assetBeneficiaries.map((b) => [b.beneficiary_id, b.allocation])
      );
      return beneficiaries.map((b) => {
        if (assetBeneficiariesMap.has(b.id)) {
          b.allocation = assetBeneficiariesMap.get(b.id) || b.allocation;
          b.already_assigned = true;
        }
        return b;
      });
    }

    if (!editAssetBeneficiaries || !beneficiaries) return;
    const consolidatedBeneficiaries = consolidateAndMarkBeneficiaryAllocations(
      beneficiaries,
      editAssetBeneficiaries
    );
    // Save the initial beneficiaries for resetting the form
    // when the user closes the dialog without saving.
    initialAssetBeneficiaries.current = consolidatedBeneficiaries;

    setAssetBeneficiaries(consolidatedBeneficiaries);
  }, [beneficiaries, editAssetBeneficiaries]);

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
              allocation: !already_assigned ? 0 : beneficiary.allocation,
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
      asset_id: asset.id,
      ...values,
      asset_beneficiaries: assetBeneficiaries
        .map((b) => {
          return {
            beneficiary_id: b.id,
            allocation: b.allocation,
            already_assigned: b.already_assigned,
          };
        })
        .filter((b) => b.already_assigned),
    });
    form.reset({ ...values });
    onCloseDialog();
  }
  return (
    <DialogContent
      className="p-0 sm:max-w-[700px]"
      onCloseAutoFocus={() => {
        // Reset the form when the dialog closes without saving.
        if (!form.formState.isSubmitted) {
          form.reset();
          setAssetBeneficiaries(initialAssetBeneficiaries.current || []);
        }
      }}
    >
      <DialogHeader className="rounded-t-xl border-b bg-muted p-4">
        <DialogTitle className="font-bold text-secondary">
          Edit Asset
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
          <div className="grid grid-cols-3 items-center gap-4">
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
            <div className="col-span-2 flex justify-around">
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
          </div>
          <BeneficiaryAllocation
            assetBeneficiaries={assetBeneficiaries}
            onEditBeneficiary={onEditBeneficiary}
            onToggleBeneficiary={onToggleBeneficiary}
          />
          <DialogFooter>
            <FormSubmitButton
              disabled={!form.formState.isValid}
              isPending={isDeletingAsset || form.formState.isSubmitting}
              loadingValue="Saving..."
              value="Save Changes"
            />
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
