import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@/ui/utils";
import { ARRIVALS, type CaptureValues } from "@/ui/validation";

import { ARRIVAL_LABEL_KEYS } from "./arrivals";
import { CaptureLabel } from "./CaptureLabel";

export const ArrivalSection = () => {
  const t = useTranslations("Capture");
  const { control } = useFormContext<CaptureValues>();

  return (
    <>
      <CaptureLabel className="mt-5.5">{t("LABEL_ARRIVAL")}</CaptureLabel>
      <Controller
        name="arrival"
        control={control}
        render={({ field }) => (
          <div className="mt-1.75 flex flex-wrap gap-1.5">
            {ARRIVALS.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={field.value === option}
                onClick={() => field.onChange(option)}
                className={cn(
                  "border-ink font-kept-mono text-caption cursor-pointer border px-2.75 py-2.25 tracking-wider lowercase",
                  field.value === option
                    ? "bg-ink text-chalk"
                    : "text-ink-2 hover:bg-stock-2 bg-transparent",
                )}
              >
                {t(ARRIVAL_LABEL_KEYS[option])}
              </button>
            ))}
          </div>
        )}
      />
    </>
  );
};
