import React from "react";
import { css } from "@emotion/react";

import { Triggers } from "@/features/interactionEditor/types";
import { TRIGGER_NAMES } from "@/features/interactionEditor/constants";

const TriggerItem = ({ name }: { name: Triggers }) => {
  return (
    <div
      css={css`
        background-color: black;
        color: white;

        padding: 4px 6px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {TRIGGER_NAMES[name]}
    </div>
  );
};

export default TriggerItem;
