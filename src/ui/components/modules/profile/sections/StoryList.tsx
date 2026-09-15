import { useTranslations } from "next-intl";

import { storyPath } from "@/config";
import { Link } from "@/i18n";
import type { APIStoryListItem } from "@/service/types";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { formatYear } from "@/ui/utils";

type Props = {
  stories: APIStoryListItem[];
};

export const StoryList = ({ stories }: Props) => {
  const t = useTranslations("Profile");
  const common = useTranslations("Common");

  return (
    <>
      <MonoLabel className="mb-3">{t("TITLE_WRITTEN")}</MonoLabel>
      <div className="mb-6 flex flex-col gap-2.5">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={storyPath(story.id)}
            className="bg-stock border-ink rounded-paper block border px-3.5 pt-2.75 pb-3.25 no-underline"
          >
            <div className="mb-1.5 flex items-baseline justify-between">
              <MonoLabel as="span" className="text-stamp lining-nums tabular-nums">
                {formatYear(story.created_at)}
              </MonoLabel>
            </div>
            <p className="text-ink-2 text-copy leading-quote font-light italic">
              {common("QUOTE", { text: story.short_story || common("EMPTY_VALUE") })}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};
