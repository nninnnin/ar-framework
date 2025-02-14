import clsx from "clsx";
import React from "react";
import { useControlStore } from "../../stores/controls";
import { Axis } from "../../types";

const AxisToggler = () => {
  const { axis: selectedAxis, setAxis } =
    useControlStore();

  const axisList: Axis[] = ["x", "y", "z"];

  const handleAxisItemClick = (e) => {
    const axis = e.target.dataset.axis;

    if (axis) {
      setAxis(axis as Axis);
    }
  };

  return (
    <div
      className={clsx(
        "flex h-[44px]",
        "border-t-[1px] border-solid border-black"
      )}
      onClick={handleAxisItemClick}
    >
      {axisList.map((axis) => {
        return (
          <AxisToggler.AxisItem
            className={clsx(
              axis === selectedAxis &&
                "bg-black text-white"
            )}
            axisValue={axis}
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
  className = "",
  axisValue,
}: {
  children: React.ReactNode;
  className?: string;
  axisValue: Axis;
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
      data-axis={axisValue}
    >
      {children}
    </div>
  );
};

export default AxisToggler;
