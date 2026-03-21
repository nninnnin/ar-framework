import {
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { vars } from "./tokens.css";

export const base = style({
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  boxShadow: "0 4px 32px rgba(120,120,140,0.2), 0 1px 0 rgba(255,255,255,0.15)",
});

export const variants = styleVariants({
  surface: {
    backgroundColor: vars.color.surface,
  },
  active: {
    backgroundColor: vars.color.surfaceActive,
  },
  dark: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
