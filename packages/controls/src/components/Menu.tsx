import React from "react";
import clsx from "clsx";

import SelectModel from "./SelectModel";
import {
  useMenuStore,
  useModelStore,
} from "../stores";
import Item from "./Item";
import { ControllingSubject } from "../types";
import { uxWrite } from "../constants/uxWrite";
import { useControlStore } from "../stores/controls";

const Menu = () => {
  const { toggle } = useMenuStore();
  const { models, selectedModelName } =
    useModelStore();
  const { setControllingSubject } = useControlStore();

  const handleItemClick =
    (subject: ControllingSubject) => () => {
      console.log("?", selectedModelName, subject);

      setControllingSubject(
        selectedModelName,
        subject
      );

      toggle();
    };
  const handleCloseClick = () => toggle();

  return (
    <div
      className={clsx(
        "bg-white p-[20px]",
        "w-[300px] h-[400px]",
        "flex flex-col",
        "border-[1px] border-solid border-black"
      )}
    >
      <h1 className="mb-[1em]">AR Controls</h1>

      <div
        className={clsx(
          "flex-1",
          "flex flex-col space-y-[10px]"
        )}
      >
        {Boolean(models.length) && <SelectModel />}

        {Object.values(ControllingSubject).map(
          (subject: ControllingSubject) => {
            return (
              <Item
                disabled={!selectedModelName}
                onClick={handleItemClick(subject)}
              >
                {uxWrite.menuItem[subject]}
              </Item>
            );
          }
        )}

        <Item
          className={"!bg-black text-white mt-auto"}
          onClick={handleCloseClick}
        >
          닫기
        </Item>
      </div>
    </div>
  );
};

export default Menu;
