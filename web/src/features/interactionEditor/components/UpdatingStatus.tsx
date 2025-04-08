import React from "react";
import { css } from "@emotion/react";
import Lottie from "react-lottie";

import updateSpinnerData from "@/features/interactionEditor/assets/animations/spinner--update.json";
import { UpdateStatus } from "@/features/interactionEditor/types";

const UpdatingStatus = ({
  status,
}: {
  status: UpdateStatus;
}) => {
  if (status === null) {
    return <></>;
  }

  return (
    <div
      css={css`
        width: 12px;
        height: 12px;

        overflow: hidden;

        transform: scale(3);

        display: flex;
        justify-content: center;
        align-items: center;

        margin-left: 4px;
      `}
    >
      {status === "updating" && (
        // @ts-ignore
        <Lottie
          options={{
            animationData: updateSpinnerData,
            loop: true,
            autoplay: true,
          }}
        />
      )}

      {status === "updated" && (
        <svg
          width="4"
          height="4"
          viewBox="0 0 100 100"
        >
          {/* check */}
          <line
            x1="10"
            y1="50"
            x2="40"
            y2="80"
            stroke="white"
            strokeWidth="8"
          />
          <line
            x1="40"
            y1="80"
            x2="90"
            y2="20"
            stroke="white"
            strokeWidth="8"
          />
        </svg>
      )}
    </div>
  );
};

export default UpdatingStatus;
