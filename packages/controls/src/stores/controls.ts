import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  Axis,
  ControllingSubject,
  ControlState,
  ControlStateByModel,
} from "../types";
interface ControlStore {
  controls: ControlStateByModel;
  controllingSubject: ControllingSubject | null;
  setControllingSubject: (
    modelName: string,
    subject: ControllingSubject
  ) => void;
  axis: Axis;
  setAxis: (axis: Axis) => void;
  initializeModelControls: (modelName: string) => void;
  setCoordinate: (
    modelName: string,
    coordinate: {
      lat: number;
      lng: number;
    }
  ) => void;
  setFaceTargetAnchor: (
    modelName: string,
    faceTargetIndex: number
  ) => void;
  setPosition: (
    modelName: string,
    axis: Axis,
    value: number
  ) => void;
  setRotation: (
    modelName: string,
    axis: Axis,
    value: number
  ) => void;
}

export const useControlStore = create(
  immer<ControlStore>((set) => ({
    controls: {},
    controllingSubject: null,
    setControllingSubject: (
      subject: ControllingSubject
    ) => {
      set((prev) => {
        prev.controllingSubject = subject;
      });
    },
    axis: null,
    setAxis: (axis) =>
      set((prev) => {
        prev.axis = axis;
      }),
    initializeModelControls: (modelName: string) => {
      set((prev) => {
        prev.controls[modelName] = Object.values(
          ControllingSubject
        ).reduce(
          (acc, subject: ControllingSubject) => {
            acc[subject] = initSubjectValue(subject);

            return acc;
          },
          {}
        ) as ControlState;
      });
    },
    setCoordinate: (
      modelName: string,
      coordinate: {
        lat: number;
        lng: number;
      }
    ) =>
      set((prev) => {
        prev.controls[modelName][
          ControllingSubject.LocationCoordinate
        ] = coordinate;
      }),
    setFaceTargetAnchor: (
      modelName: string,
      faceTargetIndex: number
    ) =>
      set((prev) => {
        prev.controls[modelName][
          ControllingSubject.FaceTarget
        ] = faceTargetIndex;
      }),
    setPosition: (
      modelName: string,
      axis: Axis,
      value: number
    ) =>
      set((prev) => {
        prev.controls[modelName][
          ControllingSubject.Position
        ][axis] = value;
      }),
    setRotation: (
      modelName: string,
      axis: Axis,
      value: number
    ) =>
      set((prev) => {
        prev.controls[modelName][
          ControllingSubject.Rotation
        ][axis] = value;
      }),
  }))
);

const initSubjectValue = (
  subject: ControllingSubject
) => {
  switch (subject) {
    case ControllingSubject.FaceTarget:
      return null;
    case ControllingSubject.LocationCoordinate:
      return {
        lat: null,
        lng: null,
      };
    case ControllingSubject.Position:
      return {
        x: 0,
        y: 0,
        z: 0,
      };
    case ControllingSubject.Rotation:
      return {
        x: 0,
        y: 0,
        z: 0,
      };
  }
};
