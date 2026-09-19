import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import { CameraIcon } from "@/ui/components/common/icons";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { PhotoPicker } from "@/ui/components/common/PhotoEditor";
import { cn } from "@/ui/utils";
import type { CaptureValues } from "@/ui/validation";

import { CaptureHint } from "./CaptureHint";
import { CaptureLabel } from "./CaptureLabel";

const CAMERA_STROKE_WIDTH = 1.4;

const PHOTO_CHIP_CLASS =
  "text-chalk bg-night/60 pointer-events-auto flex cursor-pointer px-2 py-1.25";

type Props = {
  preview?: string;
};

export const PhotoSection = ({ preview }: Props) => {
  const t = useTranslations("Capture");
  const { setValue, control } = useFormContext<CaptureValues>();
  const category = useWatch({ control, name: "category" });

  const handlePhoto = (file: File) =>
    setValue("photo", file, { shouldDirty: true, shouldValidate: true });

  return (
    <>
      <CaptureLabel className="mt-5">{t("LABEL_PHOTO")}</CaptureLabel>
      <PhotoPicker mode="object" onChange={handlePhoto}>
        {({ pick, edit }) => (
          <div className="relative mt-2">
            <button type="button" onClick={pick} className="block w-full cursor-pointer text-left">
              {preview ? (
                <div className="border-ink relative h-53.5 border">
                  <KeptPhoto
                    category={category}
                    src={preview}
                    alt={t("PHOTO_ALT")}
                    className="absolute inset-0"
                  />
                </div>
              ) : (
                <div className="bg-stock-2 border-ink flex h-53.5 flex-col items-center justify-center gap-2.5 border border-dashed">
                  <CameraIcon
                    className="text-ink-faint size-8.5"
                    strokeWidth={CAMERA_STROKE_WIDTH}
                  />
                  <MonoLabel as="span">{t("BUTTON_ADD_PHOTO")}</MonoLabel>
                </div>
              )}
            </button>
            {(preview || edit) && (
              <div className="pointer-events-none absolute inset-x-2 bottom-2 flex items-end">
                {edit && (
                  <button type="button" onClick={edit} className={PHOTO_CHIP_CLASS}>
                    <MonoLabel as="span" className="text-current">
                      {t("BUTTON_EDIT_PHOTO")}
                    </MonoLabel>
                  </button>
                )}
                {preview && (
                  <button type="button" onClick={pick} className={cn(PHOTO_CHIP_CLASS, "ml-auto")}>
                    <MonoLabel as="span" className="text-current">
                      {t("BUTTON_REPLACE_PHOTO")}
                    </MonoLabel>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </PhotoPicker>
      <CaptureHint>{t("HINT_PHOTO")}</CaptureHint>
    </>
  );
};
