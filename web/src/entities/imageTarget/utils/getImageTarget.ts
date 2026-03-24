import { imageTargetSchema } from "@/entities/imageTarget/schema";
import { formatImageTarget } from "@/entities/imageTarget/utils/formatters";

const BASE_URL = () => `${process.env.NEXT_URL}/imageTargets/api`;

export const getImageTargetItem = async (uid: string) => {
  const res = await fetch(`${BASE_URL()}?imageTargetId=${uid}`);
  const data = imageTargetSchema.parse(await res.json());
  return formatImageTarget(data);
};
