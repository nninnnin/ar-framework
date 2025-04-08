import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import Lottie from "react-lottie";

import updateSpinnerData from "@/features/interactionEditor/assets/animations/spinner--update.json";
import { Triggers } from "@/features/interactionEditor/types";
import { TRIGGER_NAMES } from "@/features/interactionEditor/constants";
import useContextMenu from "@/shared/hooks/useContextMenu";
import { useInteractionEditor } from "@/features/interactionEditor/store";
import createNextApiFetcher from "@/shared/utils/nextApiFetcher";
import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";
import { useSelectedModelIndex } from "@/features/project/store";
import { createUpdateBody } from "@/shared/utils/createUpdateBody";
import {
  transformGlbEditableToUpdate,
  GlbModelUpdateItem,
} from "@/features/glbModel/utils/transformer";

const apiFetcher = createNextApiFetcher({
  entity: "glbModel",
});

type UpdateStatus = "updated" | "updating" | null;

const TriggerItem = ({
  interactionId,
  name,
}: {
  interactionId: string;
  name: Triggers;
}) => {
  const [updateStatus, setUpdateStatus] =
    useState<UpdateStatus>(null);

  const contextMenu = useContextMenu();

  const { editableGlbModels } = useEditableGlbModels();

  const { selectedModelIndex } =
    useSelectedModelIndex();

  const currentModel =
    editableGlbModels[selectedModelIndex];

  const { selectedTrigger, setSelectedTrigger } =
    useInteractionEditor();

  useEffect(() => {
    // 서버사이드와 단방향 싱크로나이즈
    if (name) {
      setSelectedTrigger(name);
    }
  }, [name]);

  const handleTriggerOptionClick =
    (option: Triggers) => async () => {
      if (selectedTrigger === option) {
        return;
      }

      setSelectedTrigger(option);

      // create `GlbModelFormatted` from `GlbModelEditable`
      const updateItem: GlbModelUpdateItem =
        transformGlbEditableToUpdate(currentModel);

      const newInteractions = [
        ...updateItem.interactions,
      ].map((interaction) => {
        if (interaction.id === interactionId) {
          return {
            ...interaction,
            trigger: option,
          };
        }

        return interaction;
      });

      console.log(
        "트리거가 업데이트 된 인터랙션",
        newInteractions
      );

      const updateBody = createUpdateBody<{
        name: string;
        scale: string;
        rotation: string;
        position: string;
        interactions: string;
      }>(
        {
          ...updateItem,
          scale: JSON.stringify(updateItem.scale),
          rotation: JSON.stringify(
            updateItem.rotation
          ),
          position: JSON.stringify(
            updateItem.position
          ),
          interactions: JSON.stringify(
            newInteractions
          ),
        },
        {
          name: "title",
          scale: "singletext",
          rotation: "singletext",
          position: "singletext",
          interactions: "longtext",
        }
      );

      console.log("Update body: ", updateBody);

      setUpdateStatus("updating");

      const updateResult = await apiFetcher.updateItem(
        currentModel.uid,
        updateBody
      );

      console.log(updateResult);

      setUpdateStatus("updated");

      setTimeout(() => {
        setUpdateStatus(null);
      }, 1000);
    };

  const selectableTriggers: Triggers[] = [
    "handtrack_start",
    "handtrack_stop",
  ];

  return (
    <div
      css={css`
        background-color: black;
        color: white;

        padding: 4px 6px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      onClick={(e) => {
        contextMenu.open(e, () => (
          <TriggerItem.OptionContainer>
            {selectableTriggers.map((trigger) => {
              return (
                <TriggerItem.Option
                  key={`trigger-element-${trigger}`}
                  trigger={trigger}
                  onClick={handleTriggerOptionClick(
                    trigger
                  )}
                />
              );
            })}
          </TriggerItem.OptionContainer>
        ));
      }}
    >
      <span>
        {TRIGGER_NAMES[selectedTrigger || name]}
      </span>

      <TriggerItem.UpdatingStatus
        status={updateStatus}
      />
    </div>
  );
};

TriggerItem.OptionContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 2px;
      `}
    >
      {children}
    </div>
  );
};

TriggerItem.Option = ({
  trigger,
  onClick,
}: {
  trigger: Triggers;
  onClick: () => void;
}) => {
  return (
    <li
      css={css`
        list-style: none;
        font-size: 12px;

        padding: 4px 6px;
        border-radius: 2px;

        cursor: pointer;

        &:hover {
          background-color: #f0f0f0;
        }
      `}
      onClick={onClick}
    >
      {TRIGGER_NAMES[trigger]}
    </li>
  );
};

TriggerItem.UpdatingStatus = ({
  status,
}: {
  status: UpdateStatus;
}) => {
  if (!status) return <></>;

  return (
    <div
      css={css`
        width: 12px;
        height: 12px;

        overflow: hidden;

        transform: scale(3);

        display: flex;
        justify-content: center;
        align-items: center;

        margin-left: 4px;
      `}
    >
      {status === "updating" && (
        // @ts-ignore
        <Lottie
          options={{
            animationData: updateSpinnerData,
            loop: true,
            autoplay: true,
          }}
        />
      )}

      {status === "updated" && (
        <svg
          width="4"
          height="4"
          viewBox="0 0 100 100"
        >
          {/* check */}
          <line
            x1="10"
            y1="50"
            x2="40"
            y2="80"
            stroke="white"
            strokeWidth="8"
          />
          <line
            x1="40"
            y1="80"
            x2="90"
            y2="20"
            stroke="white"
            strokeWidth="8"
          />
        </svg>
      )}
    </div>
  );
};

export default TriggerItem;
