import { useTranslations } from "next-intl";

import { PAGES } from "@/config";
import { Link } from "@/i18n";
import type { APIObject, APIStoryListItem } from "@/service/types";
import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { keptButtonVariants } from "@/ui/components/common/KeptButton";
import { ScrollBody } from "@/ui/components/common/ScrollBody";
import { ScreenHeader } from "@/ui/components/modules/navigation";
import { cn } from "@/ui/utils";

import { NoteBoard, ObjectFacts } from "./sections";

type Props = {
  object: APIObject;
  stories: APIStoryListItem[];
};

export const ObjectDetail = ({ object, stories }: Props) => {
  const t = useTranslations("Object");
  const catalogue = useTranslations("Catalogue");
  const category = object.categories[0];

  return (
    <div className="relative flex h-full flex-col">
      <ScreenHeader
        section={category?.name ?? t("SECTION_FALLBACK")}
        right={t("STORIES_COUNT", { count: object.stories_count })}
        back={{ href: PAGES.BROWSE, label: catalogue("SECTION_CATALOGUE") }}
      />
      <ScrollBody className="px-4.5 pt-4 pb-6">
        <h1 className="text-display leading-display tracking-display mb-1.75 font-bold">
          {object.name}
        </h1>
        {object.description && (
          <p className="text-ink-2 max-w-lede text-lede leading-lede mb-3.75 font-light italic">
            {object.description}
          </p>
        )}
        <NoteBoard
          category={category?.slug}
          photo={object.attachments[0]?.file.src}
          stories={stories}
          storiesCount={object.stories_count}
        />
        <ObjectFacts object={object} />
        <Link href={PAGES.ADD} className={cn(keptButtonVariants(), "mt-4.5 no-underline")}>
          {t("BUTTON_ADD_MEMORY")}
        </Link>
      </ScrollBody>
      <GrainOverlay />
    </div>
  );
};
