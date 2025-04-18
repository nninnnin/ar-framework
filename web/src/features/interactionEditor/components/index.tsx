import React, { useState } from "react";
import { css } from "@emotion/react";

import ActionItem from "@/features/interactionEditor/components/ActionItem";
import { GlbModelEditable } from "@/features/glbModel/types/glbModel";
import { InteractionItem } from "@/features/interactionEditor/types";
import TriggerItem from "@/features/interactionEditor/components/TriggerItem";

const InteractionEditor = ({
  glbModel,
}: {
  glbModel: GlbModelEditable;
}) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div
      css={css`
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 100;

        overflow: hidden;
      `}
    >
      {!showItems && (
        <div
          css={css`
            background-color: black;
            padding: 6px 8px;

            font-size: 12px;
            color: white;

            display: flex;
            justify-content: center;
            align-items: center;

            gap: 3px;

            cursor: pointer;
            user-select: none;
          `}
          onClick={() => setShowItems(true)}
        >
          {glbModel.interactions?.length ?? 0}개의
          인터랙션이 존재합니다
          <img
            width="12"
            height="12"
            src="/icons/finger.svg"
          />
        </div>
      )}

      {showItems && (
        <>
          {glbModel.interactions!.map((item) => {
            return (
              <InteractionEditor.InteractionItem
                key={item.id}
                item={item}
              />
            );
          })}

          <InteractionEditor.CloseButton
            onClick={() => setShowItems(false)}
          />
        </>
      )}
    </div>
  );
};

InteractionEditor.InteractionItem = ({
  item,
}: {
  item: InteractionItem;
}) => {
  return (
    <div
      css={css`
        display: flex;
        font-size: 12px;

        position: relative;
        bottom: 0;
        right: 0;
        z-index: 100;
      `}
    >
      <TriggerItem
        interactionId={item.id}
        name={item.trigger}
      />

      <div>
        {item.actions.map((action) => (
          <ActionItem
            key={`interaction-${item.id}-${action}`}
            interactionId={item.id}
            name={action}
          />
        ))}

        <div
          css={css`
            background-color: black;
            color: white;

            padding: 4px 6px;

            border: 1px solid black;
            border-bottom: 0px;

            text-align: center;

            &:last-child {
              border-bottom: 1px solid black;
            }
          `}
        >
          +
        </div>
      </div>
    </div>
  );
};

InteractionEditor.CloseButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <div
      css={css`
        font-size: 12px;
        background-color: black;
        color: white;

        text-align: center;
        padding: 4px 6px;

        margin-top: 4px;

        cursor: pointer;
        user-select: none;
      `}
      onClick={onClick}
    >
      닫기
    </div>
  );
};

export default InteractionEditor;
