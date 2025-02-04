import React from "react";
import { css } from "@emotion/react";

const ProjectModelSelection = () => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
      `}
    >
      <div></div>

      <div
        css={css`
          width: 200px;
          height: 100%;
          background-color: beige;
        `}
      ></div>
    </div>
  );
};

export default ProjectModelSelection;
