import React from "react";
import clsx from "clsx";
import { Select } from "radix-ui";
import { glass } from "@ar-framework/ui";
import { useModelStore } from "../stores";

const SelectModel = () => {
  const { models, setSelectedModelName } = useModelStore();

  return (
    <Select.Root onValueChange={(value) => setSelectedModelName(value)}>
      <Select.Trigger
        className={clsx(
          "w-full h-[44px] px-4",
          "flex items-center justify-between",
          "rounded-[10px]",
          "text-white text-[14px] font-semibold",
          "outline-none select-none",
          glass.base,
          glass.variants.surface
        )}
      >
        <Select.Value placeholder="모델을 선택해주세요" />
        <Select.Icon>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={clsx(
            "z-[9999] w-[var(--radix-select-trigger-width)]",
            "rounded-[10px] overflow-hidden",
            glass.base,
            glass.variants.dark
          )}
        >
          <Select.Viewport className="p-1">
            {models.map((model) => (
              <Select.Item
                key={model.name}
                className="
                  h-[40px] px-4
                  flex items-center
                  rounded-[8px]
                  text-white text-[14px] font-semibold
                  cursor-pointer select-none outline-none
                  hover:bg-white/10
                  data-[highlighted]:bg-white/15
                "
                value={model.name}
              >
                <Select.ItemText>{model.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectModel;
