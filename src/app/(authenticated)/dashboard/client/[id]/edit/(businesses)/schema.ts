import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z.string().trim().min(3, "Your name must be greater than 3 characters"),
  valuation: z.coerce.number(),
  ebitda: z.coerce.number(),
  term: z.coerce
    .number()
    .min(0, { message: "Time Horizon must be greater than 0" })
    .max(20, { message: "Time Horizon cannot exceed 20" }),
  appreciation_rate: z.coerce
    .number()
    .min(0, { message: "Growth Rate must be between 0 and 6" })
    .max(6, { message: "Growth Rate must be between 0 and 6" }),
});

export type CreateBusiness = z.infer<typeof createBusinessSchema>;

export const editBusinessSchema = createBusinessSchema;
export type EditBusiness = CreateBusiness;
