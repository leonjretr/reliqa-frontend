import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { Toggle } from "@/ui/components/common/Toggle";
import type { CaptureValues } from "@/ui/validation";

export const VisibilitySection = () => {
  const t = useTranslations("Capture");
  const { control } = useFormContext<CaptureValues>();

  return (
    <div className="mt-5.5">
      <Controller
        name="isPrivate"
        control={control}
        render={({ field }) => (
          <Toggle
            label={t("TOGGLE_PRIVATE")}
            hint={t("HINT_PRIVATE")}
            checked={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
};
