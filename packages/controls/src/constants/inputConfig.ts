import { ControllingSubject } from "../types";

export const sliderConfig = {
  [ControllingSubject.Rotation]: {
    min: -180,
    max: 180,
    defaultValue: [0],
    step: 1,
  },
  [ControllingSubject.Position]: {
    min: -10,
    max: 10,
    defaultValue: [0],
    step: 0.1,
  },
  [ControllingSubject.Scale]: {
    min: 0,
    max: 10,
    defaultValue: [1],
    step: 0.01,
  },
};

export const coordinateConfig = {
  lat: {
    min: -90,
    max: 90,
  },
  lng: {
    min: -180,
    max: 180,
  },
};
