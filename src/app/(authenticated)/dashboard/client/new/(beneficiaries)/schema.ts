import { z } from "zod";

export const createBeneficiarySchema = z.object({
  name: z.string(),
  allocation: z.number(),
});

export type CreateBeneficiarySchema = z.infer<typeof createBeneficiarySchema>;
