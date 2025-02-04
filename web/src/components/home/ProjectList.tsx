import React from "react";
import { css } from "@emotion/react";

const ProjectList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul
      css={css`
        margin-top: 1em;

        display: flex;
        flex-wrap: wrap;
      `}
    >
      {children}
    </ul>
  );
};

export default ProjectList;
