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
  const IS_DEV = process.env.NODE_ENV === "DEV";

  return (
    <div
      className={clsx(
        styles.item,
        !IS_DEV &&
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
