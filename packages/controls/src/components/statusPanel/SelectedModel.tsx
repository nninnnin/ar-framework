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
        "border-b-[1px] border-solid border-black"
      )}
    >
      {children}
    </div>
  );
};

export default SelectedModel;
