import { css } from "@emotion/react";
import React, { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

import Dialog from "@/components/common/Dialog";

const CreationDialog = ({
  message,
  close,
  creationHook,
}: {
  message: string;
  close: () => void;
  creationHook: () => UseMutationResult<any, Error, string, unknown>;
}) => {
  const [name, setName] = useState("");

  const { mutate: create } = creationHook();

  const onConfirmClick = async (name: string) => {
    await create(name);

    close();
  };

  return (
    <Dialog
      onConfirmClick={() => onConfirmClick(name)}
      onCancelClick={() => close()}
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
