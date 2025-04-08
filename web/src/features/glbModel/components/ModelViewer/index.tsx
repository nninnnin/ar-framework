import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { ModelViewerElement } from "@google/model-viewer";

import { GlbModelEditable } from "@/features/glbModel/types/glbModel";
import InfoPanel from "@/features/glbModel/components/ModelViewer/InfoPanel";
import InteractionEditor from "@/features/interactionEditor/components";

const ModelViewer = ({
  glbModel,
}: {
  glbModel: GlbModelEditable;
}) => {
  const [modelSource, setModelSource] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (glbModel.path) {
      setModelSource(glbModel.path);
    } else if (glbModel.file) {
      setModelSource(
        URL.createObjectURL(glbModel.file)
      );
    }
  }, [glbModel]);

  useEffect(() => {
    const modelViewer = document.querySelector(
      "model-viewer"
    ) as ModelViewerElement;

    if (modelViewer) {
      return;
    }

    if (!modelSource) return;

    const mv = new ModelViewerElement();

    mv.src = modelSource;
    mv.setAttribute("camera-controls", "");

    const container = document.getElementById(
      "mv-container"
    );

    if (container) {
      container.appendChild(mv);
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
      <InfoPanel glbModel={glbModel} />

      {glbModel.interactions && (
        <InteractionEditor glbModel={glbModel} />
      )}
    </div>
  );
};

export default ModelViewer;
