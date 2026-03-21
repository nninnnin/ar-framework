import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    primary: "#000000",
    onPrimary: "#ffffff",
    surface: "#ffffff",
    onSurface: "#000000",
    border: "#000000",
    disabled: "#e0e0e0",
    onDisabled: "#a0a0a0",
  },
  space: {
    touchTarget: "44px",
  },
  fontSize: {
    button: "14px",
  },
});
