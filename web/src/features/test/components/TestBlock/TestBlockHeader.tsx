import React from "react";
import { css } from "@emotion/react";
import Toggler from "@/features/test/components/TestBlock/Toggler";

const TestBlockHeader = ({
  name,
  showDetails,
  isTestPassed,
  isTestRunned,
  handleToggleClick,
  handleTestRunClick,
  children,
}: {
  name?: string;
  showDetails: boolean;
  isTestPassed: boolean;
  isTestRunned: boolean;
  handleToggleClick: () => void;
  handleTestRunClick: () => Promise<void>;
  children?: React.ReactNode;
}) => {
  return (
    <div
      css={css`
        border: 1px solid black;

        padding: 1em;

        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 1em;
        `}
      >
        <span>{name}</span>

        {isTestRunned && (
          <Toggler
            toggled={showDetails}
            onClick={handleToggleClick}
          />
        )}
      </div>

      <div>{children}</div>

      <span
        css={css`
          color: ${isTestPassed ? "" : "red"};
          user-select: none;
        `}
      >
        {isTestRunned ? (
          <>{isTestPassed ? "통과" : "실패"}</>
        ) : (
          <button onClick={handleTestRunClick}>
            실행하기
          </button>
        )}
      </span>
    </div>
  );
};

export default TestBlockHeader;
