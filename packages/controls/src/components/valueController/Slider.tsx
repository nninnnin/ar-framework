import clsx from "clsx";
import { Slider as RadixSlider } from "radix-ui";

import React from "react";

interface SliderProps {
  step: number;
  min: number;
  max: number;
  onChange: (value: number[]) => void;
  value: number[];
}

const Slider = (slideProps: SliderProps) => {
  return (
    <RadixSlider.Root
      className={clsx(
        "relative flex items-center",
        "h-5 w-[calc(100%-32px)]",
        "mx-auto",
        "touch-none select-none",
        "bg-white"
      )}
      defaultValue={slideProps.value}
      value={slideProps.value}
      step={slideProps.step}
      min={slideProps.min}
      max={slideProps.max}
      onValueChange={slideProps.onChange}
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
