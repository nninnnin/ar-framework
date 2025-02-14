import clsx from "clsx";
import React from "react";
import { Select } from "radix-ui";

import { useModelStore } from "../stores";
import { styles } from "../styles";

const SelectModel = () => {
  const { models, setSelectedModelName } =
    useModelStore();

  return (
    <Select.Root
      onValueChange={(value) =>
        setSelectedModelName(value)
      }
    >
      <Select.Trigger
        className={clsx("bg-violet-200", styles.item)}
      >
        <Select.Value placeholder="모델을 선택해주세요" />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-[9999]">
          <Select.Viewport className="bg-amber-100">
            {models.map((model, index) => (
              <Select.Item
                className={clsx(
                  styles.item,
                  "border-b-[0px] last:border-b-[1px]"
                )}
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
