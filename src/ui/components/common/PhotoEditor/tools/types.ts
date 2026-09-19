import type { ComponentProps, ComponentType } from "react";
import type { FixedCropperRef } from "react-advanced-cropper";

import type { Effects } from "../effects";
import type { AspectId, ModeConfig } from "../modes";

export type ToolPanelProps = {
  src: string;
  cropper: FixedCropperRef | null;
  zoom: number;
  config: ModeConfig;
  aspect: AspectId;
  onAspect: (aspect: AspectId) => void;
  effects: Effects;
  onEffects: (effects: Effects) => void;
};

export type Tool = {
  labelKey: "TOOL_CROP" | "TOOL_ADJUST" | "TOOL_FILTERS";
  Icon: ComponentType<ComponentProps<"svg">>;
  Panel: ComponentType<ToolPanelProps>;
  isCropping: boolean;
};
