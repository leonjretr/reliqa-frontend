import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { Toggle } from "@/ui/components/common/Toggle";
import type { SettingsValues } from "@/ui/validation";

export const NotificationsSection = () => {
  const t = useTranslations("Settings");
  const { control } = useFormContext<SettingsValues>();

  return (
    <>
      <MonoLabel className="mt-6 mb-2.5">{t("TITLE_NOTIFICATIONS")}</MonoLabel>
      <div>
        <Controller
          name="isNotifyingKept"
          control={control}
          render={({ field }) => (
            <Toggle
              label={t("TOGGLE_KEPT")}
              hint={t("HINT_KEPT")}
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="isNotifyingThemes"
          control={control}
          render={({ field }) => (
            <Toggle
              label={t("TOGGLE_THEMES")}
              hint={t("HINT_THEMES")}
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </>
  );
};
