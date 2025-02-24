"use client";

import React, { useContext } from "react";
import { css } from "@emotion/react";
import { QRCodeSVG } from "qrcode.react";

import useProjectItem from "@/hooks/useProjectItem";
import { OverlayCloseContext } from "@/components/Project/ProjectSection";
import Dialog from "@/components/common/Dialog";
import { ProjectType } from "@/types/project";
import { designTokens } from "@/styles/tokens";

interface Props {
  projectUid: string;
  groupName: string;
}

const ProjectDetailsDialog = ({
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
    <Dialog
      size="large"
      cssOverlap={css`
        width: 300px;
        height: 360px;
      `}
    >
      <Dialog.Header
        handleCloseClick={() => close && close()}
      >
        <ProjectDetailsDialog.Header>
          <ProjectDetailsDialog.ArTypeBadge
            arType={projectItem.projectType}
          />
          <h1
            css={css`
              font-size: 0.8em;
            `}
          >
            {projectItem.name}
          </h1>
        </ProjectDetailsDialog.Header>
      </Dialog.Header>

      <div
        css={css`
          width: 100%;
          flex: 1;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          position: relative;
        `}
      >
        <div
          css={css`
            background-color: ${designTokens.colors
              .arTypes[projectItem.projectType]};

            width: 100%;
            flex: 1;

            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
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
        </div>

        <div
          css={css`
            background-color: black;
            color: white;

            font-size: 1em;
            padding: 1em;

            margin-top: auto;

            width: 100%;
            text-align: center;

            cursor: pointer;
            user-select: none;
          `}
          onClick={() => {
            window.navigator?.clipboard.writeText(
              templateUrl
            );
          }}
        >
          링크 복사하기
        </div>
      </div>
    </Dialog>
  );
};

ProjectDetailsDialog.Header = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      css={css`
        width: 100%;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        padding-left: 7px;
      `}
    >
      {children}
    </div>
  );
};

ProjectDetailsDialog.ArTypeBadge = ({
  arType,
}: {
  arType: ProjectType;
}) => {
  return (
    <div
      css={css`
        border: 1px solid black;
        background-color: #fff;

        padding: 0.5em;
        padding-left: 0.7em;
        padding-right: 0.7em;

        margin-right: 10px;

        font-size: 0.5em;

        user-select: none;
      `}
    >
      {arType}
    </div>
  );
};

export default ProjectDetailsDialog;
