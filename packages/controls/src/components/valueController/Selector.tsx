import clsx from "clsx";
import React, { useRef, useState } from "react";

const Selector = ({
  defaultValue,
  children,
  className = "",
  onClose = () => {},
}: {
  defaultValue: unknown;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}) => {
  const [opened, setOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    String(defaultValue)
  );

  const containerRef = useRef(null);

  const handleBlur = (e) => {
    const nextFocused = e.relatedTarget;

    if (!containerRef.current.contains(nextFocused)) {
      setOpened(false);
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx("h-full relative", className)}
      onClick={(e) => {
        setOpened((prev) => !prev);

        const target = e.target as HTMLDivElement;

        const isSelectItem = target.classList.contains(
          "selector-item"
        );

        if (isSelectItem) {
          console.log(
            "selected value: ",
            target.dataset.value
          );
        }
      }}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <div
        className={clsx(
          "w-[60px] h-full flex justify-center items-center p-[8px]",
          "border-r-[1px] border-black"
        )}
      >
        {selectedValue}
      </div>

      {opened && (
        <div
          className={clsx(
            "flex flex-col gap-[8px] ml-[8px]",
            "absolute top-0 left-0 z-[9999]",
            "translate-y-[calc(-100%-8px)]"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

Selector.Item = ({
  children,
  value,
  onClick = () => {},
}: {
  children: React.ReactNode;
  value;
  onClick?: (e) => void;
}) => {
  return (
    <div
      className={clsx(
        "selector-item",
        "relative",
        "border-[1px] border-black",
        "p-[10px] py-[6px]",
        "flex justify-between items-center",
        "!whitespace-nowrap"
      )}
      data-value={value}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Selector;
