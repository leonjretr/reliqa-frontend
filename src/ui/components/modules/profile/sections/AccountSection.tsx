import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { LOCALE_NAMES } from "@/config";
import { routing } from "@/i18n";
import { KeptInput } from "@/ui/components/common/KeptInput";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { Segmented } from "@/ui/components/common/Segmented";
import { sanitizeUsername } from "@/ui/utils";
import type { SettingsValues } from "@/ui/validation";

const LANGUAGE_OPTIONS = routing.locales.map((locale) => ({
  value: locale,
  label: LOCALE_NAMES[locale],
}));

type Props = {
  email: string;
};

export const AccountSection = ({ email }: Props) => {
  const t = useTranslations("Settings");
  const { control } = useFormContext<SettingsValues>();

  return (
    <>
      <MonoLabel className="mt-6 mb-2.5">{t("TITLE_ACCOUNT")}</MonoLabel>
      <div>
        <MonoLabel>{t("LABEL_EMAIL")}</MonoLabel>
        <div className="border-hair text-ink-3 text-copy-lg flex items-center justify-between border-b pt-1.75 pb-1.5">
          <span>{email}</span>
          <MonoLabel as="span" className="text-stamp">
            {t("LABEL_LOCKED")}
          </MonoLabel>
        </div>
      </div>
      <div className="mt-4.5">
        <MonoLabel>{t("LABEL_USERNAME")}</MonoLabel>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <KeptInput
              {...field}
              onChange={(event) => field.onChange(sanitizeUsername(event.target.value))}
              placeholder={t("PLACEHOLDER_USERNAME")}
            />
          )}
        />
      </div>
      <div className="mt-4.5">
        <MonoLabel>{t("LABEL_LANGUAGE")}</MonoLabel>
        <div className="mt-1.75">
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Segmented options={LANGUAGE_OPTIONS} value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>
    </>
  );
};
