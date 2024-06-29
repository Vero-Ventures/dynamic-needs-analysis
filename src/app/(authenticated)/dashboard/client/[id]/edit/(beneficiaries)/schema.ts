import { z } from "zod";

export const createBeneficiarySchema = z.object({
  name: z.string(),
  allocation: z.coerce.number(),
});

export type CreateBeneficiary = z.infer<typeof createBeneficiarySchema>;

export const editBeneficiarySchema = createBeneficiarySchema;

export type EditBeneficiary = CreateBeneficiary;
