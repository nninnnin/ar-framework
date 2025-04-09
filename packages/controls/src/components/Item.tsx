import clsx from "clsx";
import React from "react";

import { styles } from "../styles";

const Item = ({
  children,
  className = "",
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={clsx(
        styles.item,
        disabled &&
          "!bg-gray-200 !text-gray-300 pointer-events-none",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Item;
