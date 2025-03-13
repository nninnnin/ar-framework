import React, { useState } from "react";
import { useEffect } from "react";
import { ModelViewerElement } from "@google/model-viewer";
import { css } from "@emotion/react";

const ModelViewer = ({
  modelSource,
}: {
  modelSource: string;
}) => {
  useEffect(() => {
    const mv = new ModelViewerElement();

    mv.src = modelSource;
    mv.setAttribute("camera-controls", "");

    const container = document.getElementById(
      "mv-container"
    );

    if (container) {
      container.appendChild(mv);
    }
  }, []);

  useEffect(() => {
    const modelViewer = document.querySelector(
      "model-viewer"
    );

    if (modelViewer) {
      modelViewer.src = modelSource;
    }
  }, [modelSource]);

  return (
    <div
      id="mv-container"
      css={css`
        position: relative;

        flex: 1;
        background-color: powderblue;

        & > model-viewer {
          background-color: orange;

          width: 100%;
          height: 100%;
        }
      `}
    >
      <ModelViewer.ModelController />
    </div>
  );
};

ModelViewer.ModelController = () => {
  const [value, setValue] = useState(false);

  const handleChange = () => setValue((prev) => !prev);

  return (
    <div
      css={css`
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1000;

        background-color: #fff;

        padding: 4px;
        padding-left: 6px;
        padding-right: 6px;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 4px;
        `}
      >
        <label>카메라에서 벗어나도 렌더링하기</label>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={value}
        />
      </div>
    </div>
  );
};

export default ModelViewer;
