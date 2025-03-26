type ArContentsSendingMessages =
  | "ar-loaded"
  | "gif-loaded"
  | "image-captured";

type ArContentsReceivingMessages =
  | "show-glb-models"
  | "show-capture-button";

type MessageTypes =
  | ArContentsSendingMessages
  | ArContentsReceivingMessages;

export interface MessageInterface {
  type: MessageTypes;
  payload: unknown;
}
