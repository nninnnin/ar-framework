import { updateGlbModel } from "@/entities/glbModel/utils/fetchers";

export const removeGlbModel = async (
  glbModelUid: string
) => {
  return updateGlbModel({
    uid: glbModelUid,
    publish: true,
    data: { isDeleted: true },
  });
};
