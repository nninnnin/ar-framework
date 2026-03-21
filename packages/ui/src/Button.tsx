import React from "react";
import * as styles from "./Button.css";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "blue" | "green" | "violet" | "surface";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
};

const Button = ({
  onClick,
  children,
  variant = "surface",
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={[
        styles.base,
        styles.variants[variant],
        isDisabled ? styles.disabled : "",
        fullWidth ? styles.fullWidth : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
