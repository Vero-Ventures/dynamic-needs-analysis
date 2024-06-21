import { z } from "zod";

export const createDebtSchema = z.object({
  name: z.string(),
  initial_value: z.coerce.number(),
  rate: z.coerce.number(),
  term: z.coerce.number(),
  insurable_future_value_dollars: z.coerce.number(),
  annual_payment: z.coerce.number(),
  year_acquired: z.coerce.number(),
  actual_term: z.coerce.number(),
});

export type CreateDebt = z.infer<typeof createDebtSchema>;
