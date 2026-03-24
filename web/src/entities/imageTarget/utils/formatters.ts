import { ImageTarget, ImageTargetFormatted } from "@/entities/imageTarget/types";

export const formatImageTarget = (row: ImageTarget): ImageTargetFormatted => ({
  uid: row.uid,
  name: row.name?.KO ?? "",
  path: row.path ?? "",
  isDeleted: row.isDeleted,
});
