import React from "react";
import { Button } from "@ar-framework/ui";

const Item = ({
  children,
  disabled = false,
  variant = "surface",
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "blue" | "green" | "violet" | "surface";
  onClick: () => void;
}) => {
  return (
    <Button variant={variant} disabled={disabled} onClick={onClick} fullWidth>
      {children}
    </Button>
  );
};

export default Item;
