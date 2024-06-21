import { z } from "zod";

export const createClientSchema = z.object({
  name: z
    .string({
      required_error: "Please enter your name",
    })
    .trim()
    .min(3, "Your name must be greater than 3 characters"),
  birth_date: z.date({
    required_error: "Please enter your birth date",
  }),
  expected_retirement_age: z.coerce
    .number({
      required_error: "Please enter an expected retirement age",
    })
    .min(1, "Expected Retirement Age should be greater than one")
    .max(100, "Expected Retirement Age should be less than 100"),
  province: z.union([
    z.literal("AB"),
    z.literal("BC"),
    z.literal("MB"),
    z.literal("NB"),
    z.literal("NL"),
    z.literal("NS"),
    z.literal("NT"),
    z.literal("NU"),
    z.literal("ON"),
    z.literal("PE"),
    z.literal("QC"),
    z.literal("SK"),
    z.literal("YT"),
  ]),
  annual_income: z.coerce.number({
    required_error: "Please enter your annual income",
  }),
  income_multiplier: z.coerce.number({
    required_error: "Please enter an income multiplier",
  }),
});

export type CreateClientSchema = z.infer<typeof createClientSchema>;
