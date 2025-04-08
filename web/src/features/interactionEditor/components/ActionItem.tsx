import { MouseEvent, useEffect } from "react";
import { css } from "@emotion/react";

import { ACTION_NAMES } from "@/features/interactionEditor/constants";
import { Actions } from "@/features/interactionEditor/types";
import useContextMenu from "@/shared/hooks/useContextMenu";
import Option from "@/features/interactionEditor/components/Option";
import { useInteractionEditor } from "@/features/interactionEditor/store";
import {
  transformGlbEditableToUpdate,
  GlbModelUpdateItem,
} from "@/features/glbModel/utils/transformer";
import {
  createGlbItemUpdateBody,
  getUpdatedInteractionItems,
} from "@/features/interactionEditor/utils/index";
import useCurrentModel from "@/features/interactionEditor/hooks/useCurrentModel";

const ActionItem = ({
  name,
  interactionId,
}: {
  name: Actions;
  interactionId: string;
}) => {
  const contextMenu = useContextMenu();

  const { currentModel } = useCurrentModel();

  const { selectedAction, setSelectedAction } =
    useInteractionEditor();

  useEffect(() => {
    // 서버사이드와 단방향 싱크로나이즈
    if (name) {
      setSelectedAction(name);
    }
  }, [name]);

  const selectableActions: Actions[] = [
    "animation_start",
    "animation_stop",
  ];

  const handleOptionClick =
    (option: Actions) => () => {
      console.log(option);

      if (option === selectedAction) {
        return;
      }

      setSelectedAction(option);

      const updateItem: GlbModelUpdateItem =
        transformGlbEditableToUpdate(currentModel);

      const newInteractions =
        getUpdatedInteractionItems(
          updateItem.interactions,
          interactionId,
          (item) => ({
            ...item,
            actions: [
              ...new Set([
                ...item.actions.filter(
                  (ac) => ac !== selectedAction
                ),
                option,
              ]),
            ],
          })
        );

      console.log(newInteractions);

      const updateBody = createGlbItemUpdateBody({
        ...updateItem,
        interactions: newInteractions,
      });

      console.log(updateBody);
    };

  const handleItemClick = (e: MouseEvent) => {
    contextMenu.open(e, () => (
      <div>
        {selectableActions.map((action) => {
          return (
            <Option
              key={`action-option-${action}`}
              onClick={handleOptionClick(action)}
            >
              {ACTION_NAMES[action]}
            </Option>
          );
        })}
      </div>
    ));
  };

  return (
    <div
      css={css`
        background-color: white;
        color: black;

        padding: 4px 6px;

        border: 1px solid black;
        border-bottom: 0px;

        cursor: pointer;

        &:last-child {
          border-bottom: 1px solid black;
        }
      `}
      onClick={handleItemClick}
    >
      {ACTION_NAMES[selectedAction || name]}
    </div>
  );
};

export default ActionItem;
