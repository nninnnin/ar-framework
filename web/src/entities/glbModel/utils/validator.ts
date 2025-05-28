import { z } from "zod";

import { GlbModelItemFormatted } from "@/entities/glbModel/types";

const GlbModelItemFormattedValidator = z.object({
  uid: z.string(),
  name: z.string(),
  mediaPath: z.string(),
  isDeleted: z.nullable(z.boolean()),
  latitude: z.nullable(z.string()),
  longitude: z.nullable(z.string()),
  scale: z.string(),
  rotation: z.string(),
  position: z.string(),
  interactions: z.nullable(z.string()),
  visibility: z.nullable(z.boolean()),
});

export const validateGlbModelListFormatted = (
  formattedGlbModelItems: GlbModelItemFormatted[]
) => {
  return z
    .array(GlbModelItemFormattedValidator)
    .parse(formattedGlbModelItems);
};

export const validateGlbModelItemFormatted = (
  formattedGlbModelItem: GlbModelItemFormatted
) => {
  return GlbModelItemFormattedValidator.parse(
    formattedGlbModelItem
  );
};
