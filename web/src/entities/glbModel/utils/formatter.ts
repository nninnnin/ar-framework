import { GlbModelItemFormatted } from "@/entities/glbModel/types";
import { GlbModel } from "@/entities/glbModel/schema";

export const formatGlbModel = (row: GlbModel): GlbModelItemFormatted => ({
  uid: row.uid,
  name: row.name?.KO ?? null,
  mediaPath: row.mediaPath,
  isDeleted: row.isDeleted,
  latitude: row.latitude,
  longitude: row.longitude,
  scale: row.scale,
  rotation: row.rotation,
  position: row.position,
  interactions: row.interactions,
  visibility: row.visibility,
});


export const createGlbPostBody = (
  glbModelItemFormatted: GlbModelItemFormatted
) => {
  return {
    name: {
      KO: glbModelItemFormatted.name,
    },
    mediaPath: glbModelItemFormatted.mediaPath,
    isDeleted: String(glbModelItemFormatted.isDeleted),
  };
};
