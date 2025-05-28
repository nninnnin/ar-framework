import React, { useState } from "react";

import Selector from "./Selector";
import ValueSelector from "./ValueSelector";
import clsx from "clsx";

enum ValueConfigs {
  Min = "min",
  Max = "max",
  Step = "step",
}

const ValueConfigNames = {
  [ValueConfigs.Min]: "최소",
  [ValueConfigs.Max]: "최대",
  [ValueConfigs.Step]: "단계",
};

const configSelectors = [
  {
    name: ValueConfigNames[ValueConfigs.Min],
    value: ValueConfigs.Min,
  },
  {
    name: ValueConfigNames[ValueConfigs.Max],
    value: ValueConfigs.Max,
  },
  {
    name: ValueConfigNames[ValueConfigs.Step],
    value: ValueConfigs.Step,
  },
];

const SlideConfigSelector = ({
  configValues,
  onChangeValue,
}: {
  configValues: Record<ValueConfigs, number>;
  onChangeValue: {
    min: (value: number) => void;
    max: (value: number) => void;
    step: (value: number) => void;
  };
}) => {
  const [selectedItem, setSelectedItem] = useState<
    null | string
  >(null);

  const handleItemClick =
    (configName: string) => (e) => {
      e.stopPropagation();

      setSelectedItem((prev) => {
        if (prev === configName) {
          return null;
        }

        return configName;
      });
    };

  const handleClose = () => {
    console.log("closed");

    setSelectedItem(null);
  };

  console.log(configValues);

  return (
    <Selector
      defaultValue={"⚙️"}
      onClose={handleClose}
    >
      {configSelectors.map((config) => {
        return (
          <SlideConfigSelector.Item
            key={config.name}
            name={config.name}
            value={config.value}
            onClick={handleItemClick(config.name)}
          >
            <div
              className={clsx(
                "ml-[6px]",
                "text-right font-medium text-[0.8em]"
              )}
            >
              <div>
                <span>
                  {configValues[config.value]}
                </span>
              </div>

              {selectedItem === config.name && (
                <>
                  <ValueSelector
                    name={config.name}
                    values={
                      {
                        [ValueConfigs.Min]: [
                          0, 1, 10, 100,
                        ],
                        [ValueConfigs.Max]: [
                          10, 100, 1000, 5000,
                        ],
                        [ValueConfigs.Step]: [
                          0.001, 0.01, 0.1, 1, 10,
                        ],
                      }[config.value]
                    }
                    onChangeValue={(value) => {
                      onChangeValue[config.value](
                        Number(value)
                      );

                      setSelectedItem(null);
                    }}
                  />
                </>
              )}
            </div>
          </SlideConfigSelector.Item>
        );
      })}
    </Selector>
  );
};

SlideConfigSelector.Item = ({
  value,
  name,
  onClick,
  children,
}: {
  value: unknown;
  name: string;
  onClick: (e) => void;
  children: React.ReactNode;
}) => {
  return (
    <Selector.Item value={value} onClick={onClick}>
      <div className="font-medium text-[0.8em]">
        {name}
      </div>

      <div className="flex-1">{children}</div>
    </Selector.Item>
  );
};

export default SlideConfigSelector;
