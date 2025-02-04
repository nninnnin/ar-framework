import React from "react";
import { useEffect } from "react";
import { ModelViewerElement } from "@google/model-viewer";
import { css } from "@emotion/react";

const ModelViewer = ({ modelSource }: { modelSource: string }) => {
  useEffect(() => {
    const mv = new ModelViewerElement();

    mv.src = modelSource;
    mv.setAttribute("camera-controls", "");

    const container = document.getElementById("mv-container");

    if (container) {
      container.appendChild(mv);
    }
  }, []);

  useEffect(() => {
    const modelViewer = document.querySelector("model-viewer");

    if (modelViewer) {
      modelViewer.src = modelSource;
    }
  }, [modelSource]);

  return (
    <div
      id="mv-container"
      css={css`
        flex: 1;

        background-color: powderblue;

        & > model-viewer {
          background-color: orange;
          width: 100%;
          height: 100%;
        }
      `}
    ></div>
  );
};

export default ModelViewer;
