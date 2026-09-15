import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import { SHORT_STORY_MAX_LENGTH } from "@/config";
import { CharCounter } from "@/ui/components/common/CharCounter";
import { KeptTextarea } from "@/ui/components/common/KeptTextarea";
import { countWords } from "@/ui/utils";
import type { CaptureValues } from "@/ui/validation";

import { CaptureHint } from "./CaptureHint";
import { CaptureLabel } from "./CaptureLabel";

const FIELD_IDS = {
  MEMORY: "capture-memory",
  STORY: "capture-story",
};

export const MemorySection = () => {
  const t = useTranslations("Capture");
  const { register, control } = useFormContext<CaptureValues>();
  const [memory, story] = useWatch({ control, name: ["memory", "story"] });

  return (
    <>
      <div className="mt-5.5 flex items-baseline justify-between">
        <CaptureLabel htmlFor={FIELD_IDS.MEMORY}>{t("LABEL_MEMORY")}</CaptureLabel>
        <CharCounter remaining={SHORT_STORY_MAX_LENGTH - memory.length} />
      </div>
      <div className="mt-1.5">
        <KeptTextarea
          id={FIELD_IDS.MEMORY}
          {...register("memory")}
          className="h-18.5"
          maxLength={SHORT_STORY_MAX_LENGTH}
          placeholder={t("PLACEHOLDER_MEMORY")}
        />
      </div>
      <CaptureHint>{t("HINT_MEMORY")}</CaptureHint>

      <div className="mt-5.5 flex items-baseline justify-between">
        <CaptureLabel htmlFor={FIELD_IDS.STORY} isOptional>
          {t("LABEL_STORY")}
        </CaptureLabel>
        <span className="text-ink-faint font-kept-mono text-meta lining-nums tabular-nums">
          {t("WORDS_COUNT", { count: countWords(story) })}
        </span>
      </div>
      <div className="mt-1.5">
        <KeptTextarea
          id={FIELD_IDS.STORY}
          {...register("story")}
          className="h-37.5"
          placeholder={t("PLACEHOLDER_STORY")}
        />
      </div>
    </>
  );
};
