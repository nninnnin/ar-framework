import React from "react";
import { useMenuStore } from "../stores";
import clsx from "clsx";

const MenuToggler = () => {
  const { isOpen, toggle } = useMenuStore();

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-[200]",
        "w-[56px] h-[56px]",
        "bg-white",
        "flex justify-center items-center",
        "border-r-[1px] border-b-[1px] border-solid border-black",
        "text-[2em]"
      )}
      onClick={() => toggle()}
    >
      {isOpen ? "🥹" : "😌"}
    </div>
  );
};

export default MenuToggler;
