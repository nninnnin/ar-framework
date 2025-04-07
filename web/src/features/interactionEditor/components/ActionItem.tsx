import React from "react";
import { css } from "@emotion/react";

import { ACTION_NAMES } from "@/features/interactionEditor/constants";
import { Actions } from "@/features/interactionEditor/types";

const ActionItem = ({ name }: { name: Actions }) => {
  return (
    <div
      css={css`
        background-color: white;
        color: black;

        padding: 4px 6px;

        border: 1px solid black;
        border-bottom: 0px;

        &:last-child {
          border-bottom: 1px solid black;
        }
      `}
    >
      {ACTION_NAMES[name]}
    </div>
  );
};

export default ActionItem;
