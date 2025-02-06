import React, { useContext } from "react";
import { css } from "@emotion/react";
import { QRCodeSVG } from "qrcode.react";

import useProjectItem from "@/hooks/useProjectItem";
import { OverlayCloseContext } from "@/components/Project/ProjectSection";
import Dialog from "@/components/common/Dialog";

interface Props {
  projectUid: string;
  groupName: string;
}

const ProjectQrDialog = ({ projectUid, groupName }: Props) => {
  const { projectItem } = useProjectItem(projectUid, groupName);
  const { close } = useContext(OverlayCloseContext);

  if (!projectItem) return <></>;

  return (
    <Dialog size="large">
      <div
        css={css`
          width: 100%;
          flex: 1;
          background-color: aliceblue;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          gap: 1em;
        `}
      >
        <h1>{projectItem.name}</h1>

        <p>QR 코드를 촬영해 모바일 에디터로 접속하세요!</p>

        <QRCodeSVG
          width={150}
          height={150}
          value="https://naver.com"
          style={{
            border: "1px solid #000",
          }}
        />
      </div>

      <Dialog.ButtonContainer>
        <Dialog.Button onClick={() => close && close()}>닫기</Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default ProjectQrDialog;
