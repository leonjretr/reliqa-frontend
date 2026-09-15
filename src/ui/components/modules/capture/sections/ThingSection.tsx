import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import type { APICategoryListItem } from "@/service/types";
import { KeptInput } from "@/ui/components/common/KeptInput";
import type { CaptureValues } from "@/ui/validation";

import { CategorySelect, TagSelect } from "../selects";
import { CaptureLabel } from "./CaptureLabel";

const FIELD_IDS = {
  NAME: "capture-name",
  CATEGORY: "capture-category",
  TAGS: "capture-tags",
};

type Props = {
  categories: APICategoryListItem[];
};

export const ThingSection = ({ categories }: Props) => {
  const t = useTranslations("Capture");
  const { register, control } = useFormContext<CaptureValues>();

  return (
    <>
      <CaptureLabel htmlFor={FIELD_IDS.NAME}>{t("LABEL_THING")}</CaptureLabel>
      <KeptInput
        id={FIELD_IDS.NAME}
        {...register("name")}
        className="text-title-lg mt-1.25 pt-0 pb-1.75 font-bold tracking-tight"
        placeholder={t("PLACEHOLDER_THING")}
      />

      <CaptureLabel htmlFor={FIELD_IDS.CATEGORY} className="mt-5">
        {t("LABEL_CATEGORY")}
      </CaptureLabel>
      <div className="mt-1.75">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <CategorySelect
              inputId={FIELD_IDS.CATEGORY}
              categories={categories}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <CaptureLabel htmlFor={FIELD_IDS.TAGS} className="mt-5" isOptional>
        {t("LABEL_TAGS")}
      </CaptureLabel>
      <div className="mt-1.75">
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagSelect inputId={FIELD_IDS.TAGS} value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
    </>
  );
};
