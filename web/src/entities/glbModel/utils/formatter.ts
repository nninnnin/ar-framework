import {
  flattenListItem,
  mapListItems,
  pipe,
  pluckList,
  extractStringValues,
} from "@rebel9/memex-fetcher";

import {
  GlbModelItemFormatted,
  GlbModelItemResult,
  GlbModelListResult,
} from "@/entities/glbModel/types";

export const formatGLBModelItems = (
  result: GlbModelListResult
) => {
  return pipe(
    result,
    pluckList,
    mapListItems(flattenListItem),
    mapListItems(extractStringValues(["name"], "KO"))
  );
};

export const formatGLBModelItem = (
  result: GlbModelItemResult
) => {
  return pipe(
    result,
    flattenListItem,
    extractStringValues(["name"], "KO")
  );
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
