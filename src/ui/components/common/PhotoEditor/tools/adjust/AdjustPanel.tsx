import { useTranslations } from "next-intl";

import type { Adjustment } from "../../effects";
import { EditorSlider } from "../EditorSlider";
import type { ToolPanelProps } from "../types";

const ADJUSTMENTS: Record<Adjustment, string> = {
  brightness: "LABEL_BRIGHTNESS",
  contrast: "LABEL_CONTRAST",
  saturation: "LABEL_SATURATION",
};

const ADJUSTMENT_RANGE = { min: 0.5, max: 1.5, step: 0.01 };

export const AdjustPanel = ({ effects, onEffects }: ToolPanelProps) => {
  const t = useTranslations("PhotoEditor");

  return (
    <div className="flex flex-col gap-1">
      {(Object.keys(ADJUSTMENTS) as Adjustment[]).map((adjustment) => (
        <EditorSlider
          key={adjustment}
          label={t(ADJUSTMENTS[adjustment])}
          value={effects[adjustment]}
          {...ADJUSTMENT_RANGE}
          onChange={(value) => onEffects({ ...effects, [adjustment]: value })}
        />
      ))}
    </div>
  );
};
