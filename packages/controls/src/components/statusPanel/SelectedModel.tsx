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
        "flex justify-center items-center"
      )}
    >
      {children}
    </div>
  );
};

export default SelectedModel;
