import React from "react";
import clsx from "clsx";
import { glass } from "@ar-framework/ui";

import { useMenuStore, useModelStore } from "../stores";
import Item from "./Item";
import { ControllingSubject } from "../types";
import { uxWrite } from "../constants/uxWrite";
import { useControlStore } from "../stores/controls";
import useUpdateModel from "../hooks/useUpdateModel";

const Menu = () => {
  const { toggle } = useMenuStore();
  const { selectedModelName } = useModelStore();
  const { setControllingSubject } = useControlStore();
  const { isUpdating } = useUpdateModel();

  const handleItemClick = (subject: ControllingSubject) => () => {
    setControllingSubject(subject);
    toggle();
  };

  return (
    <div
      className={clsx(
        "p-[20px]",
        "w-[300px] h-[400px] rounded-[16px]",
        "flex flex-col",
        "overflow-auto [&::-webkit-scrollbar]:hidden",
        glass.base,
        glass.variants.surface
      )}
    >
      {isUpdating && (
        <div className="fixed top-0 left-0 z-[9999] w-[100vw] h-[100dvh] flex justify-center items-center bg-black/50 text-2xl text-white font-bold">
          업데이트 중..
        </div>
      )}

      <div className="flex-1 flex flex-col space-y-[10px]">
        {[
          ControllingSubject.Position,
          ControllingSubject.Scale,
          ControllingSubject.Rotation,
        ].map((subject) => (
          <Item
            key={subject}
            variant="blue"
            disabled={!selectedModelName}
            onClick={handleItemClick(subject)}
          >
            {uxWrite.menuItem[subject]}
          </Item>
        ))}

        <Item onClick={() => toggle()}>
          닫기
        </Item>
      </div>
    </div>
  );
};

export default Menu;
