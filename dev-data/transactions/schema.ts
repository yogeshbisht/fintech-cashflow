import { z } from "zod";

export const transactionSchema = z.object({
  id: z.string(),
  description: z.string(),
  amount: z.string(),
  start_date: z.string().datetime(),
  type: z.enum(["manual", "bank", "sub", "data"]),
  scenario: z.string(),
  category: z.string(),
  reminder: z.object({
    status: z.boolean(),
    date: z.string().datetime(),
    notes: z.string(),
  }),
  frequency: z.object({
    type: z.enum(["daily", "weekly", "monthly", "yearly", "custom"]),
    value: z.number(),
  }),
  transaction_end: z.object({
    type: z.enum(["never", "limit", "date"]),
    value: z.union([z.number(), z.string()]),
  }),
  created: z.string(),
  updated: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;
