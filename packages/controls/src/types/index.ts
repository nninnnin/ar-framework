import { WithNull } from "./utils";

export interface ModelInterface {
  id: string;
  name: string;
}

export type Coordinate = {
  lat: number;
  lng: number;
};

export enum FaceTargetAnchorIndex {
  Hat = 10,
  Eyes = 168,
  EarLeft = 127,
  EarRight = 356,
}

export type Axis = "x" | "y" | "z";

export type TemplateType =
  | "ar-location"
  | "ar-face"
  | "ar-image";

export enum ControllingSubject {
  Scale = "scale",
  Position = "position",
  Rotation = "rotation",
  LocationCoordinate = "location-coordinate",
  FaceTarget = "face-target",
}

type SelectedModelName = string;

export type ControlState =
  | Record<
      ControllingSubject.LocationCoordinate,
      WithNull<Coordinate>
    >
  | Record<
      ControllingSubject.FaceTarget,
      WithNull<FaceTargetAnchorIndex>
    >
  | Record<
      | ControllingSubject.Scale
      | ControllingSubject.Position
      | ControllingSubject.Rotation,
      WithNull<Record<Axis, number>>
    >
  | Record<"visibility", boolean>;

export type ControlStateByModel = Record<
  SelectedModelName,
  ControlState
>;
