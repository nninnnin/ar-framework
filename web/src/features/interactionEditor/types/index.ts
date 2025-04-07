type HandtrackTriggers =
  | "handtrack_start"
  | "handtrack_stop";

export type Triggers = HandtrackTriggers;
export type Actions =
  | "animation_start"
  | "animation_stop";

export type InteractionItem = {
  id: string;
  trigger: Triggers;
  actions: Actions[];
};
