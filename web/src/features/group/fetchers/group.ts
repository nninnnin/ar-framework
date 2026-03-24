import { z } from "zod";
import createNextApiFetcher from "@/shared/utils/nextApiFetcher";
import { GroupFormatted } from "@/features/group/types/group";
import { groupSchema } from "@/features/group/schema";

const groupFetcher = createNextApiFetcher({ entity: "group" });

const formatGroup = (row: z.infer<typeof groupSchema>): GroupFormatted => ({
  uid: row.uid,
  name: row.name?.KO ?? "",
});

export const createGroup = async (groupName: string) => {
  return groupFetcher.createItem({ name: groupName });
};

export const getGroups = async (): Promise<GroupFormatted[]> => {
  const res = await groupFetcher.getItems();
  const data = z.array(groupSchema).parse(res.data);
  return data.map(formatGroup);
};
