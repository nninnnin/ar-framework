import React from "react";
import { css } from "@emotion/react";

const Toggler = ({
  toggled,
  onClick,
}: {
  toggled: boolean;
  onClick: () => void;
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width="12"
      height="12"
      css={css`
        transform: ${toggled ? "" : "rotate(-90deg)"};
      `}
      onClick={onClick}
    >
      <polygon
        points="0,0 100,0 50,100"
        fill="#777777"
      />
    </svg>
  );
};

export default Toggler;
