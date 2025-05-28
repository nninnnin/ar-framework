import React, { useState } from "react";
import clsx from "clsx";

const ValueSelector = ({
  onChangeValue,
  name,
  values,
}: {
  onChangeValue: (value: string) => void;
  name: string;
  values?: number[];
}) => {
  const [isOpened, _] = useState(true);

  const handleClick = (value: string) => (e) => {
    e.stopPropagation();

    onChangeValue(value);
  };

  if (!isOpened) return <></>;

  return (
    <ul
      className={clsx(
        "!absolute",
        "top-1/2 -translate-y-1/2",
        "right-[-6px] translate-x-[100%]",
        "flex gap-[4px]"
      )}
    >
      {values.map((value) => {
        return (
          <li
            key={`${name}-${value}`}
            className={clsx(
              "border-[1px] border-black",
              "bg-white",
              "p-[6px] px-[10px]"
            )}
            onClick={handleClick(String(value))}
          >
            {value}
          </li>
        );
      })}
    </ul>
  );
};

export default ValueSelector;
