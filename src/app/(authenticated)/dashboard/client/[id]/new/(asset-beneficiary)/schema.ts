import { z } from "zod";

export const createAssetBeneficiarySchema = z.object({
  allocation: z.coerce.number(),
  asset: z.object({
    value: z.string(),
    label: z.string(),
  }),
  beneficiary: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

export type CreateAssetBeneficiary = z.infer<
  typeof createAssetBeneficiarySchema
>;
