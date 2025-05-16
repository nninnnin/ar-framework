import React from "react";
import Dialog from "@/shared/components/Dialog";

const RemoveDialog = ({
  handleClose,
  handleConfirm,
  contents,
}: {
  handleClose: () => void;
  handleConfirm: () => void;
  contents: string;
}) => {
  return (
    <Dialog size="small">
      <Dialog.Header handleCloseClick={handleClose}>
        <Dialog.HeaderLabel>
          프로젝트 삭제하기
        </Dialog.HeaderLabel>
      </Dialog.Header>

      <Dialog.ContentsContainer>
        {contents}
      </Dialog.ContentsContainer>

      <Dialog.ButtonContainer>
        <Dialog.Button onClick={handleClose}>
          취소
        </Dialog.Button>

        <Dialog.Button onClick={handleConfirm}>
          확인
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default RemoveDialog;
