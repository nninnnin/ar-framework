import { z } from "zod";

import { GlbModelItemFormatted } from "@/entities/glbModel/types";

const GlbModelItemFormattedValidator = z.object({
  uid: z.string(),
  name: z.string().nullable(),
  mediaPath: z.string().nullable(),
  isDeleted: z.boolean().nullable().transform(v => v ?? false),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  scale: z.string().nullable(),
  rotation: z.string().nullable(),
  position: z.string().nullable(),
  interactions: z.string().nullable(),
  visibility: z.boolean().nullable().transform(v => v ?? true),
});

export const validateGlbModelListFormatted = (
  formattedGlbModelItems: unknown
): GlbModelItemFormatted[] => {
  return z
    .array(GlbModelItemFormattedValidator)
    .parse(formattedGlbModelItems);
};

export const validateGlbModelItemFormatted = (
  formattedGlbModelItem: unknown
): GlbModelItemFormatted => {
  return GlbModelItemFormattedValidator.parse(
    formattedGlbModelItem
  );
};
