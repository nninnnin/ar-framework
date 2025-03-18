import {
  flattenListItem,
  mapListItems,
  pipe,
  pluckList,
  extractStringValues,
} from "@rebel9/memex-fetcher";

import { GlbModelListResult } from "@/entities/glbModel/types";

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
