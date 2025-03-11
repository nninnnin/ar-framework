import { last } from "lodash";
import {
  mapListItems,
  pipe,
  pluckList,
} from "@rebel9/memex-fetcher";
import { CategoryInterface } from "@/shared/types/memex";
import { FormattedCategory } from "@/shared/types";

export const formatProjectTypes = (data: {
  list: Array<{
    categories: CategoryInterface[];
  }>;
}): FormattedCategory[] => {
  return pipe(
    data,
    pluckList,
    mapListItems(
      (list: { categories: CategoryInterface[] }) =>
        list.categories.map(
          (category: CategoryInterface) => {
            return {
              id: category.id,
              name: category.languageMap.KO,
            };
          }
        )
    ),
    last
  );
};
