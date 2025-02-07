import React, { useContext } from "react";
import { css } from "@emotion/react";
import { QRCodeSVG } from "qrcode.react";

import useProjectItem from "@/hooks/useProjectItem";
import { OverlayCloseContext } from "@/components/Project/ProjectSection";
import Dialog from "@/components/common/Dialog";
import { ProjectType } from "@/types/project";

interface Props {
  projectUid: string;
  groupName: string;
}

const ProjectQrDialog = ({
  projectUid,
  groupName,
}: Props) => {
  const { projectItem } = useProjectItem(
    projectUid,
    groupName
  );
  const { close } = useContext(OverlayCloseContext);

  if (!projectItem) return <></>;

  const templateUrl = `${process.env.NEXT_URL}/templates/api?projectUid=${projectItem.uid}`;

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
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          <span
            css={css`
              border: 1px solid black;
              background-color: #fff;

              padding: 0.5em;
              padding-left: 0.7em;
              padding-right: 0.7em;

              font-size: 0.5em;

              margin-bottom: 2em;
            `}
          >
            {projectItem.projectType}
          </span>

          <h1
            css={css`
              font-size: 1.2em;
            `}
          >
            {projectItem.name}
          </h1>
        </div>

        <QRCodeSVG
          width={180}
          height={180}
          value={templateUrl}
          style={{
            border: "1px solid #000",
            padding: "1em",
            backgroundColor: "#fff",
          }}
        />

        <div
          css={css`
            background-color: black;
            color: white;

            font-size: 0.8em;
            padding: 0.5em 0.7em 0.5em 0.7em;

            cursor: pointer;
            user-select: none;
          `}
          onClick={() => {
            navigator.clipboard.writeText(templateUrl);
          }}
        >
          링크 복사하기
        </div>
      </div>

      <Dialog.ButtonContainer>
        <Dialog.Button
          onClick={() => close && close()}
        >
          닫기
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default ProjectQrDialog;
