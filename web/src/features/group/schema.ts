import { z } from "zod";

export const groupSchema = z.object({
  uid: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  name: z.object({ KO: z.string().default("") }).nullable(),
});

export type Group = z.infer<typeof groupSchema>;
