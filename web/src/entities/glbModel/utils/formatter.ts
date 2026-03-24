import {
  GlbModelItemFormatted,
  GlbModelItemResult,
  GlbModelListResult,
} from "@/entities/glbModel/types";

export const formatGLBModelItems = (
  result: GlbModelListResult
): GlbModelItemFormatted[] => {
  return result.list.map(({ uid, data }) => ({
    uid,
    name: (data.name as { KO?: string })?.KO ?? "",
    mediaPath: data.mediaPath,
    isDeleted: data.isDeleted,
    latitude: data.latitude,
    longitude: data.longitude,
    scale: data.scale,
    rotation: data.rotation,
    position: data.position,
    interactions: data.interactions,
    visibility: data.visibility,
  }));
};

export const formatGLBModelItem = (
  result: GlbModelItemResult
): GlbModelItemFormatted => {
  return {
    uid: result.uid,
    name: (result.data.name as { KO?: string })?.KO ?? "",
    mediaPath: result.data.mediaPath,
    isDeleted: result.data.isDeleted,
    latitude: result.data.latitude,
    longitude: result.data.longitude,
    scale: result.data.scale,
    rotation: result.data.rotation,
    position: result.data.position,
    interactions: result.data.interactions,
    visibility: result.data.visibility,
  };
};

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
