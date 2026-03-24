import { removeGlbModel } from "@/entities/glbModel/utils/fetchers/removeGlbModel";
import { removeImageTarget } from "@/entities/imageTarget/utils/removeImageTarget";
import {
  getProjectItem,
  updateProject,
} from "@/entities/project/utils/fetchers";

export const removeProject = async (
  projectItemUid: string
) => {
  // 1. 프로젝트 아이템을 가져온다
  const formattedProjectItem = await getProjectItem(
    projectItemUid
  );

  // 2. 관련된 GLB를 모두 제거한다
  const glbModelIds =
    formattedProjectItem.glbModels.map(
      (model) => model.uid
    );

  await Promise.all(
    glbModelIds.map(async (modelId) => {
      return await removeGlbModel(modelId);
    })
  );

  // 3. 관련된 이미지타겟을 모두 제거한다
  const imageTargetId =
    formattedProjectItem.imageTarget &&
    formattedProjectItem.imageTarget[0]
      ? formattedProjectItem.imageTarget[0].uid
      : null;

  if (imageTargetId) {
    await removeImageTarget(imageTargetId);
  }

  // 4. 프로젝트 아이템을 지운다
  const updateBody = {
    uid: formattedProjectItem.uid,
    name: { KO: formattedProjectItem.name },
    projectType: [formattedProjectItem.projectType.id],
    glbModels: formattedProjectItem.glbModels.map((m) => m.uid),
    imageTarget: formattedProjectItem.imageTarget?.map((t) => t.uid),
    groupName: [formattedProjectItem.groupName.id],
    isDeleted: true,
  };

  console.log(
    "project item update body: ",
    updateBody
  );

  const projectUpdateResult = await updateProject({
    uid: projectItemUid,
    data: updateBody,
    publish: true,
  });

  console.log(
    "프로젝트 업데이트 결과",
    projectUpdateResult
  );

  return;
};
