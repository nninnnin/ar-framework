import React from "react";
import clsx from "clsx";

import SelectModel from "./SelectModel";
import { useModelStore } from "../stores";

const Menu = () => {
  const { models } = useModelStore();

  return (
    <div
      className={clsx(
        "bg-white p-[20px]",
        "w-[300px] h-[400px]"
      )}
    >
      <h1 className="mb-[1em]">AR Controls</h1>
      {Boolean(models.length) && <SelectModel />}
    </div>
  );
};

export default Menu;
