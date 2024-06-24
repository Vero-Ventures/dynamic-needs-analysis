import { z } from "zod";

export const createBeneficiarySchema = z.object({
  name: z.string(),
  allocation: z.coerce.number(),
});

export type CreateBeneficiary = z.infer<typeof createBeneficiarySchema>;
