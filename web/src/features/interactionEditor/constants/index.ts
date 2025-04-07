import {
  Actions,
  Triggers,
} from "@/features/interactionEditor/types";

export enum TriggerNames {
  HandtrackStart = "핸드트래킹 시작",
  HandtrackStop = "핸드트래킹 종료",
}

export const TRIGGER_NAMES: Record<
  Triggers,
  TriggerNames
> = {
  handtrack_start: TriggerNames.HandtrackStart,
  handtrack_stop: TriggerNames.HandtrackStop,
};

export enum ActionNames {
  AnimationStart = "애니메이션 시작",
  AnimationStop = "애니메이션 종료",
}

export const ACTION_NAMES: Record<
  Actions,
  ActionNames
> = {
  animation_start: ActionNames.AnimationStart,
  animation_stop: ActionNames.AnimationStop,
};
