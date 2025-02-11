import React from "react";
import { useMenuStore } from "../stores";
import clsx from "clsx";

const MenuToggler = () => {
  const { isOpen, toggle } = useMenuStore();

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-[200]",
        "p-[1em] bg-white"
      )}
      onClick={() => toggle()}
    >
      {isOpen ? "🥹" : "😌"}
    </div>
  );
};

export default MenuToggler;
