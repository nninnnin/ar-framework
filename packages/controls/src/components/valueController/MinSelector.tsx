import React, { useState } from "react";
import clsx from "clsx";

const MinSelector = ({
  onChangeValue,
  values,
}: {
  onChangeValue: (value: string) => void;
  values?: number[];
}) => {
  const [isOpened, setIsOpened] = useState(true);

  const handleClick = (value: string) => (e) => {
    e.stopPropagation();

    onChangeValue(value);
  };

  if (!isOpened) return <></>;

  return (
    <ul
      className={clsx(
        "!absolute right-[-10px] translate-x-[100%]",
        "flex gap-[10px]"
      )}
    >
      {values.map((value) => {
        return (
          <li
            key={`min-${value}`}
            onClick={handleClick(String(value))}
          >
            {value}
          </li>
        );
      })}
    </ul>
  );
};

export default MinSelector;
