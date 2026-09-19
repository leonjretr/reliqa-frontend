import { CircleStencil, RectangleStencil } from "react-advanced-cropper";

import type { ToolId } from "./tools";

export const ASPECTS = {
  original: null,
  square: 1,
  portrait: 4 / 5,
  landscape: 4 / 3,
} satisfies Record<string, number | null>;

export type AspectId = keyof typeof ASPECTS;

export type ModeConfig = {
  stencil: typeof CircleStencil | typeof RectangleStencil;
  aspects: AspectId[];
  tools: ToolId[];
  maxSide: number;
};

export const PHOTO_EDITOR_MODES = {
  avatar: {
    stencil: CircleStencil,
    aspects: ["square"],
    tools: ["crop", "adjust", "filters"],
    maxSide: 512,
  },
  object: {
    stencil: RectangleStencil,
    aspects: ["original", "square", "portrait", "landscape"],
    tools: ["crop", "adjust", "filters"],
    maxSide: 2048,
  },
} satisfies Record<string, ModeConfig>;

export type PhotoEditorMode = keyof typeof PHOTO_EDITOR_MODES;
