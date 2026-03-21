import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "./tokens.css";

export const base = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  height: vars.space.touchTarget,
  padding: "0 12px",

  fontSize: vars.fontSize.button,
  fontWeight: 600,

  cursor: "pointer",
  userSelect: "none",
  border: "none",
  outline: "none",
  background: "none",

  transition: "opacity 0.15s ease",

  selectors: {
    "&:active": {
      opacity: 0.7,
    },
  },
});

export const variants = styleVariants({
  primary: {
    backgroundColor: vars.color.primary,
    color: vars.color.onPrimary,
  },
  secondary: {
    backgroundColor: vars.color.surface,
    color: vars.color.onSurface,
    border: `1px solid ${vars.color.border}`,
  },
});

export const disabled = style({
  backgroundColor: vars.color.disabled,
  color: vars.color.onDisabled,
  borderColor: vars.color.disabled,
  cursor: "not-allowed",
  pointerEvents: "none",
});

export const fullWidth = style({
  width: "100%",
});
