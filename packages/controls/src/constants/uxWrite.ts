import { ControllingSubject } from "../types";

type Subject = "menuItem" | (string & {});

type UxWrite = Record<
  Subject,
  Record<ControllingSubject, string>
>;

export const uxWrite: UxWrite = {
  menuItem: {
    [ControllingSubject.LocationCoordinate]:
      "좌표 위치 조정하기",
    [ControllingSubject.FaceTarget]:
      "페이스 타겟 조정하기",
    [ControllingSubject.Rotation]:
      "모델 회전 조정하기",
    [ControllingSubject.Position]:
      "모델 위치 조정하기",
  },
};
