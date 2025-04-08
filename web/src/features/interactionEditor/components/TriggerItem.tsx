import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";

import {
  Triggers,
  UpdateStatus,
} from "@/features/interactionEditor/types";
import { TRIGGER_NAMES } from "@/features/interactionEditor/constants";
import useContextMenu from "@/shared/hooks/useContextMenu";
import { useInteractionEditor } from "@/features/interactionEditor/store";
import createNextApiFetcher from "@/shared/utils/nextApiFetcher";
import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";
import { useSelectedModelIndex } from "@/features/project/store";
import {
  transformGlbEditableToUpdate,
  GlbModelUpdateItem,
} from "@/features/glbModel/utils/transformer";
import Option from "@/features/interactionEditor/components/Option";
import UpdatingStatus from "@/features/interactionEditor/components/UpdatingStatus";
import {
  createGlbItemUpdateBody,
  getUpdatedInteractionItems,
} from "@/features/interactionEditor/utils/index";
import useCurrentModel from "@/features/interactionEditor/hooks/useCurrentModel";

const apiFetcher = createNextApiFetcher({
  entity: "glbModel",
});

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

  const { currentModel } = useCurrentModel();

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

      const updateItem: GlbModelUpdateItem =
        transformGlbEditableToUpdate(currentModel);

      const newInteractions =
        getUpdatedInteractionItems(
          updateItem.interactions,
          interactionId,
          (item) => ({
            ...item,
            trigger: option,
          })
        );

      const updateBody = createGlbItemUpdateBody({
        ...updateItem,
        interactions: newInteractions,
      });

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

        cursor: pointer;
      `}
      onClick={(e) => {
        contextMenu.open(e, () => (
          <TriggerItem.OptionContainer>
            {selectableTriggers.map((trigger) => {
              return (
                <Option
                  key={`trigger-element-${trigger}`}
                  onClick={handleTriggerOptionClick(
                    trigger
                  )}
                >
                  {TRIGGER_NAMES[trigger]}
                </Option>
              );
            })}
          </TriggerItem.OptionContainer>
        ));
      }}
    >
      <span>
        {TRIGGER_NAMES[selectedTrigger || name]}
      </span>

      <UpdatingStatus status={updateStatus} />
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

export default TriggerItem;
