import { last } from "lodash";

import { FormattedCategory } from "@/shared/types";

type CategoryItemInterface = {
  id: number;
  order: number;
  languageMap: { KO?: string };
};

export const formatProjectTypes = (data: {
  list: Array<{
    categories: CategoryItemInterface[];
  }>;
}): FormattedCategory[] => {
  const lastList = last(data.list);
  if (!lastList) return [];
  return lastList.categories.map((category) => ({
    id: category.id,
    name: (category.languageMap.KO ?? "") as string,
  }));
};
