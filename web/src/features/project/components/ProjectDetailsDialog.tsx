"use client";

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { css } from "@emotion/react";
import { QRCodeSVG } from "qrcode.react";
import { create, useStore } from "zustand";

import Dialog from "@/shared/components/Dialog";
import { designTokens } from "@/shared/styles/tokens";
import useProjectItem from "@/features/project/hooks/useProjectItem";
import { OverlayCloseContext } from "@/features/project/components/ProjectSection";
import { ProjectType } from "@/features/project/types/project";

interface Props {
  projectId: string;
  templateId: string;
  groupName: string;
}

type TemplateMode = "editor" | "production";

const templateModeStore = create<{
  templateMode: TemplateMode;
  setTemplateMode: (mode: TemplateMode) => void;
}>((set) => ({
  templateMode: "editor",
  setTemplateMode: (mode: TemplateMode) =>
    set({ templateMode: mode }),
}));

const ProjectDetailsDialog = ({
  projectId,
  templateId,
  groupName,
}: Props) => {
  const [templateUrl, setTemplateUrl] = useState("");
  const { templateMode } = useStore(templateModeStore);

  useEffect(() => {
    setTemplateUrl(
      generateTemplateUrl(templateId, templateMode)
    );
  }, [templateId, templateMode]);

  const { projectItem } = useProjectItem(
    projectId,
    groupName
  );

  const { close } = useContext(OverlayCloseContext);

  if (!projectItem) return <></>;

  return (
    <Dialog
      size="large"
      cssOverlap={css`
        width: 300px;
        height: 360px;
      `}
    >
      <Dialog.Header
        disableCloseButton={false}
        handleCloseClick={() => close && close()}
      >
        <ProjectDetailsDialog.Header>
          <ProjectDetailsDialog.ArTypeBadge
            arType={projectItem.projectType.name}
          />
          <h1
            css={css`
              font-size: 0.8em;
              color: black;
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
              .arTypes[projectItem.projectType.name]};

            width: 100%;
            flex: 1;

            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <div>
            <div
              css={css`
                background-color: black;
                color: white;
                width: fit-content;
                font-size: 10px;

                padding: 4px;
                padding-top: 2px;
                padding-bottom: 2px;
                margin-left: auto;
              `}
            >
              {templateMode === "editor" && "에디터"}
              {templateMode === "production" &&
                "프로덕션"}
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
            ></QRCodeSVG>
          </div>
        </div>

        <ProjectDetailsDialog.Footer
          templateUrl={templateUrl}
        />
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
        color: black;

        user-select: none;
      `}
    >
      {arType}
    </div>
  );
};

ProjectDetailsDialog.Footer = ({
  templateUrl,
}: {
  templateUrl: string;
}) => {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
      `}
    >
      <ProjectDetailsDialog.ModeToggler />

      <ProjectDetailsDialog.CopyButton
        templateUrl={templateUrl}
      />
    </div>
  );
};

ProjectDetailsDialog.ModeToggler = () => {
  const { templateMode, setTemplateMode } = useStore(
    templateModeStore
  );

  return (
    <div
      css={css`
        flex: 1;
        background-color: white;

        border-top: 1px solid black;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        user-select: none;

        position: relative;

        border: 10px solid black;
        border-right: none;

        &:hover {
          background-color: #f0f0f0;
        }
      `}
      onClick={() => {
        setTemplateMode(
          templateMode === "editor"
            ? "production"
            : "editor"
        );
      }}
    >
      <ProjectDetailsDialog.ModeGuide />

      <span
        css={css`
          color: black;
        `}
      >
        {templateMode === "production" &&
          "프로덕션 모드"}
        {templateMode === "editor" && "에디터 모드"}
      </span>
    </div>
  );
};

ProjectDetailsDialog.ModeGuide = () => {
  const containerRef = useRef<null | HTMLDivElement>(
    null
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const guideToast = document.createElement("div");
    guideToast.innerHTML = `
      <h3>템플릿 모드를 확인하세요!</h3>
      1) 에디터 모드: 프로젝트 내의 3D 모델의 위치와 회전 등을 조절하기 위한 컨트롤러가 나타나는 모드입니다.
      <br/>
      2) 프로덕션 모드: 실제 프로덕트에 사용되기 위해 최적화된 모드입니다. 개발자 또는 미믹스에는 이것을 전달하세요!
    `;
    guideToast.style.position = "fixed";
    guideToast.style.backgroundColor = "black";
    guideToast.style.color = "white";
    guideToast.style.padding = "10px";
    guideToast.style.borderRadius = "5px";
    guideToast.style.border = "1px solid black";
    guideToast.style.zIndex = "9999";
    guideToast.style.fontSize = "10px";
    guideToast.style.lineHeight = "1.8em";

    containerRef.current.addEventListener(
      "mousemove",
      (e) => {
        guideToast.style.top = `${e.clientY + 10}px`;
        guideToast.style.left = `${e.clientX}px`;

        if (!document.body.contains(guideToast)) {
          document.body.appendChild(guideToast);
        }
      }
    );

    containerRef.current.addEventListener(
      "mouseleave",
      () => {
        if (document.body.contains(guideToast)) {
          document.body.removeChild(guideToast);
        }
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      css={css`
        position: absolute;
        left: -1px;
        top: 0;
        transform: translateY(-100%);

        background-color: white;
        border: 1px solid black;

        width: 16px;
        height: 16px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 12px;
        color: black;
      `}
      onClick={(e) => e.stopPropagation()}
    >
      ?
    </div>
  );
};

ProjectDetailsDialog.CopyButton = ({
  templateUrl,
}: {
  templateUrl: string;
}) => {
  const timeoutRef = useRef<null | NodeJS.Timeout>(
    null
  );
  const [isCopied, setIsCopied] = useState(false);

  const copyTemplateUrl = () =>
    window.navigator?.clipboard.writeText(templateUrl);

  return (
    <div
      css={css`
        flex: 1;

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
        copyTemplateUrl();
        setIsCopied(true);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
        }, 1800);
      }}
    >
      <span>
        {isCopied
          ? "복사되었습니다!"
          : "링크 복사하기"}
      </span>
    </div>
  );
};

const generateTemplateUrl = (
  templateId: string,
  templateMode: TemplateMode
) => {
  const templateUrl = `${process.env.NEXT_URL}/templates/${templateId}`;

  if (templateMode !== "editor") {
    return templateUrl;
  }

  return templateUrl + "?glbControls=1";
};

export default ProjectDetailsDialog;
