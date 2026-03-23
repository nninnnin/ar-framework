import createNextApiFetcher from "@/shared/utils/nextApiFetcher";

import { GroupFormatted } from "@/features/group/types/group";

const groupFetcher = createNextApiFetcher({ entity: "group" });

export const createGroup = async (groupName: string) => {
  return groupFetcher.createItem({ name: groupName });
};

export const getGroups = async (): Promise<GroupFormatted[]> => {
  const res = await groupFetcher.getItems<GroupFormatted[]>();
  return res.data;
};
