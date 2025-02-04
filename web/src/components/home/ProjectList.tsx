import React from "react";
import { css } from "@emotion/react";

const ProjectList = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul
      css={css`
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
      `}
    >
      {children}
    </ul>
  );
};

export default ProjectList;
