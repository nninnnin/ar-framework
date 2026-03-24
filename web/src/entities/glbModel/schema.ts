import { z } from "zod";

export const glbModelSchema = z.object({
  uid: z.string(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  name: z.object({ KO: z.string().default("") }).nullable(),
  mediaPath: z.string().nullable(),
  isDeleted: z.boolean().nullable().transform(v => v ?? false),
  visibility: z.boolean().nullable().transform(v => v ?? true),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  scale: z.string().nullable(),
  rotation: z.string().nullable(),
  position: z.string().nullable(),
  interactions: z.string().nullable(),
});

export type GlbModel = z.infer<typeof glbModelSchema>;
