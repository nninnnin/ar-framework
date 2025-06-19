import React from "react";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import Dialog from "@/shared/components/Dialog";
import createNextApiFetcher from "@/shared/utils/nextApiFetcher";
import useProjectUidContext from "@/features/project/hooks/useProjectUidContext";
import Overlay from "@/shared/components/Overlay";
import { createProjectBody } from "@/entities/project/utils";
import { getProjectTypeId } from "@/features/project/utils";
import useProjectTypes from "@/features/project/hooks/useProjectTypes";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/shared/constants/queryKeys";
import useAdminPassword from "@/features/lock/hooks/useAdminPassword";

const projectApiFetcher = createNextApiFetcher({
  entity: "project",
});

const LockButton = () => {
  const queryClient = useQueryClient();
  const { projectItem } = useProjectUidContext();
  const { password: adminPassword } =
    useAdminPassword();

  const { data: projectTypes } = useProjectTypes();

  const overlay = useOverlay();

  if (!projectItem) return <></>;

  const lockProject = async () => {
    const projectId = projectItem.uid;

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
      projectName: projectItem.name,
      projectTypeId,
      postedModelIds: projectItem.glbModels.map(
        (el) => el.uid
      ),
      groupId: projectItem.groupName.id.toString(),
      imageTargetId,
      templateId: projectItem.templateId,
      isLocked: true,
    });

    const updateBody = {
      uid: projectId,
      ...projectBody,
    };

    await projectApiFetcher.updateItem(
      projectId,
      updateBody
    );

    await queryClient.invalidateQueries({
      queryKey: [QueryKeys.Projects],
    });
  };

  const handleClick = () => {
    overlay.open(({ close: closeOverlay, isOpen }) => {
      return (
        <Overlay isOpen={isOpen}>
          <Dialog size="small">
            <Dialog.Header
              handleCloseClick={() => closeOverlay()}
            >
              <Dialog.HeaderLabel>
                프로젝트 잠금
              </Dialog.HeaderLabel>
            </Dialog.Header>

            <Dialog.ContentsContainer>
              <p
                css={css`
                  font-size: 0.75em;
                  line-height: 1.5em;
                  color: black;
                `}
              >
                프로젝트 잠금은 프로젝트 삭제를
                방지합니다.
                <br />
                프로젝트를 잠글까요?
              </p>
            </Dialog.ContentsContainer>

            <Dialog.ButtonContainer>
              <Dialog.Button
                onClick={async () => {
                  if (!adminPassword) {
                    alert(
                      "관리자 비밀번호가 설정되어 있지 않습니다. 관리자에게 문의하세요."
                    );

                    return;
                  }

                  const passwordInput = prompt(
                    "관리자 비밀번호를 입력하세요."
                  );

                  if (
                    passwordInput !== adminPassword
                  ) {
                    alert("비밀번호가 틀렸습니다.");
                    return;
                  }

                  await lockProject();
                  closeOverlay();
                }}
                cssOverlap={css`
                  font-size: 0.8em;
                  font-weight: 500;
                `}
              >
                잠그기
              </Dialog.Button>
            </Dialog.ButtonContainer>
          </Dialog>
        </Overlay>
      );
    });
  };

  return (
    <div
      css={css`
        flex: 1;
        background-color: #fff;

        padding: 0.7em;

        color: black;
        font-size: 0.8em;

        cursor: pointer;

        &:hover {
          background-color: #f1f1f1;
        }
      `}
      onClick={handleClick}
    >
      잠금
    </div>
  );
};

export default LockButton;
