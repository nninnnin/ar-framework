import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "./tokens.css";

export const base = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  height: vars.space.touchTarget,
  padding: "0 14px",
  borderRadius: vars.borderRadius.button,

  fontSize: vars.fontSize.button,
  fontWeight: 600,
  letterSpacing: "0.01em",

  cursor: "pointer",
  userSelect: "none",
  border: "none",
  outline: "none",
  background: "none",

  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",

  transition: "opacity 0.15s ease, transform 0.1s ease",

  selectors: {
    "&:active": {
      opacity: 0.7,
      transform: "scale(0.98)",
    },
  },
});

export const variants = styleVariants({
  blue: {
    backgroundColor: vars.color.blue,
    color: vars.color.onBlue,
  },
  green: {
    backgroundColor: vars.color.green,
    color: vars.color.onGreen,
  },
  violet: {
    backgroundColor: vars.color.violet,
    color: vars.color.onViolet,
  },
  surface: {
    backgroundColor: vars.color.surface,
    color: vars.color.onSurface,
  },
});

export const disabled = style({
  opacity: 0.35,
  cursor: "not-allowed",
  pointerEvents: "none",
});

export const fullWidth = style({
  width: "100%",
});
