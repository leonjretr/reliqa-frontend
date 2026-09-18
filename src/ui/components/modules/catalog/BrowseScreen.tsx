import { useTranslations } from "next-intl";

import { PAGES } from "@/config";
import type { APICategoryDetail, APIObjectListItem } from "@/service/types";
import { EmptyState } from "@/ui/components/common/EmptyState";
import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { ScrollBody } from "@/ui/components/common/ScrollBody";
import { ScreenHeader } from "@/ui/components/modules/navigation";
import { groupThousands } from "@/ui/utils";

import { CatalogueCard, DecadesBand } from "./sections";

type Props = {
  objects: APIObjectListItem[];
  totalCount: number;
  category?: APICategoryDetail;
};

export const BrowseScreen = ({ objects, totalCount, category }: Props) => {
  const t = useTranslations("Catalogue");
  const common = useTranslations("Common");

  return (
    <div className="relative flex h-full flex-col">
      <ScreenHeader
        section={category?.name ?? t("SECTION_CATALOGUE")}
        right={common("THINGS_COUNT", { count: totalCount })}
        back={category ? { href: PAGES.SEARCH, label: t("LINK_CATEGORIES") } : undefined}
      />
      <ScrollBody>
        <div className="px-4.5 pt-4 pb-1.5">
          <h1 className="text-heading leading-headline tracking-heading font-bold">
            {category?.name ?? t("TITLE_CATALOGUE")}
          </h1>
          <MonoLabel className="mt-1.75">
            {t("KEPT_SO_FAR", { count: totalCount, formatted: groupThousands(totalCount) })}
          </MonoLabel>
        </div>
        <div className="flex flex-col gap-4.5 px-4.5 pt-3 pb-5.5">
          {objects.map((object, index) => (
            <CatalogueCard key={object.id} object={object} index={index} />
          ))}
          {objects.length === 0 && (
            <EmptyState
              message={
                category
                  ? t("EMPTY_CATEGORY", { category: category.name.toLowerCase() })
                  : t("EMPTY_CATALOGUE")
              }
            />
          )}
          <div>
            <MonoLabel className="mb-2">{t("TITLE_DECADES")}</MonoLabel>
            <DecadesBand />
          </div>
        </div>
      </ScrollBody>
      <GrainOverlay />
    </div>
  );
};
