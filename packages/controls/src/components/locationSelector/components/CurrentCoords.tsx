import React, { useState } from "react";
import { Button } from "@ar-framework/ui";
import { useCoordinateStore } from "../store";
import { useControlStore } from "../../../stores/controls";
import { useModelStore } from "../../../stores";

const CurrentCoords = () => {
  const [isSetting, setIsSetting] = useState(false);

  const { selectedModelName } = useModelStore();
  const { setCoordinate: setModelCoordinate } =
    useControlStore();
  const { setCoordinate } = useCoordinateStore();

  return (
    <div className="absolute right-[1px] top-[1px] z-[10]">
      <Button
        variant="surface"
        loading={isSetting}
        onClick={() => {
          setIsSetting(true);

          try {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude: lat, longitude: lng } =
                  position.coords;

                setIsSetting(false);

                setCoordinate(lat, lng);
                setModelCoordinate(selectedModelName, {
                  lat,
                  lng,
                });
              }
            );
          } catch (error) {
            setIsSetting(false);

            console.error(
              "Error getting current location:",
              error
            );
          }
        }}
      >
        {isSetting ? "위치를 가져오는 중.." : "현재 위치로 설정하기"}
      </Button>
    </div>
  );
};

export default CurrentCoords;
