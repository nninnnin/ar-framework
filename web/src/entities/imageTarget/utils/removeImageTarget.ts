import { formatImageTargetItem } from "@/entities/imageTarget/utils/formatters";
import { getImageTargetItem } from "@/entities/imageTarget/utils/getImageTarget";
import { updateImageTarget } from "@/entities/imageTarget/utils/updateImageTarget";
import { createUpdateBody } from "@/shared/utils/createUpdateBody";

export const removeImageTarget = async (
  imageTargetUid: string
) => {
  try {
    const response = await getImageTargetItem(
      imageTargetUid
    );

    const result = await response.json();

    const formatted = formatImageTargetItem(result);

    const updateBody = createUpdateBody(
      {
        ...formatted,
        isDeleted: true,
      },
      {
        name: "title",
        path: "singletext",
        isDeleted: "boolean",
      }
    );

    return await updateImageTarget({
      data: updateBody,
      publish: true,
      uid: imageTargetUid,
    });
  } catch (error) {
    console.error(
      "Error removing image target:",
      error
    );

    return null;
  }
};
