import { ControllingSubject } from "../types";

export const sliderConfig = {
  [ControllingSubject.Rotation]: {
    min: -180,
    max: 180,
    defaultValue: [0],
    step: 1,
  },
  [ControllingSubject.Position]: {
    min: -1200,
    max: 1200,
    defaultValue: [0],
    step: 1,
  },
  [ControllingSubject.Scale]: {
    min: 0,
    max: 50,
    defaultValue: [1],
    step: 0.1,
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
