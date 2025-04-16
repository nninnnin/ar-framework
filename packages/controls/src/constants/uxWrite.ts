import { ControllingSubject } from "../types";

type Subject = "menuItem" | (string & {});

type UxWrite = Record<
  Subject,
  Record<ControllingSubject, string>
>;

export const uxWrite: UxWrite = {
  menuItem: {
    [ControllingSubject.Scale]: "크기 조정하기",
    [ControllingSubject.Rotation]: "회전 조정하기",
    [ControllingSubject.Position]: "위치 조정하기",
    [ControllingSubject.LocationCoordinate]:
      "좌표 위치 조정하기",
    [ControllingSubject.FaceTarget]:
      "페이스 타겟 조정하기",
  },
};

export const SUBJECT_LABEL: Record<
  ControllingSubject,
  string
> = {
  [ControllingSubject.Position]: "위치",
  [ControllingSubject.Rotation]: "회전",
  [ControllingSubject.Scale]: "크기",
  [ControllingSubject.LocationCoordinate]: "좌표",
  [ControllingSubject.FaceTarget]: "페이스 타겟",
};
