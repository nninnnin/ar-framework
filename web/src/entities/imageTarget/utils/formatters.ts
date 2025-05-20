import {
  mapObjectProps,
  pipe,
  pluckData,
} from "@rebel9/memex-fetcher";
import {
  LanguageMap,
  MemexModelItem,
} from "@/shared/types/memex";
import { ImageTargetItem } from "@/entities/imageTarget/types";

export const formatImageTargetItem = (
  imageTargetItem: ImageTargetItem
) => {
  return pipe(
    imageTargetItem,
    (item: MemexModelItem<ImageTargetItem>) => ({
      uid: item.uid,
      ...pluckData(item),
    }),
    (item: ImageTargetItem) =>
      mapObjectProps(
        item,
        ["name"],
        (value: LanguageMap) => {
          return value["KO"];
        }
      )
  );
};
