import {
  flattenListItem,
  mapListItems,
  pipe,
  pluckList,
  extractStringValues,
  pluckData,
} from "@rebel9/memex-fetcher";

import {
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
