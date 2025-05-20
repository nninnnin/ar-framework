import React, { useEffect } from "react";
import { josa } from "es-hangul";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import RemoveDialog from "@/features/project/components/projectItem/RemoveDialog";
import useProjectUidContext from "@/features/project/hooks/useProjectUidContext";
import { removeProject } from "@/entities/project/utils/fetchers/removeProject";
import Overlay from "@/shared/components/Overlay";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/shared/constants/queryKeys";

const RemoveButton = () => {
  const queryClient = useQueryClient();
  const overlay = useOverlay();

  const { projectItem } = useProjectUidContext();

  if (!projectItem) return;

  const handleClick = () => {
    overlay.open(({ close, isOpen }) => {
      const handleClose = () => {
        close();
      };

      const handleConfirm = async () => {
        close();

        overlay.open(({ isOpen, close }) => {
          useEffect(() => {
            (async function () {
              await removeProject(projectItem.uid);

              queryClient.invalidateQueries({
                queryKey: [QueryKeys.Projects],
              });

              close();
            })();
          }, []);

          return (
            <Overlay isOpen={isOpen}>
              <div
                css={css`
                  color: white;
                  font-weight: bold;

                  padding: 1em;
                  border: 1px solid black;
                `}
              >
                프로젝트를 삭제하는 중입니다
              </div>
            </Overlay>
          );
        });
      };

      return (
        <Overlay isOpen={isOpen}>
          <RemoveDialog
            handleConfirm={handleConfirm}
            handleClose={handleClose}
            contents={`${josa(
              projectItem.name,
              "을/를"
            )} 삭제할까요?`}
          />
        </Overlay>
      );
    });
  };

  return (
    <div
      className="project-item-button"
      css={css`
        position: absolute;
        top: 0;
        right: 0;

        padding: 0.5em;
        padding-left: 0.7em;
        padding-right: 0.7em;

        background-color: white;
        flex: 1;
        color: black;
        font-size: 0.7em;
        cursor: pointer;

        border-bottom: 1px solid black;
        border-left: 1px solid black;

        visibility: hidden;
        pointer-events: none;

        &:hover {
          background-color: #f1f1f1;
        }
      `}
      onClick={handleClick}
    >
      삭제
    </div>
  );
};

export default RemoveButton;
