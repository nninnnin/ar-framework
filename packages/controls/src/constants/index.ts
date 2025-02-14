import { ControllingSubject } from "../types";

export const ARSpecificSubjects: Record<
  "ar-location" | "ar-face",
  ControllingSubject
> = {
  "ar-location": ControllingSubject.LocationCoordinate,
  "ar-face": ControllingSubject.FaceTarget,
};
