import { css } from "@emotion/react";
import React from "react";

const InteractionPanel = () => {
  return (
    <div
      css={css`
        background-color: #fff;
        color: black;

        position: absolute;
        bottom: 10px;
        right: 10px;

        width: 200px;
        height: 100px;

        overflow: hidden;
      `}
    >
      Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Vitae doloribus deleniti
      assumenda tempore explicabo asperiores totam
      saepe, accusamus, hic consequuntur adipisci ullam
      natus non impedit nihil ut sunt cupiditate illum.
    </div>
  );
};

export default InteractionPanel;
