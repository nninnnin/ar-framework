import clsx from "clsx";
import React from "react";
import { useControlStore } from "../../stores/controls";
import { Axis } from "../../types";

const AxisToggler = () => {
  const { axis: selectedAxis, setAxis } =
    useControlStore();

  const onClickAxis = (axis: Axis) => () =>
    setAxis(axis);

  const axisList: Axis[] = ["x", "y", "z"];

  return (
    <div className="flex h-[44px]">
      {axisList.map((axis) => {
        return (
          <AxisToggler.AxisItem
            className={clsx(
              axis === selectedAxis &&
                "bg-black text-white"
            )}
            onClick={onClickAxis(axis)}
          >
            {axis}
          </AxisToggler.AxisItem>
        );
      })}
    </div>
  );
};

AxisToggler.AxisItem = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center w-[44px]",
        "border-solid border-black",
        "border-r-[1px] last:border-r-0",
        "uppercase",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default AxisToggler;
