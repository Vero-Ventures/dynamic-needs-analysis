import { z } from "zod";

export const createShareholderSchema = z.object({
  name: z.string(),
  insurance_coverage: z.coerce.number(),
  share_percentage: z.coerce.number(),
  business: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

export type CreateShareholder = z.infer<typeof createShareholderSchema>;

export const editShareholderSchema = createShareholderSchema;
export type EditShareholder = CreateShareholder;
