import React from "react";
import clsx from "clsx";

const Item = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <li
      className={clsx(
        "bg-white rounded-xl p-1",
        "ring-2 ring-blue-500",
        "mb-[14px]",
        "p-[1em]"
      )}
    >
      {children}
    </li>
  );
};

export default Item;
