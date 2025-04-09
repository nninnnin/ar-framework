import clsx from "clsx";
import React from "react";

const SelectedModel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        "w-full",
        "flex justify-center items-center",
        "px-[8px] py-[3px]"
      )}
    >
      {children}
    </div>
  );
};

export default SelectedModel;
