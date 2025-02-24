import { differenceBy } from "lodash";
import React, { useEffect } from "react";

import Dialog from "@/components/common/Dialog";
import ModelEditor from "@/components/Project/ModelEditor";
import useProjectItem from "@/hooks/useProjectItem";
import { useSelectedGroup } from "@/hooks/useSelectedGroup";
import useGlbModels from "@/hooks/useGlbModels";
import {
  AddedModel,
  useAddedModels,
  useSelectedModelIndex,
} from "@/stores";
import {
  postGlbModels,
  uploadGlbModels,
} from "@/utils/fetchers/glbModel";
import { updateProject } from "@/utils/fetchers/project";
import {
  createProjectBody,
  getProjectTypeId,
} from "@/utils";
import useProjectTypes from "@/hooks/useProjectTypes";

const ProjectModelEditingDialog = ({
  projectId,
  onClose,
}: {
  projectId: string;
  onClose: () => void;
}) => {
  const { selectedGroup } = useSelectedGroup();
  const { addModels, resetAddedModels, addedModels } =
    useAddedModels();

  const { resetSelectedModelIndex } =
    useSelectedModelIndex();

  const { projectItem } = useProjectItem(
    projectId,
    selectedGroup?.name ?? ""
  );

  const { data: projectTypes } = useProjectTypes();

  const { data: glbModels, isLoading } = useGlbModels({
    modelIds: projectItem?.glbModels.map((m) => m.uid),
    asFile: true,
  });

  useEffect(() => {
    if (!glbModels || isLoading) return;

    addModels(glbModels as AddedModel[]);

    return () => {
      resetAddedModels();
      resetSelectedModelIndex();
    };
  }, [glbModels, isLoading]);

  const isChanged =
    !isLoading &&
    glbModels?.length !==
      addedModels.filter((el) => el).length;

  const handleSaveClick = async () => {
    const newlyAddedModels = differenceBy(
      addedModels.filter((el) => el),
      glbModels as AddedModel[],
      "id"
    );

    console.log(
      "새롭게 추가된 것: ",
      newlyAddedModels
    );

    const result = await uploadGlbModels(
      newlyAddedModels
        .filter((m) => m)
        .map((m) => m!.file)
    );

    const postModelResult = await postGlbModels(
      result
    );

    const projectTypeId = getProjectTypeId(
      projectItem!.projectType,
      projectTypes
    );

    if (!projectTypeId) {
      throw new Error(
        "프로젝트 타입이 존재하지 않습니다."
      );
    }

    const postUpdateResult = await updateProject({
      uid: projectId,
      ...createProjectBody(
        projectItem!.name,
        projectTypeId,
        [
          ...projectItem!.glbModels.map((m) => m.uid),
          ...postModelResult.map((r) => r),
        ],
        selectedGroup!.uid
      ),
    });

    console.log(
      "postUpdateResult: ",
      postUpdateResult
    );

    onClose();
  };

  return (
    <Dialog size="large">
      <Dialog.Header handleCloseClick={onClose}>
        <Dialog.HeaderLabel>
          프로젝트 모델 수정
        </Dialog.HeaderLabel>
      </Dialog.Header>

      <ModelEditor />

      <Dialog.ButtonContainer>
        <Dialog.Button
          disabled={!isChanged || !projectItem}
          onClick={handleSaveClick}
        >
          수정하기
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default ProjectModelEditingDialog;
