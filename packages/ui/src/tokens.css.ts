import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    blue: "rgba(147, 197, 253, 0.85)",
    onBlue: "rgba(30, 58, 138, 0.9)",
    green: "rgba(110, 231, 183, 0.85)",
    onGreen: "rgba(6, 78, 59, 0.9)",
    violet: "rgba(196, 181, 253, 0.85)",
    onViolet: "rgba(46, 16, 101, 0.9)",
    surface: "rgba(255, 255, 255, 0.12)",
    onSurface: "rgba(255, 255, 255, 0.88)",
  },
  space: {
    touchTarget: "44px",
  },
  fontSize: {
    button: "14px",
  },
  borderRadius: {
    button: "10px",
  },
});
