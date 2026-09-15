import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { Segmented } from "@/ui/components/common/Segmented";
import { Toggle } from "@/ui/components/common/Toggle";
import type { SettingsValues } from "@/ui/validation";

export const VisibilitySection = () => {
  const t = useTranslations("Settings");
  const { control } = useFormContext<SettingsValues>();
  const options = [
    { value: "everyone" as const, label: t("VISIBILITY_EVERYONE") },
    { value: "private" as const, label: t("VISIBILITY_PRIVATE") },
  ];

  return (
    <>
      <MonoLabel className="mt-6 mb-2.5">{t("TITLE_VISIBILITY")}</MonoLabel>
      <Controller
        name="visibility"
        control={control}
        render={({ field }) => (
          <Segmented options={options} value={field.value} onChange={field.onChange} />
        )}
      />
      <div className="mt-1.5">
        <Controller
          name="isPlaceVisible"
          control={control}
          render={({ field }) => (
            <Toggle
              label={t("TOGGLE_PLACE")}
              hint={t("HINT_PLACE")}
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </>
  );
};
