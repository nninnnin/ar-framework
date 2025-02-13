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

export enum ControllingSubject {
  LocationCoordinate = "location-coordinate",
  FaceTarget = "face-target",
  Position = "position",
  Rotation = "rotation",
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
      | ControllingSubject.Position
      | ControllingSubject.Rotation,
      WithNull<Record<Axis, number>>
    >;

export type ControlStateByModel = Record<
  SelectedModelName,
  ControlState
>;
