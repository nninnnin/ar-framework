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
    subject: ControllingSubject
  ) => void;
  axis: Axis;
  setAxis: (axis: Axis) => void;
  initializeModelControls: (modelName: string) => void;
  setModelControls: (
    modelName: string,
    controlValues: Record<string, unknown>
  ) => void;
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
  setScale: (modelName: string, value: number) => void;
  setVisibility: (
    modelName: string,
    value: boolean
  ) => void;
}

export const useControlStore = create(
  immer<ControlStore>((set) => ({
    controls: {},
    controllingSubject: null,
    setControllingSubject: (
      subject: ControllingSubject
    ) => {
      set((state) => {
        state.controllingSubject = subject;
      });
    },
    axis: null,
    setAxis: (axis) =>
      set((state) => {
        state.axis = axis;
      }),
    initializeModelControls: (modelName: string) => {
      set((state) => {
        state.controls[modelName] = Object.values(
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
    setModelControls: (
      modelName: string,
      controlValues: Record<string, unknown>
    ) => {
      set((state) => {
        state.controls[modelName] = {
          ...state.controls[modelName],
          ...controlValues,
        };
      });
    },
    setCoordinate: (
      modelName: string,
      coordinate: {
        lat: number;
        lng: number;
      }
    ) =>
      set((state) => {
        state.controls[modelName][
          ControllingSubject.LocationCoordinate
        ] = coordinate;
      }),
    setFaceTargetAnchor: (
      modelName: string,
      faceTargetIndex: number
    ) =>
      set((state) => {
        state.controls[modelName][
          ControllingSubject.FaceTarget
        ] = faceTargetIndex;
      }),
    setPosition: (
      modelName: string,
      axis: Axis,
      value: number
    ) =>
      set((state) => {
        state.controls[modelName][
          ControllingSubject.Position
        ][axis] = value;
      }),
    setRotation: (
      modelName: string,
      axis: Axis,
      value: number
    ) =>
      set((state) => {
        state.controls[modelName][
          ControllingSubject.Rotation
        ][axis] = value;
      }),
    setScale: (modelName: string, value: number) =>
      set((state) => {
        state.controls[modelName][
          ControllingSubject.Scale
        ] = {
          x: value,
          y: value,
          z: value,
        };
      }),
    setVisibility: (
      modelName: string,
      value: boolean
    ) =>
      set((state) => {
        state.controls[modelName]["visibility"] =
          value;
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
    case ControllingSubject.Scale:
      return {
        x: 1,
        y: 1,
        z: 1,
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
