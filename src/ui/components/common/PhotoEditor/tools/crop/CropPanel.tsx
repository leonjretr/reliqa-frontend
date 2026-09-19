import { useTranslations } from "next-intl";
import { getZoomFactor } from "advanced-cropper/extensions/absolute-zoom";

import { FlipIcon, RotateIcon } from "@/ui/components/common/icons";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { Segmented } from "@/ui/components/common/Segmented";

import type { AspectId } from "../../modes";
import { EditorSlider } from "../EditorSlider";
import type { ToolPanelProps } from "../types";

const ZOOM_STEP = 0.01;
const QUARTER_TURN = -90;

const ASPECT_LABELS: Record<AspectId, string> = {
  original: "ASPECT_ORIGINAL",
  square: "ASPECT_SQUARE",
  portrait: "ASPECT_PORTRAIT",
  landscape: "ASPECT_LANDSCAPE",
};

const ACTION_CLASS = "text-ink flex cursor-pointer items-center gap-1.5 py-1";

export const CropPanel = ({ cropper, zoom, config, aspect, onAspect }: ToolPanelProps) => {
  const t = useTranslations("PhotoEditor");
  const aspectOptions = config.aspects.map((id) => ({ value: id, label: t(ASPECT_LABELS[id]) }));

  const handleZoom = (value: number) => {
    if (!cropper) return;
    cropper.zoomImage(getZoomFactor(cropper.getState(), cropper.getSettings(), value), {
      transitions: false,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <EditorSlider
        label={t("LABEL_ZOOM")}
        value={zoom}
        min={0}
        max={1}
        step={ZOOM_STEP}
        onChange={handleZoom}
      />
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={() => cropper?.rotateImage(QUARTER_TURN)}
          className={ACTION_CLASS}
        >
          <RotateIcon className="size-4.5" />
          <MonoLabel as="span" className="text-ink">
            {t("BUTTON_ROTATE")}
          </MonoLabel>
        </button>
        <button
          type="button"
          onClick={() => cropper?.flipImage(true, false)}
          className={ACTION_CLASS}
        >
          <FlipIcon className="size-4.5" />
          <MonoLabel as="span" className="text-ink">
            {t("BUTTON_FLIP")}
          </MonoLabel>
        </button>
      </div>
      {aspectOptions.length > 1 && (
        <Segmented options={aspectOptions} value={aspect} onChange={onAspect} />
      )}
    </div>
  );
};
