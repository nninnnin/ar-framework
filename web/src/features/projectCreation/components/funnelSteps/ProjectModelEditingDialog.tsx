import { differenceBy, xorBy } from "lodash";
import React, { useEffect, useState } from "react";

import Dialog from "@/shared/components/Dialog";
import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";
import { useSelectedModelIndex } from "@/features/project/store";
import useProjectItem from "@/features/project/hooks/useProjectItem";
import useProjectTypes from "@/features/project/hooks/useProjectTypes";
import useGlbModels from "@/features/glbModel/hooks/useGlbModels";
import {
  getProjectTypeId,
  isProjectGlbModelsChanged,
} from "@/features/project/utils";

import ModelEditor from "@/features/project/components/ModelEditor";
import { createProjectBody } from "@/entities/project/utils";
import createNextApiFetcher from "@/shared/utils/nextApiFetcher";
import {
  postGlbModels,
  uploadGlbModels,
} from "@/entities/glbModel/utils/fetchers";
import { QueryKeys } from "@/shared/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { createUpdateBody } from "@/shared/utils/createUpdateBody";
import { GlbModelItemFormatted } from "@/entities/glbModel/types";
import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";

const apiFetcher = createNextApiFetcher({
  entity: "project",
});

const glbModelApiFetcher = createNextApiFetcher({
  entity: "glbModel",
});

const ProjectModelEditingDialog = ({
  projectId,
  onClose,
}: {
  projectId: string;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();

  const [isSaving, setIsSaving] = useState(false);

  const { selectedGroup } = useSelectedGroup();
  const {
    editableGlbModels,
    setEditables,
    resetEditables,
  } = useEditableGlbModels();

  const { resetSelectedModelIndex } =
    useSelectedModelIndex();

  const { projectItem } = useProjectItem(
    projectId,
    selectedGroup?.name ?? ""
  );

  const { data: projectTypes } = useProjectTypes();

  const { data: glbModels, isLoading } = useGlbModels({
    modelIds: projectItem?.glbModels.map((m) => m.uid),
  });

  useEffect(() => {
    if (!glbModels || isLoading) return;

    setEditables(glbModels);

    return () => {
      resetEditables();
      resetSelectedModelIndex();
    };
  }, [glbModels, isLoading]);

  if (!glbModels) return <></>;

  const hasChangedModel =
    xorBy(
      glbModels,
      // @ts-ignore
      editableGlbModels,
      (model) => model.uid
    ).length > 0;

  const isChanged = !isLoading && hasChangedModel;

  const handleSaveClick = async () => {
    setIsSaving(true);

    // 새로 추가된 모델이 있다면 업로드 후 프로젝트에 추가
    const newlyAddedModels = differenceBy(
      editableGlbModels,
      glbModels,
      "uid"
    );

    let postedModelIds: string[] = [];

    if (newlyAddedModels && newlyAddedModels.length) {
      const result = await uploadGlbModels(
        newlyAddedModels
          .filter((m) => m.file)
          .map((m) => m!.file!)
      );

      postedModelIds = await postGlbModels(result);
    }

    // 삭제된 모델이 있다면 프로젝트에서 제거 후 삭제
    const removedModels = differenceBy(
      glbModels,
      editableGlbModels,
      "uid"
    );

    if (removedModels && removedModels.length) {
      await Promise.all(
        removedModels.map(async (model) => {
          const res = await glbModelApiFetcher.getItem(
            model.uid
          );

          const originalBody =
            res.data as GlbModelItemFormatted;

          const updateBody = createUpdateBody<{
            isDeleted: boolean;
            mediaPath: string;
            name: string;
            uid: string;
          }>(
            { ...originalBody, isDeleted: true },
            {
              isDeleted: "boolean",
              mediaPath: "longtext",
              name: "title",
              uid: "singletext",
            }
          );

          await glbModelApiFetcher.updateItem(
            model.uid,
            updateBody
          );
        })
      );
    }

    // 프로젝트 모델 수정
    const serverModelIds = projectItem!.glbModels.map(
      (m) => m.uid
    );
    const clientModelIds = editableGlbModels.map(
      (model) => model!.uid
    );

    if (
      isProjectGlbModelsChanged(
        serverModelIds,
        clientModelIds
      )
    ) {
      const updatedModelIds = projectItem!.glbModels
        .filter((model) =>
          clientModelIds.includes(model.uid)
        )
        .map((model) => model.uid)
        .concat(postedModelIds);

      const updateProjectGlbModelList = async () => {
        // 프로젝트 아이디와 업데이트 바디를 가져온다
        const projectTypeId = getProjectTypeId(
          projectItem!.projectType.name,
          projectTypes
        );

        if (!projectTypeId) {
          throw new Error(
            "프로젝트 타입이 존재하지 않습니다."
          );
        }

        const imageTargetId =
          projectItem!.imageTarget &&
          projectItem!.imageTarget[0]
            ? projectItem!.imageTarget[0].uid
            : undefined;

        const projectBody = createProjectBody({
          projectName: projectItem!.name,
          projectTypeId,
          postedModelIds: updatedModelIds,
          groupId: selectedGroup!.uid,
          imageTargetId,
          templateId: projectItem!.templateId,
        });

        const updateBody = {
          uid: projectId,
          ...projectBody,
        };

        await apiFetcher.updateItem(
          projectId,
          updateBody
        );
      };

      await updateProjectGlbModelList();
    }

    // GlbModel Query Invalidation
    await queryClient.invalidateQueries({
      queryKey: [
        QueryKeys.GlbModels,
        QueryKeys.Projects,
      ],
    });

    const groupName = selectedGroup?.name ?? "";

    await queryClient.refetchQueries({
      queryKey: [QueryKeys.Projects, groupName],
    });

    setIsSaving(false);

    onClose();
  };

  return (
    <Dialog size="large">
      <Dialog.Header
        disableCloseButton={isSaving}
        handleCloseClick={onClose}
      >
        <Dialog.HeaderLabel>
          프로젝트 모델 수정
        </Dialog.HeaderLabel>
      </Dialog.Header>

      <ModelEditor />

      <Dialog.ButtonContainer>
        <Dialog.Button
          disabled={
            !isChanged || !projectItem || isSaving
          }
          onClick={handleSaveClick}
        >
          수정하기
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default ProjectModelEditingDialog;
