import { css } from "@emotion/react";
import React, { useState } from "react";

import Dialog from "@/components/common/Dialog";

const CreationDialog = ({
  message,
  onCancelClick,
  onConfirmClick,
}: {
  message: string;
  onCancelClick: () => void;
  onConfirmClick: (name: string) => Promise<void>;
}) => {
  const [name, setName] = useState("");

  return (
    <Dialog
      size="small"
      cssOverlap={css`
        display: flex;
        flex-direction: column;
        gap: 1.2em;
      `}
    >
      <Dialog.Header handleCloseClick={onCancelClick}>
        <div
          css={css`
            font-size: 0.8em;
            margin-left: 7px;
          `}
        >
          새로운 그룹 만들기
        </div>
      </Dialog.Header>

      <Dialog.ContentsContainer>
        <div>{message}</div>

        <input
          css={css`
            padding: 0.5em;
            outline: none;
            border: 1px solid black;
          `}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex) 용담 플레이"
        />
      </Dialog.ContentsContainer>

      <Dialog.ButtonContainer>
        <Dialog.Button
          onClick={() => onConfirmClick(name)}
          disabled={!name}
        >
          만들기
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default CreationDialog;
