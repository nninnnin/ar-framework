import React from "react";
import { css } from "@emotion/react";

import Dialog from "@/shared/components/Dialog";

const MarkerRegisterDialog = ({
  onClose,
  onPrevious,
  onNext,
  headerLabel,
}: {
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  headerLabel: string;
}) => {
  return (
    <Dialog size="large">
      <Dialog.Header handleCloseClick={onClose}>
        <Dialog.HeaderLabel>
          {headerLabel}
        </Dialog.HeaderLabel>
      </Dialog.Header>

      <div
        css={css`
          width: 100%;
          flex: 1;
        `}
      >
        Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Sed, beatae.
      </div>

      <Dialog.ButtonContainer>
        <Dialog.Button onClick={onPrevious}>
          돌아가기
        </Dialog.Button>

        <Dialog.Button onClick={onNext}>
          다음으로
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default MarkerRegisterDialog;
