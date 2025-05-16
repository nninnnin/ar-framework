import React from "react";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";
import { josa } from "es-hangul";

import RemoveDialog from "@/features/project/components/projectItem/RemoveDialog";
import Overlay from "@/shared/components/Overlay";
import useProjectUidContext from "@/features/project/hooks/useProjectUidContext";

const RemoveButton = () => {
  const { projectItem } = useProjectUidContext();

  const overlay = useOverlay();

  if (!projectItem) return;

  const handleClick = () => {
    const handleConfirm = () => {
      console.log(projectItem?.uid);
    };

    overlay.open(({ close, isOpen }) => {
      const handleClose = () => {
        close();
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
