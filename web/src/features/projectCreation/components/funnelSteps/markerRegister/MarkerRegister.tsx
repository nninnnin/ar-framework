import React from "react";
import { css } from "@emotion/react";

const MarkerRegister = ({
  uploadedFile,
  handleChange,
}: {
  uploadedFile: File | null;
  handleChange: (file: File) => void;
}) => {
  const handleUploadClick = () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".mind";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)
        .files?.[0];

      if (file) {
        console.log("File selected:", file);

        handleChange(file);
      }
    };

    input.click();
  };

  return (
    <div
      css={css`
        width: 100%;
        flex: 1;

        background-color: rgb(255, 240, 58);
        padding: 1em;

        & > p {
          margin-bottom: 1em;
        }
      `}
    >
      <p>
        1. 마커정보를 생성하기 위해 아래 페이지를
        방문하세요.
      </p>

      <a
        href="https://hiukim.github.io/mind-ar-js-doc/tools/compile/"
        target="_blank"
      >
        <MarkerRegister.Button>
          마커 인식파일 (`.mind`) 생성 툴 링크
        </MarkerRegister.Button>
      </a>

      <br />
      <br />

      <p>
        2. 생성된 마커파일(`.mind`)을 아래 버튼을 눌러
        업로드하세요.
      </p>

      <div
        css={css`
          display: flex;
          gap: 1em;
        `}
      >
        {uploadedFile && (
          <div
            css={css`
              font-weight: bold;

              border: 1px solid black;
              background-color: #fff;
              padding: 1em;

              width: fit-content;
            `}
          >
            업로드 된 파일: {uploadedFile.name}
          </div>
        )}

        <MarkerRegister.Button
          onClick={handleUploadClick}
        >
          {uploadedFile
            ? "마커파일 바꾸기"
            : "마커파일 업로드"}
        </MarkerRegister.Button>
      </div>
    </div>
  );
};

MarkerRegister.Button = ({
  children,
  onClick = () => {},
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      css={css`
        padding: 1em;
        background-color: black;
        color: white;
        font-weight: bold;

        width: fit-content;

        cursor: pointer;
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MarkerRegister;
