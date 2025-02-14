import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WithNull } from "../../../types/utils";

type Coordinate = {
  lat: number;
  lng: number;
};

export const useCoordinateStore = create(
  immer<{
    coordinate: WithNull<Coordinate>;
    setCoordinate: (lat: number, lng: number) => void;
  }>((set) => ({
    coordinate: null,
    setCoordinate: (lat, lng) =>
      set((state) => {
        state.coordinate = { lat, lng };
      }),
  }))
);
