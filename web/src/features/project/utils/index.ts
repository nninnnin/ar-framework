import { FormattedCategory } from "@/shared/types";

export const getProjectTypeId = (
  projectTypeName: string,
  projectTypes: FormattedCategory[] | undefined
) => {
  if (!projectTypes) return;

  const projectType = projectTypes.find(
    (item) => item.name === projectTypeName
  );

  return projectType?.id;
};

export const getSearchParam = (
  request: Request,
  key: string
) => {
  return new URL(request.url).searchParams.get(key);
};
