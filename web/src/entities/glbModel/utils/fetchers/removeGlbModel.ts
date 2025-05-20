import {
  getGlbModel,
  updateGlbModel,
} from "@/entities/glbModel/utils/fetchers";
import { formatGLBModelItem } from "@/entities/glbModel/utils/formatter";
import { createUpdateBody } from "@/shared/utils/createUpdateBody";

export const removeGlbModel = async (
  glbModelUid: string
) => {
  // 1. 가져온다
  const glbItemResponse = await getGlbModel(
    glbModelUid
  );
  const glbItem = await glbItemResponse.json();

  const formattedGlbItem = formatGLBModelItem(glbItem);

  console.log(
    "Removing this formatted glb!",
    formattedGlbItem
  );

  const updateBody = createUpdateBody(
    { ...formattedGlbItem, isDeleted: true },
    {
      name: "title",
      mediaPath: "singletext",
      visibility: "boolean",
      latitude: "singletext",
      longitude: "singletext",
      scale: "singletext",
      position: "singletext",
      rotation: "singletext",
      interactions: "singletext",
      isDeleted: "boolean",
    }
  );

  // 2. 업데이트를 이용해 지운 것으로 표기해준다
  const updateGlbModelResult = await updateGlbModel({
    data: updateBody,
    publish: true,
    uid: glbModelUid,
  });

  return updateGlbModelResult;
};
