import { useEffect } from "react";

import { useModelStore } from "../stores";
import { useControlStore } from "../stores/controls";
import { initControlValues } from "./useSyncModelControlValues";

const IS_DEV = process.env.NODE_ENV === "DEV";

const useTestModel = () => {
  const { setModelControls } = useControlStore();
  const { setSelectedModelName } = useModelStore();

  useEffect(() => {
    if (IS_DEV) {
      setSelectedModelName("TEST_MODEL");
      setModelControls("TEST_MODEL", {
        position: initControlValues(""),
        rotation: initControlValues(""),
        scale: initControlValues(""),
        visibility: true,
      });
    }
  }, [IS_DEV]);
};

export default useTestModel;
