import { differenceBy } from "lodash";
import React, { useEffect } from "react";

import Dialog from "@/shared/components/Dialog";
import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";
import {
  AddedModel,
  useProjectGlbModels,
  useSelectedModelIndex,
} from "@/features/project/store";
import useProjectItem from "@/features/project/hooks/useProjectItem";
import useProjectTypes from "@/features/project/hooks/useProjectTypes";
import useGlbModels from "@/features/glbModel/hooks/useGlbModels";
import { getProjectTypeId } from "@/features/project/utils";

import ModelEditor from "@/features/project/components/ModelEditor";
import { createProjectBody } from "@/entities/project/utils";
import createNextApiFetcher from "@/shared/utils/nextApiFetcher";
import {
  postGlbModels,
  uploadGlbModels,
} from "@/entities/glbModel/utils/fetchers";

const apiFetcher = createNextApiFetcher({
  entity: "project",
});

const ProjectModelEditingDialog = ({
  projectId,
  onClose,
}: {
  projectId: string;
  onClose: () => void;
}) => {
  const { selectedGroup } = useSelectedGroup();
  const {
    addModels,
    resetAddedModels,
    projectGlbModels,
  } = useProjectGlbModels();

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
      projectGlbModels.filter((el) => el).length;

  const handleSaveClick = async () => {
    const newlyAddedModels = differenceBy(
      projectGlbModels.filter((el) => el),
      glbModels as AddedModel[],
      "id"
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

    const projectBody = createProjectBody(
      projectItem!.name,
      projectTypeId,
      [
        ...projectItem!.glbModels.map((m) => m.uid),
        ...postModelResult.map((r) => r),
      ],
      selectedGroup!.uid
    );

    const updateBody = {
      uid: projectId,
      ...projectBody,
    };

    const postUpdateResult =
      await apiFetcher.updateItem(
        projectId,
        updateBody
      );

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
