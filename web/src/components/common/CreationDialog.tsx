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
      onConfirmClick={() => onConfirmClick(name)}
      onCancelClick={onCancelClick}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1em;
        `}
      >
        <div>{message}</div>
        <input
          css={css`
            padding: 0.5em;
          `}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Dialog>
  );
};

export default CreationDialog;
