import type { ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import { CameraIcon } from "@/ui/components/common/icons";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import type { CaptureValues } from "@/ui/validation";

import { CaptureHint } from "./CaptureHint";
import { CaptureLabel } from "./CaptureLabel";

const CAMERA_STROKE_WIDTH = 1.4;

type Props = {
  preview?: string;
};

export const PhotoSection = ({ preview }: Props) => {
  const t = useTranslations("Capture");
  const { setValue, control } = useFormContext<CaptureValues>();
  const category = useWatch({ control, name: "category" });

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setValue("photo", file, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <>
      <CaptureLabel className="mt-5">{t("LABEL_PHOTO")}</CaptureLabel>
      <label className="mt-2 block cursor-pointer">
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        {preview ? (
          <div className="border-ink relative h-53.5 border">
            <KeptPhoto
              category={category}
              src={preview}
              alt={t("PHOTO_ALT")}
              className="absolute inset-0"
            />
            <MonoLabel
              as="span"
              className="text-chalk bg-night/60 absolute right-2 bottom-2 px-2 py-1.25"
            >
              {t("BUTTON_REPLACE_PHOTO")}
            </MonoLabel>
          </div>
        ) : (
          <div className="bg-stock-2 border-ink flex h-53.5 flex-col items-center justify-center gap-2.5 border border-dashed">
            <CameraIcon className="text-ink-faint size-8.5" strokeWidth={CAMERA_STROKE_WIDTH} />
            <MonoLabel as="span">{t("BUTTON_ADD_PHOTO")}</MonoLabel>
          </div>
        )}
      </label>
      <CaptureHint>{t("HINT_PHOTO")}</CaptureHint>
    </>
  );
};
