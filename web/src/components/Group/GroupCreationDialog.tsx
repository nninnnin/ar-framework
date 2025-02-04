import React, { useState } from "react";
import { css } from "@emotion/react";

import Dialog from "@/components/common/Dialog";
import useCreateGroup from "@/hooks/useCreateGroup";

const GroupCreationDialog = ({ close }: { close: () => void }) => {
  const [name, setName] = useState("");

  const { mutate: createGroup } = useCreateGroup();

  const onConfirmClick = async (name: string) => {
    await createGroup(name);

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
        <div>그룹 이름을 입력해주세요!</div>
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

export default GroupCreationDialog;
