import { useTranslations } from "next-intl";
import Image from "next/image";

import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { cn } from "@/ui/utils";

import { NEUTRAL_EFFECTS, PRESET_IDS, toCssFilter, type PresetId } from "../../effects";
import type { ToolPanelProps } from "../types";

const THUMBNAIL_SIZE = 64;

const PRESET_LABELS: Record<PresetId, string> = {
  none: "PRESET_NONE",
  warm: "PRESET_WARM",
  faded: "PRESET_FADED",
  mono: "PRESET_MONO",
  sepia: "PRESET_SEPIA",
  vivid: "PRESET_VIVID",
};

export const FiltersPanel = ({ src, effects, onEffects }: ToolPanelProps) => {
  const t = useTranslations("PhotoEditor");

  return (
    <div className="scrollbar-hidden -mx-4.5 flex gap-2.5 overflow-x-auto px-4.5">
      {PRESET_IDS.map((preset) => (
        <button
          key={preset}
          type="button"
          onClick={() => onEffects({ ...effects, preset })}
          className="flex shrink-0 cursor-pointer flex-col items-center gap-1.5"
        >
          <span
            className={cn(
              "block size-16 overflow-hidden border",
              preset === effects.preset ? "border-ink border-2" : "border-stock-3",
            )}
          >
            <Image
              src={src}
              alt=""
              width={THUMBNAIL_SIZE}
              height={THUMBNAIL_SIZE}
              unoptimized
              className="size-full object-cover"
              style={{ filter: toCssFilter({ ...NEUTRAL_EFFECTS, preset }) }}
            />
          </span>
          <MonoLabel as="span" className={cn(preset === effects.preset && "text-ink")}>
            {t(PRESET_LABELS[preset])}
          </MonoLabel>
        </button>
      ))}
    </div>
  );
};
