"use client";
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

import FormSubmitButton from "@/components/form-submit-button";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useServerAction } from "zsa-react";
import { useParams } from "next/navigation";

import { AutoComplete } from "@/components/ui/autocomplete";
import type { AssetsWithBeneficiaries } from "@/data/assets";
import { createAssetBeneficiary } from "./actions";
import {
  createAssetBeneficiarySchema,
  type CreateAssetBeneficiary,
} from "./schema";
import type { Beneficiary } from "@/types/db";

export function AddAssetBeneficiaryForm({
  assets,
  beneficiaries,
  onCloseDialog,
}: {
  assets: AssetsWithBeneficiaries;
  beneficiaries: Beneficiary[];
  onCloseDialog: () => void;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(createAssetBeneficiary);
  const form = useForm<CreateAssetBeneficiary>({
    resolver: zodResolver(createAssetBeneficiarySchema),
    defaultValues: {
      allocation: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: CreateAssetBeneficiary) {
    await execute({
      ...values,
      client_id: clientId,
      asset_id: +values.asset.value,
      beneficiary_id: +values.beneficiary.value,
    });
    form.reset();
    onCloseDialog();
  }
  return (
    <DialogContent className="max-h-[calc(100dvh-100px)] overflow-y-auto p-0 sm:max-w-[700px]">
      <DialogHeader className="rounded-t-xl border-b bg-muted p-4">
        <DialogTitle className="font-bold text-secondary">
          Allocate Beneficiary
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 pt-0"
        >
          <FormField
            control={form.control}
            name="allocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allocation</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="asset"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset</FormLabel>
                <FormControl>
                  <AutoComplete
                    value={field.value}
                    options={assets.map((a) => ({
                      value: `${a.id}`,
                      label: a.name,
                    }))}
                    onValueChange={field.onChange}
                    placeholder="Select an asset..."
                    emptyMessage="No asset found."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="beneficiary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beneficiary</FormLabel>
                <FormControl>
                  <AutoComplete
                    value={field.value}
                    options={beneficiaries.map((b) => ({
                      value: `${b.id}`,
                      label: b.name,
                    }))}
                    onValueChange={field.onChange}
                    placeholder="Select a beneficiary..."
                    emptyMessage="No beneficiary found."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <FormSubmitButton
              disabled={!form.formState.isValid}
              isPending={isPending || form.formState.isSubmitting}
              loadingValue="Saving..."
              value="Save Changes"
            />
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
