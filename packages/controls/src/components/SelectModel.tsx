import clsx from "clsx";
import React from "react";
import { Select } from "radix-ui";

import { useModelStore } from "../stores";

const SelectModel = () => {
  const { models, setSelectedModelName } =
    useModelStore();

  return (
    <Select.Root
      onValueChange={(value) =>
        setSelectedModelName(value)
      }
    >
      <Select.Trigger className="bg-violet-200">
        <Select.Value placeholder="모델을 선택해주세요" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={clsx("bg-amber-100")}
        >
          <Select.Viewport>
            {models.map((model, index) => (
              <Select.Item
                className="relative"
                value={model.name}
              >
                <Select.ItemText>
                  {model.name}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectModel;
