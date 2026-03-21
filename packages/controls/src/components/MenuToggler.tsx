import React from "react";
import clsx from "clsx";
import { glass } from "@ar-framework/ui";
import { useMenuStore } from "../stores";

const MenuToggler = () => {
  const { isOpen, toggle } = useMenuStore();

  return (
    <div
      className={clsx(
        "fixed bottom-6 right-6 z-[200]",
        "w-[56px] h-[56px] rounded-[16px]",
        "flex justify-center items-center",
        "cursor-pointer select-none",
        "transition-colors duration-150 active:scale-95",
        glass.base,
        glass.variants.surface
      )}
      onClick={() => toggle()}
    >
      {isOpen ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};

export default MenuToggler;
