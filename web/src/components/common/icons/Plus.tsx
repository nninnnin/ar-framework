import React from "react";

const Plus = () => {
  return (
    <svg height={26} width={26}>
      <line
        x1="0"
        y1="12"
        x2="24"
        y2="12"
        stroke="black"
        strokeWidth={1}
      />
      <line
        x1="12"
        y1="0"
        x2="12"
        y2="24"
        stroke="black"
        strokeWidth={1}
      />
    </svg>
  );
};

export default Plus;
