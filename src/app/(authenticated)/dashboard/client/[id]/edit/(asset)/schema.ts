import { z } from "zod";

export const createAssetSchema = z.object({
  name: z.string().trim().min(3, "Your name must be greater than 3 characters"),
  initial_value: z.coerce.number(),
  current_value: z.coerce.number(),
  year_acquired: z.coerce.number(),
  rate: z.coerce
    .number()
    .min(0, { message: "Growth Rate must be between 0 and 6" })
    .max(6, { message: "Growth Rate must be between 0 and 6" }),
  term: z.coerce
    .number()
    .min(0, { message: "Time Horizon must be greater than 0" })
    .max(20, { message: "Time Horizon cannot exceed 20" }),
  type: z.union([
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

export type CreateAsset = z.infer<typeof createAssetSchema>;

export const createAssetBeneficiarySchema = z.object({
  asset_beneficiaries: z.array(
    z.object({
      beneficiary_id: z.coerce.number(),
      allocation: z.coerce.number(),
    })
  ),
});
export type createAssetBeneficiary = z.infer<
  typeof createAssetBeneficiarySchema
>;
