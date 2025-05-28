import React from "react";
import clsx from "clsx";

const StepSelector = () => {
  return (
    <ul
      className={clsx(
        "!absolute right-[-10px] translate-x-[100%]",
        "flex gap-[10px]"
      )}
    >
      <li className="bg-amber-300">a</li>
      <li className="bg-amber-300">ab</li>
      <li className="bg-amber-300">abc</li>
    </ul>
  );
};

export default StepSelector;
