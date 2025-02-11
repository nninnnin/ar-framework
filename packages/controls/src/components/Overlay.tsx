import React from "react";
import clsx from "clsx";

const Overlay = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "bg-black/60",
        "w-[100vw] h-[100dvh]",
        "fixed top-0 left-0",
        "flex justify-center items-center"
      )}
    >
      {children}
    </div>
  );
};

export default Overlay;
