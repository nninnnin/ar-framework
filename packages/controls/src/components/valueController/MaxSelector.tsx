import React from "react";
import clsx from "clsx";

const MaxSelector = () => {
  return (
    <ul
      className={clsx(
        "!absolute right-[-10px] translate-x-[100%]",
        "flex gap-[10px]"
      )}
    >
      <li className="bg-green-300">a</li>
      <li className="bg-green-300">ab</li>
      <li className="bg-green-300">abc</li>
    </ul>
  );
};

export default MaxSelector;
