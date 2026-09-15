import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import { META_SEPARATOR } from "@/config";
import { Divider } from "@/ui/components/common/Divider";
import { KeptPhoto } from "@/ui/components/common/KeptPhoto";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { PhotoShade } from "@/ui/components/common/PhotoShade";
import { yearsSince } from "@/ui/utils";
import type { CaptureValues } from "@/ui/validation";

import { ARRIVAL_LABEL_KEYS } from "./arrivals";
import { CaptureLabel } from "./CaptureLabel";

type Props = {
  preview?: string;
  keeperName?: string;
};

export const CapturePreview = ({ preview, keeperName }: Props) => {
  const t = useTranslations("Capture");
  const feed = useTranslations("Feed");
  const common = useTranslations("Common");
  const { control } = useFormContext<CaptureValues>();
  const [name, category, arrival, previousOwner, place, year, memory, story] = useWatch({
    control,
    name: ["name", "category", "arrival", "previousOwner", "place", "year", "memory", "story"],
  });
  const empty = common("EMPTY_VALUE");
  const origin = previousOwner
    ? t("PREVIEW_PREVIOUS_OWNER", { name: previousOwner })
    : t(ARRIVAL_LABEL_KEYS[arrival]);
  const meta = [place || empty, origin, year || empty].join(META_SEPARATOR);

  return (
    <>
      <Divider className="mt-5" />
      <CaptureLabel className="mt-3 mb-1.75">{t("TITLE_PREVIEW")}</CaptureLabel>
      <div className="border-ink relative h-55 overflow-hidden border">
        <KeptPhoto
          category={category}
          src={preview}
          alt={t("PREVIEW_ALT")}
          className="absolute inset-0"
        />
        <PhotoShade variant="preview" />
        <div className="absolute inset-x-0 bottom-0 px-3.5 pb-3.5">
          <MonoLabel className="text-chalk/72">{meta}</MonoLabel>
          <div className="text-chalk text-title-sm mt-1.25 font-bold">{name || empty}</div>
          <p className="text-chalk text-reading leading-quote-lg mt-2 font-light">
            {common("QUOTE", { text: memory || empty })}
          </p>
          {memory && (
            <MonoLabel className="text-chalk/72 mt-1.5">
              {feed("QUOTE_AUTHOR", { keeper: keeperName ?? t("KEEPER_FALLBACK") })}
            </MonoLabel>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-2.25">
        <MonoLabel as="span">
          {year ? t("HELD_YEARS", { count: yearsSince(Number(year)) }) : t("HELD_UNKNOWN")}
        </MonoLabel>
        <span className="bg-hair h-px flex-1 -translate-y-0.75" />
        <MonoLabel as="span">
          {story.trim() ? t("LABEL_WITH_LONGREAD") : t("LABEL_COMPUTED")}
        </MonoLabel>
      </div>
    </>
  );
};
