import { AdjustIcon, CropIcon, FilterIcon } from "@/ui/components/common/icons";

import { AdjustPanel } from "./adjust/AdjustPanel";
import { CropPanel } from "./crop/CropPanel";
import { FiltersPanel } from "./filters/FiltersPanel";
import type { Tool } from "./types";

export const TOOLS = {
  crop: { labelKey: "TOOL_CROP", Icon: CropIcon, Panel: CropPanel, isCropping: true },
  adjust: { labelKey: "TOOL_ADJUST", Icon: AdjustIcon, Panel: AdjustPanel, isCropping: false },
  filters: { labelKey: "TOOL_FILTERS", Icon: FilterIcon, Panel: FiltersPanel, isCropping: false },
} satisfies Record<string, Tool>;

export type ToolId = keyof typeof TOOLS;
