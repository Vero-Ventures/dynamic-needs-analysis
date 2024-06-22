import { z } from "zod";

export const createAssetBeneficiarySchema = z.object({
  allocation: z.coerce.number(),
  already_assigned: z.boolean(),
});

export type createAssetBeneficiary = z.infer<
  typeof createAssetBeneficiarySchema
>;
