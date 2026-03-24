import { z } from "zod";

export const imageTargetSchema = z.object({
  uid: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  name: z.object({ KO: z.string().default("") }).nullable(),
  path: z.string().nullable(),
  isDeleted: z.boolean().nullable().transform(v => v ?? false),
});

export type ImageTarget = z.infer<typeof imageTargetSchema>;
