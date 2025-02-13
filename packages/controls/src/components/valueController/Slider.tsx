import clsx from "clsx";
import { Slider as RadixSlider } from "radix-ui";

import React from "react";

interface SliderProps {
  step: number;
  defaultValue: number[];
  min: number;
  max: number;
  onChange: (value: number[]) => void;
}

const Slider = ({
  step,
  defaultValue,
  min,
  max,
  onChange,
}: SliderProps) => {
  return (
    <RadixSlider.Root
      className={clsx(
        "relative flex items-center",
        "h-5 w-[calc(100%-64px)]",
        "mx-auto",
        "touch-none select-none",
        "bg-white"
      )}
      defaultValue={defaultValue}
      step={step}
      min={min}
      max={max}
      onValueChange={onChange}
    >
      <RadixSlider.Track
        className={clsx("w-full h-[3px] bg-gray-300")}
      >
        <RadixSlider.Range className="absolute bg-white" />
      </RadixSlider.Track>

      <RadixSlider.Thumb
        className={clsx(
          "block rounded-full bg-black",
          "w-5 h-5"
        )}
      />
    </RadixSlider.Root>
  );
};

export default Slider;
