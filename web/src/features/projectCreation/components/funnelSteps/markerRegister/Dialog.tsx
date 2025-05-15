import React from "react";

import Dialog from "@/shared/components/Dialog";
import MarkerRegister from "@/features/projectCreation/components/funnelSteps/markerRegister/MarkerRegister";
import { useImageTarget } from "@/features/projectCreation/store/imageTarget";

const MarkerRegisterDialog = ({
  onClose,
  onPrevious,
  onNext,
  headerLabel,
}: {
  onClose: () => void;
  onPrevious: () => void;
  onNext: (imageTargetFile: File) => void;
  headerLabel: string;
}) => {
  const { imageTargetFile, setImageTargetFile } =
    useImageTarget();

  return (
    <Dialog size="large">
      <Dialog.Header handleCloseClick={onClose}>
        <Dialog.HeaderLabel>
          {headerLabel}
        </Dialog.HeaderLabel>
      </Dialog.Header>

      <MarkerRegister
        uploadedFile={imageTargetFile}
        handleChange={(file: File) =>
          setImageTargetFile(file)
        }
      />

      <Dialog.ButtonContainer>
        <Dialog.Button onClick={onPrevious}>
          돌아가기
        </Dialog.Button>

        <Dialog.Button
          disabled={!imageTargetFile}
          onClick={() => onNext(imageTargetFile!)}
        >
          다음으로
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default MarkerRegisterDialog;
