import React from "react";
import { css } from "@emotion/react";
import { GlbModelEditable } from "@/features/glbModel/types/glbModel";

const InfoPanel = ({
  glbModel,
}: {
  glbModel: GlbModelEditable;
}) => {
  console.log(glbModel);

  return (
    <div
      css={css`
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1000;

        color: black;

        display: flex;
        flex-direction: column;

        font-size: 12px;
      `}
    >
      <InfoPanel.Item
        name="이름"
        value={glbModel.name}
      />

      <InfoPanel.Separator />

      {glbModel.coordinates?.latitude && (
        <>
          <InfoPanel.Item
            name={"위도"}
            value={glbModel.coordinates?.latitude}
          />
          <InfoPanel.Item
            name={"경도"}
            value={glbModel.coordinates?.longitude}
          />
        </>
      )}

      <InfoPanel.Separator />

      {glbModel.position && (
        <>
          <InfoPanel.Item
            name="포지션"
            value={`${glbModel.position.x} ${glbModel.position.y} ${glbModel.position.z}`}
          />
        </>
      )}

      {glbModel.rotation && (
        <>
          <InfoPanel.Item
            name="로테이션"
            value={`${glbModel.rotation.x} ${glbModel.rotation.y} ${glbModel.rotation.z}`}
          />
        </>
      )}

      {glbModel.scale && (
        <>
          <InfoPanel.Item
            name="스케일"
            value={`${glbModel.scale.x} ${glbModel.scale.y} ${glbModel.scale.z}`}
          />
        </>
      )}
    </div>
  );
};

InfoPanel.Separator = () => {
  return (
    <div
      css={css`
        height: 4px;
      `}
    />
  );
};

InfoPanel.Item = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  return (
    <div
      id="info-panel-item"
      css={css`
        background-color: #fff;
        border: 1px solid black;

        display: flex;

        & + #info-panel-item {
          border-top: 0px;
        }
      `}
    >
      <div
        css={css`
          background-color: black;
          color: white;

          padding: 3px 6px;
        `}
      >
        {name}
      </div>

      <div
        css={css`
          padding: 3px 6px;
        `}
      >
        {value}
      </div>
    </div>
  );
};

export default InfoPanel;
