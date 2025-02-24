import React, { ChangeEvent, useState } from "react";
import { css } from "@emotion/react";

import Dialog from "@/components/common/Dialog";

const ProjectRegisterDialog = ({
  onClose,
  onPrevious,
  onFinalize,
}: {
  onClose: () => void;
  onPrevious: () => void;
  onFinalize: (projectName: string) => void;
}) => {
  const [projectName, setProjectName] = useState("");

  return (
    <Dialog size="large">
      <Dialog.Header handleCloseClick={onClose}>
        <Dialog.HeaderLabel>
          프로젝트 생성
        </Dialog.HeaderLabel>
      </Dialog.Header>

      <div
        css={css`
          flex: 1;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          gap: 1em;
        `}
      >
        <div
          css={css`
            text-align: center;
          `}
        >
          <p
            css={css`
              font-size: 1.2em;
              font-weight: bold;
            `}
          >
            AR 프로젝트의 이름을 입력해주세요!
          </p>

          <ul
            css={css`
              margin-top: 1em;

              display: flex;
              flex-direction: column;

              list-style-type: none;

              font-size: 0.8em;

              & > li {
                margin-bottom: 0.5em;
              }
            `}
          >
            <ul
              css={css`
                margin-top: 0.5em;

                & li {
                  list-style-type: disc;
                  margin-bottom: 0.3em;
                  text-align: left;
                }
              `}
            >
              <li>
                선택한 AR 타입은 뱃지로 표시해드립니다.
                제목에 포함되지 않아도 괜찮아요.
              </li>
              <li>
                나중에 프로젝트를 기억하기 쉽게 해당 AR
                프로젝트의 거점이나 모델의 특징을
                포함시키면 좋아요.
              </li>
            </ul>
          </ul>
        </div>

        <input
          css={css`
            padding: 10px;
            border: 1px solid #000;
            outline: none;
          `}
          type="text"
          value={projectName}
          onChange={(
            e: ChangeEvent<HTMLInputElement>
          ) => setProjectName(e.target.value)}
          autoFocus
          placeholder="예) 소원의 정원 버블버블"
        />
      </div>

      <Dialog.ButtonContainer>
        <Dialog.Button onClick={onPrevious}>
          이전으로
        </Dialog.Button>

        <Dialog.Button
          onClick={() => onFinalize(projectName)}
          cssOverlap={css`
            background-color: ${Boolean(projectName)
              ? "black"
              : "white"};
            color: ${Boolean(projectName)
              ? "white"
              : "black"};
          `}
        >
          프로젝트 생성
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default ProjectRegisterDialog;
