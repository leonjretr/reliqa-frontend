import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { YEAR_MAX_LENGTH } from "@/config";
import { KeptInput } from "@/ui/components/common/KeptInput";
import { sanitizeDigits } from "@/ui/utils";
import type { CaptureValues } from "@/ui/validation";

import { CaptureLabel } from "./CaptureLabel";

export const ProvenanceSection = () => {
  const t = useTranslations("Capture");
  const common = useTranslations("Common");
  const { register, control } = useFormContext<CaptureValues>();

  return (
    <>
      <CaptureLabel className="mt-5" isOptional>
        {t("LABEL_PREVIOUS_OWNER")}
      </CaptureLabel>
      <KeptInput {...register("previousOwner")} placeholder={t("PLACEHOLDER_PREVIOUS_OWNER")} />

      <div className="mt-5 flex gap-3.5">
        <div className="flex-1">
          <CaptureLabel>{t("LABEL_PLACE")}</CaptureLabel>
          <KeptInput {...register("place")} placeholder={common("PLACEHOLDER_CITY")} />
        </div>
        <div className="w-24">
          <CaptureLabel>{t("LABEL_YEAR")}</CaptureLabel>
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <KeptInput
                {...field}
                onChange={(event) =>
                  field.onChange(sanitizeDigits(event.target.value, YEAR_MAX_LENGTH))
                }
                className="font-kept-mono text-copy-lg lining-nums tabular-nums"
                placeholder={t("PLACEHOLDER_YEAR")}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};
