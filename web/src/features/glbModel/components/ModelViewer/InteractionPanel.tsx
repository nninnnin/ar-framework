import { css } from "@emotion/react";
import React from "react";

const InteractionPanel = () => {
  return (
    <div
      css={css`
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 100;

        overflow: hidden;
      `}
    >
      <div
        css={css`
          background-color: black;
          padding: 3px;

          font-size: 12px;
        `}
      >
        3개의 인터랙션이 존재합니다
      </div>

      {/* <InteractionPanel.InteractionItem /> */}
    </div>
  );
};

InteractionPanel.InteractionItem = () => {
  return (
    <div
      css={css`
        display: flex;

        font-size: 10px;
      `}
    >
      <div
        css={css`
          background-color: black;
          color: white;

          padding: 4px 6px;

          height: fit-content;
        `}
      >
        핸드트랙/손보이기
      </div>

      <div>
        <div
          css={css`
            background-color: white;
            color: black;

            padding: 4px 6px;
          `}
        >
          모델 나타나기
        </div>

        <div
          css={css`
            background-color: white;
            color: black;

            padding: 4px 6px;
          `}
        >
          애니메이션 시작하기
        </div>
      </div>
    </div>
  );
};

export default InteractionPanel;
