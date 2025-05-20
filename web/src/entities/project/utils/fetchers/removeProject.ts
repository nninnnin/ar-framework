import { removeGlbModel } from "@/entities/glbModel/utils/fetchers/removeGlbModel";
import { removeImageTarget } from "@/entities/imageTarget/utils/removeImageTarget";
import {
  getProjectItem,
  updateProject,
} from "@/entities/project/utils/fetchers";
import { formatProjectItem } from "@/entities/project/utils/formatters";
import { ProjectFormatted } from "@/features/project/types/project";
import { createUpdateBody } from "@/shared/utils/createUpdateBody";
import {
  createMemexFetcher,
  mapObjectProps,
  pipe,
} from "@rebel9/memex-fetcher";

const TOKEN = process.env.MEMEX_TOKEN ?? "";

export const removeProject = async (
  projectItemUid: string
) => {
  // 1. 프로젝트 아이템을 가져온다
  const projectItem = await getProjectItem(
    projectItemUid
  );

  const formattedProjectItem =
    formatProjectItem(projectItem);

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
  const updateBody = createUpdateBody(
    {
      ...pipe(
        formattedProjectItem,
        (item: ProjectFormatted) =>
          mapObjectProps(
            item,
            ["glbModels", "imageTarget"],
            (
              value: { name: string; uid: string }[]
            ) => {
              return value.map((item) => item.uid);
            }
          ),
        (item: ProjectFormatted) =>
          mapObjectProps(
            item,
            ["projectType"],
            (value: { name: string; id: string }) => {
              return [value.id];
            }
          ),
        (item: ProjectFormatted) =>
          mapObjectProps(
            item,
            ["groupName"],
            (value: { name: string; id: string }) => {
              return [value.id];
            }
          )
      ),
      isDeleted: true,
    },
    {
      uid: "singletext",
      name: "title",
      projectType: "category",
      glbModels: "relation",
      imageTarget: "relation",
      isDeleted: "boolean",
    }
  );

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

  // 5. 그룹에서 프로젝트 아이템을 지운다

  return;
};
