import { imageTargetSchema } from "@/entities/imageTarget/schema";
import { formatImageTarget } from "@/entities/imageTarget/utils/formatters";

const BASE_URL = () => `${process.env.NEXT_URL}/imageTargets/api`;

export const getImageTargets = async () => {
  const res = await fetch(BASE_URL());
  const data = imageTargetSchema.array().parse(await res.json());
  return data.map(formatImageTarget);
};
