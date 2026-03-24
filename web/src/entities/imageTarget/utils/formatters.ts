import { ImageTargetItem } from "@/entities/imageTarget/types";

type ImageTargetModelItem = {
  uid: string;
  data: ImageTargetItem;
};

export const formatImageTargetItem = (
  imageTargetItem: ImageTargetModelItem
) => {
  return {
    uid: imageTargetItem.uid,
    name: (imageTargetItem.data.name as { KO?: string })?.KO ?? "",
    path: imageTargetItem.data.path,
    isDeleted: imageTargetItem.data.isDeleted,
  };
};
