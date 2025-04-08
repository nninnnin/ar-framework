import { GlbModelUpdateItem } from "@/features/glbModel/utils/transformer";
import { InteractionItem } from "@/features/interactionEditor/types";
import { createUpdateBody } from "@/shared/utils/createUpdateBody";

export const createGlbItemUpdateBody = (
  updateItem: GlbModelUpdateItem
) => {
  return createUpdateBody<{
    name: string;
    scale: string;
    rotation: string;
    position: string;
    interactions: string;
  }>(
    {
      ...updateItem,
      scale: JSON.stringify(updateItem.scale),
      rotation: JSON.stringify(updateItem.rotation),
      position: JSON.stringify(updateItem.position),
      interactions: JSON.stringify(
        updateItem.interactions
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
};

export const getUpdatedInteractionItems = (
  interactionItems: Array<InteractionItem>,
  itemId: string,
  updater: (
    currentItem: InteractionItem
  ) => InteractionItem
) => {
  const updatedItems = [...interactionItems].map(
    (item) => {
      if (item.id === itemId) {
        return updater(item);
      }

      return item;
    }
  );

  return updatedItems;
};
