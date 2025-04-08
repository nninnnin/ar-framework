import {
  GlbModelEditable,
  GlbModelFormatted,
} from "@/features/glbModel/types/glbModel";

export type GlbModelUpdateItem = Omit<
  GlbModelFormatted,
  "coordinates" | "path"
> & {
  latitude: string;
  longitude: string;
  mediaPath: string;
  isDeleted: boolean;
};

export const transformGlbEditableToUpdate = (
  editable: GlbModelEditable
): GlbModelUpdateItem => {
  const path = editable.path ?? "";

  const latitude =
    editable.coordinates?.latitude ?? "";
  const longitude =
    editable.coordinates?.longitude ?? "";

  const scale = editable.scale ?? {
    x: 1,
    y: 1,
    z: 1,
  };
  const rotation = editable.rotation ?? {
    x: 0,
    y: 0,
    z: 0,
  };
  const position = editable.position ?? {
    x: 0,
    y: 0,
    z: 0,
  };

  const interactions = editable.interactions ?? [];

  const updateItem: GlbModelUpdateItem = {
    uid: editable.uid,
    name: editable.name,
    mediaPath: path,
    latitude,
    longitude,
    scale,
    rotation,
    position,
    interactions,
    isDeleted: false,
  };

  return updateItem;
};
